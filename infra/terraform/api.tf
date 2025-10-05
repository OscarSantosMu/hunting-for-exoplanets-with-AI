resource "azurerm_log_analytics_workspace" "exop" {
  name                = var.log_analytics_workspace_name
  location            = azurerm_resource_group.exop.location
  resource_group_name = azurerm_resource_group.exop.name
  sku                 = "PerGB2018"
  retention_in_days   = 30
}

resource "azurerm_container_app_environment" "exop" {
  name                       = var.container_app_environment_name
  location                   = azurerm_resource_group.exop.location
  resource_group_name        = azurerm_resource_group.exop.name
  log_analytics_workspace_id = azurerm_log_analytics_workspace.exop.id
}
