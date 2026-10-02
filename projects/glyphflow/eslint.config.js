// @ts-check
const { defineConfig } = require('eslint/config');
const rootConfig = require('../../eslint.config.js');

module.exports = defineConfig([
  // Código vendorizado de morphicons: se copia TAL CUAL. Pasarle nuestro linter obligaría a
  // tocarlo, y cada toque es una divergencia del upstream que luego hay que arrastrar a mano.
  //
  // La ruta va desde la RAÍZ del workspace, no desde este archivo: en flat config los `ignores`
  // se resuelven contra el CWD del proceso, y `ng lint` corre desde la raíz. Escrita relativa al
  // config, el ignore no aplica y el lint truena sobre código de terceros (pasó).
  { ignores: ['projects/glyphflow/morph/src/core/**'] },
  ...rootConfig,
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          // `gf` desde la v2.0.0; `max` sigue por los alias deprecados de la v1 (salen en la v3)
          prefix: ['gf', 'max'],
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: ['gf', 'max'],
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    rules: {},
  },
]);
