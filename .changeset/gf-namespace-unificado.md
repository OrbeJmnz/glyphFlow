---
'glyphflow': major
---

Un solo namespace público: `gf-`, y toda la API en inglés.

El paquete se llamaba `glyphflow` pero sus componentes se llamaban `Max*`. Eran dos nombres de
marca conviviendo en el mismo import, y la propia documentación gastaba un párrafo defendiendo el
prefijo — con `mat-button` y `p-button` como ejemplos, que derivan de Material y de Prime. El
equivalente de glyphFlow nunca fue `max-`, era `gf-`.

Al mismo tiempo, `glyphflow/morph` exportaba doce símbolos en español, y los que más pesaban no
eran las constantes sino las propiedades que se escriben en cada llamada.

Va todo en UNA sola major a propósito: si hay que romper, se rompe una vez.

## Equivalencias

| v1 | v2 |
| --- | --- |
| `MaxIconComponent` | `GfIconComponent` |
| `MaxIconMorphComponent` | `GfIconMorphComponent` |
| `MaxIconsConfig` | `GfIconsConfig` |
| `MAX_ICONS_CONFIG` | `GF_ICONS_CONFIG` |
| `MAX_ICON_CATALOG` | `GF_ICON_CATALOG` |
| `provideMaxIcons()` | `provideGfIcons()` |
| `<max-icon>` | `<gf-icon>` |
| `<max-icon-morph>` | `<gf-icon-morph>` |
| `PASOS_DEFAULT` | `STEPS_DEFAULT` |
| `RESOLUCION_DEFAULT` | `RESOLUTION_DEFAULT` |
| `COLA_DEFAULT` | `SPRING_TAIL_DEFAULT` |
| `opts.pasos` | `opts.steps` |
| `opts.resolucion` | `opts.resolution` |
| `opts.cola` | `opts.tail` |
| `opts.idaYVuelta` | `opts.roundTrip` |
| `opts.sobrepaso` | `opts.overshoot` |
| `MorphKeyframes.duracion` | `.duration` |
| `'completa' \| 'corta' \| 'recorte'` | `'full' \| 'short' \| 'clip'` |

## Nada de esto rompe hoy

Todos los nombres de la izquierda siguen funcionando durante una minor, y no como promesa: hay
tests que lo verifican.

- Los símbolos viejos son **la misma referencia**, no copias. `MAX_ICONS_CONFIG` ES
  `GF_ICONS_CONFIG`, así que un `provideMaxIcons()` de la v1 alimenta al componente nuevo. Dos
  `InjectionToken` distintos no se ven entre sí, y ese fallo habría sido silencioso:
  `durationScale` ignorado, sin un error que lo delate.
- **Los selectores viejos siguen montando**: `<max-icon>` y `<max-icon-morph>` están declarados
  junto a los nuevos. Un renombrado de selector es más peligroso que uno de símbolo — según el
  modo de compilación puede degradarse a elemento desconocido y dejar el icono invisible, sin
  error.
- Las opciones de morph se leen con el nombre nuevo primero y el viejo después, y los valores en
  español se **traducen**, no se ignoran.

## Lo único que sí cambia de comportamiento

`COLA_DEFAULT` cambió de **valor**, no solo de nombre: era `'corta'`, ahora es `'short'`. Pasarlo
como opción sigue funcionando; compararlo contra un `'corta'` literal ahora da `false`.

## Al actualizar

Un `find & replace` con la tabla de arriba y listo. Los avisos de `@deprecated` van marcando lo que
falte, y nada deja de funcionar mientras tanto.
