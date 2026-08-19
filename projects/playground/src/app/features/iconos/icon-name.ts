/**
 * `refresh-cw` → `refreshCwIcon`. La convención real de `curated-icons.ts` (verificada contra los
 * 180 nombres del catálogo, ninguno se sale de `[a-z0-9-]`), no una regla inventada — así el
 * snippet que genera el panel de detalle es código que de verdad compila si se copia y pega.
 */
export function nombreDeConst(kebab: string): string {
  return kebab.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase()) + 'Icon';
}
