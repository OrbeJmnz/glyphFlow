import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Una burbuja ambiental: dónde va, de qué tamaño, de qué tono, a qué ritmo respira. */
export interface Burbuja {
  readonly top?: string;
  readonly bottom?: string;
  readonly left?: string;
  readonly right?: string;
  readonly tamano: number;
  readonly tono: 'azul' | 'lavanda';
  /** Amplitud del desplazamiento en X/Y, en px. 8 a 18 por spec. */
  readonly dx: number;
  readonly dy: number;
  readonly duracionS: number;
  readonly retrasoS?: number;
  /** Halo ambiental sin cuerpo definido — para los que solo aportan tinte en las esquinas. */
  readonly sutil?: boolean;
  /** Las dos que enmarcan el hero: más presencia, más glow, en vez del trato de acento chico. */
  readonly grande?: boolean;
}

/**
 * La composición de referencia, con las cinco burbujas nombradas A-E igual que en el brief:
 * A/B enmarcan el hero (parcialmente fuera del viewport, ~38% de su diámetro), C/D/E son
 * acentos más chicos, y dos halos "sutil" abajo aportan tinte sin silueta. Nada de esto es
 * definitivo — es el default de `orbes`, pero cualquier consumidor futuro puede pasar el suyo.
 *
 * Ejes distintos a propósito. Lo HORIZONTAL se mide contra la PANTALLA (el host es full-bleed,
 * ver :host): A, B y los halos cuelgan del borde real del viewport, no del de .hero, que a
 * 1920px queda 340px adentro. Los acentos van en % para acompañar el ancho en vez de quedarse
 * pegados a un lado. Lo VERTICAL se mide contra .hero (ver desdeHero()), que es donde vive el
 * contenido que enmarcan.
 */
const BURBUJAS_HERO: readonly Burbuja[] = [
  // A: azul grande, arriba-izquierda — cuelga de DOS bordes (arriba y left), envuelve la esquina
  {
    top: '-150px',
    left: '-150px',
    tamano: 400,
    tono: 'azul',
    dx: 14,
    dy: -10,
    duracionS: 22,
    grande: true,
  },
  // B: lavanda grande, lateral derecho — antes solo colgaba del lado derecho (sensación de
  // "recorte de esquina"); ahora también sube parcialmente fuera del borde superior, igual que A
  {
    top: '-50px',
    right: '-140px',
    tamano: 370,
    tono: 'lavanda',
    dx: -12,
    dy: 12,
    duracionS: 26,
    retrasoS: 3,
    grande: true,
  },
  // C: pequeña izquierda, debajo de A
  { top: '280px', left: '10%', tamano: 90, tono: 'lavanda', dx: 9, dy: 14, duracionS: 17, retrasoS: 5 },
  // D: pequeña superior derecha
  { top: '-10px', right: '21%', tamano: 65, tono: 'azul', dx: -10, dy: 9, duracionS: 19, retrasoS: 1 },
  // E: pequeña inferior derecha, debajo de B
  { top: '310px', right: '10%', tamano: 88, tono: 'lavanda', dx: 12, dy: -9, duracionS: 21, retrasoS: 7 },
  // F: halos ambientales inferiores — grandes, sin silueta, solo tinte, detrás de las cifras.
  // Asoman ~80px detrás de las cifras y del botón de donar; el resto sangra hacia la sección de
  // abajo.
  {
    bottom: '-360px',
    left: '-150px',
    tamano: 440,
    tono: 'azul',
    dx: 10,
    dy: -12,
    duracionS: 25,
    retrasoS: 4,
    sutil: true,
  },
  {
    bottom: '-340px',
    right: '-160px',
    tamano: 420,
    tono: 'lavanda',
    dx: -9,
    dy: 11,
    duracionS: 24,
    retrasoS: 6,
    sutil: true,
  },
];

