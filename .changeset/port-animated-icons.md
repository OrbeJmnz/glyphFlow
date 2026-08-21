---
'glyphflow': minor
---

El catálogo curado casi se duplica: de **405 a 899** iconos con coreografía a mano (el total de la
librería sigue en 1767 — nada entra ni sale, solo se mueve de `generated-icons.ts` a
`curated-icons.ts`). 494 de esos son nuevos: 487 portados de
[ajitzero/animated-icons](https://github.com/ajitzero/animated-icons) (MIT © 2025 Ajit Panigrahi)
a WAAPI nativa, más `menu`, `pause`, `lock-open`, `heart` y `move-right`, que quedaban con solo
`draw` automático.

Sobre ese port, una revisión completa figura por figura corrigió coreografía que estaba mal, no
solo ausente:

- **Rotaciones sin `transform-origin` explícito** (`bolt`, `orbit`, `refresh-ccw-dot`, `cctv`,
  `cloud-cog`, `columns-3-cog`, entre otros) pivotaban en la caja por default del navegador en vez
  del círculo o engrane central — visible como bamboleo, no giro limpio.
- **Familia `-off`** (`cannabis-off`, `cctv-off`, `circle-slash-2`, `beef-off`, `square-off`,
  `wrench-off`, `webcam-off`) no traía la variante `alert` (shake) que ya comparte el resto de la
  familia.
- **`dice-1`…`dice-6`** ahora giran sobre su propio eje, con pausa clara en cada cuarto de vuelta.
- **`scan-*`**: variante `hold` nueva con las 4 esquinas expandiéndose — la dirección de cada
  esquina se corrigió por ícono, porque no todos comparten el mismo orden de figuras que
  `maximize`.
- Once iconos más ganan variantes con nombre nuevas (`pulse` en 57 de la familia `file-*`,
  `receipt-*`, `notebook-*`, `mail-*` y otros; `active`, `hold`) sobre su animación existente.

**No hay nada que romper al actualizar.** La superficie pública es idéntica a la de 1.2.0: mismo
total de 1767 iconos exportados, nada perdido ni agregado. Los iconos que ya usabas por nombre
siguen ahí; los que se movieron de generado a curado ahora tienen coreografía en vez de solo
`draw`, y algunos de los 405 ya curados se mueven distinto a como se movían — con la geometría
intacta, así que ningún layout cambia.
