import { describe, expect, it } from 'vitest';
import { ES_DOC } from './datos-estructurados';
import { fechaDeDoc, fechaLegible } from './fechas-docs';

describe('fechaDeDoc', () => {
  it('cada página de Docs tiene una fecha AAAA-MM-DD', () => {
    for (const id of ES_DOC) expect(fechaDeDoc(id), id).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('lo que no es una página de Docs no tiene fecha: ni la portada, ni /bots, ni una ruta sin id', () => {
    expect(fechaDeDoc('bots')).toBeUndefined();
    expect(fechaDeDoc('iconos')).toBeUndefined();
    expect(fechaDeDoc(undefined)).toBeUndefined();
  });
});

describe('fechaLegible', () => {
  it('escribe el día de calendario en el idioma de la página', () => {
    expect(fechaLegible('2026-10-14', 'es')).toBe('14 de octubre de 2026');
    expect(fechaLegible('2026-10-14', 'en')).toBe('October 14, 2026');
  });

  it('no se corre un día por la zona horaria: el día 1 sigue siendo el 1', () => {
    expect(fechaLegible('2026-09-01', 'es')).toBe('1 de septiembre de 2026');
  });
});
