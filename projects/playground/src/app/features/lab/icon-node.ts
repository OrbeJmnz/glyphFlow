import { AnimatedIconDef, IconShape } from 'glyphflow';

/**
 * `AnimatedIconDef` → data estilo Lucide (`[tag, attrs][]`), que es lo que come la API FUNCIONAL
 * de morph (`morphKeyframes`/`runMorph`).
 *
 * `<max-icon-morph>` no lo necesita — su input `MorphIcon` acepta el def tal cual y convierte
 * adentro. Esto es solo para cuando se llama a las funciones directo, típicamente para preguntar
 * una duración antes de animar.
 */
export function aIconNode(def: AnimatedIconDef): [string, Record<string, string | number>][] {
  return def.shapes.map((s: IconShape) => {
    const { tag, ...attrs } = s as IconShape & Record<string, unknown>;
    const limpio: Record<string, string | number> = {};
    for (const [k, v] of Object.entries(attrs)) {
      if (v !== undefined) limpio[k] = v as string | number;
    }
    return [tag, limpio];
  });
}
