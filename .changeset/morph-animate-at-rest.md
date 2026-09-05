---
'glyphflow': minor
---

`<gf-icon-morph>` gains `animateAtRest`: the icon on each end of a morph gets its own draw and hover

Until now a morph pair only ever painted a single flattened `<path>` — the geometry that WAAPI needs
to interpolate, with none of the choreography (`autoDraw`, hover) that a plain `<gf-icon>` gets for
free. Toggling between two icons meant either icon looked "dead" at rest: no entrance draw, no hover
gesture, just the shape sitting there.

```html
<gf-icon-morph [icon]="open() ? xIcon : menuIcon" [animateAtRest]="true" restHoverAnimation="wiggle" />
```

With `animateAtRest`, outside of a transition the flattened path is replaced by a real `<gf-icon>` —
it gets its own `autoDraw` entrance and its own hover, exactly as if it were used on its own. A
**fresh** `<gf-icon>` mounts on every landing, on purpose: `trigger="group"` only fires its entrance
draw from `ngAfterViewInit`, not on an `[iconDef]` change over a living instance, so reusing one
instance across icons would silently drop the draw on every icon after the first.

This only applies to the plain `[icon]` path. `intent` and `asyncState` already have their own rest
semantics — the active side of an intent, the `loading` spinner — and mixing those with "rest = a
real animated icon" isn't defined, so `animateAtRest` is silently ignored there.

It requires the full `AnimatedIconDef` in `icon` (the same object `<gf-icon iconDef>` already takes),
not a bare `{shapes}` value — the morph engine itself never needed `.animations`, but the nested
`<gf-icon>` does.

A second, independent addition: **`morphed` now fires whenever a transition settles**, with or
without `animateAtRest` — a transition superseded by a newer one before landing never fires it.
