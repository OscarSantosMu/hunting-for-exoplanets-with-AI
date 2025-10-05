# Terraform Deployment (Azure)

This module provisions the base Azure resources required for Azure Machine Learning development and deployment:

- Resource Group
- Storage Account for AML assets
- Azure Key Vault for secrets
- Application Insights for monitoring
- Azure Machine Learning Workspace (system-assigned identity)
- Azure Container Registry (for model & service images)
- App Service Plan + Linux Web App hosting the FastAPI API (containerized)
- Azure Static Web App (for the React/Vite frontend)

## Usage
```bash
cd infra/terraform
terraform init
terraform plan -var="project_name=exo-ai" -var="acr_name=exoacr" -var="storage_account_name=exoaisastrg"
terraform apply
```

> **Note:** Storage account and key vault names must be globally unique. Override `storage_account_name` / `key_vault_name` if the defaults are already taken.

The FastAPI deployment pulls the container image from the project ACR. Override `api_container_repository`, `api_container_image_tag`, or inject additional application settings through `api_app_settings` if you deploy a differently tagged image or need environment variables.

After the workspace is provisioned you can register models, create environments, and manage online endpoints with the Azure ML CLI or SDK.

The Static Web App deployment token is exposed as a Terraform output so you can wire it into GitHub Actions:

```bash
terraform output -raw static_web_app_api_key
```

Store this value as the `AZURE_STATIC_WEB_APPS_API_TOKEN` repository secret so `.github/workflows/swa.yml` can publish the Vite build on every commit. The accompanying `static_web_app_host` output surfaces the default hostname, which is useful when configuring DNS or documenting the deployed site.

## Remote State Backend

Terraform stores state in the Azure Storage account via the `azurerm` backend. The workflows call `terraform init` with the parameters defined in:

- `backend.hcl` (local runs)
- repository environment variables (`TF_STATE_*`) used inside GitHub Actions

### One-Time Bootstrap

1. Ensure the storage account exists (either by running `terraform apply` once with local state or creating it manually).
2. Create the blob container for state:
	```pwsh
	az storage container create `
	  --name tfstate `
	  --account-name <your-storage-account> `
	  --auth-mode login
	```
3. Re-run `terraform init` with the backend configuration to migrate state:
	```pwsh
	terraform init -backend-config=backend.hcl -reconfigure
	```

If you prefer different names, update `backend.hcl` and the `TF_STATE_*` environment variables in the GitHub Actions workflows.

## Cleanup
```bash
terraform destroy
```
