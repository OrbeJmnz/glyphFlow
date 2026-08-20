---
'glyphflow': minor
---

225 iconos más pasan de solo trazo a coreografía a mano: el catálogo curado va de **180 a 405**.

Es la fase 3 completa. Cada uno se escribió icono por icono — giros, resortes, trazos y rebotes elegidos para lo que ese símbolo significa, no aplicados en lote. Varios estrenan además variantes con nombre (`ring`, `pulse`, `drop`, `wander`) que se piden por `animation=`.

**No hay nada que romper al actualizar.** La superficie pública es idéntica a la de 1.1.0: 1787 exports en el entry point principal y 19 en `glyphflow/morph`, sin uno solo perdido ni agregado. Los iconos afectados ya se exportaban con el mismo nombre; lo que cambia es que ahora tienen coreografía en vez de únicamente `draw`.

Consecuencia que sí conviene saber: si venías usando alguno de esos 225, va a moverse distinto —con intención, no solo dibujándose. El `d` y las figuras no cambian, así que nada de layout se mueve.
