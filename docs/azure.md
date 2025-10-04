# Azure Deployment Guide

Azure Machine Learning (AML) is the primary deployment path for this project. Terraform provisions the supporting resources; the Azure ML CLI or SDK manages model registration and online endpoints.

## 1. Provision AML Infrastructure with Terraform

1. Authenticate: `az login` then select the subscription (`az account set --subscription <id>`).
2. Navigate to `infra/terraform/`.
3. Run the standard workflow:
   ```pwsh
   terraform init
   terraform plan -var="project_name=exo-ai" -var="acr_name=exoacr" -var="storage_account_name=<unique storage name>"
   terraform apply
   ```

  > Remote state is stored in the `tfstate` blob container of the Azure Storage account. Create it once via `az storage container create --name tfstate --account-name <your-storage-account> --auth-mode login` and, if migrating from local state, run `terraform init -backend-config=backend.hcl -reconfigure`.

The module creates:

- Resource group
- Azure Container Registry (for custom inference images)
- Storage account bound to the workspace
- Key Vault (wired to the workspace and AML-managed identities)
- Application Insights
- Azure Machine Learning workspace (system-assigned identity)

Take note of the outputs (workspace name, Key Vault URI, ACR credentials). Override `storage_account_name` / `key_vault_name` if the defaults collide with existing resources.

## 2. Build & Push the Inference Image

```pwsh
docker build -f infra/docker/Dockerfile.api -t <your-acr>.azurecr.io/exoplanet-ai-api:latest .
az acr login --name <your-acr>
docker push <your-acr>.azurecr.io/exoplanet-ai-api:latest
```

## 3. Register Models in AML

After running `python scripts/train_model.py`, register the model bundle (joblib, preprocessing artifacts):

```pwsh
az ml model create \
  --name exoplanet-ai \
  --version 1 \
  --type custom \
  --path models/random_forest.joblib
```

Version numbers can track git SHAs or semantic versions.

## 4. Define the Inference Environment

Capture dependencies in YAML (adjust as needed):

```yaml
# infra/aml/environment.yaml
name: exoplanet-ai-inference
version: 1
image: <your-acr>.azurecr.io/exoplanet-ai-api:latest
conda_file: |
  name: exoplanet-ai
  channels:
    - conda-forge
  dependencies:
    - python=3.11
    - pip:
        - fastapi
        - uvicorn
        - scikit-learn
        - joblib
        - pandas
```

Create it:

```pwsh
az ml environment create --file infra/aml/environment.yaml
```

## 5. Create or Update an Online Endpoint

Minimal endpoint and deployment definitions:

```yaml
# infra/aml/endpoint.yaml
name: exoplanet-ai-api
auth_mode: key
traffic:
  blue: 100
```

```yaml
# infra/aml/deployment.yaml
name: blue
endpoint_name: exoplanet-ai-api
model: azureml:exoplanet-ai:1
environment: azureml:exoplanet-ai-inference:1
code_configuration:
  code: src/exoplanet_ai/api
  scoring_script: infra/aml/score.py
instance_type: Standard_DS3_v2
instance_count: 1
```

Example scoring script bridging FastAPI logic:

```python
# infra/aml/score.py
import json
from exoplanet_ai.api.app import predict, PredictRequest

def init():
    return None

def run(raw_data):
    payload = json.loads(raw_data)
    request = PredictRequest(**payload)
    return predict(request)
```

Deploy:

```pwsh
az ml online-endpoint create --file infra/aml/endpoint.yaml
az ml online-deployment create --file infra/aml/deployment.yaml --all-traffic
```

Use blue/green deployments for safe rollouts (`az ml online-deployment update` + traffic splits).

## 6. Secrets, Monitoring, and Governance

- Secrets: store credentials in the workspace Key Vault or set endpoint secrets via `az ml online-endpoint update --set secrets.<name>=<value>`.
- Monitoring: Application Insights attached to the workspace captures logs/metrics. Enable data collection policies as required.
- Access control: Assign roles (Reader, Contributor, AzureML Data Scientist) to workspace users via Azure RBAC.

## CI/CD Considerations

- **Terraform**: Existing workflows (`ci.yml`, `deploy_infra.yml`) continue to run `terraform plan` / `apply`, now provisioning AML resources.
- **Azure ML CLI**: Extend pipelines after the build/test stage:
  ```pwsh
  az extension add -n ml
  az ml model create --name exoplanet-ai --version ${{ github.run_number }} --type custom --path models/random_forest.joblib
  az ml online-deployment update --name blue --endpoint-name exoplanet-ai-api --model exoplanet-ai@${{ github.run_number }} --all-traffic
  ```
- **Artifacts**: Publish `infra/aml/environment.yaml`, `infra/aml/endpoint.yaml`, `infra/aml/deployment.yaml`, and `infra/aml/score.py` as build artifacts for traceability.
- **Rollback**: Keep the previous deployment (e.g., `green`) ready and shift traffic back on failure.

## Optional: Container Apps (Legacy Path)

If you still need a lightweight container-based inference setup, refer to the previous Container Apps instructions in repository history. That route isn't maintained now that AML is the primary deployment target.
