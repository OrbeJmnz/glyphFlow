import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { estrellas } from '../../core/github';
import { BotonGithub } from './boton-github';

describe('BotonGithub', () => {
  beforeEach(() => estrellas.set(null));

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
    expect(enlace.getAttribute('aria-label')).toBe('Dar estrella a glyphflow en GitHub');
  });

  it('a la vista abrevia, pero la etiqueta lleva el número entero', () => {
    const { fixture, html, enlace } = montar();
    estrellas.set(1240);
    fixture.detectChanges();

    // «1.2k estrellas» no es algo que un lector de pantalla pueda decir bien.
    expect(html.querySelector('.conteo')?.textContent?.trim()).toBe('1.2k');
    expect(enlace.getAttribute('aria-label')).toBe(
      'Dar estrella a glyphflow en GitHub, 1240 estrellas',
    );
  });

  it('concuerda el singular con una sola estrella', () => {
    const { fixture, enlace } = montar();
    estrellas.set(1);
    fixture.detectChanges();
    expect(enlace.getAttribute('aria-label')).toContain('1 estrella');
    expect(enlace.getAttribute('aria-label')).not.toContain('estrellas');
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
