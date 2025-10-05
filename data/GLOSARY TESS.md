# Glosario de variables para los distintos datasets utilizados


## Glosario TESS

| Variable          | Descripción                                 | Unidad / Tipo     |
| ----------------- | ------------------------------------------- | ----------------- |
| toi               | Identificador TOI (TESS Object of Interest) | entero            |
| toipfx            | Prefijo del TOI                             | texto             |
| tid               | ID del catálogo de entrada TESS (TIC)       | entero            |
| ctoi_alias        | Alias en el catálogo TIC                    | texto             |
| pl_pnum           | ID de señal del pipeline                    | entero            |
| tfopwg_disp       | Disposición TFOPWG (CP, FP, KP, PC)         | texto             |
| rastr             | Ascensión recta (RA) en formato sexagesimal | texto             |
| ra                | Ascensión recta (RA)                        | grados            |
| raerr1            | Incertidumbre superior RA                   | grados            |
| raerr2            | Incertidumbre inferior RA                   | grados            |
| decstr            | Declinación (Dec) en formato sexagesimal    | texto             |
| dec               | Declinación (Dec)                           | grados            |
| decerr1           | Incertidumbre superior Dec                  | grados            |
| decerr2           | Incertidumbre inferior Dec                  | grados            |
| st_pmra           | Movimiento propio en RA                     | mas/año           |
| st_pmraerr1       | Incertidumbre superior pmRA                 | mas/año           |
| st_pmraerr2       | Incertidumbre inferior pmRA                 | mas/año           |
| st_pmralim        | Bandera de límite pmRA                      | flag              |
| st_pmrasymerr     | Bandera error simétrico pmRA                | flag              |
| st_pmdec          | Movimiento propio en Dec                    | mas/año           |
| st_pmdecerr1      | Incertidumbre superior pmDec                | mas/año           |
| st_pmdecerr2      | Incertidumbre inferior pmDec                | mas/año           |
| st_pmdeclim       | Bandera de límite pmDec                     | flag              |
| st_pmdecsymerr    | Bandera error simétrico pmDec               | flag              |
| pl_tranmid        | Época de tránsito planetario (valor)        | BJD               |
| pl_tranmiderr1    | Incertidumbre superior tránsito             | BJD               |
| pl_tranmiderr2    | Incertidumbre inferior tránsito             | BJD               |
| pl_tranmidlim     | Bandera de límite tránsito                  | flag              |
| pl_tranmidsymerr  | Bandera error simétrico tránsito            | flag              |
| pl_orbper         | Período orbital planetario (valor)          | días              |
| pl_orbpererr1     | Incertidumbre superior período orbital      | días              |
| pl_orbpererr2     | Incertidumbre inferior período orbital      | días              |
| pl_orbperlim      | Bandera de límite período orbital           | flag              |
| pl_orbpersymerr   | Bandera error simétrico período orbital     | flag              |
| pl_trandurh       | Duración del tránsito (valor)               | horas             |
| pl_trandurherr1   | Incertidumbre superior duración             | horas             |
| pl_trandurherr2   | Incertidumbre inferior duración             | horas             |
| pl_trandurhlim    | Bandera de límite duración                  | flag              |
| pl_trandurhsymerr | Bandera error simétrico duración            | flag              |
| pl_trandep        | Profundidad del tránsito (valor)            | ppm               |
| pl_trandeperr1    | Incertidumbre superior profundidad          | ppm               |
| pl_trandeperr2    | Incertidumbre inferior profundidad          | ppm               |
| pl_trandeplim     | Bandera de límite profundidad               | flag              |
| pl_trandepsymerr  | Bandera error simétrico profundidad         | flag              |
| pl_rade           | Radio planetario (valor)                    | radios terrestres |
| pl_radeerr1       | Incertidumbre superior radio planetario     | radios terrestres |
| pl_radeerr2       | Incertidumbre inferior radio planetario     | radios terrestres |
| pl_radelim        | Bandera de límite radio planetario          | flag              |
| pl_radesymerr     | Bandera error simétrico radio               | flag              |
| pl_insol          | Insolación planetaria (valor)               | veces Tierra      |
| pl_insolerr1      | Incertidumbre superior insolación           | veces Tierra      |
| pl_insolerr2      | Incertidumbre inferior insolación           | veces Tierra      |
| pl_insollim       | Bandera de límite insolación                | flag              |
| pl_insolsymerr    | Bandera error simétrico insolación          | flag              |
| pl_eqt            | Temperatura de equilibrio (valor)           | K                 |
| pl_eqterr1        | Incertidumbre superior T_eq                 | K                 |
| pl_eqterr2        | Incertidumbre inferior T_eq                 | K                 |
| pl_eqtlim         | Bandera de límite T_eq                      | flag              |
| pl_eqtsymerr      | Bandera error simétrico T_eq                | flag              |
| st_tmag           | Magnitud TESS                               | mag               |
| st_tmagerr1       | Incertidumbre superior TESS mag             | mag               |
| st_tmagerr2       | Incertidumbre inferior TESS mag             | mag               |
| st_tmaglim        | Bandera de límite TESS mag                  | flag              |
| st_tmagsymerr     | Bandera error simétrico TESS mag            | flag              |
| st_dist           | Distancia estelar (valor)                   | pc                |
| st_disterr1       | Incertidumbre superior distancia            | pc                |
| st_disterr2       | Incertidumbre inferior distancia            | pc                |
| st_distlim        | Bandera de límite distancia                 | flag              |
| st_distsymerr     | Bandera error simétrico distancia           | flag              |
| st_teff           | Temperatura efectiva estelar (valor)        | K                 |
| st_tefferr1       | Incertidumbre superior Teff                 | K                 |
| st_tefferr2       | Incertidumbre inferior Teff                 | K                 |
| st_tefflim        | Bandera de límite Teff                      | flag              |
| st_teffsymerr     | Bandera error simétrico Teff                | flag              |
| st_logg           | Gravedad superficial log(g) (valor)         | cm/s²             |
| st_loggerr1       | Incertidumbre superior log(g)               | cm/s²             |
| st_loggerr2       | Incertidumbre inferior log(g)               | cm/s²             |
| st_logglim        | Bandera de límite log(g)                    | flag              |
| st_loggsymerr     | Bandera error simétrico log(g)              | flag              |
| st_rad            | Radio estelar (valor)                       | radios solares    |
| st_raderr1        | Incertidumbre superior radio estelar        | radios solares    |
| st_raderr2        | Incertidumbre inferior radio estelar        | radios solares    |
| st_radlim         | Bandera de límite radio estelar             | flag              |
| st_radsymerr      | Bandera error simétrico radio estelar       | flag              |
| toi_created       | Fecha de creación del TOI                   | fecha             |
| rowupdate         | Fecha de última modificación                | fecha             |

    > Notas:

    **err1 / err2**: incertidumbre superior e inferior.

    **lim**: indica si el valor es un límite en vez de una medición.

    **symerr**: indica si el error reportado es simétrico.

    **Flags**: valores booleanos (0/1).