# Terraform Deployment (Azure)

This module provisions the base Azure resources required for Azure Machine Learning development and deployment:

- Resource Group
- Storage Account for AML assets
- Azure Key Vault for secrets
- Application Insights for monitoring
- Azure Machine Learning Workspace (system-assigned identity)

## Usage
```bash
cd infra/terraform
terraform init
terraform plan -var="project_name=exo-ai" -var="acr_name=exoacr" -var="storage_account_name=exoaisastrg"
terraform apply
```

> **Note:** Storage account and key vault names must be globally unique. Override `storage_account_name` / `key_vault_name` if the defaults are already taken.

After the workspace is provisioned you can register models, create environments, and manage online endpoints with the Azure ML CLI or SDK.

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
