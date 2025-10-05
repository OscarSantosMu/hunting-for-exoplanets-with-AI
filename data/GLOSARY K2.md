# Glosario de variables para los distintos datasets utilizados


## Glosario K2

| Variable         | Descripción                                     | Unidad / Tipo     |
| ---------------- | ----------------------------------------------- | ----------------- |
| pl_name          | Nombre del planeta                              | texto             |
| hostname         | Nombre de la estrella anfitriona                | texto             |
| pl_letter        | Letra del planeta dentro del sistema            | texto             |
| k2_name          | Identificador K2                                | texto             |
| epic_hostname    | ID de anfitrión EPIC                            | texto             |
| epic_candname    | ID de candidato EPIC                            | texto             |
| hd_name          | ID HD                                           | texto             |
| hip_name         | ID HIP                                          | texto             |
| tic_id           | ID TIC                                          | texto             |
| gaia_id          | ID Gaia                                         | texto             |
| default_flag     | Conjunto de parámetros por defecto              | flag              |
| disposition      | Disposición en el archivo                       | texto             |
| disp_refname     | Referencia de la disposición                    | texto             |
| sy_snum          | Número de estrellas en el sistema               | entero            |
| sy_pnum          | Número de planetas en el sistema                | entero            |
| sy_mnum          | Número de lunas en el sistema                   | entero            |
| cb_flag          | Bandera de circumbinario                        | flag              |
| discoverymethod  | Método de descubrimiento                        | texto             |
| disc_year        | Año de descubrimiento                           | año               |
| disc_refname     | Referencia del descubrimiento                   | texto             |
| disc_pubdate     | Fecha de publicación del descubrimiento         | fecha             |
| disc_locale      | Lugar del descubrimiento                        | texto             |
| disc_facility    | Instalación de descubrimiento                   | texto             |
| disc_telescope   | Telescopio de descubrimiento                    | texto             |
| disc_instrument  | Instrumento de descubrimiento                   | texto             |
| rv_flag          | Detectado por velocidad radial                  | flag              |
| pul_flag         | Detectado por cronometraje de púlsar            | flag              |
| ptv_flag         | Detectado por cronometraje de pulsación         | flag              |
| tran_flag        | Detectado por tránsitos                         | flag              |
| ast_flag         | Detectado por variaciones astrométricas         | flag              |
| obm_flag         | Detectado por modulación de brillo orbital      | flag              |
| micro_flag       | Detectado por microlente                        | flag              |
| etv_flag         | Detectado por variaciones de tiempo de eclipse  | flag              |
| ima_flag         | Detectado por imagen directa                    | flag              |
| dkin_flag        | Detectado por cinemática de disco               | flag              |
| soltype          | Tipo de solución                                | texto             |
| pl_controv_flag  | Bandera de controversia                         | flag              |
| pl_refname       | Referencia de parámetros planetarios            | texto             |
| pl_orbper        | Período orbital                                 | días              |
| pl_orbpererr1    | Incertidumbre superior del período orbital      | días              |
| pl_orbpererr2    | Incertidumbre inferior del período orbital      | días              |
| pl_orbperlim     | Límite reportado para período orbital           | flag              |
| pl_orbsmax       | Semieje mayor de la órbita                      | au                |
| pl_orbsmaxerr1   | Incertidumbre superior del semieje mayor        | au                |
| pl_orbsmaxerr2   | Incertidumbre inferior del semieje mayor        | au                |
| pl_orbsmaxlim    | Límite reportado para semieje mayor             | flag              |
| pl_rade          | Radio planetario                                | radios terrestres |
| pl_radeerr1      | Incertidumbre superior del radio (Tierra)       | radios terrestres |
| pl_radeerr2      | Incertidumbre inferior del radio (Tierra)       | radios terrestres |
| pl_radelim       | Límite reportado para radio (Tierra)            | flag              |
| pl_radj          | Radio planetario                                | radios de Júpiter |
| pl_radjerr1      | Incertidumbre superior del radio (Júpiter)      | radios de Júpiter |
| pl_radjerr2      | Incertidumbre inferior del radio (Júpiter)      | radios de Júpiter |
| pl_radjlim       | Límite reportado para radio (Júpiter)           | flag              |
| pl_masse         | Masa planetaria                                 | masas terrestres  |
| pl_masseerr1     | Incertidumbre superior de masa (Tierra)         | masas terrestres  |
| pl_masseerr2     | Incertidumbre inferior de masa (Tierra)         | masas terrestres  |
| pl_masselim      | Límite reportado para masa (Tierra)             | flag              |
| pl_massj         | Masa planetaria                                 | masas de Júpiter  |
| pl_massjerr1     | Incertidumbre superior de masa (Júpiter)        | masas de Júpiter  |
| pl_massjerr2     | Incertidumbre inferior de masa (Júpiter)        | masas de Júpiter  |
| pl_massjlim      | Límite reportado para masa (Júpiter)            | flag              |
| pl_msinie        | M·sin(i)                                        | masas terrestres  |
| pl_msinieerr1    | Incertidumbre superior M·sin(i) (Tierra)        | masas terrestres  |
| pl_msinieerr2    | Incertidumbre inferior M·sin(i) (Tierra)        | masas terrestres  |
| pl_msinielim     | Límite reportado M·sin(i) (Tierra)              | flag              |
| pl_msinij        | M·sin(i)                                        | masas de Júpiter  |
| pl_msinijerr1    | Incertidumbre superior M·sin(i) (Júpiter)       | masas de Júpiter  |
| pl_msinijerr2    | Incertidumbre inferior M·sin(i) (Júpiter)       | masas de Júpiter  |
| pl_msinijlim     | Límite reportado M·sin(i) (Júpiter)             | flag              |
| pl_cmasse        | Masa corregida (M·sin(i)/sin(i))                | masas terrestres  |
| pl_cmasseerr1    | Incertidumbre superior masa corregida (Tierra)  | masas terrestres  |
| pl_cmasseerr2    | Incertidumbre inferior masa corregida (Tierra)  | masas terrestres  |
| pl_cmasselim     | Límite reportado masa corregida (Tierra)        | flag              |
| pl_cmassj        | Masa corregida (M·sin(i)/sin(i))                | masas de Júpiter  |
| pl_cmassjerr1    | Incertidumbre superior masa corregida (Júpiter) | masas de Júpiter  |
| pl_cmassjerr2    | Incertidumbre inferior masa corregida (Júpiter) | masas de Júpiter  |
| pl_cmassjlim     | Límite reportado masa corregida (Júpiter)       | flag              |
| pl_bmasse        | Masa o M·sin(i) (mejor disp.)                   | masas terrestres  |
| pl_bmasseerr1    | Incertidumbre superior (masa/M·sin(i), Tierra)  | masas terrestres  |
| pl_bmasseerr2    | Incertidumbre inferior (masa/M·sin(i), Tierra)  | masas terrestres  |
| pl_bmasselim     | Límite reportado (masa/M·sin(i), Tierra)        | flag              |
| pl_bmassj        | Masa o M·sin(i) (mejor disp.)                   | masas de Júpiter  |
| pl_bmassjerr1    | Incertidumbre superior (masa/M·sin(i), Júpiter) | masas de Júpiter  |
| pl_bmassjerr2    | Incertidumbre inferior (masa/M·sin(i), Júpiter) | masas de Júpiter  |
| pl_bmassjlim     | Límite reportado (masa/M·sin(i), Júpiter)       | flag              |
| pl_bmassprov     | Procedencia del valor de masa                   | texto             |
| pl_dens          | Densidad planetaria                             | g/cm³             |
| pl_denserr1      | Incertidumbre superior densidad                 | g/cm³             |
| pl_denserr2      | Incertidumbre inferior densidad                 | g/cm³             |
| pl_denslim       | Límite reportado para densidad                  | flag              |
| pl_orbeccen      | Excentricidad orbital                           | adimensional      |
| pl_orbeccenerr1  | Incertidumbre superior excentricidad            | adimensional      |
| pl_orbeccenerr2  | Incertidumbre inferior excentricidad            | adimensional      |
| pl_orbeccenlim   | Límite reportado excentricidad                  | flag              |
| pl_insol         | Flujo de insolación                             | veces Tierra      |
| pl_insolerr1     | Incertidumbre superior insolación               | veces Tierra      |
| pl_insolerr2     | Incertidumbre inferior insolación               | veces Tierra      |
| pl_insollim      | Límite reportado insolación                     | flag              |
| pl_eqt           | Temperatura de equilibrio                       | K                 |
| pl_eqterr1       | Incertidumbre superior T_eq                     | K                 |
| pl_eqterr2       | Incertidumbre inferior T_eq                     | K                 |
| pl_eqtlim        | Límite reportado T_eq                           | flag              |
| pl_orbincl       | Inclinación orbital                             | grados            |
| pl_orbinclerr1   | Incertidumbre superior inclinación              | grados            |
| pl_orbinclerr2   | Incertidumbre inferior inclinación              | grados            |
| pl_orbincllim    | Límite reportado inclinación                    | flag              |
| pl_tranmid       | Medio del tránsito (época)                      | días              |
| pl_tranmiderr1   | Incertidumbre superior medio del tránsito       | días              |
| pl_tranmiderr2   | Incertidumbre inferior medio del tránsito       | días              |
| pl_tranmidlim    | Límite reportado medio del tránsito             | flag              |
| pl_tsystemref    | Marco/estándar de tiempo usado                  | texto             |
| ttv_flag         | Muestra variaciones de tiempo de tránsito       | flag              |
| pl_imppar        | Parámetro de impacto                            | adimensional      |
| pl_impparerr1    | Incertidumbre superior parámetro de impacto     | adimensional      |
| pl_impparerr2    | Incertidumbre inferior parámetro de impacto     | adimensional      |
| pl_impparlim     | Límite reportado parámetro de impacto           | flag              |
| pl_trandep       | Profundidad del tránsito                        | %                 |
| pl_trandeperr1   | Incertidumbre superior profundidad              | %                 |
| pl_trandeperr2   | Incertidumbre inferior profundidad              | %                 |
| pl_trandeplim    | Límite reportado profundidad                    | flag              |
| pl_trandur       | Duración del tránsito                           | horas             |
| pl_trandurerr1   | Incertidumbre superior duración                 | horas             |
| pl_trandurerr2   | Incertidumbre inferior duración                 | horas             |
| pl_trandurlim    | Límite reportado duración                       | flag              |
| pl_ratdor        | a/R★ (semieje mayor / radio estelar)            | adimensional      |
| pl_ratdorerr1    | Incertidumbre superior a/R★                     | adimensional      |
| pl_ratdorerr2    | Incertidumbre inferior a/R★                     | adimensional      |
| pl_ratdorlim     | Límite reportado a/R★                           | flag              |
| pl_ratror        | Rp/R★ (radio planeta/estrella)                  | adimensional      |
| pl_ratrorerr1    | Incertidumbre superior Rp/R★                    | adimensional      |
| pl_ratrorerr2    | Incertidumbre inferior Rp/R★                    | adimensional      |
| pl_ratrorlim     | Límite reportado Rp/R★                          | flag              |
| pl_occdep        | Profundidad de ocultación                       | %                 |
| pl_occdeperr1    | Incertidumbre superior ocultación               | %                 |
| pl_occdeperr2    | Incertidumbre inferior ocultación               | %                 |
| pl_occdeplim     | Límite reportado ocultación                     | flag              |
| pl_orbtper       | Época de periastro                              | días              |
| pl_orbtperr1     | Incertidumbre superior periastro                | días              |
| pl_orbtperr2     | Incertidumbre inferior periastro                | días              |
| pl_orbtperlim    | Límite reportado periastro                      | flag              |
| pl_orblper       | Argumento del periastro                         | grados            |
| pl_orblpererr1   | Incertidumbre superior ω                        | grados            |
| pl_orblpererr2   | Incertidumbre inferior ω                        | grados            |
| pl_orblperlim    | Límite reportado ω                              | flag              |
| pl_rvamp         | Amplitud de velocidad radial                    | m/s               |
| pl_rvamperr1     | Incertidumbre superior K                        | m/s               |
| pl_rvamperr2     | Incertidumbre inferior K                        | m/s               |
| pl_rvamplim      | Límite reportado K                              | flag              |
| pl_projobliq     | Oblicuidad proyectada                           | grados            |
| pl_projobliqerr1 | Incertidumbre superior oblicuidad proyectada    | grados            |
| pl_projobliqerr2 | Incertidumbre inferior oblicuidad proyectada    | grados            |
| pl_projobliqlim  | Límite reportado oblicuidad proyectada          | flag              |
| pl_trueobliq     | Oblicuidad verdadera                            | grados            |
| pl_trueobliqerr1 | Incertidumbre superior oblicuidad verdadera     | grados            |
| pl_trueobliqerr2 | Incertidumbre inferior oblicuidad verdadera     | grados            |
| pl_trueobliqlim  | Límite reportado oblicuidad verdadera           | flag              |
| st_refname       | Referencia de parámetros estelares              | texto             |
| st_spectype      | Tipo espectral                                  | texto             |
| st_teff          | Temperatura efectiva estelar                    | K                 |
| st_tefferr1      | Incertidumbre superior Teff                     | K                 |
| st_tefferr2      | Incertidumbre inferior Teff                     | K                 |
| st_tefflim       | Límite reportado Teff                           | flag              |
| st_rad           | Radio estelar                                   | radios solares    |
| st_raderr1       | Incertidumbre superior radio estelar            | radios solares    |
| st_raderr2       | Incertidumbre inferior radio estelar            | radios solares    |
| st_radlim        | Límite reportado radio estelar                  | flag              |
| st_mass          | Masa estelar                                    | masas solares     |
| st_masserr1      | Incertidumbre superior masa estelar             | masas solares     |
| st_masserr2      | Incertidumbre inferior masa estelar             | masas solares     |
| st_masslim       | Límite reportado masa estelar                   | flag              |
| st_met           | Metalicidad estelar [dex]                       | dex               |
| st_meterr1       | Incertidumbre superior metalicidad              | dex               |
| st_meterr2       | Incertidumbre inferior metalicidad              | dex               |
| st_metlim        | Límite reportado metalicidad                    | flag              |
| st_metratio      | Razón de metalicidad                            | texto/num         |
| st_lum           | Luminosidad estelar (log Solar)                 | log(Solar)        |
| st_lumerr1       | Incertidumbre superior luminosidad              | log(Solar)        |
| st_lumerr2       | Incertidumbre inferior luminosidad              | log(Solar)        |
| st_lumlim        | Límite reportado luminosidad                    | flag              |
| st_logg          | Gravedad superficial estelar                    | log10(cm/s²)      |
| st_loggerr1      | Incertidumbre superior log g                    | log10(cm/s²)      |
| st_loggerr2      | Incertidumbre inferior log g                    | log10(cm/s²)      |
| st_logglim       | Límite reportado log g                          | flag              |
| st_age           | Edad estelar                                    | Gyr               |
| st_ageerr1       | Incertidumbre superior edad                     | Gyr               |
| st_ageerr2       | Incertidumbre inferior edad                     | Gyr               |
| st_agelim        | Límite reportado edad                           | flag              |
| st_dens          | Densidad estelar                                | g/cm³             |
| st_denserr1      | Incertidumbre superior densidad estelar         | g/cm³             |
| st_denserr2      | Incertidumbre inferior densidad estelar         | g/cm³             |
| st_denslim       | Límite reportado densidad estelar               | flag              |
| st_vsin          | Velocidad rotacional estelar                    | km/s              |
| st_vsinerr1      | Incertidumbre superior v·sin(i)                 | km/s              |
| st_vsinerr2      | Incertidumbre inferior v·sin(i)                 | km/s              |
| st_vsinlim       | Límite reportado v·sin(i)                       | flag              |
| st_rotp          | Período de rotación estelar                     | días              |
| st_rotperr1      | Incertidumbre superior período rot.             | días              |
| st_rotperr2      | Incertidumbre inferior período rot.             | días              |
| st_rotplim       | Límite reportado período rot.                   | flag              |
| st_radv          | Velocidad radial sistémica                      | km/s              |
| st_radverr1      | Incertidumbre superior v_rad                    | km/s              |
| st_radverr2      | Incertidumbre inferior v_rad                    | km/s              |
| st_radvlim       | Límite reportado v_rad                          | flag              |
| sy_refname       | Referencia de parámetros del sistema            | texto             |
| rastr            | Ascensión recta (sexagesimal)                   | texto             |
| ra               | Ascensión recta                                 | grados            |
| decstr           | Declinación (sexagesimal)                       | texto             |
| dec              | Declinación                                     | grados            |
| glat             | Latitud galáctica                               | grados            |
| glon             | Longitud galáctica                              | grados            |
| elat             | Latitud eclíptica                               | grados            |
| elon             | Longitud eclíptica                              | grados            |
| sy_pm            | Movimiento propio total                         | mas/año           |
| sy_pmerr1        | Incertidumbre superior mov. propio total        | mas/año           |
| sy_pmerr2        | Incertidumbre inferior mov. propio total        | mas/año           |
| sy_pmra          | Movimiento propio en RA                         | mas/año           |
| sy_pmraerr1      | Incertidumbre superior pmRA                     | mas/año           |
| sy_pmraerr2      | Incertidumbre inferior pmRA                     | mas/año           |
| sy_pmdec         | Movimiento propio en Dec                        | mas/año           |
| sy_pmdecerr1     | Incertidumbre superior pmDec                    | mas/año           |
| sy_pmdecerr2     | Incertidumbre inferior pmDec                    | mas/año           |
| sy_dist          | Distancia                                       | pc                |
| sy_disterr1      | Incertidumbre superior distancia                | pc                |
| sy_disterr2      | Incertidumbre inferior distancia                | pc                |
| sy_plx           | Paralaje                                        | mas               |
| sy_plxerr1       | Incertidumbre superior paralaje                 | mas               |
| sy_plxerr2       | Incertidumbre inferior paralaje                 | mas               |
| sy_bmag          | Magnitud B (Johnson)                            | mag               |
| sy_bmagerr1      | Incertidumbre superior B                        | mag               |
| sy_bmagerr2      | Incertidumbre inferior B                        | mag               |
| sy_vmag          | Magnitud V (Johnson)                            | mag               |
| sy_vmagerr1      | Incertidumbre superior V                        | mag               |
| sy_vmagerr2      | Incertidumbre inferior V                        | mag               |
| sy_jmag          | Magnitud J (2MASS)                              | mag               |
| sy_jmagerr1      | Incertidumbre superior J                        | mag               |
| sy_jmagerr2      | Incertidumbre inferior J                        | mag               |
| sy_hmag          | Magnitud H (2MASS)                              | mag               |
| sy_hmagerr1      | Incertidumbre superior H                        | mag               |
| sy_hmagerr2      | Incertidumbre inferior H                        | mag               |
| sy_kmag          | Magnitud Ks (2MASS)                             | mag               |
| sy_kmagerr1      | Incertidumbre superior Ks                       | mag               |
| sy_kmagerr2      | Incertidumbre inferior Ks                       | mag               |
| sy_umag          | Magnitud u (Sloan)                              | mag               |
| sy_umagerr1      | Incertidumbre superior u                        | mag               |
| sy_umagerr2      | Incertidumbre inferior u                        | mag               |
| sy_gmag          | Magnitud g (Sloan)                              | mag               |
| sy_gmagerr1      | Incertidumbre superior g                        | mag               |
| sy_gmagerr2      | Incertidumbre inferior g                        | mag               |
| sy_rmag          | Magnitud r (Sloan)                              | mag               |
| sy_rmagerr1      | Incertidumbre superior r                        | mag               |
| sy_rmagerr2      | Incertidumbre inferior r                        | mag               |
| sy_imag          | Magnitud i (Sloan)                              | mag               |
| sy_imagerr1      | Incertidumbre superior i                        | mag               |
| sy_imagerr2      | Incertidumbre inferior i                        | mag               |
| sy_zmag          | Magnitud z (Sloan)                              | mag               |
| sy_zmagerr1      | Incertidumbre superior z                        | mag               |
| sy_zmagerr2      | Incertidumbre inferior z                        | mag               |
| sy_w1mag         | Magnitud W1 (WISE)                              | mag               |
| sy_w1magerr1     | Incertidumbre superior W1                       | mag               |
| sy_w1magerr2     | Incertidumbre inferior W1                       | mag               |
| sy_w2mag         | Magnitud W2 (WISE)                              | mag               |
| sy_w2magerr1     | Incertidumbre superior W2                       | mag               |
| sy_w2magerr2     | Incertidumbre inferior W2                       | mag               |
| sy_w3mag         | Magnitud W3 (WISE)                              | mag               |
| sy_w3magerr1     | Incertidumbre superior W3                       | mag               |
| sy_w3magerr2     | Incertidumbre inferior W3                       | mag               |
| sy_w4mag         | Magnitud W4 (WISE)                              | mag               |
| sy_w4magerr1     | Incertidumbre superior W4                       | mag               |
| sy_w4magerr2     | Incertidumbre inferior W4                       | mag               |
| sy_gaiamag       | Magnitud Gaia                                   | mag               |
| sy_gaiamagerr1   | Incertidumbre superior Gaia G                   | mag               |
| sy_gaiamagerr2   | Incertidumbre inferior Gaia G                   | mag               |
| sy_icmag         | Magnitud I (Cousins)                            | mag               |
| sy_icmagerr1     | Incertidumbre superior I                        | mag               |
| sy_icmagerr2     | Incertidumbre inferior I                        | mag               |
| sy_tmag          | Magnitud TESS                                   | mag               |
| sy_tmagerr1      | Incertidumbre superior TESS                     | mag               |
| sy_tmagerr2      | Incertidumbre inferior TESS                     | mag               |
| sy_kepmag        | Magnitud Kepler                                 | mag               |
| sy_kepmagerr1    | Incertidumbre superior Kepler                   | mag               |
| sy_kepmagerr2    | Incertidumbre inferior Kepler                   | mag               |
| rowupdate        | Fecha de última actualización                   | fecha             |
| pl_pubdate       | Fecha de publicación de referencia planetaria   | fecha             |
| releasedate      | Fecha de liberación del registro                | fecha             |
| pl_nnotes        | Número de notas                                 | entero            |
| k2_campaigns     | Campañas K2 asociadas                           | texto             |
| k2_campaigns_num | Número de campañas K2                           | entero            |
| st_nphot         | Nº de series temporales fotométricas            | entero            |
| st_nrvc          | Nº de series de velocidad radial                | entero            |
| st_nspec         | Nº de mediciones de espectro estelar            | entero            |
| pl_nespec        | Nº de espectros de eclipse                      | entero            |
| pl_ntranspec     | Nº de espectros de transmisión                  | entero            |
| pl_ndispec       | Nº de espectros de imagen directa               | entero            |

> **Nota**: Los campos con sufijos **err1/err2** representan incertidumbres **superior/inferior**; los campos con sufijo **lim** indican que el valor es un **límite** (cota) en lugar de una medición puntual. Las “flags” son indicadores booleanos (0/1 o falso/verdadero) según la fuente.
