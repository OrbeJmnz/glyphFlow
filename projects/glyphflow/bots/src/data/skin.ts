/**
 * Lo que devuelve una piel: tres capas SVG que el motor monta en los huecos del esqueleto.
 * `back` va detrás del cuerpo (sombra/halo), `paint` dentro de la silueta recortada (color fijo) y
 * `over` encima (trazo/brillo).
 */
export interface GfBotSkinLayers {
  back: string;
  paint: string;
  over: string;
}
