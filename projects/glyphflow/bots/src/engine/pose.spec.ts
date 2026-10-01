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
});
