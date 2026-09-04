---
'glyphflow': patch
---

`copy` ↔ `check` is now told in two beats

Copying is two things — the sheet on top retracts, and what's left folds into a tick — and doing both
at once hid them behind each other. It read as "something small changed" without you being able to
say what. Now the square goes first and the outline waits its turn, with a deliberate overlap so it
stays one gesture instead of two animations stitched together.

The piece that survives is the outline rather than the square, and that is geometry, not taste: the
square is a **closed loop** and the tick an **open stroke**, and closed-to-open is the hard case for
the subpath matcher. Measured residuals — outline→tick 0.286, square→tick 0.676, uncomfortably close
to the 0.75 threshold where the engine gives up and crossfades instead.

No other curated morph is staged. `sun`↔`moon` and `volume`↔`volume-off` keep their shared clock,
and there's a test holding them to it.
