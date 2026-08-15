import { ANIMATED_ICONS, ICON_ALIASES, ICON_META } from './animated-icons.registry';
import { CURATED_ICONS } from './curated-icons';
import { GENERATED_ICONS } from './generated-icons';
import iconNodes from 'lucide-static/icon-nodes.json';

/**
 * Cobertura del set COMPLETO de Lucide, no solo del lote canario. Corre contra
 * `lucide-static@1.31.0` (la misma versión fijada que usa el generador) — si algún día se
 * actualiza esa versión sin regenerar, estas specs son las que se dan cuenta.
 */
describe('Catálogo generado — cobertura completa', () => {
  const lucideNames = Object.keys(iconNodes);

  it('todo nombre canónico de Lucide resuelve en ANIMATED_ICONS', () => {
    for (const name of lucideNames) {
      expect(ANIMATED_ICONS[name], `"${name}" está en Lucide pero no en el catálogo`).toBeDefined();
    }
  });

  it('todo icono tiene metadata en ICON_META', () => {
    for (const name of Object.keys(ANIMATED_ICONS)) {
      expect(ICON_META[name], `"${name}" no tiene entrada en ICON_META`).toBeDefined();
      expect(ICON_META[name].curated).toBe(!!CURATED_ICONS[name]);
    }
  });

  it('ningún nombre de ICON_ALIASES (viejo) colisiona con un nombre canónico actual de Lucide', () => {
    // Si un nombre viejo de la app fuera TAMBIÉN un nombre canónico vigente, el generador le
    // habría creado su propia entrada — y esa entrada quedaría inalcanzable en la práctica,
    // porque resolveIconName() siempre redirige ese nombre al alias antes de buscar. No es un bug
    // que rompa nada, pero sería data muerta; se valida que no pase.
    for (const viejo of Object.keys(ICON_ALIASES)) {
      expect(
        lucideNames.includes(viejo),
        `"${viejo}" es un alias viejo pero TAMBIÉN es un nombre canónico vigente de Lucide`,
      ).toBe(false);
    }
  });

  it('generado y curado no se pisan — ninguna clave vive en los dos archivos', () => {
    const curatedKeys = new Set(Object.keys(CURATED_ICONS));
    for (const name of Object.keys(GENERATED_ICONS)) {
      expect(curatedKeys.has(name), `"${name}" está en generated-icons.ts Y en curated-icons.ts`).toBe(
        false,
      );
    }
  });

  it('el tamaño del catálogo compuesto es curados + generados, sin huecos ni duplicados', () => {
    const curatedCount = Object.keys(CURATED_ICONS).length;
    const generatedCount = Object.keys(GENERATED_ICONS).length;
    expect(Object.keys(ANIMATED_ICONS).length).toBe(curatedCount + generatedCount);
  });
});
