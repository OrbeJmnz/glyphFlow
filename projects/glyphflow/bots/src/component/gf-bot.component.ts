import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewEncapsulation,
  afterNextRender,
  inject,
  output,
} from '@angular/core';
import type { GfBotState } from '../bot-state';
import type { GfBotShape } from '../data/shape';
import type { GfBotFaceId } from '../data/faces';
import type { GfBotAccXId, GfBotFxId } from '../data/fx';
import type { GfBotHatId } from '../data/hat-ids';
import type { GfBotPaletteId } from '../data/palettes';
import type { GfBotExtras, GfBotGesturePack, GfBotMaterialId, GfBotMouthKind, GfBotOptions } from '../engine/context';
import type { GfBotView } from '../data/views';
import { createBot, type GfBotApi } from '../engine/create-bot';

/** Lo que el bot decide solo y avisa: la rutina que arrancó (`label`) o `null` cuando terminó. */
export interface GfBotRoutineEvent {
  state: GfBotState;
  label: string | null;
}

/**
 * Un bot animado: la forma, su piel y su carácter dentro de un `<gf-bot>`.
 *
 * ```html
 * <gf-bot [shape]="catShape" [(state)]="state" label="Asistente" [size]="120" />
 * ```
 *
 * **Por qué el motor se monta DESPUÉS del primer render (`afterNextRender`) y no antes.** El motor
 * escribe el SVG con `innerHTML`, mide la geometría (`getScreenCTM`, `getBoundingClientRect`) y pide
 * cuadros de animación: nada de eso existe en el servidor. En SSR el host sale vacío pero ya con su
 * caja (`aspect-ratio`), así que al hidratar el bot aparece sin mover nada de la página.
 *
 * **La forma entra como objeto, no como nombre** (`[shape]="catShape"`), igual que los iconos del
 * primario: quien importa `catShape` no carga el pulpo. Por eso `shape` es obligatorio — un valor por
 * defecto obligaría al componente a importar una forma y todos la pagarían.
 *
 * **`state` es de doble vía a propósito.** El bot también cambia de estado solo (al terminar de
 * escribir vuelve a `idle`) y lo avisa por `stateChange`; con `[(state)]` el dueño nunca queda con un
 * valor viejo. Con `[state]` a secas hay que escuchar `stateChange`, o un `working` repetido no
 * produce cambio y el bot se queda en reposo.
 *
 * El motor corre fuera de la zona (`runOutsideAngular`): son temporizadores y cuadros de animación
 * propios, no deben disparar detección de cambios. Los avisos (`routineChange`…) sí vuelven a entrar.
 */
@Component({
  selector: 'gf-bot',
  standalone: true,
  template: '',
  // El SVG lo escribe el motor con `innerHTML`: sin el atributo de encapsulación de Angular, así que
  // las reglas encapsuladas no lo alcanzarían. El alcance lo da la clase `.gf-bot-svg` (ver el CSS).
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './gf-bot.css',
  host: {
    '[attr.role]': 'label ? "img" : null',
    '[attr.aria-label]': 'label ?? null',
    '[attr.aria-hidden]': 'decorative && !label ? "true" : null',
    '[attr.data-interactive]': 'interactive ? "" : null',
    '[style.--gf-bot-size.px]': 'size',
    '(pointerenter)': 'hover(true)',
    '(pointerleave)': 'hover(false)',
  },
})
export class GfBotComponent implements OnChanges, OnDestroy {
  /** La forma. Se pasa el objeto (`catShape`, `ghostShape`…). Obligatoria. */
  @Input({ required: true }) shape!: GfBotShape;

  /** Reposo, trabajando o dormido. De doble vía: `[(state)]`. */
  @Input() state: GfBotState = 'idle';

  /** Paleta del cuerpo; `auto` = la de la forma. */
  @Input() palette: GfBotPaletteId | 'auto' = 'auto';

  /** Material del cuerpo (`plastic`, `metal`, `chrome`, `gold`); `auto` = el de la forma. */
  @Input() material: GfBotMaterialId | 'auto' = 'auto';

  /** Piel (`neu`, `gel`, `g1`, `o2`, `n3`…). La familia de la forma decide cuáles existen. */
  @Input() skin = 'neu';

  /** Estilo de cara; `null` = la propia de la forma. */
  @Input() face: GfBotFaceId | null = null;

  /** Efecto de contorno (`glow`, `pixel`, `glitch`, `bug`). */
  @Input() fx: GfBotFxId | null = null;

  /** Sombrero o accesorio. */
  @Input() hat: GfBotHatId | GfBotAccXId | null = null;

  /** Boca de reposo elegida a mano; `auto` = la de la forma. */
  @Input() mouth: GfBotMouthKind | 'auto' = 'auto';
  /** Desde dónde se mira al bot (vista de reposo): una con nombre o un giro en radianes. */
  @Input() view: GfBotView | number = 'front';

  /** Extras opt-in (`import { toysExtra } from 'glyphflow/bots/extras'`): `{ toys: toysExtra }`. Se leen al montar: no cambian después. */
  @Input() extras?: GfBotExtras;

  /** Gestos extra (`import { physicalGestures } from 'glyphflow/bots/gestures'`). Se leen al montar: no cambian después. */
  @Input() gestures?: GfBotGesturePack;

  /** Reacciones del bot a los pasos de un agente (`agentReactions()` de `glyphflow/bots/gestures`). Se lee al montar. */
  @Input() onAgentEvent?: GfBotOptions['onAgentEvent'];

