# glyphflow/bots

`<gf-bot>`: personajes animados con la Web Animations API nativa, sin dependencias de animación. Esta carpeta es
documentación **de desarrollo** (no se publica con el paquete, que solo lleva el README de la raíz) hasta que los bots salgan.

Tres entry points, cada uno paga solo lo que se importa:

| Entry | Qué trae | Peso (gzip, medido por `npm run bundle-check`) |
| --- | --- | --- |
| `glyphflow/bots` | el motor, el componente, las formas, `gfBotKit` | motor 69 KB · con una forma 76 KB · con `<gf-bot>` 85 KB |
| `glyphflow/bots/gestures` | los 20 gestos físicos y el modo IA | +1.7 KB el primero que se use (cada gesto es un objeto suelto) |
| `glyphflow` | los iconos | independiente: bots e iconos no se arrastran (lo vigila `bundle-check`) |

## Uso

```ts
import { createBot, catShape } from 'glyphflow/bots';
import { physicalGestures } from 'glyphflow/bots/gestures';

const bot = createBot(host, { shape: catShape, gestures: physicalGestures });
bot.superBounce();        // los gestos del paquete salen como métodos, tipados
const g = bot.gesture('superBounce'); // o por nombre: devuelve un handle { ms, finished, cancel() }
```

```html
<gf-bot [shape]="catShape" [gestures]="{ frontFlip, superBounce }" [followPointer]="true" />
```

Pasa solo los gestos que uses (`{ frontFlip, superBounce }`): `physicalGestures` los trae todos y paga todos.

### Ciclo de vida de un gesto

`bot.gesture(id)` y cada gesto como método (`bot.frontFlip()`) devuelven un handle:

```ts
const g = bot.gesture('frontFlip');
g.ms;                 // lo que dura (0 si no corrió)
await g.finished;     // 'done' | 'interrupted' | 'ignored' (nunca rechaza)
g.cancel();           // lo corta si sigue vivo, o lo saca de la cola
bot.gesture('stretchSnap', { policy: 'ignore' }); // qué hacer si ya hay uno corriendo
```

| `policy` | Si ya hay un gesto corriendo |
| --- | --- |
| `'replace'` (por defecto) | el nuevo lo corta y descarta la cola |
| `'queue'` | espera a que termine solo (hasta 3 en espera; el resto se ignora). Si el actual se interrumpe, la cola se descarta |
| `'ignore'` | el nuevo no corre |

Cada gesto corre con su propia bolsa de timers: lo que programa con `kit.later` se apaga con `cancel()` o al ser
interrumpido, y terminar solo no toca lo que dejó para después (el regreso a reposo, por ejemplo). Interrumpen un gesto
cualquier acción del motor (`hop`, `wave`…), un cambio de estado, tocar o arrastrar al bot, y destruirlo.

## Los gestos (`glyphflow/bots/gestures`)

Cada uno se compone con las primitivas de movimiento; ninguno es `translate + rotate + scale`. Duran lo que diga
`--gf-bot-<id>-duration` (o `--<id>-duration`) del bot o de un ancestro, y con movimiento reducido son un saltito corto.

| Gesto | `id` CSS | ms | Qué hace |
| --- | --- | --- | --- |
| `frontFlip` | `flip` | 1000 | salto mortal frontal con cuerpo de gel, falda, flechas, rayos |
| `superBounce` | `super-bounce` | 1500 | se comprime, sale disparado, dos rebotes que pierden ~60 % |
| `stretchSnap` | `stretch-snap` | 700 | se estira como chicle y chasquea |
| `scaredRecoil` | `scared-recoil` | 900 | susto: los ojos reaccionan antes que el cuerpo |
| `jellyWobble` | `jelly-wobble` | 1000 | golpe lateral: la onda de gel baja por el cuerpo |
| `waveThroughBody` | `wave-through-body` | 1100 | una onda cruza la silueta; el centro no se mueve |
| `tornadoSpin` | `tornado-spin` | 1300 | giro cada vez más rápido, cabeza ancha y base estrecha |
| `inflateRelease` | `inflate-release` | 1200 | se infla como un globo de gel y suelta el aire |
| `puddleMorph` | `puddle-morph` | 1800 | se derrite a un charco y se levanta |
| `jellyDrop` | `jelly-drop` | 1500 | aparece cayendo y se aplasta como una masa de gel |
| `spinSquash` | `spin-squash` | 1000 | giro sobre su eje con volumen |
| `sideDodge` | `side-dodge` | 800 | esquiva lateral con la falda rezagada |
| `backflip` | `backflip` | 1100 | carga hacia delante y gira -360° (no es el flip al revés) |
| `doubleFlip` | `double-flip` | 1400 | 720°, el especial (úsalo poco) |
| `sideCartwheel` | `side-cartwheel` | 1200 | rueda lateral, aterriza primero de un lado |
| `ghostSwoop` | `ghost-swoop` | 1600 | recorre una S inclinándose hacia donde va |
| `squishTeleport` | `squish-teleport` | 2000 | se comprime a una línea y reaparece en otro sitio (ida y vuelta) |
| `ballMorph` | `ball-morph` | 2000 | se pliega a una bola, rebota, se despliega |
| `peekPop` | `peek-pop` | 2400 | se esconde bajo el suelo, asoma los ojos y aparece de golpe |
| `diveEmerge` | `dive-emerge` | 2600 | se zambulle en el suelo con ondas y emerge |

