import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { estrellas } from '../../core/github';
import { providersI18nTest } from '../../core/i18n-testing';
import { stubMatchMedia } from '../../core/test-polyfills';
import { BotonGithub } from './boton-github';

describe('BotonGithub', () => {
  beforeEach(() => {
    estrellas.set(null);
    // boneyard-js (el skeleton del `.conteo`) usa `matchMedia` — ver `test-polyfills.ts` para el
    // porqué no puede ser un stub global. `ResizeObserver` sí lo es, en `test-setup.ts`.
    stubMatchMedia();
    TestBed.configureTestingModule({ imports: [providersI18nTest()] });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  function montar() {
    const fixture = TestBed.createComponent(BotonGithub);
    fixture.detectChanges();
    const html = fixture.nativeElement as HTMLElement;
    return { fixture, enlace: html.querySelector('a.gh')!, html };
  }

  it('apunta al repo y no filtra el referente', () => {
    const { enlace } = montar();
    expect(enlace.getAttribute('href')).toBe('https://github.com/OrbeJmnz/glyphFlow');
    // `noreferrer` además de `noopener`: con `target="_blank"` es lo que evita mandar de dónde vino.
    expect(enlace.getAttribute('rel')).toContain('noopener');
    expect(enlace.getAttribute('rel')).toContain('noreferrer');
    expect(enlace.getAttribute('target')).toBe('_blank');
  });

  it('sin conteo no inventa un cero', () => {
    const { html, enlace } = montar();
    // Un `0` diría «este repo no le gusta a nadie»; no saberlo y decir 0 no es lo mismo.
    expect(html.querySelector('.conteo')).toBeNull();
    expect(enlace.getAttribute('aria-label')).toBe('Star glyphflow on GitHub');
  });

  it('a la vista abrevia, pero la etiqueta lleva el número entero', () => {
    const { fixture, html, enlace } = montar();
    estrellas.set(1240);
    fixture.detectChanges();

    // «1.2k estrellas» no es algo que un lector de pantalla pueda decir bien.
    expect(html.querySelector('.conteo')?.textContent?.trim()).toBe('1.2k');
    expect(enlace.getAttribute('aria-label')).toBe('Star glyphflow on GitHub, 1240 stars');
  });

  it('concuerda el singular con una sola estrella', () => {
    const { fixture, enlace } = montar();
    estrellas.set(1);
    fixture.detectChanges();
    expect(enlace.getAttribute('aria-label')).toContain('1 star');
    expect(enlace.getAttribute('aria-label')).not.toContain('1 stars');
  });

  it('las dos capas del icono existen y quedan fuera del árbol de accesibilidad', () => {
    const { html } = montar();
    // El movimiento es puro CSS; lo que un test puede afirmar es que las piezas están y que no
    // ensucian lo que oye un lector de pantalla — el nombre ya lo da el `aria-label` del enlace.
    expect(html.querySelector('.capa-marca svg')).not.toBeNull();
    expect(html.querySelector('.capa-estrella max-icon')).not.toBeNull();
    expect(html.querySelector('.destello svg')).not.toBeNull();
    expect(html.querySelector('.capas')?.getAttribute('aria-hidden')).toBe('true');
  });
});
