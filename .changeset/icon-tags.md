---
'glyphflow': minor
---

`IconMeta.tags` ya viene poblado, y los sinónimos se exportan aparte como `ICON_TAGS`.

Buscar un icono por su nombre exacto solo funciona si ya sabes cómo se llama. Lucide publica los
sinónimos con los que indexa cada uno — `trash-2` trae `delete`, `remove`, `bin`, `garbage` — y
hasta ahora el paquete los tiraba.

```ts
import { ICON_TAGS } from 'glyphflow';

ICON_TAGS['trash-2']; // ['garbage', 'delete', 'remove', 'bin']
```

**`ICON_TAGS` va aparte del registro a propósito.** Colgados solo de `IconMeta`, buscar por sinónimo
obligaría a importar `ICON_META`, que se construye sobre `ANIMATED_ICON_NAMES` y arrastra la
geometría de los 1767. Así un buscador indexa los sinónimos sin bajar el catálogo. Quien ya tenga
`ICON_META` en la mano los encuentra igual en `.tags`, sin pagar de nuevo.

Los presupuestos no se movieron: los 1767 arrays se caen enteros por tree-shaking si nadie los
importa. Medido contra la línea base — `core` 4.58 → 4.57 KB gzip, un icono suelto 4.83 → 4.83 KB,
catálogo completo 119.10 → 119.11 KB.

**`tags` es un campo REQUERIDO**, no opcional, porque los 1767 tienen al menos uno: verificado en
las dos direcciones contra `lucide-static/tags.json`, y el generador aborta si algún día deja de ser
cierto. Si construías un `IconMeta` a mano — un mock, un fixture — ahora tiene que incluir `tags`;
leerlo, que es para lo que existe, no cambia.
