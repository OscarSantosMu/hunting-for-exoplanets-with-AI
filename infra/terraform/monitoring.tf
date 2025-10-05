resource "azurerm_application_insights" "exop" {
  name                = "${var.project_name}-appi"
  location            = azurerm_resource_group.exop.location
  resource_group_name = azurerm_resource_group.exop.name
  application_type    = "web"
  tags                = var.tags
}