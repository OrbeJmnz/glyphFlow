---
'glyphflow': minor
---

Adds `glyphflow/bots`: animated characters with real physical motion (squash, stretch, impact and
secondary motion) on the native Web Animations API, still with zero animation dependencies.

```html
<gf-bot [shape]="catShape" [gestures]="{ frontFlip, superBounce }" />
```

The feature is split into entry points so you only pay for what you import:

- `glyphflow/bots` — the engine, `<gf-bot>` and the shapes (`mochiShape`, `catShape`, `ghostShape`,
  `octopusShape`, `tofuShape`, `robotShape` and the night set). Importing only the state ids pulls
  none of the engine.
- `glyphflow/bots/gestures` — 20 gestures, each importable on its own. Write your own with `gfBotKit`.
- `glyphflow/bots/extras` — hats, toys and routines, opt-in and tree-shakeable one by one.
- `glyphflow/bots/ai` — `bindAgent` plus adapters for the Vercel AI SDK and Anthropic streams, so a bot
  reacts to each step of an agent.

Customisation: your own palettes (`palette` takes a trio or `{ colors, rim }`), hats (`defineHat`),
toys (`defineToy`) and skins. A custom skin is an id with the `x-` prefix (`skin="x-sunset"`), painted
through the `--gf-skin-*` and `--bot-*` CSS variables; it changes colour only.

Gestures have a lifecycle: `bot.gesture(id, { policy, intensity })` returns `{ id, ms, finished, cancel }`
and `policy` decides what happens when another gesture arrives (`replace`, `queue` or `ignore`).

`<gf-bot>` follows the pointer by default (`[followPointer]="false"` turns it off). While a gesture
runs the head straightens, and once it ends the bot looks at the cursor again. It never follows with
reduced motion, while paused or asleep, while dragged, or on touch. With `createBot` it stays explicit:
`bot.followPointer(true)`.
