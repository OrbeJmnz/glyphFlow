/**
 * El origen canónico del sitio. Constante y no `location.origin`, por dos razones que se ven solo
 * fuera del navegador:
 *
 * 1. **En el prerender no hay origen.** Angular monta un DOM con `http://ng-localhost`, así que
 *    leerlo de ahí publicaba `<link rel="canonical" href="http://ng-localhost/en">` en las 19
 *    páginas. Un canonical apuntando a un host que no existe es peor que no tenerlo: le dice al
 *    buscador que la página buena está en otro sitio, y ese sitio no responde.
 * 2. **Los previews de Vercel tienen origen propio.** Con `location.origin`, cada deploy de rama
 *    se anunciaría como canónico de sí mismo y competiría con producción por el mismo contenido.
 *
 * Si el sitio se muda de dominio, esto y `public/{robots.txt,sitemap.xml}` cambian juntos.
 */
export const ORIGEN = 'https://glyph-flow-zeta.vercel.app';
