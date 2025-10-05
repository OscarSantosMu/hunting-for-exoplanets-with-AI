resource "azurerm_static_web_app" "exo" {
  name                = var.static_web_app_name
  location            = "${azurerm_resource_group.exo.location}2"
  resource_group_name = azurerm_resource_group.exo.name
  sku_tier            = var.static_web_app_sku_tier
  sku_size            = var.static_web_app_sku_size
  tags                = var.tags

  identity {
    type = "SystemAssigned"
  }
}
