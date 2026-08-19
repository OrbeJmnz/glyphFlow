import { Component, computed } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MaxIconComponent, moonIcon, sunIcon, workflowIcon, type AnimatedIconDef } from 'glyphflow';
import { MaxIconMorphComponent, type MorphIcon } from 'glyphflow/morph';
import { escalaDuracion, PRESETS_ESCALA } from './core/duration-scale';
import { cargarEstrellas } from './core/github';
import { alternarTema, conectarTema, tema } from './core/tema';
import { BotonGithub } from './shared/marca/boton-github';
import { Logo } from './shared/marca/logo';
import { Boton } from './shared/ui/boton';
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
    Chip,
    Grupo,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly presets = PRESETS_ESCALA;
  protected readonly escala = escalaDuracion;

  /** El glifo de la marca, junto al logotipo. Se dibuja al montar y repite al pasar por el enlace. */
  protected readonly glifo: AnimatedIconDef = workflowIcon;
  protected readonly tema = tema;
  protected readonly alternarTema = alternarTema;
  /** El sol se ofrece cuando estás en oscuro: el icono dice A DÓNDE vas, no dónde estás. */
  protected readonly iconoTema = computed<MorphIcon>(() =>
    tema() === 'oscuro' ? sunIcon : moonIcon,
  );
  protected readonly etiquetaTema = computed(() =>
    tema() === 'oscuro' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro',
  );

  constructor() {
    conectarTema();
    // Sin `await` ni bloqueo: si nunca responde, el botón se queda diciendo «GitHub» y el sitio ya
    // está usable desde el primer cuadro.
    void cargarEstrellas();
  }
}
