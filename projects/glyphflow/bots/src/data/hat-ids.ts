/** Los sombreros de `glyphflow/bots/extras` (`hatsExtra`). El tipo vive aquí para que el motor lo nombre sin cargar sus datos. */
/** Un sombrero: uno de serie (con autocompletado) o el nombre de uno propio que se pasó a `createHatsExtra`. */
export type GfBotHatName = GfBotHatId | (string & Record<never, never>);

export type GfBotHatId =
  | 'wizard'
  | 'party'
  | 'santa'
  | 'cap'
  | 'beanie'
  | 'topHat'
  | 'beret'
  | 'crown'
  | 'birthday'
  | 'chef'
  | 'cowboy'
  | 'pirate'
  | 'headphones'
  | 'visor'
  | 'astronaut'
  | 'antenna';
