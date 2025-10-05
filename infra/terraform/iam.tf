resource "azurerm_role_assignment" "exop_contributor_guest" {
  scope                = azurerm_resource_group.exop.id
  role_definition_name = "Contributor"
  principal_id         = data.azuread_user.guest_user.id
}

resource "azurerm_role_assignment" "exop_contributor_guest2" {
  scope                = azurerm_resource_group.exop.id
  role_definition_name = "Contributor"
  principal_id         = data.azuread_user.guest_user2.id
}
