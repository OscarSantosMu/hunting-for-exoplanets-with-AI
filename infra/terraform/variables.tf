variable "project_name" {
  type        = string
  description = "Base name prefix for Azure resources"
  default     = "exoplanet-ai"
}

variable "location" {
  type        = string
  description = "Azure region"
  default     = "eastus"
}

variable "resource_group_name" {
  type        = string
  description = "Name of the resource group"
  default     = "exoplanet-ai-rg"
}

variable "acr_name" {
  type        = string
  description = "Azure Container Registry name"
  default     = "exoplanetacr"
}

variable "storage_account_name" {
  type        = string
  description = "Globally unique storage account name (lowercase, 3-24 characters)"
  default     = "exoplanetaisastrg"
}

variable "key_vault_name" {
  type        = string
  description = "Azure Key Vault name (3-24 characters, letters/digits/hyphen)"
  default     = "exoplanet-ai-kv"
}

variable "ml_workspace_name" {
  type        = string
  description = "Azure Machine Learning workspace name"
  default     = "exoplanet-ai-mlw"
}

variable "static_web_app_name" {
  type        = string
  description = "Azure Static Web App name"
  default     = "exoplanet-ai-swa"
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

variable "tags" {
  type        = map(string)
  description = "Optional tags applied to all resources"
  default     = {}
}
