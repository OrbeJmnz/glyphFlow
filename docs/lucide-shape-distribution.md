# Distribución de shapes — lucide-static@1.31.0

Escaneo de `lucide-static@1.31.0` (`icon-nodes.json`, 1767 iconos canónicos), agrupados por qué
combinación de tags SVG usa cada uno. Referencia para v2 (morph) — el matching de figuras entre
dos iconos necesita saber qué formas de tag va a encontrarse en la práctica.

Los 7 tags que Lucide usa (`path`, `circle`, `rect`, `line`, `ellipse`, `polyline`, `polygon`) ya
están soportados por `IconShape` tal cual — no hizo falta normalizar nada al generar el catálogo.

| Grupo (tags presentes) | Cantidad | Ejemplo |
| --- | --- | --- |
| path | 1035 | activity |
| circle,path | 311 | alarm-clock |
| path,rect | 267 | align-end-horizontal |
| line,path | 30 | badge-alert |
| circle,path,rect | 27 | banknote |
| circle,line | 16 | circle-alert |
| rect | 16 | layout-grid |
| circle | 13 | circle-dot |
| ellipse,path | 12 | database |
| line,rect | 10 | credit-card |
| circle,line,path | 6 | user-minus |
| line,path,rect | 5 | copy-plus |
| line | 5 | hash |
| circle,rect | 4 | toggle-left |
| ellipse | 2 | torus |
| path,polyline | 2 | inbox |
| polygon | 2 | navigation |
| polyline,rect | 1 | album |
| circle,ellipse,path | 1 | database-search |
| line,path,polyline | 1 | mailbox |
| line,polyline | 1 | swords |

## Atributo `fill` (hallazgo, no anticipado en el escaneo por tag)

9 iconos usan `fill="currentColor"` en una figura puntual además del stroke default — un detalle
sólido dentro de un icono que por lo demás es solo trazo (el agujero de una llave, el punto de una
etiqueta): `chart-scatter`, `images`, `key-round`, `palette`, `tag-plus`, `tag-x`, `tag`, `tags`,
`vault`. Encontrado generando el set completo, no en el escaneo por tag ni en el lote canario de
22 — `IconShape.fill?` se agregó al modelo para cubrirlo.
