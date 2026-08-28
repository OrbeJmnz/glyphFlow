import { computed, signal } from '@angular/core';
import type { EstadoEditor } from './estado-url';

/**
 * «Mis borradores» (T31 · nivel 2): lo que se está editando, guardado en ESTE navegador.
 *
 * Sin cuenta y sin servidor, que es la decisión del brief y no una limitación: meter login
 * implicaría heredar para siempre autenticación, almacenamiento, moderación y soporte sobre un
 * proyecto de una persona cuyo objetivo es que la gente ejecute `npm i`.
 *
 * Lo que se guarda es lo MISMO que viaja en el enlace —icono y trazos—, a propósito: un borrador y
 * un enlace compartido son el mismo dato con dos formas de llegar, y dos formatos distintos se
 * habrían separado en cuanto uno de los dos creciera.
 *
 * El alcance hay que DECIRLO en la interfaz: viven en este navegador y se van al limpiar los datos
 * del sitio. Un «guardado» que el usuario entiende como permanente y no lo es se descubre cuando
 * ya no está.
 */
export interface Borrador extends EstadoEditor {
  /** Estable, para renombrar sin perder de vista cuál es. No se enseña. */
  id: string;
  /** Lo pone el usuario; si no, el nombre del icono. */
  nombre: string;
  /** Milisegundos. Ordena la lista: lo último tocado, arriba. */
  guardado: number;
}

const CLAVE = 'gf:drafts';
/**
 * Un tope, y bajo. `localStorage` da unos 5 MB por origen y se comparte con el tema, el idioma y
 * la densidad: llenarlo de borradores rompería lo demás, y sin aviso, porque escribir de más
 * lanza `QuotaExceededError` en la siguiente escritura, no en la que se pasó.
 */
export const MAX_BORRADORES = 24;

function leer(): Borrador[] {
  try {
    const crudo = localStorage.getItem(CLAVE);
    if (!crudo) return [];
    const datos: unknown = JSON.parse(crudo);
    if (!Array.isArray(datos)) return [];
    // Validado uno a uno: el storage es de quien tenga el navegador y puede haberlo tocado a mano,
    // o haberlo escrito una versión anterior con otra forma.
    return datos.filter(
      (b): b is Borrador =>
        !!b &&
        typeof b === 'object' &&
        typeof (b as Borrador).id === 'string' &&
        typeof (b as Borrador).nombre === 'string' &&
        typeof (b as Borrador).icono === 'string' &&
        Array.isArray((b as Borrador).paths) &&
        (b as Borrador).paths.every((p) => typeof p === 'string'),
    );
  } catch {
    // Sin storage (modo privado, cookies bloqueadas) o JSON roto: no hay borradores y ya. No es un
    // error que reportar — es una función que este navegador no ofrece.
    return [];
  }
}

/**
 * Estado compartido a nivel de módulo, no un servicio inyectable: no depende de nada de Angular y
 * así el editor y cualquier otra pantalla ven la MISMA lista sin pasarla por providers.
 */
const _lista = signal<Borrador[]>(leer());

/**
 * El sello de tiempo, garantizado ESTRICTAMENTE CRECIENTE.
 *
 * `Date.now()` a secas no basta, y no es teoría: guardar dos borradores dentro del mismo
 * milisegundo pasa con dos clics rápidos, y entonces el orden entre ellos queda indeterminado — la
 * lista los enseña en cualquier orden y, peor, al llegar al tope el recorte podía llevarse el
 * equivocado. Lo destapó su propio test.
 *
 * Se siembra con el máximo ya guardado: si no, tras recargar los sellos nuevos podrían caer por
 * debajo de los viejos y un borrador recién tocado aparecería al final de la lista.
 */
let ultimoSello = _lista().reduce((max, b) => Math.max(max, b.guardado), 0);

function sello(): number {
  const ahora = Date.now();
  ultimoSello = ahora > ultimoSello ? ahora : ultimoSello + 1;
  return ultimoSello;
}

/** Los borradores, del más reciente al más viejo. */
export const borradores = computed(() =>
  [..._lista()].sort((a, b) => b.guardado - a.guardado),
);

export const hayBorradores = computed(() => _lista().length > 0);

function persistir(lista: Borrador[]): void {
  _lista.set(lista);
  try {
    localStorage.setItem(CLAVE, JSON.stringify(lista));
  } catch {
    // Cuota llena o storage bloqueado. La señal ya está al día, así que la sesión sigue viendo su
    // borrador; lo que no sobrevive es el recargado. Perder eso en silencio es preferible a
    // reventar el gesto que el usuario acaba de hacer.
  }
}

/** Crea uno nuevo. Devuelve su id para poder seguir apuntando a él. */
export function guardarBorrador(estado: EstadoEditor, nombre?: string): string {
  const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
  const nuevo: Borrador = {
    id,
    nombre: nombre?.trim() || estado.icono,
    icono: estado.icono,
    paths: estado.paths,
    guardado: sello(),
  };
  // El más viejo cae al llegar al tope. Cae el MÁS VIEJO por fecha de guardado y no el último de
  // la lista: la lista se ordena para verse, y ordenarla no debería decidir qué se borra.
  const lista = [..._lista(), nuevo]
    .sort((a, b) => b.guardado - a.guardado)
    .slice(0, MAX_BORRADORES);
  persistir(lista);
  return id;
}

/** Sobrescribe uno existente. Si el id ya no está, no hace nada — pudo borrarlo otra pestaña. */
export function actualizarBorrador(id: string, estado: EstadoEditor): void {
  const lista = _lista().map((b) =>
    b.id === id ? { ...b, icono: estado.icono, paths: estado.paths, guardado: sello() } : b,
  );
  persistir(lista);
}

export function renombrarBorrador(id: string, nombre: string): void {
  const limpio = nombre.trim();
  if (!limpio) return;
  persistir(_lista().map((b) => (b.id === id ? { ...b, nombre: limpio } : b)));
}

export function borrarBorrador(id: string): void {
  persistir(_lista().filter((b) => b.id !== id));
}
