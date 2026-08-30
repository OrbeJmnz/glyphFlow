import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Los cuatro tonos del sistema "qué motor uso": `morph`/`coreografia`/`ninguno` son los tres
 * motores reales; `mixto` es para el único patrón que usa dos a la vez (enviar) — no es un cuarto
 * motor, por eso comparte el gris de `ninguno` y no un hue propio (T-color, punto explícito del
 * pedido: "no inventar un tercer motor por diseño").
 */
export type Tono = 'morph' | 'coreografia' | 'ninguno' | 'mixto';

/**
 * El badge que enseña qué motor usa un patrón, de un vistazo y sin leer el texto: violeta=morph,
 * azul=coreografía, gris=sin motor/CSS. Vive aquí y no en `shared/ui/` porque el concepto "motor"
 * no tiene consumidores fuera de esta página (`shared/ui/README.md`: "una primitiva con un solo
 * uso no es una primitiva, es indirección").
 */
@Component({
  selector: 'app-motor-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './motor-badge.html',
  styleUrl: './motor-badge.css',
})
export class MotorBadge {
  readonly tono = input.required<Tono>();
  /** Ya traducido por quien llama -- mismo criterio que `Recuadro.texto`. */
  readonly texto = input.required<string>();
}