`landingPose(ctx, ms, 'happy' | 'proud' | 'dizzy' | 'surprised')` y `withLanding(gesto, pose)` encadenan una cara de
aterrizaje tras cualquier gesto que devuelva su duración.

## Modo IA

```ts
import { agentReactions } from 'glyphflow/bots/gestures';
createBot(host, { shape, gestures: physicalGestures, onAgentEvent: agentReactions() });
bot.agent('thinking'); bot.agent('done');
```

`prompt → jellyWobble`, `thinking → stretchSnap`, `tool → sideDodge`, `loading` largo → `puddleMorph`, `done → frontFlip` (o `doubleFlip`
raro tras una tarea larga) con pose de aterrizaje, `error → jellyDrop | scaredRecoil`, `idle` largo → `peekPop`. `writing` no hace nada.
Enfriamiento por gesto; nada con movimiento reducido ni en pausa. `map`, `cooldownMs`, `longTaskMs`, `rareChance`, `waitMs`,
`idleAfterMs` lo ajustan. Si el manejador devuelve la duración de un gesto, las escenas `done`/`error` conservan su palomita y su
«!» pero no meten su propio brinco encima.

## Seguir el puntero

`bot.followPointer(true)` o `[followPointer]="true"`: la cabeza mira al cursor. Un solo listener para todos los bots, trabajo una vez por
cuadro. No sigue con movimiento reducido, en pausa, dormido, arrastrando ni con el dedo.

## Cómo se compone un gesto (`gfBotKit`)

Un gesto es una **partitura**: nodos `[t, valor]` por canal (`x`, `y`, `roll`, `yaw`, `sx`, `sy`, `spread`, `drag`, `gel`), que el ejecutor
reparte entre el contenedor `.hop` (trayectoria y squash en el suelo, anclado a la base), la pose (giro y squash en el aire) y la silueta.
Más un **campo de deformación por región** (`shear`, `wave`, `taper`, `bulge`, `melt`, `ball`) donde cada parte del cuerpo tiene su propio retraso.

```ts
import { gfBotKit } from 'glyphflow/bots';
const { motion, eyeSeq, setMouth, later, S } = gfBotKit;

export function miGesto(ctx) {
  const m = motion;
  const def = {
    score: m.score(m.settle(0), m.anticipate(0.1, { sy: 0.85, sx: 1.12 }), m.launch(0.3, { y: -60, sy: 1.2 }), m.impact(0.7, { y: 0, sy: 0.8 }), m.settle(1)),
    grounded: (t) => (t < 0.2 || t > 0.7 ? 1 : 0),
  };
  const ms = m.gestureDuration(ctx, 'mi-gesto', 900);
  ctx.hooks.act(ms);
  const at = m.runGesture(ctx, def, ms);
  m.shadowByHeight(ctx, at, ms, 60);
  return ms; // devolver la duración permite encadenarlo (withLanding, agentReactions)
}
```

Primitivas (todas aceptan `intensity`): `key`, `anticipate`, `launch`, `impact`, `overshoot`, `settle`, `jump`, `rotate`, `spin`, `bounce`,
`wobble`, `secondaryMotion`. Todos los canales valen reposo en t = 0 y t = 1: el gesto termina **exactamente** en la geometría original.

## Personalidad por forma

Las primitivas son compartidas; la RESPUESTA cambia por forma (`GfBotShape`):

- `flex`: cuánto se deja deformar la silueta (Tofu 0.45, Robot 0.5). `melt`, `ball` y los gestos que cambian de forma a propósito lo ignoran.
- `feel: { hem, gel, squash }`: falda, gel y squash. Fantasma y pulpo arrastran más la falda; el robot es más seco.
- `acc[].lag` / `acc[].swing`: cada accesorio va con la región del cuerpo donde está pegado, con retraso y balanceo (la cola del gato cuelga al
  saltar, la antena del robot es flexible).

## Reglas que ya costaron caro

- Un entry point secundario importa del motor **por nombre de paquete** (`from 'glyphflow/bots'`), nunca por ruta relativa: duplicaría el código.
- Nada a nivel de módulo que sea una llamada sin `/* @__PURE__ */`: las partituras se arman al primer uso, no al importar (el peso de
  quien no usa un gesto sigue en cero). El caso de un gesto en `bundle-check` vigila que no se rompa.
- `act()` borra los temporizadores del bot: lo que deba sobrevivir (el regreso a reposo tras `done`/`error`) va en `ctx.toyTimers`.
- Un gesto se revisa con el motor real y **en silueta** (sin cara, colores ni efectos): si la física no se entiende sin la cara, se refina la silueta.
- `verify:clean` antes de decir «verificado»: baja el servidor de la demo y borra `node_modules`.
