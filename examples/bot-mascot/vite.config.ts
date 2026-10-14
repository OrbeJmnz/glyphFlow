import angular from '@analogjs/vite-plugin-angular';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const tsconfig = fileURLToPath(new URL('./tsconfig.json', import.meta.url));

export default defineConfig({ plugins: [angular({ tsconfig })] });
