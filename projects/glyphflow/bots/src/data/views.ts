/**
 * VISTAS: desde dónde se mira al bot. Es el giro de REPOSO: el bot descansa de frente, de tres cuartos,
 * de lado o de espaldas, y todo lo que hace —un salto, un mortal— parte de ahí en vez de volver a
 * mirar a cámara. Se compone con `depth` de cada forma: de lado la silueta se estrecha como un cuerpo
 * con volumen, y de espaldas la cara desaparece (los rasgos se esconden solos tras la silueta).
 *
 * Datos puros: sin imports, para que el contexto pueda usarlos sin arrastrar el motor.
 * `yaw` positivo gira la cara hacia la DERECHA del espectador (ver `projectPose`).
 */

export type GfBotView = 'front' | 'quarterLeft' | 'side' | 'back' | 'quarterRight';

/** Las vistas con nombre, en el orden en que se documentan. `side` mira a la izquierda. */
export const GF_BOT_VIEWS: readonly GfBotView[] = ['front', 'quarterLeft', 'side', 'back', 'quarterRight'];

const YAW: Readonly<Record<GfBotView, number>> = {
  front: 0,
  quarterLeft: -Math.PI / 4,
  side: -Math.PI / 2,
  back: Math.PI,
  quarterRight: Math.PI / 4,
};

export const isGfBotView = (v: unknown): v is GfBotView => typeof v === 'string' && Object.hasOwn(YAW, v);

/** El giro (radianes) de una vista con nombre, o el número tal cual si ya es un ángulo. */
export const viewYaw = (view: GfBotView | number | null | undefined): number =>
  typeof view === 'number' ? view : view && isGfBotView(view) ? YAW[view] : 0;
