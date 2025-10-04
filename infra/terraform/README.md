# Terraform Deployment (Azure)

This module provisions the base Azure resources required for Azure Machine Learning development and deployment:

- Resource Group
- Azure Container Registry (ACR) for custom inference images
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

## Cleanup
```bash
terraform destroy
```
