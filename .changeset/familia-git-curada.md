---
'glyphflow': minor
---

La familia `git` completa pasa a coreografía a mano: **12 iconos** más curados, de 899 a **911**.

`git-branch`, `git-branch-plus`, `git-commit-horizontal`, `git-commit-vertical`, `git-compare`,
`git-compare-arrows`, `git-graph`, `git-merge`, `git-merge-conflict`, `git-pull-request`,
`git-pull-request-closed` y `git-pull-request-create` dejan de tener solo el trazo automático.

El criterio es el mismo en toda la familia y sigue lo que el icono significa: el círculo de origen
se dibuja, luego su conector, luego el círculo de destino, y al final la figura que los une se
inclina como un golpe de mazo y regresa a su posición. `git-compare-arrows` dibuja e inclina sus dos
flechas EN SIMULTÁNEO, porque comparar es paralelo y no secuencial. Las marcas de conflicto y de
cerrado —la X— tiemblan apenas terminan de dibujarse. `git-merge` pulsa al asentar en el círculo
destino. Todo el ciclo por icono cabe en menos de un segundo, para que se vea completo en un hover
normal.

Esto además cierra un hueco visible: hasta ahora la familia se veía PARTIDA. En 1.3.0 aparecían
`git-branch-minus` y `git-pull-request-draft` con coreografía, pero `git-branch` y
`git-pull-request` —los iconos base— solo se dibujaban, porque estaban del lado generado. Se leía
como catálogo incompleto, no como una frontera entre curado y generado.

**No hay nada que romper al actualizar.** La superficie pública es idéntica: los mismos 1767 iconos
exportados, ninguno perdido ni agregado. Los 12 ya se exportaban con el mismo nombre; lo que cambia
es que ahora se mueven con intención en vez de solo dibujarse.

Por dentro, `curated-icons.ts` se partió en un módulo por familia bajo `icons/` (de 19,687 a 6,118
líneas), con el archivo original como barrel. Es reorganización de fuente y no toca el artefacto
publicado: ng-packagr aplana todo a un solo FESM, y se verificó que la lista de exports del `.d.ts`
queda byte por byte igual.
