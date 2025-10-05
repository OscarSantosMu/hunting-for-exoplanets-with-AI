resource "azurerm_application_insights" "cosmo" {
  name                = "${var.project_name}-appi"
  location            = azurerm_resource_group.cosmo.location
  resource_group_name = azurerm_resource_group.cosmo.name
  application_type    = "web"
  tags                = var.tags
}
