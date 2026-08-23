import { describe, expect, it } from 'vitest';
import { ICON_TAGS } from 'glyphflow';
import tagsCatalogo from './tags-catalogo.json';

/**
 * `tags-catalogo.json` es una COPIA de los tags del paquete, y existe por una razón medida:
 * importar `ICON_TAGS` desde el sitio mete los tags en el bundle INICIAL, no en el chunk de la
 * página — el shell ya importa `glyphflow` estáticamente para el `<gf-icon>` del header, así que
 * referenciar cualquier export suyo lo ancla a la entrada. Medido: 147.90 → 181.10 kB de
 * transferencia, +33 kB gzip que paga TODO visitante, incluido el que nunca busca.
 *
 * El precio de esa copia es que puede quedarse atrás. Esto es lo que lo impide: corre en Node, así
 * que SÍ puede importar el paquete entero sin que eso viaje al cliente. Mismo trato que
 * `nombres-generados.spec.ts`.
 *
 * Si truena: `npm run gen:playground-tags`.
 */
describe('tags-catalogo.json — copia en sync con el paquete publicado', () => {
  const copia = tagsCatalogo as Record<string, string[]>;

  it('cubre exactamente los mismos iconos', () => {
    expect(Object.keys(copia).sort()).toEqual(Object.keys(ICON_TAGS).sort());
  });

  it('cada icono trae los mismos tags, en el mismo orden', () => {
    for (const [nombre, tags] of Object.entries(copia)) {
      expect(tags, `"${nombre}" difiere del paquete`).toEqual([...ICON_TAGS[nombre]]);
    }
  });

  it('ninguna lista está vacía', () => {
    for (const [nombre, tags] of Object.entries(copia)) {
      expect(tags.length, `"${nombre}" sin tags`).toBeGreaterThan(0);
    }
  });
});
