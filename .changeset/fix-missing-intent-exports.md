---
'glyphflow': patch
---

Fixes `LIKE_INTENT`, `FAVORITE_INTENT`, `NOTIFY_INTENT`, `PIN_INTENT`, and `VOLUME_INTENT` not
actually being exported from `glyphflow/morph` — they existed in `intents.ts` but `public-api.ts`
re-exports intents through an explicit, one-by-one list (on purpose, so importing one doesn't pull
the other eleven), and that list wasn't updated. 3.1.0 shipped a changelog entry for five intents
that weren't reachable from the package at all.
