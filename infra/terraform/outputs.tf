output "ml_workspace_details" {
  description = "Azure Machine Learning workspace identifiers"
  value = {
    id   = azurerm_machine_learning_workspace.exop.id
    name = azurerm_machine_learning_workspace.exop.name
  }
}

output "key_vault_uri" {
  description = "Key Vault URI for secrets management"
  value       = azurerm_key_vault.exop.vault_uri
}

output "storage_account_name" {
  description = "Storage account backing the AML workspace"
  value       = azurerm_storage_account.exop.name
}

output "container_registry_login" {
  description = "Credentials for Azure Container Registry"
  value = {
    username = azurerm_container_registry.exop.admin_username
    password = azurerm_container_registry.exop.admin_password
    login    = azurerm_container_registry.exop.login_server
  }
  sensitive = true
}

output "static_web_app_host" {
  description = "Default hostname for the Static Web App"
  value       = azurerm_static_web_app.exop.default_host_name
}

output "static_web_app_api_key" {
  description = "Deployment token for the Static Web App (use to configure GitHub Action secret)"
  value       = azurerm_static_web_app.exop.api_key
  sensitive   = true
}