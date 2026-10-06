import { POSE_SLOTS, projectPose, type GfBotPoseShape } from './pose';

const feats = [
  { x: 80, y: 110 },
  { x: 120, y: 110 },
];
const sphere: GfBotPoseShape = { cy: 112, model: 'sphere', R: 59 };
const box: GfBotPoseShape = {
  cy: 112,
  model: 'box',
  half: 48,
  round: 22,
  acc: [
    { p: [0, -50, 0], up: [0, -1, 0], frontOnly: true },
    { p: [36, -40, 30], up: [0.4, -0.9, 0.15], n: [0.4, -0.35, 0.85], backOnly: true },
  ],
};

describe('glyphflow/bots · projectPose', () => {
  it('devuelve rasgos + ranuras fijas + dos copias de cada accesorio', () => {
    const out = projectPose(box, {}, feats);
    expect(out.length).toBe(feats.length + POSE_SLOTS.length + 2 * (box.acc?.length ?? 0));
  });

  it('en pose neutra los rasgos no se desplazan y se ven del todo', () => {
    const out = projectPose(sphere, {}, feats);
    for (const f of out.slice(0, feats.length)) {
      expect(f.transform).toContain('translate(0.00px,0.00px)');
      expect(f.opacity).toBe(1);
    }
  });

  it('al girar la cabeza 90° los rasgos de la cara desaparecen por el costado', () => {
    const out = projectPose(sphere, { yaw: Math.PI }, feats);
    expect(out[0].opacity).toBe(0);
  });

  it('roll solo inclina: el brillo contra-rota para que la luz quede fija', () => {
    const out = projectPose(sphere, { roll: 20 }, feats);
    const face = out[feats.length + POSE_SLOTS.indexOf('face')];
    const gloss = out[feats.length + POSE_SLOTS.indexOf('gloss')];
    expect(face.transform).toBe('rotate(20.00deg)');
    expect(gloss.transform).toBe('rotate(-20.00deg)');
  });

  it('solo la caja pinta caras laterales; la esfera las deja ocultas', () => {
    const lateral = (sh: GfBotPoseShape) =>
      projectPose(sh, { yaw: 0.5 }, feats)
        .slice(feats.length + 1, feats.length + 5)
        .map((l) => l.opacity);
    expect(lateral(sphere)).toEqual([0, 0, 0, 0]);
    expect(lateral(box).some((o) => (o ?? 0) > 0)).toBe(true);
  });

  it('un accesorio backOnly nunca asoma por delante del cuerpo', () => {
    const out = projectPose(box, { yaw: 0.3 }, feats);
    const base = feats.length + POSE_SLOTS.length;
    const front = out.slice(base + 2); // segunda mitad = copias de adelante
    expect(front[1].opacity).toBe(0);
  });

  describe('profundidad del cuerpo (depth)', () => {
    const anchoDeSilueta = (sh: GfBotPoseShape, yaw: number) => {
      const body = projectPose(sh, { yaw }, feats)[feats.length].transform;
      return Number(/scale\(([0-9.]+),/.exec(body)?.[1]);
    };

    it('sin depth la esfera no cambia de silueta al girar (como el prototipo)', () => {
      expect(anchoDeSilueta(sphere, Math.PI / 2)).toBe(1);
    });

    it('con depth < 1 la silueta se estrecha hasta depth a los 90° y vuelve a 1 de frente', () => {
      const delgado: GfBotPoseShape = { ...sphere, depth: 0.55 };
      expect(anchoDeSilueta(delgado, 0)).toBe(1);
      expect(anchoDeSilueta(delgado, Math.PI / 2)).toBeCloseTo(0.55, 2);
      expect(anchoDeSilueta(delgado, Math.PI)).toBeCloseTo(1, 2);
      const a45 = anchoDeSilueta(delgado, Math.PI / 4);
      expect(a45).toBeGreaterThan(0.55);
      expect(a45).toBeLessThan(1);
    });

    it('depth = 1 equivale a una esfera en la pose de los rasgos', () => {
      const igual = projectPose({ ...sphere, depth: 1 }, { yaw: 0.7, pitch: 0.2 }, feats);
      const base = projectPose(sphere, { yaw: 0.7, pitch: 0.2 }, feats);
      for (let i = 0; i < feats.length; i++) expect(igual[i]).toEqual(base[i]);
    });

    it('un cuerpo más delgado recorre menos camino con los rasgos al girar', () => {
      const x = (sh: GfBotPoseShape) => {
        const m = /translate\((-?[0-9.]+)px/.exec(projectPose(sh, { yaw: 0.6 }, feats)[0].transform);
        return Math.abs(Number(m?.[1]));
      };
      expect(x({ ...sphere, depth: 0.5 })).toBeLessThan(x(sphere));
    });
  });
});

describe('desplazamiento de cara y accesorios', () => {
  it('sin ox/oy/ax/ay el transform es el de siempre y con ellos se antepone un translate', () => {
    const sh = { cy: 100, model: 'sphere' as const, R: 60 };
    const base = projectPose(sh, { roll: 4 }, []);
    const con = projectPose(sh, { roll: 4, ox: 5, oy: -2, ax: 7, ay: 1 }, []);
    const cara = POSE_SLOTS.indexOf('face');
    const acc = POSE_SLOTS.indexOf('accBackLayer');
    expect(base[cara].transform).toBe('rotate(4.00deg)');
    expect(con[cara].transform).toBe('translate(5.00px,-2.00px) rotate(4.00deg)');
    expect(con[acc].transform).toBe('translate(7.00px,1.00px) rotate(4.00deg)');
  });
});
