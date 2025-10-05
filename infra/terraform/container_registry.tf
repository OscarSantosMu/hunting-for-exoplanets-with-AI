resource "azurerm_container_registry" "cosmo" {
  name                = var.acr_name
  resource_group_name = azurerm_resource_group.cosmo.name
  location            = azurerm_resource_group.cosmo.location
  sku                 = "Basic"
  admin_enabled       = false
  tags                = var.tags
}