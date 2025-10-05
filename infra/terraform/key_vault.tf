resource "azurerm_key_vault" "exo" {
  name                       = "cosmonet-ai-kv"
  resource_group_name        = azurerm_resource_group.exo.name
  location                   = azurerm_resource_group.exo.location
  tenant_id                  = data.azurerm_client_config.current.tenant_id
  sku_name                   = "standard"

  # NEW name (replaces enable_rbac_authorization)
  rbac_authorization_enabled = true

  purge_protection_enabled   = true
  soft_delete_retention_days = 7
  tags                       = var.tags
}
