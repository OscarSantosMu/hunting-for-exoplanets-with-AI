resource "azurerm_application_insights" "exo" {
  name                = "${var.project_name}-appi"
  location            = azurerm_resource_group.exo.location
  resource_group_name = azurerm_resource_group.exo.name
  application_type    = "web"
  tags                = var.tags
}
