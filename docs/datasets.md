# Datasets

| Mission | Reference | Key Columns | Notes |
|---------|-----------|-------------|-------|
| Kepler  | NASA Exoplanet Archive (pscomppars) | `pl_name`, `koi_disposition`, `pl_orbper`, `pl_rade`, `st_teff` | Rich metadata; requires class label harmonization |
| K2      | NASA Exoplanet Archive (k2candidates) | `epic_id`, `disp`, `period`, `radius`, `snr` | Mixed quality; duplicates with Kepler that require deduplication |
| TESS    | TIC / TOI catalogs | `toi`, `disposition`, `period`, `depth`, `duration` | Frequent updates; handle versioning |

## Download Notes
-- Use NASA TAP queries (`astroquery.mast`) or the provided `scripts/get_data` helpers.
-- Store raw assets under `data/external/` and record MD5 hashes in the subdirectory README.
