resource "azurerm_machine_learning_workspace" "exo" {
  name                          = var.ml_workspace_name
  location                      = azurerm_resource_group.exo.location
  resource_group_name           = azurerm_resource_group.exo.name
  friendly_name                 = "${var.project_name} workspace"
  application_insights_id       = azurerm_application_insights.exo.id
  key_vault_id                  = azurerm_key_vault.exo.id
  storage_account_id            = azurerm_storage_account.exo.id
  container_registry_id         = azurerm_container_registry.exo.id
  public_network_access_enabled = true
  tags                          = var.tags

  identity {
    type = "SystemAssigned"
  }
}
