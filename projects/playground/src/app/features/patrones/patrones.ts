import { Component, signal, computed, OnDestroy } from '@angular/core';
import {
  MaxIconComponent,
  checkIcon,
  circleCheckIcon,
  copyIcon,
  heartIcon,
  loaderCircleIcon,
  moonIcon,
  sendIcon,
  sunIcon,
  type AnimatedIconDef,
} from 'glyphflow';
import { MaxIconMorphComponent, type MorphIcon } from 'glyphflow/morph';

/**
 * Patrones reales, no una vitrina de iconos sueltos.
 *
 * El grid de `/` enseña QUÉ hay; esto enseña PARA QUÉ sirve. Cada tarjeta es un control que de
 * verdad hace lo que dice — el de copiar copia, el de tema cambia colores, el de enviar tiene sus
 * tres estados — porque un patrón que solo simula su efecto no se puede juzgar: la animación se
 * siente distinta cuando compite con trabajo real en el mismo frame.
 *
 * Los snippets están al lado a propósito: lo que la gente viene a llevarse es el código.
 */
@Component({
  selector: 'app-patrones',
  imports: [MaxIconComponent, MaxIconMorphComponent],
  templateUrl: './patrones.html',
  styleUrl: './patrones.css',
})
export class Patrones implements OnDestroy {
  private readonly relojes: ReturnType<typeof setTimeout>[] = [];

  // ── Copiar al portapapeles ──────────────────────────────────────────────────
  protected readonly copiado = signal(false);
  protected readonly iconoCopiar = computed<MorphIcon>(() =>
    this.copiado() ? checkIcon : copyIcon,
  );
  protected readonly TEXTO_A_COPIAR = 'npm i glyphflow';

  protected async copiar(): Promise<void> {
    // El write real puede fallar (sin permiso, sin foco, http). Si truena, no se miente con la
    // palomita: el icono se queda en `copy` y el estado nunca cambia.
    try {
      await navigator.clipboard.writeText(this.TEXTO_A_COPIAR);
    } catch {
      return;
    }
    this.copiado.set(true);
    this.enUnRato(() => this.copiado.set(false), 1600);
  }

  // ── Tema claro/oscuro ───────────────────────────────────────────────────────
  protected readonly claro = signal(false);
  protected readonly iconoTema = computed<MorphIcon>(() => (this.claro() ? sunIcon : moonIcon));

  protected alternarTema(): void {
    this.claro.update((v) => !v);
  }

  // ── Enviar: reposo → enviando → enviado ─────────────────────────────────────
  protected readonly estadoEnvio = signal<'reposo' | 'enviando' | 'enviado'>('reposo');
  /** `send` y `circle-check` van por morph; el spinner NO — ver la nota del template. */
  protected readonly iconoEnvio = computed<MorphIcon>(() =>
    this.estadoEnvio() === 'enviado' ? circleCheckIcon : sendIcon,
  );
  protected readonly spinner: AnimatedIconDef = loaderCircleIcon;

  protected enviar(): void {
    if (this.estadoEnvio() !== 'reposo') return;
    this.estadoEnvio.set('enviando');
    this.enUnRato(() => {
      this.estadoEnvio.set('enviado');
      this.enUnRato(() => this.estadoEnvio.set('reposo'), 2000);
    }, 1200);
  }

  // ── Me gusta ────────────────────────────────────────────────────────────────
  protected readonly corazon: AnimatedIconDef = heartIcon;
  protected readonly meGusta = signal(false);
  protected readonly votos = signal(128);

  protected alternarMeGusta(): void {
    this.meGusta.update((v) => !v);
    this.votos.update((n) => n + (this.meGusta() ? 1 : -1));
  }

  /** Los timers se cancelan al destruir: cambiar de ruta a media animación no debe escribir señales. */
  private enUnRato(fn: () => void, ms: number): void {
    this.relojes.push(setTimeout(fn, ms));
  }

  ngOnDestroy(): void {
    for (const r of this.relojes) clearTimeout(r);
  }
}