  /** La cabeza sigue al puntero. Apagado por defecto (un listener y trabajo por cuadro que no todos quieren). No sigue con movimiento reducido ni con el dedo. */
  @Input() followPointer = false;

  /** En reposo hace cositas por su cuenta (fidgets y caras kawaii). */
  @Input() wander = false;

  /**
   * Solo anima mientras el cursor está encima: para galerías de minis, donde cien bots animados a la
   * vez no tienen sentido. Fuera de pantalla o con la pestaña oculta se congela siempre, con o sin esto.
   */
  @Input() hoverOnly = false;

  /**
   * Se deja tocar y arrastrar (cosquillas, jalones gomosos). Apagado por defecto: en táctil, agarrar
   * al bot le quita el desplazamiento a la página.
   */
  @Input() interactive = false;

  /** Ancho en px; el alto sale de la proporción del viewBox. También se puede fijar con `--gf-bot-size`. */
  @Input() size: number | null = null;

  /** Texto accesible. Con `label` el bot es una imagen con nombre; sin él es decorativo. */
  @Input() label?: string;

  /** Sin `label`, esconde el bot a los lectores de pantalla. Con `label` no tiene efecto. */
  @Input() decorative = true;

  /** El bot arrancó o terminó una rutina por su cuenta. */
  readonly routineChange = output<GfBotRoutineEvent>();

  /** El bot cambió de estado solo (p. ej. terminó de escribir y vuelve a `idle`). Habilita `[(state)]`. */
  readonly stateChange = output<GfBotState>();

  /** Lo despertaron (tocarlo o un gesto estando dormido). */
  readonly wake = output<void>();

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone, { optional: true });

  private bot: GfBotApi | null = null;
  private opts: GfBotOptions | null = null;
  private stopTouch: (() => void) | null = null;

  constructor() {
    // Solo corre en el navegador: en servidor `afterNextRender` no se ejecuta, y el host queda vacío.
    afterNextRender(() => this.mount());
  }

  /**
   * El bot por dentro: los gestos y controles (`api.hop()`, `api.expr('shy')`, `api.agent('writing')`…).
   * `null` hasta que el componente se monta (primer render en el navegador) y después de destruirlo.
   */
  get api(): GfBotApi | null {
    return this.bot;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const bot = this.bot;
    if (!bot || !this.opts) return;
    if (changes['wander']) this.opts.wander = this.wander;
    if (changes['shape'] && !changes['shape'].firstChange) bot.setShape(this.shape);
    if (changes['skin'] && !changes['skin'].firstChange) bot.setMochi(this.skin);
    if (changes['palette'] && !changes['palette'].firstChange) bot.setPalette(this.palette);
    if (changes['material'] && !changes['material'].firstChange) bot.setMaterial(this.material);
    if (changes['face'] && !changes['face'].firstChange) bot.setFace(this.face);
    if (changes['fx'] && !changes['fx'].firstChange) bot.setFx(this.fx);
    if (changes['hat'] && !changes['hat'].firstChange) bot.setHat(this.hat);
    if (changes['mouth'] && !changes['mouth'].firstChange) bot.setMouthKind(this.mouth);
    if (changes['view'] && !changes['view'].firstChange) bot.setView(this.view);
    // Un estado que el bot ya tiene (porque lo alcanzó solo y el dueño lo reflejó) no se reinicia.
    if (changes['state'] && this.state !== bot.state) bot.setState(this.state);
    if (changes['hoverOnly']) bot.hover(!this.hoverOnly);
    if (changes['interactive']) this.syncTouch(bot);
    if (changes['followPointer']) bot.followPointer(this.followPointer);
  }

  ngOnDestroy(): void {
    this.stopTouch?.();
    this.stopTouch = null;
    this.bot?.destroy();
    this.bot = null;
    this.opts = null;
  }

  /** Para `hoverOnly`: el cursor entra o sale. Si no es `hoverOnly`, no hace nada. */
  protected hover(on: boolean): void {
    if (this.hoverOnly) this.bot?.hover(on);
  }

  private mount(): void {
    if (this.bot) return;
    const opts: GfBotOptions = {
      shape: this.shape,
      palette: this.palette,
      material: this.material,
      mochi: this.skin,
      face: this.face,
      fx: this.fx,
      hat: this.hat,
      mouthk: this.mouth,
      view: this.view,
      gestures: this.gestures,
      extras: this.extras,
      onAgentEvent: this.onAgentEvent,
      wander: this.wander,
      hoverOnly: this.hoverOnly,
      onRoutine: (state, label) => this.inZone(() => this.routineChange.emit({ state, label })),
      onStateChange: (state) => this.inZone(() => this.stateChange.emit(state)),
      onWake: () => this.inZone(() => this.wake.emit()),
    };
    this.opts = opts;
    const host = this.el.nativeElement;
    // Fuera de la zona: el motor agenda temporizadores y cuadros de animación por su cuenta.
    const bot = this.zone ? this.zone.runOutsideAngular(() => createBot(host, opts)) : createBot(host, opts);
    this.bot = bot;
    if (this.state !== 'idle') bot.setState(this.state);
    this.syncTouch(bot);
    if (this.followPointer) bot.followPointer(true);
  }

  private syncTouch(bot: GfBotApi): void {
    if (this.interactive) this.stopTouch ??= bot.enableTouch();
    else {
      this.stopTouch?.();
      this.stopTouch = null;
    }
  }

  private inZone(fn: () => void): void {
    if (this.zone) this.zone.run(fn);
    else fn();
  }
}
