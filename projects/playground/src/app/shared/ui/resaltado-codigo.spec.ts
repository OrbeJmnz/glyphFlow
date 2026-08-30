import { describe, expect, it } from 'vitest';
import { resaltarCodigo } from './resaltado-codigo';

describe('resaltarCodigo', () => {
  it('sin nada que resaltar, devuelve el texto escapado tal cual', () => {
    expect(resaltarCodigo('hola mundo')).toBe('hola mundo');
  });

  it('escapa < y > fuera de cualquier token para no romper el HTML de salida', () => {
    expect(resaltarCodigo('a < b')).toBe('a &lt; b');
  });

  it('colorea un comentario de línea completo', () => {
    expect(resaltarCodigo('// nota')).toBe('<span class="tok-comentario">// nota</span>');
  });

  it('colorea un comentario de bloque completo', () => {
    expect(resaltarCodigo('/* nota */')).toBe('<span class="tok-comentario">/* nota */</span>');
  });

  it('colorea un comentario HTML completo', () => {
    expect(resaltarCodigo('<!-- nota -->')).toBe('<span class="tok-comentario">&lt;!-- nota --&gt;</span>');
  });

  it('colorea una cadena con comillas dobles', () => {
    expect(resaltarCodigo('"hola"')).toBe('<span class="tok-cadena">"hola"</span>');
  });

  it('colorea una cadena con comillas simples', () => {
    expect(resaltarCodigo("'hola'")).toBe('<span class="tok-cadena">\'hola\'</span>');
  });

  it('una comilla invertida es puntuación suelta, sin color propio', () => {
    expect(resaltarCodigo('`hola`')).toBe('`hola`');
  });

  it('el patrón real "template: `<tag>`" -- la comilla NO se traga el HTML de adentro', () => {
    const entrada = 'template: `\n    <gf-icon [size]="18" />\n  `,';
    const salida = resaltarCodigo(entrada);
    expect(salida).toContain('<span class="tok-etiqueta">&lt;gf-icon</span>');
    expect(salida).toContain('<span class="tok-binding">[size]=</span>');
  });

  it('colorea una interpolación de Angular como un solo bloque', () => {
    expect(resaltarCodigo('{{ mostrado() }}')).toBe(
      '<span class="tok-binding">{{ mostrado() }}</span>',
    );
  });

  it('colorea un property binding [x]=', () => {
    expect(resaltarCodigo('[size]="18"')).toBe(
      '<span class="tok-binding">[size]=</span><span class="tok-cadena">"18"</span>',
    );
  });

  it('colorea un event binding (x)=', () => {
    expect(resaltarCodigo('(click)="ir()"')).toBe(
      '<span class="tok-binding">(click)=</span><span class="tok-cadena">"ir()"</span>',
    );
  });

  it('colorea el nombre de una etiqueta y su cierre autocontenido', () => {
    expect(resaltarCodigo('<gf-icon />')).toBe(
      '<span class="tok-etiqueta">&lt;gf-icon</span> <span class="tok-etiqueta">/&gt;</span>',
    );
  });

  it('una etiqueta de cierre también cuenta', () => {
    expect(resaltarCodigo('</ul>')).toBe(
      '<span class="tok-etiqueta">&lt;/ul</span><span class="tok-etiqueta">&gt;</span>',
    );
  });

  it('NO confunde un genérico de TypeScript con una etiqueta -- la señal es la mayúscula inicial', () => {
    const entrada = 'viewChild.required<ElementRef<HTMLInputElement>>()';
    const salida = resaltarCodigo(entrada);
    expect(salida).not.toContain('tok-etiqueta">&lt;ElementRef');
    expect(salida).not.toContain('tok-etiqueta">&lt;HTMLInputElement');
  });

  it('NO confunde un primitivo de TS en un genérico con una etiqueta (Promise<void>)', () => {
    const salida = resaltarCodigo('Promise<void>');
    expect(salida).not.toContain('tok-etiqueta">&lt;void');
    expect(salida).toContain('<span class="tok-clave">void</span>');
  });

  it('no colorea "=>" como si fuera el cierre de una etiqueta', () => {
    expect(resaltarCodigo('() => x')).toBe('() =&gt; x');
  });

  it('colorea una palabra clave', () => {
    expect(resaltarCodigo('const x = 1')).toBe(
      '<span class="tok-clave">const</span> x = <span class="tok-numero">1</span>',
    );
  });

  it('no colorea una palabra clave si es parte de otro identificador', () => {
    expect(resaltarCodigo('constante')).toBe('constante');
  });

  it('colorea un número decimal', () => {
    expect(resaltarCodigo('cubic-bezier(0.16, 1)')).toBe(
      'cubic-bezier(<span class="tok-numero">0.16</span>, <span class="tok-numero">1</span>)',
    );
  });

  it('no colorea dígitos pegados a un identificador (180deg, h2)', () => {
    expect(resaltarCodigo('rotate(180deg)')).toBe('rotate(180deg)');
    expect(resaltarCodigo('h2')).toBe('h2');
  });

  it('un snippet real completo produce el HTML esperado', () => {
    const entrada = '<gf-icon-morph [icon]="icon()" [size]="18" spring="bouncy" />';
    expect(resaltarCodigo(entrada)).toBe(
      '<span class="tok-etiqueta">&lt;gf-icon-morph</span> ' +
        '<span class="tok-binding">[icon]=</span><span class="tok-cadena">"icon()"</span> ' +
        '<span class="tok-binding">[size]=</span><span class="tok-cadena">"18"</span> ' +
        'spring=<span class="tok-cadena">"bouncy"</span> ' +
        '<span class="tok-etiqueta">/&gt;</span>',
    );
  });
});
