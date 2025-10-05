data "azurerm_client_config" "current" {}

data "azuread_user" "guest_user" {
  user_principal_name = "alexiscarrillo.medina_gmail.com#EXT#@oscarsantosmuoutlook.onmicrosoft.com"
}

data "azuread_user" "guest_user2" {
  user_principal_name = "richydiesel14_gmail.com#EXT#@oscarsantosmuoutlook.onmicrosoft.com"
}

data "azuread_service_principal" "tfstate" {
  display_name = "exoplanetai-tfstate"
}
