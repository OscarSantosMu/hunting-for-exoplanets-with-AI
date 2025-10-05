terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">= 3.69.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~>3.0"
    }
    tls = {
      source  = "hashicorp/tls"
      version = "~>4.0"
    }
  }

  # Update this block with the location of your terraform state file
  backend "azurerm" {
    resource_group_name  = "exoplanet-ai-tf-state-rg"
    storage_account_name = "exoplanetaitfstaterg"
    container_name       = "tfstate"
    key                  = "terraform.tfstate"
    use_oidc             = true
  }
}

data "azurerm_client_config" "current" {}

provider "azurerm" {
  features {}
  use_oidc = true
}

resource "azurerm_resource_group" "exo" {
  name     = var.resource_group_name
  location = var.location
  tags     = var.tags
}

resource "azurerm_container_registry" "exo" {
  name                = var.acr_name
  resource_group_name = azurerm_resource_group.exo.name
  location            = azurerm_resource_group.exo.location
  sku                 = "Basic"
  admin_enabled       = true
  tags                = var.tags
}

resource "azurerm_storage_account" "exo" {
  name                     = var.storage_account_name
  resource_group_name      = azurerm_resource_group.exo.name
  location                 = azurerm_resource_group.exo.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  min_tls_version          = "TLS1_2"
  tags                     = var.tags
}

resource "azurerm_application_insights" "exo" {
  name                = "${var.project_name}-appi"
  location            = azurerm_resource_group.exo.location
  resource_group_name = azurerm_resource_group.exo.name
  application_type    = "web"
  tags                = var.tags
}

resource "azurerm_key_vault" "exo" {
  name                        = var.key_vault_name
  location                    = azurerm_resource_group.exo.location
  resource_group_name         = azurerm_resource_group.exo.name
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  sku_name                    = "standard"
  purge_protection_enabled    = false
  soft_delete_retention_days  = 7
  public_network_access_enabled = true
  tags                        = var.tags

  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id

    key_permissions = [
      "Get",
      "List",
      "Create",
      "Update",
      "Import",
      "Delete",
      "Purge",
      "Recover",
      "Backup",
      "Restore"
    ]

    secret_permissions = [
      "Get",
      "List",
      "Set",
      "Delete",
      "Purge",
      "Recover",
      "Backup",
      "Restore"
    ]
  }
}

resource "azurerm_machine_learning_workspace" "exo" {
  name                     = var.ml_workspace_name
  location                 = azurerm_resource_group.exo.location
  resource_group_name      = azurerm_resource_group.exo.name
  friendly_name            = "${var.project_name} workspace"
  application_insights_id  = azurerm_application_insights.exo.id
  key_vault_id             = azurerm_key_vault.exo.id
  storage_account_id       = azurerm_storage_account.exo.id
  container_registry_id    = azurerm_container_registry.exo.id
  public_network_access_enabled = true
  tags                     = var.tags

  identity {
    type = "SystemAssigned"
  }
}

resource "azurerm_static_web_app" "exo" {
  name                = var.static_web_app_name
  location            = azurerm_resource_group.exo.location
  resource_group_name = azurerm_resource_group.exo.name
  sku_tier            = var.static_web_app_sku_tier
  sku_size            = var.static_web_app_sku_size
  tags                = var.tags

  identity {
    type = "SystemAssigned"
  }
}

