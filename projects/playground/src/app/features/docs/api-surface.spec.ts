import { describe, it, expect } from 'vitest';
import * as gf from 'glyphflow';
import * as gfMorph from 'glyphflow/morph';
import { API_TIPOS, API_VALORES, SUFIJO_ICONO, type Entrada } from './api-surface';

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
  MaxIconsConfig,
  MotionTrack,
} from 'glyphflow';
import type {
  MorphIcon,
  MorphKeyframes,
  MorphKeyframesOpts,
  RunMorphOpts,
  SpringConfig,
  SpringPreset,
} from 'glyphflow/morph';

/** Referenciarlos evita que el linter los borre por "no usados" y convierta el check en nada. */
type TiposImportados = [
  AnimatedIconDef,
  AnimatedIconTrigger,
  AutoDraw,
  IconChoreography,
  IconMeta,
  IconShape,
  MaxIconsConfig,
  MotionTrack,
  MorphIcon,
  MorphKeyframes,
  MorphKeyframesOpts,
  RunMorphOpts,
  SpringConfig,
  SpringPreset,
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
    for (const s of [...API_VALORES, ...API_TIPOS]) {
      expect(s.resumen.length, `${s.nombre} sin resumen`).toBeGreaterThan(10);
    }
  });
});

export type { TiposImportados };
