import { describe, it, expect } from 'vitest';
import * as gf from 'glyphflow';
import * as gfMorph from 'glyphflow/morph';
import { API_TIPOS, API_VALORES, SUFIJO_ICONO, type Entrada } from './api-surface';
import docsEn from '../../../i18n/docs/en.json';
import docsEs from '../../../i18n/docs/es.json';

// Los tipos se erosionan en runtime, así que no hay forma de verificarlos con `Object.keys`. Se
// verifican AL COMPILAR: si uno de estos deja de existir en el paquete, este import no compila y el
// run entero falla. Es la misma garantía, movida al typecheck.
import type {
  AnimatedIconDef,
  AnimatedIconTrigger,
  AutoDraw,
  IconChoreography,
  IconMeta,
  IconShape,
  GfIconsConfig,
  MotionTrack,
} from 'glyphflow';
import type {
  MorphIcon,
  MorphKeyframes,
  MorphKeyframesOpts,
  RunMorphOpts,
  SpringConfig,
  SpringPreset,
  LiveMorph,
  LiveMorphOpts,
} from 'glyphflow/morph';

/** Referenciarlos evita que el linter los borre por "no usados" y convierta el check en nada. */
type TiposImportados = [
  AnimatedIconDef,
  AnimatedIconTrigger,
  AutoDraw,
  IconChoreography,
  IconMeta,
  IconShape,
  GfIconsConfig,
  MotionTrack,
  MorphIcon,
  MorphKeyframes,
  MorphKeyframesOpts,
  RunMorphOpts,
  SpringConfig,
  SpringPreset,
  LiveMorph,
  LiveMorphOpts,
];

const MODULOS: Record<Entrada, Record<string, unknown>> = {
  glyphflow: gf,
  'glyphflow/morph': gfMorph,
};

/** Lo que el paquete exporta de verdad, sin los ~1767 `xIcon` (esos se documentan en bloque). */
function exportsReales(entrada: Entrada): string[] {
  return Object.keys(MODULOS[entrada])
    .filter((k) => !SUFIJO_ICONO.test(k))
    .sort();
}

function documentados(entrada: Entrada): string[] {
  return API_VALORES.filter((s) => s.entrada === entrada)
    .map((s) => s.nombre)
    .sort();
}

describe('la referencia de API no puede mentir', () => {
  for (const entrada of ['glyphflow', 'glyphflow/morph'] as Entrada[]) {
    it(`${entrada}: cada símbolo documentado existe de verdad`, () => {
      const reales = new Set(exportsReales(entrada));
      const fantasmas = documentados(entrada).filter((n) => !reales.has(n));
      expect(fantasmas, 'documentados pero no exportados').toEqual([]);
    });

    // La dirección que de verdad se pudre con el tiempo: la librería crece y las docs se quedan.
    it(`${entrada}: cada símbolo exportado está documentado`, () => {
      const docs = new Set(documentados(entrada));
      const huerfanos = exportsReales(entrada).filter((n) => !docs.has(n));
      expect(huerfanos, 'exportados pero sin documentar').toEqual([]);
    });
  }

  it('los iconos se documentan como categoría, no uno por uno', () => {
    const iconos = Object.keys(gf).filter((k) => SUFIJO_ICONO.test(k));
    expect(iconos.length).toBeGreaterThan(1000);
    // Si alguien empezara a listarlos a mano en la tabla, esto lo caza.
    expect(API_VALORES.filter((s) => SUFIJO_ICONO.test(s.nombre))).toEqual([]);
  });

  it('cada entrada documentada trae resumen y no se repite', () => {
    const todos = [...API_VALORES.map((s) => s.nombre), ...API_TIPOS.map((t) => t.nombre)];
    expect(new Set(todos).size).toBe(todos.length);

    // `resumen` ya NO es el texto: es la clave de traducción (ver `api-surface.ts`). Medir SU
    // largo sería un falso positivo garantizado —`docs.api.simbolos.` solo ya son 18 caracteres,
    // así que cualquier clave inventada pasaría—. Lo que hay que verificar es que resuelva: un
    // símbolo nuevo sin su entrada en el JSON compila, pasa, y pinta la clave cruda en la página.
    // Se comprueba en los DOS idiomas porque cada uno es un archivo aparte que se puede olvidar.
    for (const [idioma, json] of [
      ['en', docsEn],
      ['es', docsEs],
    ] as const) {
      for (const s of [...API_VALORES, ...API_TIPOS]) {
        const texto = resolver(json, s.resumen);
        expect(texto, `${s.nombre}: ${s.resumen} no existe en docs/${idioma}.json`).toBeTypeOf(
          'string',
        );
        expect(texto!.length, `${s.nombre} sin resumen en ${idioma}`).toBeGreaterThan(10);
      }
    }
  });
});

/**
 * Resuelve `docs.api.simbolos.X` contra el JSON del scope. El primer segmento (`docs`) se descarta
 * a propósito: es el nombre del scope, y el JSON del scope NO lo repite adentro — Transloco lo
 * antepone por su cuenta al cargarlo (ver la convención de `autoPrefixKeys: false` en
 * `core/i18n.ts`). Devuelve `undefined` si la ruta no existe, que es justo el caso a cazar.
 */
function resolver(json: unknown, clave: string): string | undefined {
  const partes = clave.split('.').slice(1);
  let nodo: unknown = json;
  for (const parte of partes) {
    if (typeof nodo !== 'object' || nodo === null) return undefined;
    nodo = (nodo as Record<string, unknown>)[parte];
  }
  return typeof nodo === 'string' ? nodo : undefined;
}

export type { TiposImportados };
