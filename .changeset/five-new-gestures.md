---
'glyphflow': minor
---

Five new variants across 194 icons, and the `hold` variant is now actually visible on 219 more.

**`strike`** — 79 icons in the `-off` family. They all share one anatomy: the base drawing plus a
diagonal that crosses it out, so the gesture is derived from each icon's own geometry rather than
written by hand. The diagonal draws corner to corner, the icon recoils as if it took the hit, and
each figure dims at the moment the cut actually reaches it — its projection onto the cut's axis,
measured from the corner where the blade enters its box and scaled by how long the stroke takes.
`fish-off` and `screen-share-off` are the two exceptions: the first carries the diagonal fused into
a compound path, the second has no diagonal at all.

**`flip`** — 50 icons across 25 opposite pairs (`undo`/`redo`, `rotate-ccw`/`rotate-cw`,
`chevron-up`/`chevron-down`, `thumbs-up`/`thumbs-down`, `skip-back`/`skip-forward`,
`trending-up`/`trending-down`, `forward`/`reply`, `git-branch`/`git-merge`…). The icon shows its
opposite, holds it for a beat, and comes back. The pairs weren't picked by name: all 1767 geometries
were sampled point by point to find which ones are an exact mirror or half-turn of each other. There
are 97 such pairs in the catalog; these 25 are the ones where reversing means something in a UI. On
a plain directional arrow the direction *is* the meaning, so those were left alone.

**`nudge`** — the 22 `align-*` and the 14 `monitor-*`, two families that had nothing but `default`.
The align icons perform the operation the button promises: the boxes start out of line and snap
into place, moving perpendicular to their guides, which never move because they're the reference.
The monitors tilt their screen on its hinge while the stand stays put, since it's resting on a desk.

**`spin`** — the 21 `clock-*`, which until now didn't do the one thing a clock does. A full turn in
twelve hard 30° steps: the ticking is a `steps()` easing, not extra keyframes. A whole turn on
purpose — 360° ends where it started, so it returns to rest with nothing to hide.

**`idle`** — the 8 `face-*` icons, none of which blinked. Ported from `cat`'s own `idle`, since the
eyes are the same primitive. The head tilt pivots on the circle's center rather than the base of the
neck: a circle is invariant under rotation about its own center, so the outline can't leave the
canvas while the eyes and mouth still turn inside it.

**Existing `hold` variants are now visible.** A `hold` retains its last keyframe, so that pose *is*
the variant — and 258 of the 496 were leaving a pose under 1.2 viewBox units, indistinguishable from
rest (`scale(1.04)`, `rotate(3deg)`, `translateY(-0.5px)`). 219 were amplified to a perceptible
threshold, each one capped by measuring its figures' real bounding boxes so the bigger pose still
fits the canvas. Ten were deliberately left subtle after review — on a car settling or a turtle
barely peeking, restraint *is* the gesture.

**37 hover gestures got faster.** A `default` is what fires on hover and has to feel immediate; the
slowest were taking up to 3 seconds. They now land in 1100 ms, with every duration and delay scaled
by the same factor — same keyframes, same easing, same proportions between figures. Cyclical ones
were left alone: `orbit` turns a full revolution, `radar` sweeps, `rocking-chair` rocks and the
clouds drift. A cloud in a hurry isn't a cloud.

Nothing was removed and no geometry changed. The `max-*` selectors and `Max*` symbols stay exported
and deprecated, as they have since v2.
