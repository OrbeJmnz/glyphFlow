import { nombreDeConst } from './icon-name';

describe('nombreDeConst', () => {
  it('un segmento no cambia, solo agrega el sufijo', () => {
    expect(nombreDeConst('bell')).toBe('bellIcon');
  });

  it('cada guion se convierte en el siguiente caracter en mayúscula', () => {
    expect(nombreDeConst('refresh-cw')).toBe('refreshCwIcon');
    expect(nombreDeConst('rotate-ccw-clock')).toBe('rotateCcwClockIcon');
  });

  it('segmentos que empiezan con número también capitalizan bien', () => {
    expect(nombreDeConst('qr-code')).toBe('qrCodeIcon');
  });
});
