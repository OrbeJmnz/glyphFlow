---
'glyphflow': minor
---

`frontFlip`, `backflip` and `doubleFlip` are now real 3D somersaults. Before, they spun the bot in the
picture plane and drifted sideways (the front flip to the right, the back flip to the left). Now:

- The bot rotates around its horizontal axis: in a front flip the head goes forward, in a back flip it
  goes backward. The face disappears when the bot is facing away and the body is seen upside down at the
  top of the jump.
- It moves in depth: closer to the viewer in a front flip (and the double flip), farther away in a back
  flip. There is no sideways drift.
- The body is rigid in the air: no gel, no squash, no skirt flex while it spins. Squash is kept only for
  the take-off and the landing, and is softer.

It works on every shape (cat, ghost, octopus, tofu, mochi, robot).

For authors of custom gestures, the score has two new channels: `pitch` (radians, rotation around the
horizontal axis; `+` is the face going down) and `z` (depth, `+` is closer to the viewer), with two new
helpers in `gfBotKit.motion`: `tumble(t, rad)` and `depth(t, z)`. `GfBotMotionFrame` gains `pitch` and
`z`. Like `roll` and `yaw`, `pitch` is not scaled by `intensity`: a somersault is still a somersault.
Existing scores keep working unchanged.

Also fixes the cat's ears when the head turns more than about 30°: the near ear now shows in front of
the head instead of being cut off behind it.
