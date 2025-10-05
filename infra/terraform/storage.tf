resource "azurerm_storage_account" "cosmo" {
  name                     = var.storage_account_name
  resource_group_name      = azurerm_resource_group.cosmo.name
  location                 = azurerm_resource_group.cosmo.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  min_tls_version          = "TLS1_2"
  tags                     = var.tags
}
