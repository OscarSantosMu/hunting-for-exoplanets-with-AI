resource "azurerm_machine_learning_workspace" "cosmo" {
  name                          = var.ml_workspace_name
  location                      = azurerm_resource_group.cosmo.location
  resource_group_name           = azurerm_resource_group.cosmo.name
  friendly_name                 = "${var.project_name} workspace"
  application_insights_id       = azurerm_application_insights.cosmo.id
  key_vault_id                  = azurerm_key_vault.cosmo.id
  storage_account_id            = azurerm_storage_account.cosmo.id
  container_registry_id         = azurerm_container_registry.cosmo.id
  public_network_access_enabled = true
  tags                          = var.tags

  identity {
    type = "SystemAssigned"
  }
}
