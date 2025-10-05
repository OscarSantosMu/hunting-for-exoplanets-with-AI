# Example: grant a user or SP the ability to read secrets
resource "azurerm_role_assignment" "kv_secrets_user_admin" {
  scope                = azurerm_key_vault.exo.id
  role_definition_name = "Key Vault Secrets User"
  principal_id         = data.azuread_service_principal.tfstate.object_id  # or a user id
}

# Example: your ML workspace or app identity, if it needs secrets read:
resource "azurerm_role_assignment" "kv_secrets_user_ml" {
  scope                = azurerm_key_vault.exo.id
  role_definition_name = "Key Vault Secrets User"
  principal_id         = data.azuread_service_principal.ml_workspace.object_id
}
