resource "azurerm_machine_learning_workspace" "exop" {
  name                     = var.ml_workspace_name
  location                 = azurerm_resource_group.exop.location
  resource_group_name      = azurerm_resource_group.exop.name
  friendly_name            = "${var.project_name} workspace"
  application_insights_id  = azurerm_application_insights.exop.id
  key_vault_id             = azurerm_key_vault.exop.id
  storage_account_id       = azurerm_storage_account.exop.id
  container_registry_id    = azurerm_container_registry.exop.id
  public_network_access_enabled = true
  tags                     = var.tags

  identity {
    type = "SystemAssigned"
  }
}