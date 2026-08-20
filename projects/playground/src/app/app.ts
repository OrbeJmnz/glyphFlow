import { Component, computed, effect, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  MaxIconComponent,
  menuIcon,
  moonIcon,
  sunIcon,
  workflowIcon,
  xIcon,
  zapIcon,
  type AnimatedIconDef,
} from 'glyphflow';
import { MaxIconMorphComponent, type MorphIcon } from 'glyphflow/morph';
import { escalaDuracion, PRESETS_ESCALA } from './core/duration-scale';
import { cargarEstrellas } from './core/github';
import { alternarTema, conectarTema, tema } from './core/tema';
import { conectarTransiciones } from './core/transicion';
import { BotonGithub } from './shared/marca/boton-github';
import { Logo } from './shared/marca/logo';
import { Boton } from './shared/ui/boton';
import { CarrilActivo } from './shared/ui/carril-activo';
import { Chip } from './shared/ui/chip';
import { Grupo } from './shared/ui/grupo';

/**
 * Shell del playground: navegación, control global de velocidad, acciones y el outlet. Nada de
 * contenido.
 *
 * Los chips de velocidad viven AQUÍ y no en el showcase porque `durationScale` es config global
 * (`provideMaxIcons`): gobierna las coreografías de `<max-icon>` y las transiciones de
 * `<max-icon-morph>` por igual. Ponerlos dentro de una página sugeriría que solo aplican ahí.
 */
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MaxIconComponent,
    MaxIconMorphComponent,
    BotonGithub,
    Logo,
    Boton,
    CarrilActivo,
    Chip,
    Grupo,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  host: {
    // Con el menú móvil abierto, Escape lo cierra desde cualquier punto de la página — no solo con
    // el foco puesto en el propio disparador.
    '(document:keydown.escape)': 'cerrarMenu()',
  },
})
export class App {
  protected readonly presets = PRESETS_ESCALA;
  protected readonly escala = escalaDuracion;
  /** Qué píldora está puesta. Lo consume el CSS como `--i` para desplazar el indicador. */
  protected readonly indiceEscala = computed(() =>
    Math.max(
      0,
      PRESETS_ESCALA.findIndex((p) => p.valor === escalaDuracion()),
    ),
  );
  protected readonly iconoVelocidad: AnimatedIconDef = zapIcon;

  /**
   * En móvil el header solo enseña el disparador del menú y el tema — nav, velocidad y GitHub se
   * mudan al panel lateral. En escritorio este estado nunca se lee: el disparador está oculto por
   * CSS y el panel no tiene dónde engancharse.
   */
  protected readonly menuAbierto = signal(false);

  protected alternarMenu(): void {
    this.menuAbierto.update((v) => !v);
  }

  protected cerrarMenu(): void {
    this.menuAbierto.set(false);
  }

  /** El disparador hace morph entre hamburguesa y X — dice lo que hace, no solo lo que es. */
  protected readonly iconoMenu = computed<MorphIcon>(() => (this.menuAbierto() ? xIcon : menuIcon));

  /** El glifo de la marca, junto al logotipo. Se dibuja al montar y repite al pasar por el enlace. */
  protected readonly glifo: AnimatedIconDef = workflowIcon;
  protected readonly tema = tema;
  /** El sol se ofrece cuando estás en oscuro: el icono dice A DÓNDE vas, no dónde estás. */
  protected readonly iconoTema = computed<MorphIcon>(() =>
    tema() === 'oscuro' ? sunIcon : moonIcon,
  );
  protected readonly etiquetaTema = computed(() =>
    tema() === 'oscuro' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro',
  );

  /**
   * El círculo sale del CENTRO del botón y no del punto del clic: con teclado, `Enter` dispara un
   * click con coordenadas 0,0, así que usar las del evento abriría el tema desde la esquina
   * superior izquierda para quien no usa ratón.
   */
  protected cambiarTema(ev: Event): void {
    const caja = (ev.currentTarget as HTMLElement).getBoundingClientRect();
    alternarTema({ x: caja.left + caja.width / 2, y: caja.top + caja.height / 2 });
  }

  constructor() {
    // Antes que `conectarTema()`: el tema ya pide transiciones al alternar.
    conectarTransiciones();
    conectarTema();
    // Sin `await` ni bloqueo: si nunca responde, el botón se queda diciendo «GitHub» y el sitio ya
    // está usable desde el primer cuadro.
    void cargarEstrellas();

    // El menú móvil SÍ es modal (tiene backdrop, a diferencia del drawer de detalle de icono):
    // con el fondo bloqueado, arrastrar detrás del blur no mueve la página que ya no se ve.
    // Guardia de SSR: `test:ssr` renderiza sin `document`.
    effect(() => {
      if (typeof document === 'undefined') return;
      document.body.style.overflow = this.menuAbierto() ? 'hidden' : '';
    });
  }
}
