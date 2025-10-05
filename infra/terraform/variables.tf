variable "project_name" {
  type        = string
  description = "Base name prefix for Azure resources"
  default     = "exop-ai"
}

variable "location" {
  type        = string
  description = "Azure region"
  default     = "eastus"
}

variable "resource_group_name" {
  type        = string
  description = "Name of the resource group"
  default     = "exop-ai-rg"
}

variable "acr_name" {
  type        = string
  description = "Azure Container Registry name"
  default     = "exopacr"
}

variable "storage_account_name" {
  type        = string
  description = "Globally unique storage account name (lowercase, 3-24 characters)"
  default     = "exopaisastrg"
}

variable "key_vault_name" {
  type        = string
  description = "Azure Key Vault name (3-24 characters, letters/digits/hyphen)"
  default     = "exop-ai-kv"
}

variable "ml_workspace_name" {
  type        = string
  description = "Azure Machine Learning workspace name"
  default     = "exop-ai-mlw"
}

variable "static_web_app_name" {
  type        = string
  description = "Azure Static Web App name"
  default     = "exop-ai-swa"
}

variable "static_web_app_sku_tier" {
  type        = string
  description = "SKU tier for the Static Web App (Free or Standard)"
  default     = "Standard"
}

variable "static_web_app_sku_size" {
  type        = string
  description = "SKU size for the Static Web App"
  default     = "Standard"
}

variable "api_service_plan_name" {
  type        = string
  description = "App Service plan name for the FastAPI deployment"
  default     = "exop-ai-api-plan"
}

variable "api_service_plan_sku_name" {
  type        = string
  description = "SKU name for the App Service plan (e.g. B1, P1v2)"
  default     = "S1"
}

variable "api_web_app_name" {
  type        = string
  description = "Azure Web App name hosting the FastAPI service"
  default     = "exop-ai-api"
}

variable "api_container_repository" {
  type        = string
  description = "Container repository name inside ACR for the FastAPI image"
  default     = "fastapi"
}

variable "api_container_image_tag" {
  type        = string
  description = "Container image tag for the FastAPI deployment"
  default     = "latest"
}

variable "api_app_settings" {
  type        = map(string)
  description = "Additional application settings for the FastAPI Web App"
  default     = {}
}

variable "tags" {
  type        = map(string)
  description = "Optional tags applied to all resources"
  default     = {}
}
