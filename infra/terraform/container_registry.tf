resource "azurerm_container_registry" "exo" {
  name                = var.acr_name
  resource_group_name = azurerm_resource_group.exo.name
  location            = azurerm_resource_group.exo.location
  sku                 = "Basic"
  admin_enabled       = true
  tags                = var.tags
}
