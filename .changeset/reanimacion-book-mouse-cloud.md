---
'glyphflow': minor
---

Reanimated 80 curated icons across `book`, `calendar`, `circle`, `clipboard`, `clock`, `cloud`,
`copy`, `dice`, `grid`, `heading`, `image`, `map`, and `mouse`, and added a `hold` variant to
several icons that didn't have one yet — `clock-arrow-down/left/right/up`, `log-out`, `cloud-sync`,
`cloud-backup`, `clipboard-copy`.

`clipboard-copy`'s `peel` used to move only its arrowhead while the shaft stayed put, splitting the
arrow in two — both figures now draw and travel together, sharing the exact same keyframes so they
can't drift apart. `copy-check/minus/plus/slash/x`'s `peel` was a bigger version of the same
one-shot slide as `default`; it's now `copy`'s own `active` (the two sheets actually separate and
hold) plus the badge drawing on top of the front sheet, mirroring the existing "badge mounted on
the sheet" convention.

`dice-1`…`dice-6` rolled around a corner of their own square instead of its center, outside the
default 24px render size — a root-level transform needs a percentage origin (`50% 50%`), not `px`,
since the engine only sets `transform-box: view-box` on child figures, never on the root `<svg>`.

Fixed a real tree-shaking regression this batch introduced along the way: a non-trivial expression
(a binary sum, a `.filter()`, a spread) written inline as an argument to an already-
`/* @__PURE__ */`-annotated call kept Rollup from proving the whole call side-effect-free, so 8 of
the touched icons stayed in every bundle — including the bare component with no icon imported at
all. Precomputing those expressions into their own constants fixed it, and the measured numbers
ended up BELOW the previous baseline: `core` 4.65 → 4.06 KB gzip, one icon 4.90 → 4.48 KB.
