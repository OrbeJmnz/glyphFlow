/**
 * Escribe un bloque de datos estructurados en el `<head>`, identificado por su `ranura`: el de la página (`sitio`), el FAQ de Troubleshooting (`faq`)
 * o los pasos de Getting started (`howto`). Reusa el `<script>` de la ranura en vez de acumular uno por navegación (mismo criterio que `fijarMeta`), y
 * con `null` lo quita: una página que ya no tiene FAQ no puede seguir declarándolo.
 *
 * El `<` se escapa como `\u003c`: es JSON válido igual, y evita que un texto con `</script>` (las docs hablan de `<gf-icon>`) cierre el bloque.
 */
export function fijarJsonLd(doc: Document, ranura: string, datos: object | null): void {
  const existente = doc.head.querySelector<HTMLScriptElement>(`script[type="application/ld+json"][data-gf-ld="${ranura}"]`);
  if (!datos) {
    existente?.remove();
    return;
  }
  const script = existente ?? doc.createElement('script');
  if (!existente) {
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-gf-ld', ranura);
    doc.head.appendChild(script);
  }
  script.textContent = JSON.stringify(datos).replace(/</g, '\\u003c');
}
