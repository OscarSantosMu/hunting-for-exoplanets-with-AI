resource "azurerm_service_plan" "api" {
  name                = var.api_service_plan_name
  resource_group_name = azurerm_resource_group.exo.name
  location            = azurerm_resource_group.exo.location
  os_type             = "Linux"
  sku_name            = var.api_service_plan_sku_name
  tags                = var.tags
}

resource "azurerm_linux_web_app" "api" {
  name                = var.api_web_app_name
  resource_group_name = azurerm_resource_group.exo.name
  location            = azurerm_resource_group.exo.location
  service_plan_id     = azurerm_service_plan.api.id
  tags                = var.tags

  identity {
    type = "SystemAssigned"
  }
  
  site_config {}

  # Keep only app settings you actually need for your app
  app_settings = merge({
    "WEBSITES_ENABLE_APP_SERVICE_STORAGE" = "false"
    # "WEBSITES_PORT" = "8000"             # <- add if your container listens on a non-default port
  }, var.api_app_settings)

  logs {
    http_logs {
      file_system {
        retention_in_days = 7
        retention_in_mb   = 100
      }
    }
  }
}
