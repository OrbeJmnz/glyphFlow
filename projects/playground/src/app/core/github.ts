import { signal } from '@angular/core';

/** Solo lo que se usa. Declarado como propiedad y no como índice: `noPropertyAccessFromIndexSignature`. */
interface RepoGh {
  stargazers_count: number;
}

const REPO = 'OrbeJmnz/glyphFlow';
export const URL_REPO = `https://github.com/${REPO}`;

const CLAVE_CACHE = 'gf:estrellas';
/** Seis horas. El conteo de estrellas no es un dato en vivo; nadie recarga para ver si subió una. */
const VIGENCIA_MS = 6 * 60 * 60 * 1000;

/**
 * Estrellas del repo. `null` = todavía no se sabe, o no se pudo saber.
 *
 * Es a propósito que el fallo no tenga estado propio: si la API no responde, el botón se queda
 * diciendo «GitHub» y ya. Un «error al cargar estrellas» en el header sería ruido sobre algo que a
 * nadie le importa tanto.
 */
export const estrellas = signal<number | null>(null);

interface Cache {
  n: number;
  ts: number;
}

function leerCache(): number | null {
  try {
    const crudo = sessionStorage.getItem(CLAVE_CACHE);
    if (!crudo) return null;
    const c = JSON.parse(crudo) as Cache;
    return Date.now() - c.ts < VIGENCIA_MS ? c.n : null;
  } catch {
    // JSON corrupto o storage bloqueado (modo privado). Se pide de nuevo y ya.
    return null;
  }
}

/**
 * Pide el conteo una vez por sesión.
 *
 * El caché en `sessionStorage` no es por velocidad: la API sin token va a **60 peticiones por hora
 * y por IP**, compartidas entre TODOS los visitantes detrás de la misma salida a internet. Sin
 * caché, una oficina navegando el sitio agota la cuota entre ellos y el resto ve el botón pelado.
 */
export async function cargarEstrellas(): Promise<void> {
  const guardado = leerCache();
  if (guardado !== null) {
    estrellas.set(guardado);
    return;
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}`, {
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (!res.ok) return; // 403 por cuota agotada, 404 si el repo se renombra: en ambos, silencio.

    const n = ((await res.json()) as RepoGh).stargazers_count;
    if (typeof n !== 'number') return;

    estrellas.set(n);
    try {
      sessionStorage.setItem(CLAVE_CACHE, JSON.stringify({ n, ts: Date.now() } satisfies Cache));
    } catch {
      // Sin storage el contador sigue funcionando, solo que se vuelve a pedir en la próxima carga.
    }
  } catch {
    // Sin red, o un bloqueador que corta api.github.com. No es un caso de error, es un caso normal.
  }
}

/**
 * `1234` → `1.2k`. Manual y no `Intl.NumberFormat`: el separador de `Intl` cambia con el locale del
 * visitante, así que el mismo número se vería distinto según quién entre y el test no podría fijarlo.
 */
export function formatearEstrellas(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k` : String(n);
}