/**
 * Fondo decorativo puro: capa de burbujas de marca respirando lento detrás del contenido.
 * `aria-hidden` + `pointer-events: none` porque no comunica nada y no puede robarle un click
 * al buscador ni a los botones que tiene encima.
 *
 * El HOST ES la capa —posicionado, sin envoltorio propio— para que cualquier consumidor futuro
 * solo tenga que poner `<app-burbujas-ambiente />` dentro de un contenedor `position: relative`
 * y listo. Pero el `z-index: -1` de abajo SOLO se queda contenido ahí si ESE contenedor ya tiene
 * su propio stacking context — si no, el negativo se escapa hacia arriba y pinta detrás de
 * contenido ajeno a la página entera (la regla del proyecto). Documentado en el README.md de
 * esta carpeta — este componente no puede forzarla desde adentro.
 *
 * CADA burbuja tiene cuatro capas independientes, no una sola:
 *   1. El cuerpo (fondo de `.burbuja`): degradado radial que SOSTIENE color hasta el borde —
 *      es lo que mantiene la silueta reconocible como círculo.
 *   2. El brillo interior (`::before`): un blanco translúcido corrido hacia una esquina, da
 *      volumen sin verse metálico ni glossy.
 *   3. El halo exterior (`::after`): más grande que el cuerpo (inset negativo), detrás de él
 *      (z-index: -1, contenido por el `isolation: isolate` del propio elemento), se desvanece
 *      del todo antes de su propio borde.
 *   4. Las sombras (`box-shadow` de `.burbuja`): luz inset arriba-izquierda, penumbra inset
 *      abajo-derecha y una sombra ambiental exterior desplazada hacia abajo. Es lo que separa
 *      "orbe con volumen" de "disco plano con degradado".
 * Se ajustan por separado a propósito — la primera versión metía cuerpo y halo en el
 * MISMO box-shadow, y al suavizar uno se suavizaba el otro con él: así es como una tanda de
 * ajustes dejó los círculos sin silueta ("manchas pastel", el defecto que corrige este archivo).
 *
 * Los colores NO son iguales en los dos temas por fórmula automática esta vez — el claro usa la
 * paleta pastel exacta de la referencia (cinco tonos con nombre, no derivados), y el oscuro
 * mezcla `--gf-marca-1`/`--gf-marca-3` con `--gf-fondo` vía `color-mix()`, sin una referencia
 * visual que igualar todavía. Es un compromiso, no la regla general del proyecto: cuando SÍ hay
 * una imagen de referencia que iguales al pixel, una paleta escrita a mano le gana a una
 * fórmula — cuando no la hay (el oscuro, aquí), la fórmula evita inventar seis hex a ciegas.
 */
