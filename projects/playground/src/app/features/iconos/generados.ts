import { AnimatedIconDef, GENERATED_ICONS } from 'glyphflow';

/**
 * Los 856 generados, en su PROPIO módulo y no dentro de `iconos.ts`.
 *
 * No es organización: es lo único que hace que se separen. `iconos.ts` ya importa `glyphflow` de
 * forma estática, así que un `import('glyphflow')` desde ahí no separa nada — el bundler mete la
 * geometría en el chunk que ya tenía. Aislado aquí, `GENERATED_ICONS` solo lo alcanza este módulo,
 * y esa es la condición para que acabe en un chunk aparte.
 *
 * Medido: sin esta separación el bundle inicial pasaba de 867 kB a 1.09 MB y reventaba el
 * presupuesto duro de 1 MB.
 */
export interface EntradaGenerada {
  name: string;
  def: AnimatedIconDef;
}

export function generados(): EntradaGenerada[] {
  return Object.entries(GENERATED_ICONS).map(([name, def]) => ({
    name,
    def: def as AnimatedIconDef,
  }));
}
