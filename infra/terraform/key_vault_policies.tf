resource "azurerm_key_vault_access_policy" "current_admin" {
  key_vault_id = azurerm_key_vault.exo.id
  tenant_id    = data.azurerm_client_config.current.tenant_id
  object_id    = data.azurerm_client_config.current.object_id

  key_permissions         = local.kv_key_permissions
  secret_permissions      = local.kv_secret_permissions
  certificate_permissions = local.kv_certificate_permissions
}

resource "azurerm_key_vault_access_policy" "guest_user" {
  key_vault_id = azurerm_key_vault.exo.id
  tenant_id    = data.azurerm_client_config.current.tenant_id
  object_id    = data.azuread_user.guest_user.object_id

  key_permissions         = local.kv_key_permissions
  secret_permissions      = local.kv_secret_permissions
  certificate_permissions = local.kv_certificate_permissions
}

resource "azurerm_key_vault_access_policy" "ml_workspace" {
  key_vault_id = azurerm_key_vault.exo.id
  tenant_id    = azurerm_machine_learning_workspace.exo.identity[0].tenant_id
  object_id    = azurerm_machine_learning_workspace.exo.identity[0].principal_id

  key_permissions         = local.kv_key_permissions
  secret_permissions      = local.kv_secret_permissions
  certificate_permissions = local.kv_certificate_permissions

  depends_on = [
    azurerm_machine_learning_workspace.exo
  ]
}

resource "azurerm_key_vault_access_policy" "tfstate_service_principal" {
  key_vault_id = azurerm_key_vault.exo.id
  tenant_id    = data.azurerm_client_config.current.tenant_id
  object_id    = data.azuread_service_principal.tfstate.object_id

  key_permissions         = local.kv_key_permissions
  secret_permissions      = local.kv_secret_permissions
  certificate_permissions = local.kv_certificate_permissions
}
