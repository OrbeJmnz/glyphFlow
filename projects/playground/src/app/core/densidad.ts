import { signal } from '@angular/core';

export type Densidad = 'compacta' | 'comoda';

const CLAVE = 'gf:grid-density';

function guardada(): Densidad | null {
  try {
    const v = localStorage.getItem(CLAVE);
    return v === 'compacta' || v === 'comoda' ? v : null;
  } catch {
    return null; // Modo privado o cookies bloqueadas: se arranca con el default y no se persiste.
  }
}

/**
 * Densidad de la rejilla del catálogo.
 *
 * Por defecto **compacta**: con 911 tarjetas, la cómoda deja ver 35 de golpe a 1920×1080 y
 * convierte el catálogo en un scroll interminable. Quien prefiera la vista amplia la elige una vez
 * y se le recuerda.
 *
 * Se lee en el módulo y no dentro de un efecto, por lo mismo que el tema: el valor tiene que estar
 * puesto antes del primer pintado, o se ve la rejilla saltar de un tamaño al otro al cargar.
 */
export const densidad = signal<Densidad>(guardada() ?? 'compacta');

export function elegirDensidad(d: Densidad): void {
  densidad.set(d);
  try {
    localStorage.setItem(CLAVE, d);
  } catch {
    // Sin storage la elección dura lo que la pestaña. Degradación aceptable, no un error.
  }
}
