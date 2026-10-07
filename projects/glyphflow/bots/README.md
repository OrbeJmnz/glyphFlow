# glyphflow/bots

`<gf-bot>`: personajes animados con la Web Animations API nativa, sin dependencias de animación. Esta carpeta es
documentación **de desarrollo** (no se publica con el paquete, que solo lleva el README de la raíz) hasta que los bots salgan.

Cinco entry points, cada uno paga solo lo que se importa:

| Entry | Qué trae | Peso (gzip, medido por `npm run bundle-check`) |
| --- | --- | --- |
| `glyphflow/bots` | el motor, el componente, las formas, `gfBotKit` | motor 49 KB · con una forma 56.7 KB · con `<gf-bot>` 64.9 KB |
| `glyphflow/bots/extras` | los 16 sombreros con su física, los juguetes (`star`, `ball`, `cookie`) y las rutinas de `working`/`sleeping` | opt-in: con todo, motor y una forma suman ~83 KB |
| `glyphflow/bots/gestures` | los 20 gestos físicos y el modo IA | +1.7 KB el primero que se use (cada gesto es un objeto suelto) |
| `glyphflow/bots/ai` | `bindAgent` y los adaptadores del Vercel AI SDK y de Anthropic | 0.64 KB; sin dependencias (lee los eventos de forma estructural) |
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

### Extras: sombreros y juguetes (`glyphflow/bots/extras`)

Los sombreros (con su física), los juguetes y las rutinas de `working` y `sleeping` no vienen en el motor: quien no los usa no los paga. Se piden con `extras`:

```ts
import { hatsExtra, toysExtra, routinesExtra } from 'glyphflow/bots/extras';

const bot = createBot(host, { shape: catShape, hat: 'wizard', extras: { hats: hatsExtra, toys: toysExtra, routines: routinesExtra } });
bot.toy('ball', 120, 150);
```
```html
<gf-bot [shape]="catShape" hat="wizard" [extras]="{ hats: hatsExtra, toys: toysExtra, routines: routinesExtra }" />
```

Sin `extras.hats`, `hat` con un sombrero se ignora (los accesorios sueltos como `glasses` siguen funcionando: no son sombreros) y
sin `extras.toys`, `bot.toy()` no hace nada. Sin `extras.routines`, `working` y `sleeping` solo respiran (y trabajando entrecierra los ojos): no hay
rotación de rutinas, ni `setRoutine()`, ni `onRoutine`. **El modo IA no lo necesita**: las tres rutinas de sus escenas (`thinking`, `analyzing`,
`loading`, con sus variantes) viven en el motor, así que `bot.agent()` se ve completo sin extras. Se leen al crear el bot: no cambian después.
Quien pide **todo** paga unos 6 KB más que antes de separarlos, porque el entry no comparte diccionario de compresión con el motor; el resto
paga 20.6 KB menos.

### Modo IA con un SDK (`glyphflow/bots/ai`)

`bindAgent` conecta el stream de un SDK con el bot: traduce cada evento a un paso (`thinking`, `tool`, `writing`, `done`…) y se lo pasa a
`bot.agent(...)`. No depende de ningún SDK: lee los eventos de forma estructural, así que no añade nada a tu `package.json`.

```ts
import { bindAgent, vercelAi, anthropic } from 'glyphflow/bots/ai';

// Vercel AI SDK 5+: `fullStream` de streamText, o los chunks de UI de useChat
const run = bindAgent(bot.api, result.fullStream, vercelAi);
// Anthropic: el stream de la API de Mensajes
const run2 = bindAgent(bot.api, await client.messages.stream({ ... }), anthropic);

await run.done;   // 'finished' | 'error' | 'stopped' (nunca rechaza)
run.stop();       // corta el stream y suelta al bot
```

Colapsa los pasos repetidos (un `text-delta` por token se ve como un solo `writing`), avisa `prompt` al arrancar (`{ prompt: false }` lo
omite), cierra con `done` si el stream se agota sin un final y marca `error` si el stream lanza. Un error de **herramienta** del Vercel AI SDK
no cuenta como error del agente. En Anthropic, un `message_stop` con `stop_reason: 'tool_use'` no cierra el turno: si haces tú el bucle de
herramientas, encadena los streams de cada petición en un solo `AsyncIterable` y pásalo a `bindAgent`.

Las tablas de mapeo están en el JSDoc de cada adaptador. **Los streams de las pruebas están escritos a mano** siguiendo el orden que documenta
cada SDK; no están grabados de la red ni comprobados contra los tipos reales (no se instalan los SDKs). Si uno cambia sus nombres, el adaptador
simplemente deja de reaccionar a esos eventos: vuelve a grabar un stream y compara.

### Intensidad: cuánto se mueve un gesto

```ts
bot.gesture('frontFlip', { intensity: 0.5 });   // la mitad de recorrido y de deformación
createBot(host, { shape, intensity: 0.7 });      // el valor por defecto de este bot (o `<gf-bot [intensity]="0.7">`)
```

`1` es el gesto tal como está escrito, `0` apenas se separa del reposo y `2` es el doble; se acota a 0–2 y lo que no es un número vale 1. La
llamada pisa al bot, y un gesto en cola conserva la suya. Escala el recorrido, la deformación del cuerpo, la falda y el gel; **no escala los
giros** (con menos intensidad el salto es más bajo, pero un mortal sigue siendo una vuelta completa) **ni** los términos de forma que son el
punto del gesto (el charco y la bola). Los efectos de luz y las caras no se atenúan con ella. Útil para un bot discreto en una interfaz densa,
o para exagerar una celebración.

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
