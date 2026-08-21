/* eslint-disable @typescript-eslint/no-empty-function --
   Los métodos vacíos son el punto: esto es un stub de una API del navegador que jsdom no trae, y
   ningún test observa lo que hace — solo necesitan que exista y no truene al llamarse. */

/**
 * Global, para TODOS los specs — se ejecuta una vez antes de cada archivo (`--setup-files` en
 * `angular.json`). `boneyard-js` (el skeleton del conteo de GitHub en `BotonGithub`, que vive en
 * el header y por lo tanto en casi cualquier página) llama `ResizeObserver` en
 * `ngAfterViewInit` — jsdom no lo trae.
 *
 * Asignación DIRECTA, no `vi.stubGlobal`: un `vi.unstubAllGlobals()` en el `afterEach` de
 * CUALQUIER spec (varios ya lo hacen, para su propio `matchMedia`/`fetch`) revierte TODO lo
 * stubeado con `vi.stubGlobal` en el proceso — incluido esto, aunque lo haya puesto un archivo
 * de setup distinto. Con asignación directa esa limpieza no lo toca.
 *
 * `matchMedia` NO va aquí a propósito, aunque boneyard-js también lo usa: `core/transicion.spec.ts`
 * depende de que esté AUSENTE por default para probar la degradación sin soporte de navegador
 * (`Reflect.deleteProperty` en su `afterEach` lo confirma — espera encontrarlo indefinido en el
 * siguiente test). Los specs que sí lo necesitan (los que renderizan `BotonGithub`) lo piden
 * aparte con `stubMatchMedia()` de `core/test-polyfills.ts`.
 */
if (typeof globalThis.ResizeObserver === 'undefined') {
  (globalThis as unknown as { ResizeObserver: unknown }).ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}
