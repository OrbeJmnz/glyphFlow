---
'glyphflow': minor
---

Nuevo entry point `glyphflow/morph`: transición entre dos iconos sobre Web Animations API, con el
mismo trato que el resto de la librería — cero dependencias de animación, cero loop en JS.

```html
<max-icon-morph [icon]="abierto() ? equisIcon : menuIcon" label="Menú" />
```

Un solo `[icon]`: cuando el valor cambia, la figura transiciona desde la anterior. Sin `from`/`to`
ni `trigger` — el binding es el estado, así que hover, toggle y cambio de estado son el mismo
mecanismo. Acepta cualquier icono del catálogo tal cual.

- **El navegador interpola, nosotros no.** El plan de correspondencia (Procrustes 2D) se calcula una
  vez y se entrega como keyframes discretos; el resorte se integra offline y solo decide la duración
  y el reparto temporal. No hay `requestAnimationFrame` ni trabajo por frame.
- **Reposo exacto.** En vuelo las poses son polilíneas (WAAPI solo interpola entre `d` con la misma
  estructura de comandos), pero al asentar se escribe el `d` canónico del destino: el DOM en reposo
  vuelve a ser curvas, no cientos de segmentos rectos.
- **Interrumpible sin saltos.** Cambiar de destino a media transición arranca desde la forma que se
  está viendo, no desde el icono completo. Medido en navegador: el salto pasa de 3.72 a 0.25
  unidades sobre un lienzo de 24 — y aguanta interrumpir la interrupción.
- **`prefers-reduced-motion`**: salta directo al icono nuevo sin animar. Se quita el movimiento, no
  el cambio de estado: quedarse quieto dejaría al usuario mirando el icono equivocado.
- **Accesibilidad y tamaño idénticos a `<max-icon>`**, y honra el mismo
  `provideMaxIcons({ durationScale })`.
- **No le cuesta nada a quien no lo use**: entry point aparte, en su propio chunk. Importar un icono
  suelto sigue costando 3.57KB gzip.

La API ya publicada no se toca: el `.d.ts` del entry point principal es byte por byte el de 1.0.0.
