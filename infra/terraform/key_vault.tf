resource "azurerm_key_vault" "exo" {
  name                          = var.key_vault_name
  location                      = azurerm_resource_group.exo.location
  resource_group_name           = azurerm_resource_group.exo.name
  tenant_id                     = data.azurerm_client_config.current.tenant_id
  sku_name                      = "standard"
  purge_protection_enabled      = false
  soft_delete_retention_days    = 7
  public_network_access_enabled = true
  tags                          = var.tags
}
