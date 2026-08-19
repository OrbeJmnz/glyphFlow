import { Component } from '@angular/core';
import { API_TIPOS, API_VALORES, type Entrada } from './api-surface';

/**
 * La referencia de API se PINTA desde `api-surface.ts`, que es el mismo dato que un spec compara
 * contra los exports reales del paquete. Escribir estas tablas a mano en el HTML habría dejado la
 * puerta abierta a documentar un símbolo que ya no existe.
 */
@Component({
  selector: 'app-docs-api',
  templateUrl: './api.html',
  styleUrl: './docs-page.css',
})
export class Api {
  protected readonly entradas: Entrada[] = ['glyphflow', 'glyphflow/morph'];

  protected valoresDe(entrada: Entrada) {
    return API_VALORES.filter((s) => s.entrada === entrada);
  }

  protected tiposDe(entrada: Entrada) {
    return API_TIPOS.filter((t) => t.entrada === entrada);
  }

  protected readonly inputsIcono = [
    {
      nombre: 'iconDef',
      tipo: 'AnimatedIconDef',
      porDefecto: '—',
      nota: 'La vía tree-shakeable. Gana sobre name.',
    },
    {
      nombre: 'name',
      tipo: 'string',
      porDefecto: "''",
      nota: 'Requiere provideIconCatalog. Desconocido = no pinta, no truena.',
    },
    {
      nombre: 'animation',
      tipo: 'string',
      porDefecto: "'default'",
      nota: 'Qué variante reproducir.',
    },
    {
      nombre: 'trigger',
      tipo: 'AnimatedIconTrigger',
      porDefecto: "'group'",
      nota: 'Cuándo se anima.',
    },
    { nombre: 'size', tipo: 'number | string', porDefecto: '24', nota: 'Lado del SVG.' },
    { nombre: 'strokeWidth', tipo: 'number | string', porDefecto: '2', nota: 'Grosor del trazo.' },
    {
      nombre: 'loop',
      tipo: 'boolean',
      porDefecto: 'false',
      nota: 'Con easings de un tiro se nota el corte entre vueltas.',
    },
    {
      nombre: 'delay',
      tipo: 'number',
      porDefecto: '0',
      nota: 'Retraso extra (ms), ADICIONAL al de cada track.',
    },
    { nombre: 'viewOnce', tipo: 'boolean', porDefecto: 'true', nota: 'Solo con trigger="view".' },
    {
      nombre: 'decorative',
      tipo: 'boolean',
      porDefecto: 'true',
      nota: 'Ver Accesibilidad: manda el label.',
    },
    { nombre: 'label', tipo: 'string', porDefecto: '—', nota: 'Con label el icono es semántico.' },
    {
      nombre: 'respectReducedMotion',
      tipo: 'boolean',
      porDefecto: 'true',
      nota: 'Se queda estático si el sistema lo pide.',
    },
  ];

  protected readonly inputsMorph = [
    {
      nombre: 'icon',
      tipo: 'MorphIcon',
      porDefecto: '—',
      nota: 'El binding ES el estado. El primer valor se pinta estático.',
    },
    { nombre: 'size', tipo: 'number | string', porDefecto: '24', nota: 'Lado del SVG.' },
    { nombre: 'strokeWidth', tipo: 'number | string', porDefecto: '2', nota: 'Grosor del trazo.' },
    {
      nombre: 'decorative',
      tipo: 'boolean',
      porDefecto: 'true',
      nota: 'Mismo contrato que <max-icon>.',
    },
    { nombre: 'label', tipo: 'string', porDefecto: '—', nota: 'Con label el icono es semántico.' },
    {
      nombre: 'respectReducedMotion',
      tipo: 'boolean',
      porDefecto: 'true',
      nota: 'Aquí SALTA al destino en vez de quedarse quieto.',
    },
  ];
}
