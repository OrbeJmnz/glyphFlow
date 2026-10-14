import type { Idioma } from './idioma';
import type { RutaId } from './rutas';
import manifiesto from './fechas-docs.json';

/**
 * La fecha (AAAA-MM-DD) en que cambió por última vez el contenido de una página de Docs, o `undefined` si la ruta no es una de ellas.
 *
 * El JSON NO se edita a mano: lo escribe `scripts/gen-fechas-docs.ts` con un hash del contenido de cada página, y `verify:clean` falla si una doc
 * cambia y su fecha no. Por eso es seguro publicarla como `dateModified`: la fecha solo puede ser la de un cambio real.
 */
export const fechaDeDoc = (id: RutaId | undefined): string | undefined =>
  id ? (manifiesto as Readonly<Record<string, { fecha: string } | undefined>>)[id]?.fecha : undefined;

/**
 * «14 de octubre de 2026» / «October 14, 2026». En UTC a propósito: la fecha es un día de calendario sin hora, y en la zona local de quien
 * prerenderiza o de quien lee el 14 podría salir como el 13.
 */
export const fechaLegible = (iso: string, idioma: Idioma): string =>
  new Intl.DateTimeFormat(idioma, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`));
