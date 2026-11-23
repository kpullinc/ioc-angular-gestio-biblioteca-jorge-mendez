## Mapatge: `ElementApiResponse` → `ElementBiblioteca`

| `ElementApiResponse` (origen) | Tipus origen | `ElementBiblioteca` (destí) | Tipus destí | Obligatori (origen → destí) | Transformació / notes |
|---|---|---|---|---|---|
| `id` | `string` | `id` | `string` | Sí → Sí | Sense canvis. |
| `nom` | `string` | `titol` | `string` | Sí → Sí | Només canvia el nom del camp. |
| `descripcio` | `string` | `descripcio` | `string` | Sí → Sí | Sense canvis. |
| `categoria` | `string` | `genere` | `string` | Sí → Sí | Només canvia el nom del camp. |
| `dataPublicacio` | `string` | `dataPublicacio` | `Date` | Sí → Sí | Convertir amb `new Date(valor)`. Vegeu la nota sobre dates parcials. |
| `preu` | `number` | — | — | Sí → No existeix | Camp només de l'API. Es descarta, o s'afegeix a `ElementBiblioteca` si cal. |
| `imatge` | `string` | `imatge` | `string` | Sí → Sí | Sense canvis. |
| `valoracioLectors` | `number` | `valoracioLectors` | `number` | Sí → Sí | Sense canvis. |
| `esDisponible` | `boolean` | `disponible` | `boolean` | No → No | Només canvia el nom del camp. Tots dos són opcionals (`undefined` si no arriba). |

### Resum de diferències

- **Reanomenats**: `nom` → `titol`, `categoria` → `genere`, `esDisponible` → `disponible`.
- **Canvi de tipus**: `dataPublicacio` passa de `string` a `Date`.
- **Només a l'API**: `preu`.
- **Només al model intern**: cap.

### Notes

- **Dates parcials**: si `dataPublicacio` arriba com `"1605-01"`, `"1962"` o `"-0800"`, `new Date()` pot interpretar-les diferent segons el navegador o retornar `Invalid Date`. Convé validar el resultat, o fer servir una funció de conversió pròpia. (per aquesta part he demanat ajuda a Claude, ja que no tenia ni idea de com gestionar el fet de que les dates poden venir de forma molt diferent depenent de si se sap la data real de publicació o no)
- **Anys negatius**: `new Date("-0800")` no és fiable. Per a dates anteriors a l'any 0 cal construir el `Date` amb `setUTCFullYear()`. (Aquesta nota es totalment de IA. He de reconèixer que ni havia pensat en el fet de que pogués tenir a la meva biblioteca un llibre anterior a l'any 0).