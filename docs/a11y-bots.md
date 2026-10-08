# Accesibilidad de `/bots` — reporte

- **Fecha:** 2026-10-08 · **Perfil:** Standard (WCAG 2.2 AA) · **Alcance:** la página `/bots` y el shell que la rodea.
- **Veredicto: CONDITIONAL.** Todo lo verificable sin humano pasa; falta la prueba con lector de pantalla (obligatoria siempre).
- **Verificación independiente: self-reported ⚠️.** Quien arregló es quien midió, con axe-core 4.x como testigo mecánico. Tope CONDITIONAL hasta que otra persona o agente con contexto limpio reproduzca las mediciones.

## Qué se midió (y cómo)

| Comprobación | Cómo | Resultado |
| --- | --- | --- |
| axe (WCAG 2.0/2.1/2.2 A+AA + best-practice) | axe-core inyectado en la página real, carga limpia | 0 violaciones en las tres: EN claro 1280 y ES oscuro 1280 (también 0 pendientes), y EN oscuro 800 (4 «incompletas» de contraste, resueltas a mano en la fila siguiente) |
| Contraste de los chips de gesto (axe lo dejó «incompleto» por solapamiento) | A mano, mezclando alfa contra el fondo | 5.9:1 en oscuro (mín. 4.5) |
| Reflow a 320 px (SC 1.4.10) | `scrollWidth` + rectángulos de cada hijo | Limpio tras el arreglo; antes el chat se salía 8 px y la raíz (`overflow-x: clip`) lo recortaba sin scroll |
| Orden de Tab | Lista de enfocables en orden de DOM | Sin `tabindex` positivos; orden = orden visual |
| Anillo de foco | Teclas Tab reales (el foco programático no activa `:focus-visible`) | 2 px sólido, tokenizado, visible en chips |
| Foco al enviar un mensaje (SC 2.4.3) | Foco + clic + `document.activeElement` | Antes caía a `<body>`; ahora se queda en el botón |
| Movimiento apagado desde el encabezado | Interruptor del sitio | La región `role="status"` persiste y cambia de texto; gestos y envío quedan deshabilitados |

## Hallazgos arreglados

1. 🟠 **Foco perdido al enviar.** `@if/@else` destruía «Send» y creaba «Stop»; el foco caía al `<body>`. Ahora es UN botón que cambia de etiqueta y de acción. Trampa medida: `(click)="ejecutando() && detener()"` evalúa a `false`, y **Angular llama `preventDefault()` cuando un manejador devuelve `false`**: cancelaba el submit del formulario. Va con ternario.
2. 🟠 **Pérdida de contenido a 320 px (SC 1.4.10).** Las pistas de grid `auto` se estiraban al min-content del chat. `minmax(0, 1fr)` en `.bt-mesa`, `.bt-columna` y `.bt-panel`, más `min-width: 0`.
3. 🟠 **Label in Name (SC 2.5.3) en el encabezado, todas las páginas.** El botón de GitHub decía «Star on GitHub» y su nombre accesible «Star glyphflow on GitHub»; el de idioma mostraba «EN» y se llamaba «Switch language». Los nombres ahora contienen el texto visible (también en ES).
4. 🟡 **Región de estado insertada dinámicamente.** `role="status"` se creaba con el texto ya dentro, y eso no se anuncia de forma fiable. Ahora el contenedor vive siempre en el DOM.
5. 🟡 **Log del chat con respuesta en streaming.** `aria-busy` mientras corre, para que el lector no repita la frase token a token.

## Decisiones (formato A11Y-DECISIONS)

- **Un solo botón Enviar/Detener** en vez de dos que se intercambian: preserva la identidad del nodo y con ella el foco. El cambio de nombre lo anuncia el lector al estar enfocado.
- **Con el movimiento apagado, los gestos y el envío se deshabilitan** (decisión previa de la página, no tocada aquí). Es defendible porque el bot ES la animación y el interruptor es del usuario; el aviso lo explica en una región de estado.

## Pendiente — no verificado

- [ ] **Lector de pantalla** (NVDA/VoiceOver): que «Stop/Send», el log con `aria-busy` y la región de estado se anuncien como se espera. Lo corre una persona.
- [ ] **Verificación independiente** de las mediciones de arriba (otro agente o persona).
- [ ] **`prefers-reduced-motion` del SISTEMA:** se probó el interruptor del sitio, no la media query del sistema operativo (la herramienta del navegador no la emula).
- [ ] **Zoom 200 % real del navegador** (se cubrió con reflow a 320 px, que es más estricto).
- [ ] **Tema claro a 320 px y a 800 px**, y ES en claro: solo se midió la combinación indicada arriba.
- [ ] Los **targets de 32 px de alto** de los chips cumplen el mínimo AA (24 px) pero no la regla de la casa de 44 px.
