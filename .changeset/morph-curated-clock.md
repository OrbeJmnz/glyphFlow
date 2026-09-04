---
'glyphflow': patch
---

Curated morphs no longer freeze halfway through when the spring overshoots

`morphKeyframes` derives each offset from the moment the spring first crosses its target. With a
spring that overshoots, that happens well before the end: 54.7% of the clock with `snappy`, 19.2%
with `bouncy`. The geometric branch compensates by drawing the bounce and closing on offset 1. The
curated branch never did — its last keyframe sat at 0.547, and WAAPI holds a property from its final
offset to the end of the animation. So the icon finished morphing, stood still for the rest of the
duration, and then jumped slightly as the resting `d` was written.

Fixed by trimming the clock rather than drawing the bounce: offsets are rescaled so the last one is
1, and the duration shrinks by the same factor. **No pose moves in real time.** `copy`→`check` with
`snappy` went from 317 ms with its final pose at 173 ms, to 173 ms with its final pose at 173 ms —
the visible motion is identical and only the dead tail is gone. Drawing the bounce would need a way
to cap how far a figure may leave the canvas, and two of the three curated constructors have no plan
to measure that against.

This affects the nine curated pairs — `sun`/`moon`, `copy`/`check`, `eye`/`eye-off`,
`eye`/`eye-closed`, `volume`/`volume-off` and the `-off` pattern on `bell`, `pin`, `star` and
`heart` — for anyone passing them `snappy` or `bouncy`. With `smooth` nothing changes: it never
reaches exactly 1, so it never took the early exit.

One observable consequence: the animation's `finished` promise now resolves when the motion ends
instead of after the hold. Anything chained to it fires earlier.
