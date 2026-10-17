---
'glyphflow': patch
---

Fixes the bot cutting off halfway between agent steps in `glyphflow/bots` (`thinking`, `tool`, `loading` and `writing`).

- When a routine gives way to the next one, its effects now fade out over 160 ms: the thought cloud, the magnifying lens, the progress bar, the question mark and the lights. Before, they disappeared between one frame and the next. The skin silhouette and the pose layers are still cut as before, and a gesture still clears the face at once, so two faces never overlap.
- After a gesture, the routine resumes after 150 ms instead of 300 ms, and it replays the variant that was running instead of moving on to the next one.
- Each agent step now starts its own variant exactly once. Before, the routine started and the `onAgentEvent` gesture cancelled it in the same instant, and the resume then picked the next variant, so the first one (the gears that turn into a light bulb) was never seen. If the handler starts a gesture, the routine now waits for it.

The engine is 0.47 KB gzip larger (49.5 to 49.97 KB).
