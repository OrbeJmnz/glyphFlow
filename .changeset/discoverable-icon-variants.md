---
'glyphflow': minor
---

`IconMeta.variants` and `ICON_VARIANTS` — you can now discover what animations an icon has, without
paying for the catalog to find out.

You could always ask for a variant (`animation="rotate"`). What you couldn't do was ask an icon what
its options *were*. The only way was `Object.keys(ANIMATED_ICONS[name].animations)`, and touching
`ANIMATED_ICONS` drags in the full catalog — the exact cost `provideIconCatalog()` exists to avoid.

`ICON_VARIANTS: Record<string, readonly string[]>` is a new standalone, tree-shakeable export — same
shape as `ICON_TAGS`, same reason: importing it alone doesn't pull in geometry for the other 1766
icons. `IconMeta` gains a matching `variants: readonly string[]` field, populated the same way
`tags` is, for callers who already pay for `ICON_META`.

Every icon's list always starts with `'draw'` — `icon()` injects it first, so this is a hard
invariant, not a convention. `trash` reads `['draw', 'default', 'active']`.

No bundle impact: `core` and the tree-shakeable per-icon import both hold their existing budgets.
