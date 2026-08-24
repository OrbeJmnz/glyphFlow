---
'glyphflow': minor
---

Interruptor global de movimiento: `provideGfIcons({ animationsEnabled: false })` deja todos los
iconos quietos, `<gf-icon>` y `<gf-icon-morph>` incluidos.

No sustituye a `prefers-reduced-motion`, que se sigue respetando por su cuenta. Cubre lo que la
media query no puede: una aplicación con su propio ajuste de accesibilidad, donde el usuario apaga
el movimiento DENTRO del producto sin tocar el sistema operativo. Hasta ahora la única salida era
poner `respectReducedMotion` icono por icono, y aun así solo permitía seguir al sistema, nunca
contradecirlo.

Se lee en el momento de animar, igual que `durationScale`: un getter sobre una señal lo convierte
en un interruptor vivo sin re-bootstrapear. En el morph la figura nueva se PINTA aunque no se
interpole — saltarse la escritura dejaría en pantalla el icono anterior, que es peor que no animar.

Aditivo y con default `true`: nada cambia para quien no lo declare.
