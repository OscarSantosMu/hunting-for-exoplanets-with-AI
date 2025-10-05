resource "azurerm_container_registry" "exop" {
  name                = var.acr_name
  resource_group_name = azurerm_resource_group.exop.name
  location            = azurerm_resource_group.exop.location
  sku                 = "Basic"
  admin_enabled       = true
  tags                = var.tags
}