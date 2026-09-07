---
'glyphflow': patch
---

Fixes `animateAtRest` replaying the landed icon's own entrance draw on every single morph
landing, not just the first. The rest `<gf-icon>` genuinely remounts fresh each time (that's what
gives it its own hover), and a fresh mount in `group` trigger mode always plays its `draw` variant
— so a real toggle (favorite, mute, pin…) looked like the icon "reloaded" itself on every click.
Now only the very first landing draws; later ones land already fully drawn, ready for hover.
