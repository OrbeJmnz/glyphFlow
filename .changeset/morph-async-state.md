---
'glyphflow': minor
---

`<gf-icon-morph>` now speaks in states: `asyncState` covers idle → loading → success → error

Every app writes this by hand — a button that spins, then shows a tick, then goes back to normal.
Now it's four inputs:

```html
<gf-icon-morph [asyncState]="state()" [autoReset]="2000"
  [idleIcon]="sparklesIcon" [loadingIcon]="loaderCircleIcon"
  [successIcon]="checkIcon"  [errorIcon]="triangleAlertIcon" />
```

**`loading` is not a morph.** A morph is one shot with an end; a spinner has none, and implementing
it as a looping morph flickers. The loading state runs a real rotation — `iterations: Infinity`,
`linear`, because any easing puts a pulse into every turn — on a `<g>` of its own, never on the
`<path>`. The crossfade fallback animates the figure's `transform`, and two animations on the same
property of the same element overwrite each other.

**When the answer arrives the spinner settles rather than finishing its lap.** It travels to the
nearest resting angle, never more than half a turn, in 240 ms. Completing the turn at constant speed
sounds better on paper, but the `<path>` is already morphing into the tick while the group keeps
rolling: a fast server would leave the tick spinning for up to a second after the answer was already
on screen.

`autoReset` sends a terminal state back to idle on its own. It moves the icon, not your input —
`asyncState` is yours to own, so showing two successes in a row means passing through `loading`
again, the same way it happens for real.

Under `prefers-reduced-motion` the loading icon still appears, it just doesn't spin. The state is
information, not decoration.
