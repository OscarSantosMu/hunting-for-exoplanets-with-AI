resource "azurerm_role_assignment" "guest_rg_owner" {
  scope                = azurerm_resource_group.exo.id
  role_definition_name = "Owner"
  principal_id         = data.azuread_user.guest_user.object_id
}

resource "azurerm_role_assignment" "current_uaar" {
  scope                = azurerm_resource_group.exo.id
  role_definition_name = "User Access Administrator"
  principal_id         = data.azurerm_client_config.current.object_id
}

resource "azurerm_role_assignment" "guest_acr_pull" {
  scope                = azurerm_container_registry.exo.id
  role_definition_name = "AcrPull"
  principal_id         = data.azuread_user.guest_user.object_id
}

resource "azurerm_role_assignment" "guest_storage_reader" {
  scope                = azurerm_storage_account.exo.id
  role_definition_name = "Storage Blob Data Reader"
  principal_id         = data.azuread_user.guest_user.object_id
}
