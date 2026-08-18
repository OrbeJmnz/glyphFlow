import { AnimatedIconDef } from 'glyphflow';
import { analizarIcono } from './motion-inspector';

/** Def mínimo, sin depender del catálogo real: cada caso construye exactamente lo que necesita. */
function def(animations: AnimatedIconDef['animations']): AnimatedIconDef {
  return { shapes: [{ tag: 'path', d: 'M0 0' }, { tag: 'path', d: 'M1 1' }], animations };
}

describe('analizarIcono', () => {
  it('duración = delay + duration del track más largo', () => {
    const r = analizarIcono('x', def({
      default: {
        root: { keyframes: [{ transform: 'scale(1)' }], options: { duration: 300 } },
        shapes: { 0: { keyframes: [{ transform: 'scale(1)' }], options: { duration: 500, delay: 200 } } },
      },
    }));
    expect(r.variantes[0].duracionMs).toBe(700); // 500 + 200, no los 300 del root
  });

  it('detecta tracks solapados y los que no', () => {
    const r = analizarIcono('x', def({
      default: {
        root: { keyframes: [{ transform: 'scale(1)' }], options: { duration: 100 } },
        shapes: {
          0: { keyframes: [{ transform: 'scale(1)' }], options: { duration: 100, delay: 50 } }, // se solapa con root
          1: { keyframes: [{ transform: 'scale(1)' }], options: { duration: 100, delay: 300 } }, // no se solapa
        },
      },
    }));
    expect(r.variantes[0].tracksSolapados).toEqual([{ a: 'root', b: 'shapes[0]' }]);
  });

  it('rotación máxima toma el valor absoluto y el más grande de todos los keyframes', () => {
    const r = analizarIcono('x', def({
      default: { root: { keyframes: [{ transform: 'rotate(15deg)' }, { transform: 'rotate(-40deg)' }], options: { duration: 300 } } },
    }));
    expect(r.variantes[0].rotacionMaximaDeg).toBe(40);
  });

  it('animar `d` se marca como caro; transform/opacity no', () => {
    const barato = analizarIcono('x', def({
      default: { root: { keyframes: [{ transform: 'scale(1)', opacity: '1' }], options: { duration: 300 } } },
    }));
    expect(barato.variantes[0].animaD).toBe(false);
    expect(barato.variantes[0].propiedadesAnimadas).toEqual(['opacity', 'transform']);

    const caro = analizarIcono('x', def({
      default: { shapes: { 0: { keyframes: [{ d: 'M0 0 L1 1' }], options: { duration: 300 } } } },
    }));
    expect(caro.variantes[0].animaD).toBe(true);
  });

  it('autoDraw puro no tiene duración estática — reporta null, no un cero engañoso', () => {
    const r = analizarIcono('x', def({ draw: { autoDraw: { speed: 60 } } }));
    expect(r.variantes[0].duracionMs).toBeNull();
    expect(r.variantes[0].autoDraw).toBe(true);
  });

  it('offset/easing/composite del Keyframe no cuentan como propiedad CSS animada', () => {
    const r = analizarIcono('x', def({
      default: {
        root: {
          keyframes: [{ offset: 0, easing: 'ease', transform: 'scale(1)' }, { transform: 'scale(1.1)' }],
          options: { duration: 300 },
        },
      },
    }));
    expect(r.variantes[0].propiedadesAnimadas).toEqual(['transform']);
  });

  it('reverseOnLeave se reporta tal cual viene de la coreografía', () => {
    const r = analizarIcono('x', def({
      default: { root: { keyframes: [{ transform: 'scale(1)' }], options: { duration: 300 } }, reverseOnLeave: true },
    }));
    expect(r.variantes[0].reverseOnLeave).toBe(true);
  });

  it('analiza TODAS las variantes de la coreografía, no solo default', () => {
    const r = analizarIcono('x', def({
      default: { root: { keyframes: [{ transform: 'scale(1)' }], options: { duration: 100 } } },
      rotate: { root: { keyframes: [{ transform: 'rotate(90deg)' }], options: { duration: 200 } } },
    }));
    expect(r.variantes.map((v) => v.variante)).toEqual(['default', 'rotate']);
  });
});
