import { describe, it, expect, afterEach } from 'vitest';
import { computed } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GF_ICONS_CONFIG, GfIconsConfig } from 'glyphflow';
import { velocidadGlobal, provideVelocidadEnVivo, PRESETS_VELOCIDAD } from './duration-scale';

describe('provideVelocidadEnVivo', () => {
  afterEach(() => velocidadGlobal.set(1));

  it('el default es 1: sin tocar nada, la librería anima igual que siempre', () => {
    expect(velocidadGlobal()).toBe(1);
    expect(
      PRESETS_VELOCIDAD.some((p) => p.valor === 1 && p.notaClave === 'shell.velocidad.notaNormal'),
    ).toBe(true);
  });

  it('la config leída DESPUÉS de mover la señal trae el valor nuevo, sin re-proveer', () => {
    TestBed.configureTestingModule({ providers: [provideVelocidadEnVivo()] });
    const config = TestBed.inject<GfIconsConfig>(GF_ICONS_CONFIG);

    // Es la misma referencia de objeto: lo que cambia es lo que devuelve el getter. Ese es todo el
    // truco — la librería lee `config.durationScale` al momento de animar, no al inyectar.
    expect(config.durationScale).toBe(1);
    velocidadGlobal.set(2);
    expect(config.durationScale).toBe(0.5);
    velocidadGlobal.set(0.5);
    expect(config.durationScale).toBe(2);
  });

  // La razón de ser de este archivo: la UI habla de VELOCIDAD y la librería escala DURACIÓN. Son
  // recíprocos, y confundirlos es exactamente el bug que se arregló aquí — el chip `2×` alargaba
  // la duración al doble, o sea corría a la mitad de rápido.
  it('velocidad y durationScale son recíprocos: 2× de rápido es la mitad de duración', () => {
    TestBed.configureTestingModule({ providers: [provideVelocidadEnVivo()] });
    const config = TestBed.inject<GfIconsConfig>(GF_ICONS_CONFIG);

    velocidadGlobal.set(2);
    expect(config.durationScale).toBe(0.5);
    velocidadGlobal.set(0.5);
    expect(config.durationScale).toBe(2);

    // Ningún preset se sale del recíproco, incluido el 1.5× que no cae en un decimal redondo.
    for (const p of PRESETS_VELOCIDAD) {
      velocidadGlobal.set(p.valor);
      expect(config.durationScale).toBeCloseTo(1 / p.valor, 10);
    }
  });

  it('leer la config no suscribe al lector: un computed no se recalcula al mover la velocidad', () => {
    TestBed.configureTestingModule({ providers: [provideVelocidadEnVivo()] });
    const config = TestBed.inject<GfIconsConfig>(GF_ICONS_CONFIG);

    let lecturas = 0;
    const espia = computed(() => {
      lecturas++;
      return config.durationScale;
    });

    expect(espia()).toBe(1);
    expect(lecturas).toBe(1);
    velocidadGlobal.set(2);
    // Sin `untracked` el computed se habría invalidado y `lecturas` subiría a 2.
    expect(espia()).toBe(1);
    expect(lecturas).toBe(1);
  });
});