@Component({
  selector: 'app-burbujas-ambiente',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    @for (b of orbes(); track $index) {
      <span
        class="burbuja"
        [class.azul]="b.tono === 'azul'"
        [class.lavanda]="b.tono === 'lavanda'"
        [class.sutil]="b.sutil"
        [class.grande]="b.grande"
        [style.top]="desdeHero(b.top)"
        [style.bottom]="desdeHero(b.bottom)"
        [style.left]="b.left ?? null"
        [style.right]="b.right ?? null"
        [style.--bb-tamano.px]="b.tamano"
        [style.--bb-dx.px]="b.dx"
        [style.--bb-dy.px]="b.dy"
        [style.animation-duration.s]="b.duracionS"
        [style.animation-delay.s]="b.retrasoS ?? 0"
      ></span>
    }
  `,
  styles: `
    /*
     * El host ES la capa: posicionado, detrás de todo, y recortado — pero NO al alto exacto de
     * .hero. El alto real del hero (logo, buscador, cifras) mide bastante menos que hasta donde
     * llega un halo suave, así que recortar en inset: 0 cortaba el degradado en una línea recta
     * antes de que terminara de desvanecerse — eso ES el "efecto contenedor rectangular": no un
     * fondo distinto, es el propio recorte volviéndose visible como borde.
     *
     * Arriba/abajo se extienden 360px de sobra (más que el offset negativo más extremo de
     * cualquier burbuja MÁS el alcance de su propio halo) para que el desvanecido termine solo,
     * antes de llegar al borde. Subió de 260 a 360 al agrandar las burbujas grandes y los halos
     * inferiores — con el tamaño viejo bastaba, con este ya rozaba el borde.
     *
     * Izquierda/derecha, full-bleed: calc(50% - 50vw) lleva cada lado al borde de la pantalla
     * sin importar el max-width de .hero. Antes el host se quedaba al ancho de .hero y recortaba
     * ahí: A y B, que cuelgan fuera de pantalla, salían cortadas en una línea vertical a 95px del
     * borde (a 1440px). Era el mismo "contenedor rectangular", pero en el eje X.
     * 100vw incluye la scrollbar, así que el host se pasa ~5-10px del área visible. Eso NO lo
     * resuelve este componente: lo recorta el overflow-x: clip de app-root (ver app.css). Quien
     * lo use en otro shell necesita ese mismo recorte en un ancestro de ancho completo — ver
     * shared/ui/README.md.
     */
    :host {
      position: absolute;
      --bb-sangrado: 360px;
      top: calc(-1 * var(--bb-sangrado));
      bottom: calc(-1 * var(--bb-sangrado));
      left: calc(50% - 50vw);
      right: calc(50% - 50vw);
      overflow: hidden;
      pointer-events: none;
      z-index: -1;
    }

    .burbuja {
      position: absolute;
      /*
       * min() contra el viewport, no un breakpoint fijo: el tamaño es dato por instancia
       * (la variable --bb-tamano, en línea — así lo pide Angular para algo que varía por
       * burbuja), y un estilo EN LÍNEA gana sobre cualquier regla externa sin !important. min()
       * evita la pelea: cada burbuja YA nace acotada a como mucho 60% del ancho de pantalla, así
       * que en un teléfono de 375px una burbuja pedida a 340px se pinta a 225, sin ninguna regla
       * que la pise. NOTA: sin backticks en este bloque — cierran el template literal de styles
       * ahí mismo (ver angular-std regla 18).
       */
      width: min(var(--bb-tamano), 60vw);
      height: min(var(--bb-tamano), 60vw);
      border-radius: 50%;
      /* Contiene el z-index: -1 del halo exterior (::after) sin tocar el z-index del propio
         elemento — isolation: isolate crea el stacking context con esa única intención. */
      isolation: isolate;
      animation-name: bb-respira;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
    }

    /*
     * Paleta por tono — oscuro primero (es el default del sitio), claro lo sobreescribe más
     * abajo. Los cinco nombres (centro/interior/cuerpo/periferia + halo-base) alimentan las
     * reglas COMPARTIDAS de .burbuja/::before/::after: cambiar de tema es solo cambiar estos
     * valores, la estructura del degradado no se toca.
     */
    .burbuja.azul {
      --bb-centro: color-mix(in srgb, var(--gf-marca-1) 42%, var(--gf-fondo));
      --bb-interior: color-mix(in srgb, var(--gf-marca-1) 30%, var(--gf-fondo));
      --bb-cuerpo: color-mix(in srgb, var(--gf-marca-1) 20%, var(--gf-fondo));
      --bb-periferia: color-mix(in srgb, var(--gf-marca-1) 12%, var(--gf-fondo));
      --bb-halo-base: var(--gf-marca-1);
    }

    .burbuja.lavanda {
      --bb-centro: color-mix(in srgb, var(--gf-marca-3) 42%, var(--gf-fondo));
      --bb-interior: color-mix(in srgb, var(--gf-marca-3) 30%, var(--gf-fondo));
      --bb-cuerpo: color-mix(in srgb, var(--gf-marca-3) 20%, var(--gf-fondo));
      --bb-periferia: color-mix(in srgb, var(--gf-marca-3) 12%, var(--gf-fondo));
      --bb-halo-base: var(--gf-marca-3);
    }

    /* Paleta exacta de la referencia — azul hielo y lavanda, escrita a mano (ver el porqué en
       el JSDoc de arriba). */
    :host-context([data-theme='light']) .burbuja.azul {
      --bb-centro: #f7fbff;
      --bb-interior: #eaf4ff;
      --bb-cuerpo: #dcebff;
      --bb-periferia: #d5e5ff;
      --bb-halo-base: rgb(160, 195, 255);
    }

    :host-context([data-theme='light']) .burbuja.lavanda {
      --bb-centro: #fcfaff;
      --bb-interior: #f3ecff;
      --bb-cuerpo: #ebddff;
      --bb-periferia: #e2d5ff;
      --bb-halo-base: rgb(190, 165, 255);
    }

    /*
     * CAPA 1, el cuerpo: CUATRO paradas, todas opacas — ninguna se desvanece en alfa. Esa
     * responsabilidad es SOLO del halo exterior (capa 3); aquí, mezclar difuminado de color CON
     * difuminado de transparencia al mismo tiempo era lo que dejaba el borde sin suficiente
     * contraste para leerse como círculo, sin importar qué tan opaco estuviera el elemento
     * entero. farthest-side en vez del default (farthest-corner): así el 100% de la parada
     * cae justo en el borde real del círculo —el propio border-radius del elemento— en vez de en
     * la esquina más lejana de una caja cuadrada, que da paradas dispares según la dirección.
     */
    .burbuja {
      background: radial-gradient(
        circle farthest-side at 36% 30%,
        var(--bb-centro) 0%,
        var(--bb-interior) 22%,
        var(--bb-cuerpo) 52%,
        var(--bb-periferia) 100%
      );
      opacity: 0.6;
      /*
       * CAPA 4, las sombras. Tres, y ninguna de color puro: la luz inset es blanca, la penumbra
       * y la sombra exterior salen del tono del halo — una sombra gris sobre un pastel lo
       * ensucia. La exterior va DESPLAZADA hacia abajo (sombra ambiental, apoya el orbe en el
       * fondo); centrada sería otro halo más, no profundidad. Estáticas: la animación solo
       * mueve transform, así que el navegador no las vuelve a rasterizar por cuadro.
       */
      box-shadow:
        inset 0.03em 0.03em 0.08em rgba(255, 255, 255, var(--bb-luz-inset)),
        inset -0.035em -0.045em 0.1em color-mix(in srgb, var(--bb-halo-base) var(--bb-penumbra), transparent),
        0 0.035em 0.09em color-mix(in srgb, var(--bb-halo-base) var(--bb-sombra), transparent);
      /* Las sombras se escalan con el orbe: 1em = su diámetro, así una de 65px y una de 400px
         conservan la misma proporción de luz en vez de compartir 32px fijos. */
      font-size: min(var(--bb-tamano), 60vw);
      --bb-luz-inset: 0.07;
      --bb-penumbra: 14%;
      --bb-sombra: 0%;
    }

    /* Claro: los valores del brief. Opaco (85-100% de cuerpo) — un cuerpo translúcido es lo que
       volvía "manchas" a los acentos chicos. */
    :host-context([data-theme='light']) .burbuja {
      opacity: 1;
      --bb-luz-inset: 0.42;
      --bb-penumbra: 10%;
      --bb-sombra: 7%;
    }

    /*
     * CAPA 2, brillo interior: blanco translúcido corrido hacia arriba-izquierda, para dar
     * volumen sin caer en glossy/plástico. --bb-brillo separa la intensidad por tema —en oscuro,
     * un blanco tan marcado como el de la referencia se vería como un reflejo de plástico sobre
     * un cuerpo ya de por sí tenue; en claro, contra un cuerpo casi blanco, puede ser el de la
     * referencia sin que se note "encendido".
     */
    .burbuja::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      --bb-brillo: 0.16;
      background: radial-gradient(
        ellipse at 32% 25%,
        rgba(255, 255, 255, var(--bb-brillo)) 0%,
        rgba(255, 255, 255, calc(var(--bb-brillo) * 0.45)) 32%,
        transparent 72%
      );
    }

    :host-context([data-theme='light']) .burbuja::before {
      --bb-brillo: 0.4;
    }

    /*
     * CAPA 3, halo exterior: más grande que el cuerpo (inset negativo) y DETRÁS de él —contenido
     * por el isolation: isolate de .burbuja, ver arriba—, para que su propio color no se mezcle
     * encima del cuerpo cerca del centro. Se desvanece del todo al 78% de SU PROPIO radio —más
     * chico que el 100%— para no dejar un anillo residual justo en su borde.
     */
    /*
     * La forma del degradado importa más que su intensidad: MESETA hasta el borde del cuerpo
     * (~57% del radio del halo con inset -38%) y caída después. Antes caía desde el centro y
     * terminaba al 78% —con inset -24% eso dejaba apenas un 10% de radio de glow por fuera del
     * círculo: en los acentos chicos, 5px. El brief lo pide al revés: más intenso pegado al
     * borde, más transparente al alejarse. Todo lo que queda bajo el cuerpo no se ve —
     * el halo está detrás—, así que la meseta solo cuenta desde el borde hacia afuera.
     */
    .burbuja::after {
      content: '';
      position: absolute;
      inset: -38%;
      border-radius: 50%;
      z-index: -1;
      --bb-halo: 22%;
      background: radial-gradient(
        circle closest-side,
        color-mix(in srgb, var(--bb-halo-base) var(--bb-halo), transparent) 0%,
        color-mix(in srgb, var(--bb-halo-base) calc(var(--bb-halo) * 0.85), transparent) 55%,
        color-mix(in srgb, var(--bb-halo-base) calc(var(--bb-halo) * 0.5), transparent) 67%,
        color-mix(in srgb, var(--bb-halo-base) calc(var(--bb-halo) * 0.16), transparent) 82%,
        transparent 96%
      );
    }

    /*
     * Las dos que ENMARCAN el hero (A y B) — más presencia que un acento chico, a propósito.
     * Suben los tres números que hacen sentir "orbe de luz" y no "círculo de color": la opacidad
     * del cuerpo, el brillo interior (más lechoso), y el alcance + intensidad del halo exterior.
     * Nada de esto es una capa nueva — son las MISMAS tres capas de siempre, con más volumen.
     */
    .burbuja.grande {
      opacity: 0.78;
    }

    :host-context([data-theme='light']) .burbuja.grande {
      opacity: 1;
    }

    .burbuja.grande::before {
      --bb-brillo: 0.24;
    }

    :host-context([data-theme='light']) .burbuja.grande::before {
      --bb-brillo: 0.52;
    }

    .burbuja.grande::after {
      --bb-halo: 28%;
    }

    /*
     * Los halos ambientales del punto F: SIN silueta a propósito —justo lo opuesto de A-E—, así
     * que el cuerpo se reescribe con una caída corta (el mismo defecto que se corrigió arriba,
     * aquí es la INTENCIÓN) y el brillo interior se apaga entero: un reflejo no tiene sentido en
     * algo que no pretende leerse como círculo.
     */
    .burbuja.sutil {
      background: radial-gradient(
        circle,
        var(--bb-cuerpo) 0%,
        color-mix(in srgb, var(--bb-cuerpo) 65%, transparent) 60%,
        transparent 100%
      );
      opacity: 0.42;
    }

    /* Ni reflejo ni sombras: las dos presuponen un borde que aquí no existe a propósito. */
    .burbuja.sutil::before {
      content: none;
    }

    .burbuja.sutil {
      box-shadow: none;
    }

    :host-context([data-theme='light']) .burbuja.sutil {
      opacity: 0.8;
    }

    /*
     * Respiración lenta y orgánica, no globos flotando: desplazamiento chico (--bb-dx/--bb-dy,
     * 8-18px por spec), escala casi imperceptible (0.99 a 1.02). Solo transform — ni box-shadow,
     * ni filter, ni background-image, tal como pide el punto 9 del brief; el color-mix() de las
     * capas de arriba es estático, la animación nunca lo recalcula. Cada burbuja trae su propia
     * duración y retraso por animation-duration/animation-delay en línea (arriba, por instancia)
     * — así ninguna respira en el mismo compás que su vecina.
     */
    @keyframes bb-respira {
      0%,
      100% {
        transform: translate(0, 0) scale(0.99);
      }
      50% {
        transform: translate(var(--bb-dx, 12px), var(--bb-dy, -10px)) scale(1.02);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .burbuja {
        animation: none;
      }
    }

    /*
     * Compacta en móvil: la composición de 7 burbujas está pensada para un hero ancho. A 640px
     * se apagan las de acento y los halos —quedan solo las dos grandes, que son las que de
     * verdad enmarcan— para no llenar de ruido una pantalla que ya es angosta. El TAMAÑO no
     * necesita regla aquí: el min() de arriba ya las acota al 60% del viewport solo.
     *
     * Y una restricción que manda sobre la composición: NADA detrás del logotipo. Su WebP animado
     * no tiene alfa (ver iconos.css, "SIN resplandor de marca"), así que cualquier halo detrás
     * dibuja el rectángulo entero de la imagen. Pasado ~1180px las esquinas quedan lejos del logo;
     * por debajo, A y B bajan a flanquear el buscador y D —que cae justo detrás— se apaga.
     * Con translate y no con top: el top va en línea por instancia y le ganaría a esta regla, y
     * translate se compone con el transform de bb-respira en vez de pisarlo.
     * Las cifras salen de: fondo del logo + 20px de aire + el alcance del halo (38% del diámetro).
     */
    @media (max-width: 1180px) {
      .burbuja:nth-child(4) {
        display: none;
      }

      /* Y también hacia afuera: a esta altura quedan detrás de la rejilla de iconos, y en oscuro
         el cuerpo teal bajo las etiquetas de 12px las dejaba en 2.3:1 (medido, contra 4.5 de AA).
         160px más al borde sacan el cuerpo de debajo del texto; ahí solo llega la cola del halo. */
      .burbuja:nth-child(1) {
        translate: -160px 540px;
      }

      .burbuja:nth-child(2) {
        translate: 160px 660px;
      }
    }

    @media (max-width: 640px) {
      .burbuja:nth-child(3),
      .burbuja:nth-child(5),
      .burbuja.sutil {
        display: none;
      }

      /* El logo y el halo escalan con el ancho aquí (logo al 100% menos márgenes, orbe al 60vw),
         así que la bajada también: a 375px deja A en 238px, a 640px en 387px. */
      .burbuja:nth-child(1) {
        translate: 0 calc(180px + 57vw);
      }

      .burbuja:nth-child(2) {
        translate: 0 calc(400px + 57vw);
      }
    }
  `,
})
export class BurbujasAmbiente {
  readonly orbes = input<readonly Burbuja[]>(BURBUJAS_HERO);

  /**
   * Las offsets de `Burbuja` se escriben contra el borde del CONTENEDOR (.hero), que es como se
   * piensan. Pero el host se estira --bb-sangrado por arriba y por abajo, y un `top` crudo se
   * medía desde ahí: A, B y D quedaban 360px más arriba de lo escrito — A y B, las dos que
   * enmarcan, fuera de pantalla por completo. Esto traduce una sola vez, aquí.
   */
  protected desdeHero(offset: string | undefined): string | null {
    return offset === undefined ? null : `calc(var(--bb-sangrado) + ${offset})`;
  }
}
