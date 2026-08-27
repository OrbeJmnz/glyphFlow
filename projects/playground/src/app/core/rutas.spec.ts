import { describe, expect, it } from 'vitest';
import { IDIOMAS } from './idioma';
import {
  alternativas,
  idiomaDeLaRuta,
  ruta,
  slug,
  SLUGS,
  traducirRuta,
  type RutaId,
} from './rutas';

describe('tabla de slugs', () => {
  it('cada página existe en los dos idiomas', () => {
    for (const [id, porIdioma] of Object.entries(SLUGS)) {
      for (const idioma of IDIOMAS) {
        expect(porIdioma[idioma], `${id} no tiene slug en ${idioma}`).toBeTypeOf('string');
      }
    }
  });

  it('ningún slug significa dos páginas distintas', () => {
    // El índice inverso de `traducirRuta` es un Map: dos ids con el mismo slug harían que el
    // segundo pisara al primero y el switcher mandaría a la página equivocada, en silencio.
    const visto = new Map<string, RutaId>();
    for (const [id, porIdioma] of Object.entries(SLUGS)) {
      for (const s of Object.values(porIdioma)) {
        if (!s) continue;
        const duenio = visto.get(s);
        expect(duenio ?? id, `el slug "${s}" lo reclaman ${duenio} y ${id}`).toBe(id);
        visto.set(s, id as RutaId);
      }
    }
  });
});

describe('ruta()', () => {
  it('prefija el idioma', () => {
    expect(ruta('en')).toBe('/en');
    expect(ruta('es')).toBe('/es');
    expect(ruta('en', 'patrones')).toBe('/en/examples');
    expect(ruta('es', 'patrones')).toBe('/es/ejemplos');
    expect(ruta('en', 'docs', 'empezando')).toBe('/en/docs/getting-started');
    expect(ruta('es', 'docs', 'empezando')).toBe('/es/docs/empezando');
  });

  it('solo traduce el slug cuando en el otro idioma es otra palabra', () => {
    for (const id of ['editor', 'lab', 'docs', 'ssr', 'api'] as RutaId[]) {
      expect(slug(id, 'en'), `${id} no debería tener dos slugs`).toBe(slug(id, 'es'));
    }
  });
});

describe('idiomaDeLaRuta()', () => {
  it('lee el prefijo, y null cuando no lo hay', () => {
    expect(idiomaDeLaRuta('/es/ejemplos')).toBe('es');
    expect(idiomaDeLaRuta('/en')).toBe('en');
    expect(idiomaDeLaRuta('/')).toBeNull();
    // Una ruta vieja, de antes del prefijo: no declara idioma aunque su slug esté en español.
    expect(idiomaDeLaRuta('/ejemplos')).toBeNull();
  });
});

describe('traducirRuta()', () => {
  it('conserva la página, el query y el fragmento', () => {
    expect(traducirRuta('/en/docs/getting-started', 'es')).toBe('/es/docs/empezando');
    expect(traducirRuta('/es/docs/accesibilidad#api-x', 'en')).toBe('/en/docs/accessibility#api-x');
    expect(traducirRuta('/en/examples?q=bell', 'es')).toBe('/es/ejemplos?q=bell');
  });

  it('la portada de un idioma es la portada del otro', () => {
    expect(traducirRuta('/en', 'es')).toBe('/es');
  });

  it('adopta una ruta vieja sin prefijo', () => {
    // Lo que hace el comodín del router en `ng serve`, donde no hay 301 de servidor.
    expect(traducirRuta('/ejemplos', 'en')).toBe('/en/examples');
    expect(traducirRuta('/docs/api', 'es')).toBe('/es/docs/api');
  });

  it('copia tal cual un segmento que no conoce, en vez de tragárselo', () => {
    expect(traducirRuta('/en/basura', 'es')).toBe('/es/basura');
  });

  it('traducir al mismo idioma no mueve nada', () => {
    for (const idioma of IDIOMAS) {
      const url = ruta(idioma, 'docs', 'accesibilidad');
      expect(traducirRuta(url, idioma)).toBe(url);
    }
  });
});

describe('alternativas()', () => {
  /** Las nueve páginas reales del sitio, por id. La portada es la lista vacía. */
  const PAGINAS: RutaId[][] = [
    [],
    ['patrones'],
    ['editor'],
    ['lab'],
    ['docs'],
    ['docs', 'empezando'],
    ['docs', 'accesibilidad'],
    ['docs', 'ssr'],
    ['docs', 'api'],
  ];

  it('son recíprocas: cada versión apunta a las dos, ida y vuelta', () => {
    // Es LA condición que pide Google para hermanar dos URLs. Si una de las dos no devolviera a la
    // otra, el grupo se descarta entero y las páginas compiten entre sí como duplicados.
    for (const idioma of IDIOMAS) {
      for (const pagina of PAGINAS) {
        const url = ruta(idioma, ...pagina);
        const alt = alternativas(url);
        expect(alt[idioma]).toBe(url);
        for (const otro of IDIOMAS) {
          expect(alternativas(alt[otro])[idioma]).toBe(url);
        }
      }
    }
  });
});
