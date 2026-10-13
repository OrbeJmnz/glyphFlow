import { afterEach, describe, expect, it } from 'vitest';
import { aTexto, faqDe, grafoDeLaPagina, howToDe, NPM_URL, REPO_URL, sinMarca } from './datos-estructurados';
import { fijarJsonLd } from './json-ld';
import { idsDeLaRuta } from './rutas';
import { ORIGEN } from './sitio';

type Nodo = Record<string, unknown> & { '@type': string };
const grafo = (g: object | null): Nodo[] => (g as { '@graph': Nodo[] })['@graph'];
const tipo = (g: object | null, t: string): Nodo => grafo(g).find((n) => n['@type'] === t)!;

const base = { version: '3.3.0', descripcion: 'Una descripción.' };

describe('idsDeLaRuta', () => {
  it('resuelve los segmentos de una página real, en su idioma', () => {
    expect(idsDeLaRuta('/en')).toEqual([]);
    expect(idsDeLaRuta('/es/docs/empezando')).toEqual(['docs', 'empezando']);
    expect(idsDeLaRuta('/en/lab/face-lab')).toEqual(['lab', 'faceLab']);
  });

  it('no es una página: sin prefijo, segmento desconocido o slug del otro idioma', () => {
    expect(idsDeLaRuta('/docs/api')).toBeNull();
    expect(idsDeLaRuta('/en/no-existe')).toBeNull();
    expect(idsDeLaRuta('/es/docs/getting-started')).toBeNull();
  });
});

describe('grafoDeLaPagina', () => {
  it('la portada declara el sitio, el paquete, el autor, la página y una sola miga sin enlace', () => {
    const g = grafoDeLaPagina({ ...base, idioma: 'en', camino: '/en', titulo: 'glyphflow — 1767 animated icons', nombres: {} });
    expect(grafo(g).map((n) => n['@type'])).toEqual(['WebSite', 'SoftwareSourceCode', 'Person', 'WebPage', 'BreadcrumbList']);
    const migas = tipo(g, 'BreadcrumbList')['itemListElement'] as Record<string, unknown>[];
    expect(migas).toHaveLength(1);
    expect(migas[0]['item']).toBeUndefined();
    expect(tipo(g, 'WebPage')['url']).toBe(`${ORIGEN}/en`);
  });

  it('una página de docs es un TechArticle con su URL, su idioma y las migas Inicio › Docs › página', () => {
    const g = grafoDeLaPagina({
      ...base,
      idioma: 'es',
      camino: '/es/docs/empezando',
      titulo: 'Empezando — glyphflow',
      nombres: { docs: 'Docs', docsEmpezando: 'Empezando — glyphflow' },
    });
    const pagina = tipo(g, 'TechArticle');
    expect(pagina['url']).toBe(`${ORIGEN}/es/docs/empezando`);
    expect(pagina['inLanguage']).toBe('es');
    expect(pagina['headline']).toBe('Empezando');
    const migas = tipo(g, 'BreadcrumbList')['itemListElement'] as Record<string, unknown>[];
    expect(migas.map((m) => m['name'])).toEqual(['glyphflow', 'Docs', 'Empezando']);
    expect(migas.map((m) => m['position'])).toEqual([1, 2, 3]);
    // «Docs» no tiene portada: su miga lleva a la primera página de la sección. La última (la actual) no lleva `item`.
    expect(migas[1]['item']).toBe(`${ORIGEN}/es/docs/empezando`);
    expect(migas[2]['item']).toBeUndefined();
  });

  it('el paquete lleva la versión y sameAs de GitHub y npm; no inventa fechas', () => {
    const g = grafoDeLaPagina({ ...base, idioma: 'en', camino: '/en/bots', titulo: 'Bots — glyphflow', nombres: {} });
    const paquete = tipo(g, 'SoftwareSourceCode');
    expect(paquete['version']).toBe('3.3.0');
    expect(paquete['sameAs']).toEqual([REPO_URL, NPM_URL]);
    expect(JSON.stringify(g)).not.toMatch(/datePublished|dateModified/);
  });

  it('no declara nada en una URL que no es una página (el 404)', () => {
    expect(grafoDeLaPagina({ ...base, idioma: 'en', camino: '/en/no-existe', titulo: 'x', nombres: {} })).toBeNull();
  });
});

describe('texto y bloques de respuesta', () => {
  it('aTexto quita marcas y decodifica entidades', () => {
    expect(aTexto('Angular <strong>20</strong> (<code>&gt;=20 &lt;23</code>) &amp; más')).toBe('Angular 20 (>=20 <23) & más');
  });

  it('sinMarca deja el nombre de la página sin el sufijo de la marca', () => {
    expect(sinMarca('Bots — glyphflow')).toBe('Bots');
    // El formato largo de los títulos (`Nombre — frase | glyphflow`) no alarga el nombre de la miga ni el `headline`.
    expect(sinMarca('Bots — animated characters for Angular | glyphflow')).toBe('Bots');
  });

  it('faqDe arma preguntas y respuestas con lo que ya dice la página, y es null si no hay nada', () => {
    const f = faqDe('en', '/en/docs/troubleshooting', [
      { pregunta: '<code>name=</code> renders nothing', respuesta: ['Uno.', 'Dos <em>y</em> tres.'] },
      { pregunta: '', respuesta: ['sin pregunta'] },
    ]) as { mainEntity: { name: string; acceptedAnswer: { text: string } }[] };
    expect(f.mainEntity).toHaveLength(1);
    expect(f.mainEntity[0].name).toBe('name= renders nothing');
    expect(f.mainEntity[0].acceptedAnswer.text).toBe('Uno. Dos y tres.');
    expect(faqDe('en', '/en/x', [])).toBeNull();
  });

  it('howToDe numera los pasos y descarta los vacíos', () => {
    const h = howToDe('es', '/es/docs/empezando', 'Empezando', 'Instalar.', [
      { nombre: 'Instalar', texto: 'npm i glyphflow' },
      { nombre: 'Vacío', texto: '' },
      { nombre: 'Primer icono', texto: 'Importa <code>bellIcon</code>.' },
    ]) as { step: { position: number; name: string; text: string }[] };
    expect(h.step.map((s) => [s.position, s.name])).toEqual([
      [1, 'Instalar'],
      [2, 'Primer icono'],
    ]);
    expect(h.step[1].text).toBe('Importa bellIcon.');
  });
});

describe('fijarJsonLd', () => {
  afterEach(() => {
    document.head.querySelectorAll('script[data-gf-ld]').forEach((s) => s.remove());
  });

  it('reusa el script de la ranura en vez de acumular uno por navegación, y con null lo quita', () => {
    fijarJsonLd(document, 'faq', { a: 1 });
    fijarJsonLd(document, 'faq', { a: 2 });
    const scripts = document.head.querySelectorAll('script[data-gf-ld="faq"]');
    expect(scripts).toHaveLength(1);
    expect(JSON.parse(scripts[0].textContent ?? '')).toEqual({ a: 2 });
    fijarJsonLd(document, 'faq', null);
    expect(document.head.querySelectorAll('script[data-gf-ld="faq"]')).toHaveLength(0);
  });

  it('escapa el `<` para que un texto con </script> no cierre el bloque, y sigue siendo JSON válido', () => {
    fijarJsonLd(document, 'faq', { texto: 'usa <gf-icon></script>' });
    const crudo = document.head.querySelector('script[data-gf-ld="faq"]')!.textContent ?? '';
    expect(crudo).not.toContain('<');
    expect(JSON.parse(crudo)).toEqual({ texto: 'usa <gf-icon></script>' });
  });
});
