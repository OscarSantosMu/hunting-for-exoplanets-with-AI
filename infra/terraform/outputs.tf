output "ml_workspace_details" {
  description = "Azure Machine Learning workspace identifiers"
  value = {
    id   = azurerm_machine_learning_workspace.cosmo.id
    name = azurerm_machine_learning_workspace.cosmo.name
  }
}

output "key_vault_uri" {
  description = "Key Vault URI for secrets management"
  value       = azurerm_key_vault.cosmo.vault_uri
}

output "storage_account_name" {
  description = "Storage account backing the AML workspace"
  value       = azurerm_storage_account.cosmo.name
}

output "container_registry_login" {
  description = "Credentials for Azure Container Registry"
  value = {
    username = azurerm_container_registry.cosmo.admin_username
    password = azurerm_container_registry.cosmo.admin_password
    login    = azurerm_container_registry.cosmo.login_server
  }
  sensitive = true
}

output "static_web_app_host" {
  description = "Default hostname for the Static Web App"
  value       = azurerm_static_web_app.cosmo.default_host_name
}

output "static_web_app_api_key" {
  description = "Deployment token for the Static Web App (use to configure GitHub Action secret)"
  value       = azurerm_static_web_app.cosmo.api_key
  sensitive   = true
}

output "api_web_app_hostname" {
  description = "Default hostname for the FastAPI Azure Web App"
  value       = azurerm_linux_web_app.api.default_hostname
}

output "api_web_app_identity" {
  description = "Principal identifiers for the FastAPI Web App managed identity"
  value = {
    principal_id = azurerm_linux_web_app.api.identity[0].principal_id
    tenant_id    = azurerm_linux_web_app.api.identity[0].tenant_id
  }
}
