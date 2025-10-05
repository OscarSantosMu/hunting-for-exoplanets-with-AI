# Glosario de variables para los distintos datasets utilizados


## Glosario KOI

| Variable           | Descripción                                           | Unidad / Tipo     |
| ------------------ | ----------------------------------------------------- | ----------------- |
| kepid              | Identificador Kepler (KepID)                          | entero            |
| kepoi_name         | Nombre KOI                                            | texto             |
| kepler_name        | Nombre Kepler                                         | texto             |
| koi_disposition    | Disposición en Exoplanet Archive                      | texto             |
| koi_vet_stat       | Estatus de vetting                                    | texto             |
| koi_vet_date       | Fecha de última actualización de parámetros           | fecha             |
| koi_pdisposition   | Disposición usando datos Kepler                       | texto             |
| koi_score          | Puntaje de disposición                                | numérico          |
| koi_fpflag_nt      | Falso positivo: no tipo tránsito                      | flag              |
| koi_fpflag_ss      | Falso positivo: eclipse estelar                       | flag              |
| koi_fpflag_co      | Falso positivo: offset de centróide                   | flag              |
| koi_fpflag_ec      | Falso positivo: ephemeris match (contaminación)       | flag              |
| koi_disp_prov      | Procedencia de la disposición                         | texto             |
| koi_comment        | Comentario                                            | texto             |
| koi_period         | Período orbital                                       | días              |
| koi_period_err1    | Incertidumbre superior del período                    | días              |
| koi_period_err2    | Incertidumbre inferior del período                    | días              |
| koi_time0bk        | Época de tránsito [BKJD]                              | BKJD              |
| koi_time0bk_err1   | Incertidumbre superior época [BKJD]                   | BKJD              |
| koi_time0bk_err2   | Incertidumbre inferior época [BKJD]                   | BKJD              |
| koi_time0          | Época de tránsito [BJD]                               | BJD               |
| koi_time0_err1     | Incertidumbre superior época [BJD]                    | BJD               |
| koi_time0_err2     | Incertidumbre inferior época [BJD]                    | BJD               |
| koi_eccen          | Excentricidad                                         | adimensional      |
| koi_eccen_err1     | Incertidumbre superior excentricidad                  | adimensional      |
| koi_eccen_err2     | Incertidumbre inferior excentricidad                  | adimensional      |
| koi_longp          | Longitud del periastro                                | grados            |
| koi_longp_err1     | Incertidumbre superior longitud periastro             | grados            |
| koi_longp_err2     | Incertidumbre inferior longitud periastro             | grados            |
| koi_impact         | Parámetro de impacto                                  | adimensional      |
| koi_impact_err1    | Incertidumbre superior parámetro impacto              | adimensional      |
| koi_impact_err2    | Incertidumbre inferior parámetro impacto              | adimensional      |
| koi_duration       | Duración del tránsito                                 | horas             |
| koi_duration_err1  | Incertidumbre superior duración                       | horas             |
| koi_duration_err2  | Incertidumbre inferior duración                       | horas             |
| koi_ingress        | Duración de ingreso                                   | horas             |
| koi_ingress_err1   | Incertidumbre superior ingreso                        | horas             |
| koi_ingress_err2   | Incertidumbre inferior ingreso                        | horas             |
| koi_depth          | Profundidad del tránsito                              | ppm               |
| koi_depth_err1     | Incertidumbre superior profundidad                    | ppm               |
| koi_depth_err2     | Incertidumbre inferior profundidad                    | ppm               |
| koi_ror            | Razón de radios planeta/estrella (Rp/R★)              | adimensional      |
| koi_ror_err1       | Incertidumbre superior Rp/R★                          | adimensional      |
| koi_ror_err2       | Incertidumbre inferior Rp/R★                          | adimensional      |
| koi_srho           | Densidad estelar ajustada                             | g/cm³             |
| koi_srho_err1      | Incertidumbre superior densidad estelar               | g/cm³             |
| koi_srho_err2      | Incertidumbre inferior densidad estelar               | g/cm³             |
| koi_fittype        | Tipo de ajuste planetario                             | texto             |
| koi_prad           | Radio planetario                                      | radios terrestres |
| koi_prad_err1      | Incertidumbre superior radio planetario               | radios terrestres |
| koi_prad_err2      | Incertidumbre inferior radio planetario               | radios terrestres |
| koi_sma            | Semieje mayor orbital                                 | au                |
| koi_sma_err1       | Incertidumbre superior semieje mayor                  | au                |
| koi_sma_err2       | Incertidumbre inferior semieje mayor                  | au                |
| koi_incl           | Inclinación                                           | grados            |
| koi_incl_err1      | Incertidumbre superior inclinación                    | grados            |
| koi_incl_err2      | Incertidumbre inferior inclinación                    | grados            |
| koi_teq            | Temperatura de equilibrio                             | K                 |
| koi_teq_err1       | Incertidumbre superior T_eq                           | K                 |
| koi_teq_err2       | Incertidumbre inferior T_eq                           | K                 |
| koi_insol          | Flujo de insolación                                   | veces Tierra      |
| koi_insol_err1     | Incertidumbre superior insolación                     | veces Tierra      |
| koi_insol_err2     | Incertidumbre inferior insolación                     | veces Tierra      |
| koi_dor            | Distancia planeta–estrella sobre radio estelar (a/R★) | adimensional      |
| koi_dor_err1       | Incertidumbre superior a/R★                           | adimensional      |
| koi_dor_err2       | Incertidumbre inferior a/R★                           | adimensional      |
| koi_limbdark_mod   | Modelo de oscurecimiento al borde                     | texto             |
| koi_ldm_coeff4     | Coeficiente de oscurecimiento 4                       | numérico          |
| koi_ldm_coeff3     | Coeficiente de oscurecimiento 3                       | numérico          |
| koi_ldm_coeff2     | Coeficiente de oscurecimiento 2                       | numérico          |
| koi_ldm_coeff1     | Coeficiente de oscurecimiento 1                       | numérico          |
| koi_parm_prov      | Procedencia de parámetros                             | texto             |
| koi_max_sngle_ev   | Estadístico máximo de evento simple                   | numérico          |
| koi_max_mult_ev    | Estadístico máximo de eventos múltiples               | numérico          |
| koi_model_snr      | SNR de la señal de tránsito                           | numérico          |
| koi_count          | Número de planetas                                    | entero            |
| koi_num_transits   | Número de tránsitos                                   | entero            |
| koi_tce_plnt_num   | Número de planeta del TCE                             | entero            |
| koi_tce_delivname  | Versión/entrega TCE                                   | texto             |
| koi_quarters       | Trimestres observacionales                            | texto             |
| koi_bin_oedp_sig   | Estadístico odd–even depth                            | numérico          |
| koi_trans_mod      | Modelo de tránsito                                    | texto             |
| koi_model_dof      | Grados de libertad del modelo                         | entero            |
| koi_model_chisq    | Chi-cuadrado del modelo                               | numérico          |
| koi_datalink_dvr   | Enlace al DV Report                                   | URL               |
| koi_datalink_dvs   | Enlace al DV Summary                                  | URL               |
| koi_steff          | Temperatura efectiva estelar                          | K                 |
| koi_steff_err1     | Incertidumbre superior Teff                           | K                 |
| koi_steff_err2     | Incertidumbre inferior Teff                           | K                 |
| koi_slogg          | Gravedad superficial estelar (log g)                  | log10(cm/s²)      |
| koi_slogg_err1     | Incertidumbre superior log g                          | log10(cm/s²)      |
| koi_slogg_err2     | Incertidumbre inferior log g                          | log10(cm/s²)      |
| koi_smet           | Metalicidad estelar [dex]                             | dex               |
| koi_smet_err1      | Incertidumbre superior metalicidad                    | dex               |
| koi_smet_err2      | Incertidumbre inferior metalicidad                    | dex               |
| koi_srad           | Radio estelar                                         | radios solares    |
| koi_srad_err1      | Incertidumbre superior radio estelar                  | radios solares    |
| koi_srad_err2      | Incertidumbre inferior radio estelar                  | radios solares    |
| koi_smass          | Masa estelar                                          | masas solares     |
| koi_smass_err1     | Incertidumbre superior masa estelar                   | masas solares     |
| koi_smass_err2     | Incertidumbre inferior masa estelar                   | masas solares     |
| koi_sage           | Edad estelar                                          | Gyr               |
| koi_sage_err1      | Incertidumbre superior edad                           | Gyr               |
| koi_sage_err2      | Incertidumbre inferior edad                           | Gyr               |
| koi_sparprov       | Procedencia de parámetros estelares                   | texto             |
| ra                 | Ascensión recta (decimal)                             | grados            |
| dec                | Declinación (decimal)                                 | grados            |
| koi_kepmag         | Magnitud banda Kepler                                 | mag               |
| koi_gmag           | Magnitud g'                                           | mag               |
| koi_rmag           | Magnitud r'                                           | mag               |
| koi_imag           | Magnitud i'                                           | mag               |
| koi_zmag           | Magnitud z'                                           | mag               |
| koi_jmag           | Magnitud J                                            | mag               |
| koi_hmag           | Magnitud H                                            | mag               |
| koi_kmag           | Magnitud K                                            | mag               |
| koi_fwm_stat_sig   | Significancia de offset FW                            | %                 |
| koi_fwm_sra        | Fuente FW α (OOT)                                     | horas             |
| koi_fwm_sra_err    | Incertidumbre α (OOT)                                 | horas             |
| koi_fwm_sdec       | Fuente FW δ (OOT)                                     | grados            |
| koi_fwm_sdec_err   | Incertidumbre δ (OOT)                                 | grados            |
| koi_fwm_srao       | Fuente FW Δα (OOT)                                    | segundos          |
| koi_fwm_srao_err   | Incertidumbre Δα (OOT)                                | segundos          |
| koi_fwm_sdeco      | Fuente FW Δδ (OOT)                                    | arcsec            |
| koi_fwm_sdeco_err  | Incertidumbre Δδ (OOT)                                | arcsec            |
| koi_fwm_prao       | FW Δα (OOT)                                           | segundos          |
| koi_fwm_prao_err   | Incertidumbre FW Δα (OOT)                             | segundos          |
| koi_fwm_pdeco      | FW Δδ (OOT)                                           | arcsec            |
| koi_fwm_pdeco_err  | Incertidumbre FW Δδ (OOT)                             | arcsec            |
| koi_dicco_mra      | PRF Δα<sub>SQ</sub> (OOT)                             | arcsec            |
| koi_dicco_mra_err  | Incertidumbre PRF Δα<sub>SQ</sub> (OOT)               | arcsec            |
| koi_dicco_mdec     | PRF Δδ<sub>SQ</sub> (OOT)                             | arcsec            |
| koi_dicco_mdec_err | Incertidumbre PRF Δδ<sub>SQ</sub> (OOT)               | arcsec            |
| koi_dicco_msky     | PRF Δθ<sub>SQ</sub> (OOT)                             | arcsec            |
| koi_dicco_msky_err | Incertidumbre PRF Δθ<sub>SQ</sub> (OOT)               | arcsec            |
| koi_dikco_mra      | PRF Δα<sub>SQ</sub> (KIC)                             | arcsec            |
| koi_dikco_mra_err  | Incertidumbre PRF Δα<sub>SQ</sub> (KIC)               | arcsec            |
| koi_dikco_mdec     | PRF Δδ<sub>SQ</sub> (KIC)                             | arcsec            |
| koi_dikco_mdec_err | Incertidumbre PRF Δδ<sub>SQ</sub> (KIC)               | arcsec            |
| koi_dikco_msky     | PRF Δθ<sub>SQ</sub> (KIC)                             | arcsec            |
| koi_dikco_msky_err | Incertidumbre PRF Δθ<sub>SQ</sub> (KIC)               | arcsec            |

>**Notas**:
    **err1/err2** indican incertidumbres superior e inferior respectivamente.
    **BKJD** = BJD − 2454833.0 (sistema de tiempo de Kepler).
    **Flags** suelen ser booleanos (0/1).
    **OOT** = Out Of Transit.
