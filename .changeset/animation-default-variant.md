---
'glyphflow': minor
---

`animation="default"` is finally honored — it was the one variant you could not ask for.

When you don't name a variant, `<gf-icon>` picks its hover gesture by POSITION: with three or more
it plays the THIRD, because the catalog orders them `draw`, `default`, and then the icon's
expressive one (`rotate`, `find`, `turn`…). Naming a variant was supposed to override that. It did,
for every name except one.

The input was declared `animation = 'default'`, and `'default'` is a real variant name. So the
resolver could not tell "the consumer left it alone" apart from "the consumer asked for `default`",
and it broke the tie by throwing the value away:

```ts
if (animation && animation !== 'default') return animation; // before
if (animation) return animation; // now
```

On `trash-2` (draw / default / active) that meant there was no way to keep the shake:
`animation="default"` silently played `active` on hover instead. The sentinel is now `undefined`,
which cannot collide with a catalog key, so the input carries no initializer.

**What changes for you: only the path that was already being ignored.**

- Not passing `animation` — identical. The positional convention still chooses the hover gesture,
  and the 1095 icons that depend on that order are untouched.
- `animation="rotate"` — identical.
- `animation="default"` — now respected instead of silently discarded. That is the fix, and nothing
  could have deliberately depended on its own input being dropped.

`play()` and `play('variant')` behave exactly as before; neither ever went through the resolver.

The public type goes from `animation: string` to `animation?: string` in the emitted `.d.ts`. This
input is written, not read, so template bindings and `setInput` calls are unaffected — the looser
type only surfaces if you hold a `GfIconComponent` reference and assign `.animation` into a
`string`.
