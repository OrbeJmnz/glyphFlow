import { AnimatedIconDef, IconShape } from 'glyphflow';
import { canonicalD, type MorphIcon } from 'glyphflow/morph';

/**
 * Aplana un icono de N figuras a UN solo path, para morphear contra un destino con menos figuras
 * sin la asignación surjectiva del plan (`buildPlan` en el core: con p≠q, varias figuras de
 * ORIGEN se reparten sobre el MISMO destino — "cell division" — y a media transición se ven
 * cruzándose antes de fundirse recién en t=1). Con 1 figura contra 1, el plan resuelve con una
 * sola similaridad Procrustes: sin qué cruzarse.
 *
 * Caso real: `copyIcon` (rect + path, 2 figuras) morfeando contra `checkIcon` (1 sola) — el
 * defecto que se ve en /patrones y en el drawer de detalle. `iconoPlano(copyIcon)` en el origen
 * deja el par en 1↔1.
 */
export function iconoPlano(def: AnimatedIconDef): MorphIcon {
  return {
    viewBox: def.viewBox,
    shapes: [{ tag: 'path', d: canonicalD(aTuplas(def.shapes)) }],
  };
}

/** `IconShape[]` (forma objeto, `{tag, ...attrs}`) → data estilo Lucide (`[tag, attrs][]`), que
 *  es lo que el core de morph consume. Mismo mapeo que usa `GfIconMorphComponent` puertas
 *  adentro para su propio `[icon]` — no expuesto, así que se repite aquí en vez de importarlo. */
function aTuplas(shapes: IconShape[]) {
  return shapes.map((s) => {
    const { tag, ...attrs } = s as IconShape & Record<string, unknown>;
    const limpio: Record<string, string | number> = {};
    for (const [k, v] of Object.entries(attrs)) {
      if (v !== undefined) limpio[k] = v as string | number;
    }
    return [tag, limpio] as const;
  });
}
