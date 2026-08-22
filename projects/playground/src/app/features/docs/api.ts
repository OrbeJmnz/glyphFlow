import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { CURATED_ICONS } from 'glyphflow';
import { CIFRAS } from '../../core/cifras';
import { API_TIPOS, API_VALORES, type Clase, type Entrada } from './api-surface';

/**
 * La referencia de API se PINTA desde `api-surface.ts`, que es el mismo dato que un spec compara
 * contra los exports reales del paquete. Escribir estas tablas a mano en el HTML habría dejado la
 * puerta abierta a documentar un símbolo que ya no existe.
 *
 * `nota` en `inputsIcono`/`inputsMorph` y `resumen` en `api-surface.ts` son CLAVES de traducción,
 * no texto — mismo criterio en los dos archivos. `clase` en cambio se queda como el valor técnico
 * ('componente' | 'función'...) y se traduce aparte con `claseClaves`, porque son solo 4 valores
 * repetidos ~20 veces: una clave por símbolo habría sido puro ruido.
 */
@Component({
  selector: 'app-docs-api',
  imports: [TranslocoPipe],
  templateUrl: './api.html',
  styleUrl: './docs-page.css',
})
export class Api {
  protected readonly entradas: Entrada[] = ['glyphflow', 'glyphflow/morph'];

  /**
   * Los conteos que interpolan los resúmenes de `CURATED_ICONS` y `GENERATED_ICONS`.
   *
   * Estuvieron escritos dentro del texto traducido ("Los 180 con coreografía a mano", "los 1587
   * restantes") y quedaron cinco veces atrás de la realidad, contradiciendo al hero de la misma
   * sesión, que sí los deriva. Van como parámetros para que no puedan volver a desfasarse.
   *
   * `generados` se calcula restando en vez de leer `GENERATED_ICONS`: ese registro arrastraría los
   * 868 generados al bundle del sitio solo para pintar un número.
   */
  protected readonly conteos = {
    curados: Object.keys(CURATED_ICONS).length,
    generados: CIFRAS.catalogo - Object.keys(CURATED_ICONS).length,
  };

  protected valoresDe(entrada: Entrada) {
    return API_VALORES.filter((s) => s.entrada === entrada);
  }

  protected tiposDe(entrada: Entrada) {
    return API_TIPOS.filter((t) => t.entrada === entrada);
  }

  /** Las 4 clases de símbolo, traducidas. La tabla indexa esto con `[s.clase]` en el template. */
  protected readonly claseClaves: Record<Clase, string> = {
    componente: 'docs.api.clases.componente',
    función: 'docs.api.clases.funcion',
    token: 'docs.api.clases.token',
    constante: 'docs.api.clases.constante',
  };

  protected readonly inputsIcono = [
    {
      nombre: 'iconDef',
      tipo: 'AnimatedIconDef',
      porDefecto: '—',
      nota: 'docs.api.inputsIcono.iconDef',
    },
    {
      nombre: 'name',
      tipo: 'string',
      porDefecto: "''",
      nota: 'docs.api.inputsIcono.name',
    },
    {
      nombre: 'animation',
      tipo: 'string',
      porDefecto: "'default'",
      nota: 'docs.api.inputsIcono.animation',
    },
    {
      nombre: 'trigger',
      tipo: 'AnimatedIconTrigger',
      porDefecto: "'group'",
      nota: 'docs.api.inputsIcono.trigger',
    },
    {
      nombre: 'size',
      tipo: 'number | string',
      porDefecto: '24',
      nota: 'docs.api.inputsIcono.size',
    },
    {
      nombre: 'strokeWidth',
      tipo: 'number | string',
      porDefecto: '2',
      nota: 'docs.api.inputsIcono.strokeWidth',
    },
    {
      nombre: 'loop',
      tipo: 'boolean',
      porDefecto: 'false',
      nota: 'docs.api.inputsIcono.loop',
    },
    {
      nombre: 'delay',
      tipo: 'number',
      porDefecto: '0',
      nota: 'docs.api.inputsIcono.delay',
    },
    {
      nombre: 'viewOnce',
      tipo: 'boolean',
      porDefecto: 'true',
      nota: 'docs.api.inputsIcono.viewOnce',
    },
    {
      nombre: 'decorative',
      tipo: 'boolean',
      porDefecto: 'true',
      nota: 'docs.api.inputsIcono.decorative',
    },
    {
      nombre: 'label',
      tipo: 'string',
      porDefecto: '—',
      nota: 'docs.api.inputsIcono.label',
    },
    {
      nombre: 'respectReducedMotion',
      tipo: 'boolean',
      porDefecto: 'true',
      nota: 'docs.api.inputsIcono.respectReducedMotion',
    },
  ];

  protected readonly inputsMorph = [
    {
      nombre: 'icon',
      tipo: 'MorphIcon',
      porDefecto: '—',
      nota: 'docs.api.inputsMorph.icon',
    },
    {
      nombre: 'size',
      tipo: 'number | string',
      porDefecto: '24',
      nota: 'docs.api.inputsMorph.size',
    },
    {
      nombre: 'strokeWidth',
      tipo: 'number | string',
      porDefecto: '2',
      nota: 'docs.api.inputsMorph.strokeWidth',
    },
    {
      nombre: 'decorative',
      tipo: 'boolean',
      porDefecto: 'true',
      nota: 'docs.api.inputsMorph.decorative',
    },
    {
      nombre: 'label',
      tipo: 'string',
      porDefecto: '—',
      nota: 'docs.api.inputsMorph.label',
    },
    {
      nombre: 'respectReducedMotion',
      tipo: 'boolean',
      porDefecto: 'true',
      nota: 'docs.api.inputsMorph.respectReducedMotion',
    },
    {
      nombre: 'spring',
      tipo: 'SpringPreset | SpringConfig',
      porDefecto: "'smooth'",
      nota: 'docs.api.inputsMorph.spring',
    },
  ];
}
