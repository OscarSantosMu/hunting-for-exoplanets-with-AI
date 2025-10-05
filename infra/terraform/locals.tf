locals {
  kv_key_permissions = [
    "Get",
    "List",
    "Create",
    "Update",
    "Import",
    "Delete",
    "Purge",
    "Recover",
    "Backup",
    "Restore"
  ]

  kv_secret_permissions = [
    "Get",
    "List",
    "Set",
    "Delete",
    "Purge",
    "Recover",
    "Backup",
    "Restore"
  ]

  kv_certificate_permissions = [
    "Get",
    "List",
    "Update",
    "Create",
    "Import",
    "Delete",
    "Recover",
    "Backup",
    "Restore"
  ]
}
