resource "azurerm_storage_account" "exop" {
  name                     = var.storage_account_name
  resource_group_name      = azurerm_resource_group.exop.name
  location                 = azurerm_resource_group.exop.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  min_tls_version          = "TLS1_2"
  tags                     = var.tags
}