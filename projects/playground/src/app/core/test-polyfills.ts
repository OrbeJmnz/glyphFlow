/* eslint-disable @typescript-eslint/no-empty-function --
   Los métodos vacíos son el punto: esto es un stub de una API del navegador que jsdom no trae, y
   ningún test observa lo que hace — solo necesitan que exista y no truene al llamarse. */

import { vi } from 'vitest';

/**
 * `boneyard-js` (el skeleton del conteo de GitHub, ver `shared/marca/boton-github.ts`) llama
 * `window.matchMedia` en `ngAfterViewInit` — jsdom no lo trae por default.
 *
 * A diferencia de `ResizeObserver` (stubeado global en `test-setup.ts`), este NO puede ser
 * global: `core/transicion.spec.ts` depende de que `matchMedia` esté AUSENTE por default para
 * probar la degradación sin soporte de navegador. Solo lo piden los specs que renderizan
 * `BotonGithub` — llama esto en su `beforeEach` y `vi.unstubAllGlobals()` en su `afterEach`.
 */
export function stubMatchMedia(): void {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }));
}
