/**
 * Pila de deshacer/rehacer sobre estados inmutables.
 *
 * Genérica y sin Angular a propósito: la parte que se puede equivocar es la lógica de la pila, y
 * así se prueba sin montar un componente ni simular un arrastre.
 *
 * La decisión que importa es **cuándo se registra**. Un arrastre produce un estado por cada píxel
 * que se mueve el puntero; si cada uno entrara a la pila, deshacer una vez retrocedería un píxel y
 * el usuario tendría que dar Ctrl+Z cincuenta veces para volver a donde estaba. Por eso hay un
 * gesto explícito — `abrir()` al empezar, `cerrar()` al soltar — y todo lo de en medio se funde en
 * una sola entrada.
 */
export interface Historial<T> {
  /** Marca el inicio de un gesto: guarda el estado de ANTES, sin registrarlo todavía. */
  abrir(estado: T): void;
  /** Cierra el gesto. Solo registra si de verdad cambió algo. */
  cerrar(estadoFinal: T): void;
  /** Registra un cambio atómico, sin gesto de por medio (un botón, por ejemplo). */
  registrar(anterior: T): void;
  deshacer(actual: T): T | null;
  rehacer(actual: T): T | null;
  /** Tira todo. Se usa al cambiar de icono: el historial del anterior no aplica. */
  limpiar(): void;
  readonly puedeDeshacer: () => boolean;
  readonly puedeRehacer: () => boolean;
}

/**
 * @param tope cuántos pasos se recuerdan. Acotado a propósito: cada entrada es una copia del
 * modelo completo, y un editor abierto media hora no debería crecer sin límite.
 */
export function crearHistorial<T>(
  tope = 50,
  iguales: (a: T, b: T) => boolean = (a, b) => a === b,
): Historial<T> {
  let pasado: T[] = [];
  let futuro: T[] = [];
  let enGesto: { antes: T } | null = null;

  const empujar = (estado: T) => {
    pasado.push(estado);
    if (pasado.length > tope) pasado = pasado.slice(pasado.length - tope);
    // Rehacer deja de tener sentido en cuanto se toma un camino nuevo.
    futuro = [];
  };

  return {
    abrir(estado) {
      enGesto = { antes: estado };
    },
    cerrar(estadoFinal) {
      if (!enGesto) return;
      const { antes } = enGesto;
      enGesto = null;
      // Un click que no arrastró nada no ensucia la pila.
      if (!iguales(antes, estadoFinal)) empujar(antes);
    },
    registrar(anterior) {
      empujar(anterior);
    },
    deshacer(actual) {
      const previo = pasado.pop();
      if (previo === undefined) return null;
      futuro.push(actual);
      return previo;
    },
    rehacer(actual) {
      const siguiente = futuro.pop();
      if (siguiente === undefined) return null;
      pasado.push(actual);
      return siguiente;
    },
    limpiar() {
      pasado = [];
      futuro = [];
      enGesto = null;
    },
    puedeDeshacer: () => pasado.length > 0,
    puedeRehacer: () => futuro.length > 0,
  };
}
