import { ANIMATED_ICONS, ICON_ALIASES, ICON_META } from './animated-icons.registry';
import { CURATED_ICONS } from './curated-icons';
import { GENERATED_ICONS } from './generated-icons';
import { ICON_TAGS } from './icon-tags';
import { ICON_VARIANTS } from './icon-variants';
import iconNodes from 'lucide-static/icon-nodes.json';
import lucideTags from 'lucide-static/tags.json';

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

  /**
   * `IconMeta.tags` está declarado REQUERIDO, así que el tipo promete que siempre hay al menos uno.
   * Esto es lo que hace que la promesa sea cierta en vez de optimista: sin ancla, un icono nuevo de
   * Lucide sin tags le entregaría `undefined` a quien confió en el tipo, y el síntoma aparecería en
   * el consumidor —un `.filter is not a function`— a un catálogo entero de distancia de la causa.
   *
   * El generador ya aborta ante lo mismo; esto lo verifica sobre el archivo YA ESCRITO, que es
   * donde importa: alguien pudo haberlo editado a mano pese al cartel, o haber actualizado
   * `lucide-static` sin regenerar (que es justo lo que estas specs vigilan).
   */
  it('todo icono trae al menos un tag, en ICON_TAGS y en su metadata', () => {
    for (const name of Object.keys(ANIMATED_ICONS)) {
      expect(ICON_TAGS[name], `"${name}" no tiene entrada en ICON_TAGS`).toBeDefined();
      expect(ICON_TAGS[name].length, `"${name}" tiene la lista de tags vacía`).toBeGreaterThan(0);
      expect(ICON_META[name].tags, `"${name}": ICON_META y ICON_TAGS no coinciden`).toBe(
        ICON_TAGS[name],
      );
    }
  });

  it('ICON_TAGS no inventa iconos que el catálogo no tiene', () => {
    // La otra dirección. Un sobrante no rompe nada hoy, pero significa que el archivo generado y el
    // catálogo dejaron de venir de la misma corrida — y eso sí acaba en un buscador que ofrece
    // resultados que no se pueden pintar.
    for (const name of Object.keys(ICON_TAGS)) {
      expect(
        ANIMATED_ICONS[name],
        `"${name}" está en ICON_TAGS pero no en el catálogo`,
      ).toBeDefined();
    }
  });

  it('los tags coinciden con los que publica lucide-static, no con una copia que derivó', () => {
    const publicados = lucideTags as Record<string, string[]>;
    for (const name of Object.keys(ICON_TAGS)) {
      expect([...ICON_TAGS[name]], `"${name}" tiene tags distintos a los de lucide-static`).toEqual(
        publicados[name],
      );
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

  /**
   * Mismo invariante que ya fuerza `tags`, aplicado a variantes: `IconMeta.variants` es requerido,
   * así que el tipo promete al menos una. `draw` la inyecta `icon()` siempre de primera (ver
   * choreography.ts), así que su ausencia significaría que algo construyó el registro sin pasar
   * por ese helper.
   */
  it('todo icono trae al menos una variante, en ICON_VARIANTS y en su metadata, y siempre incluye draw', () => {
    for (const name of Object.keys(ANIMATED_ICONS)) {
      expect(ICON_VARIANTS[name], `"${name}" no tiene entrada en ICON_VARIANTS`).toBeDefined();
      expect(ICON_VARIANTS[name].length, `"${name}" tiene la lista de variantes vacía`).toBeGreaterThan(0);
      expect(ICON_VARIANTS[name], `"${name}" no incluye la variante draw`).toContain('draw');
      expect(ICON_META[name].variants, `"${name}": ICON_META y ICON_VARIANTS no coinciden`).toBe(
        ICON_VARIANTS[name],
      );
    }
  });

  it('ICON_VARIANTS coincide con las claves reales de animations en el registro — no una copia que derivó', () => {
    for (const name of Object.keys(ANIMATED_ICONS)) {
      expect(
        [...ICON_VARIANTS[name]].sort(),
        `"${name}" tiene variantes distintas a Object.keys(animations)`,
      ).toEqual(Object.keys(ANIMATED_ICONS[name].animations).sort());
    }
  });

  it('ICON_VARIANTS no inventa iconos que el catálogo no tiene', () => {
    for (const name of Object.keys(ICON_VARIANTS)) {
      expect(
        ANIMATED_ICONS[name],
        `"${name}" está en ICON_VARIANTS pero no en el catálogo`,
      ).toBeDefined();
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
