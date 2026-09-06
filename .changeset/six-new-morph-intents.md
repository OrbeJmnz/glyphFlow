---
'glyphflow': minor
---

`glyphflow/morph` gains six curated `MorphIntent` constants: `LIKE_INTENT`, `FAVORITE_INTENT`,
`NOTIFY_INTENT`, `PIN_INTENT`, and `VOLUME_INTENT`, alongside the existing six.

```html
<gf-icon-morph [intent]="LIKE_INTENT" [active]="meGusta()" [animateAtRest]="true" />
```

| Constant | idle → active | Icons |
| --- | --- | --- |
| `LIKE_INTENT` | not liked → liked | `heartIcon` → `heartOffIcon` |
| `FAVORITE_INTENT` | not favorited → favorited | `starIcon` → `starOffIcon` |
| `NOTIFY_INTENT` | notifications on → muted | `bellIcon` → `bellOffIcon` |
| `PIN_INTENT` | pinned → unpinned | `mapPinIcon` → `mapPinOffIcon` |
| `VOLUME_INTENT` | sound on → muted | `volume2Icon` → `volumeOffIcon` |

All five reuse curated geometry that already existed in `curated-morphs.ts` — with one exception.
`VOLUME_INTENT` pairs `volumeOffIcon` with `volume2Icon` (the two-wave icon), not the bare
`volumeIcon` the existing `volumeOff↔volume` entry covered. `volume2Icon` has two waves that
`volumeOffIcon` doesn't, so the existing `construirConSatelites` (which only shrinks satellites
that already exist in the origin icon) couldn't animate them — they'd have popped in unanimated
right when the transition landed.

This adds `construirConSatelitesYEntrada`, a mirror-image extension: satellites that only exist in
the origin shrink toward the final body's outline (unchanged from `construirConSatelites`), and
pieces that only exist in the destination grow from a matching point on the origin body's outline
— same nearest-angle-in-a-shared-centroid trick, applied in both directions. It's additive; no
existing curated pair changes behavior.
