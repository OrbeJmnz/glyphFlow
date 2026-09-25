# `shared/ui` — las primitivas del playground

Controles sin dominio: no saben qué es un icono, una coreografía ni un nodo. Si un componente
necesita saberlo, no va aquí — va en su `features/`.

| Primitiva | Selector | Dónde se usa |
| --- | --- | --- |
| `Chip` | `button[app-chip]`, `a[app-chip]` | nav, velocidad, filtros, modos del bench, presets |
| `Boton` | `button[app-boton]`, `a[app-boton]` | copiar, enviar, coreografiar, repetir |
| `Grupo` | `app-grupo` | el carril que envuelve a un conjunto de píldoras |
| `CampoBusqueda` | `app-campo-busqueda` | filtrar los curados en editor y picker |
| `Deslizador` | `app-deslizador` | el scrubber de la animación |
| `BurbujasAmbiente` | `app-burbujas-ambiente` | el fondo del hero de la portada |

## Las tres reglas

**1. Selector de atributo para lo que ES un botón.** `Chip` y `Boton` se aplican sobre el
`<button>`/`<a>` real, no lo envuelven. Así `routerLink`, `disabled`, `type` y el foco siguen
funcionando sin reponer nada. Un `<app-chip>` que envolviera un botón habría roto las cuatro cosas.

**El precio, y hay que conocerlo:** con selector de atributo, **si el consumidor olvida importar el
componente, Angular no dice nada**. No hay elemento desconocido que reportar — queda un `<button>`
pelado con estilos del navegador. Pasó durante la migración, en 4 archivos. Por eso las specs de
página afirman contra la clase que aplica el componente (`button.ui-boton`) y no contra el atributo
(`button[app-boton]`): la segunda casa aunque el cableado no exista.

**2. Los estilos base viven en `styles.css`, no en el componente.** Con encapsulación emulada, lo
que declara la primitiva no alcanza a lo que el consumidor pinta a su alrededor, y las páginas
necesitan poder decir «el botón DE ESTA tarjeta se atenúa». Reglas de contexto así se quedan en el
CSS de la página; la forma es de la primitiva.

**3. Las variantes son `@Input`, no clases sueltas.** `variante="primario"` en vez de
`class="boton primario grande"`. El conjunto de aspectos posibles queda cerrado y se lee en un solo
archivo, en vez de descubrirse combinando clases por las plantillas.

**4. `BurbujasAmbiente` pide dos cosas al que la aloja.** La primera: un **recorte horizontal en
un ancestro de ancho completo** (`overflow-x: clip`, como el de `app-root` en `app.css`). El host
va full-bleed a `100vw`, y eso incluye la scrollbar; sin el recorte hay scroll horizontal. Usa
`clip` y no `hidden`: `hidden` mata el `sticky` de la barra superior.

La segunda: que su contenedor tenga stacking context propio. El host del
componente ES la capa (`position: absolute; z-index: -1`), para no obligar a nadie a
envolverlo — pero ese `-1` solo se queda contenido dentro del contenedor si éste YA declara
`position: relative` + un z-index que no sea `auto`. Sin eso, el negativo se escapa hacia arriba
y pinta detrás de contenido de la página que no tiene nada que ver (la regla de z-index negativo
del proyecto). Ver `iconos.css`, regla `.hero`, para el ejemplo que ya lo hace bien.

## Qué NO subir aquí

Se quedaron abajo a propósito: el toggle de `Importar coreografía` (es un disclosure), el cerrar del
panel de detalle (icono solo, sin texto) y las opciones del picker (mosaicos con icono, no
píldoras). Tienen anatomía propia y un solo consumidor. **Una primitiva con un solo uso no es una
primitiva, es indirección.**
