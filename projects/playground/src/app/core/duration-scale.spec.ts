import { describe, it, expect, afterEach } from 'vitest';
import { computed } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MAX_ICONS_CONFIG, MaxIconsConfig } from 'glyphflow';
import { escalaDuracion, provideEscalaEnVivo, PRESETS_ESCALA } from './duration-scale';

describe('provideEscalaEnVivo', () => {
  afterEach(() => escalaDuracion.set(1));

  it('el default es 1: sin tocar nada, la librería anima igual que siempre', () => {
    expect(escalaDuracion()).toBe(1);
    expect(PRESETS_ESCALA.some((p) => p.valor === 1 && p.nota === 'default')).toBe(true);
  });

  it('la config leída DESPUÉS de mover la señal trae el valor nuevo, sin re-proveer', () => {
    TestBed.configureTestingModule({ providers: [provideEscalaEnVivo()] });
    const config = TestBed.inject<MaxIconsConfig>(MAX_ICONS_CONFIG);

    // Es la misma referencia de objeto: lo que cambia es lo que devuelve el getter. Ese es todo el
    // truco — la librería lee `config.durationScale` al momento de animar, no al inyectar.
    expect(config.durationScale).toBe(1);
    escalaDuracion.set(2);
    expect(config.durationScale).toBe(2);
    escalaDuracion.set(0.5);
    expect(config.durationScale).toBe(0.5);
  });

  it('leer la config no suscribe al lector: un computed no se recalcula al mover la escala', () => {
    TestBed.configureTestingModule({ providers: [provideEscalaEnVivo()] });
    const config = TestBed.inject<MaxIconsConfig>(MAX_ICONS_CONFIG);

    let lecturas = 0;
    const espia = computed(() => {
      lecturas++;
      return config.durationScale;
    });

    expect(espia()).toBe(1);
    expect(lecturas).toBe(1);
    escalaDuracion.set(2);
    // Sin `untracked` el computed se habría invalidado y `lecturas` subiría a 2.
    expect(espia()).toBe(1);
    expect(lecturas).toBe(1);
  });
});
