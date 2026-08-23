# MAPA — el repo para quien llega a tocar el sitio

Contexto para los tickets de UX del sitio público. **No es documentación de la librería**: eso vive
en `README.md`, `CONTRIBUTING.md` y el `CLAUDE.md` del proyecto.

Versión reducida a propósito: `CLAUDE.md` y la memoria del proyecto ya cubren estructura, reglas y
estado. Aquí solo va lo que un ticket de interfaz necesita y no está escrito en ningún otro lado.

Levantado el 2026-08-22 contra el código, no contra el plan.

---

## 1 · Stack

| | |
|---|---|
| Framework | Angular `^22.1.0` (CLI `^22.1.4`), standalone, sin NgModules |
| Lenguaje | TypeScript `~6.0.2` |
| Gestor | npm `10.9.8`, con `workspaces: ["projects/glyphflow"]` |
| Build | `@angular/build` (esbuild + Vite en dev) |
| Tests | Vitest |
| i18n | `@jsverse/transloco` `^8.4.0` + `transloco-persist-lang` |
| Geometría fuente | `lucide-static` **1.31.0, fijado exacto** (devDependency del generador) |
| Despliegue | Vercel — `vercel.json` en la raíz |

El sitio **no consume el código fuente de la librería**: consume el paquete publicado en npm, vía
el alias `glyphflow-published` de `package.json` mapeado en
[projects/playground/tsconfig.paths.json](projects/playground/tsconfig.paths.json). La única
excepción es `glyphflow/morph`, que sí apunta al fuente local — está comentado ahí con el porqué.

## 2 · Modo de renderizado

**SPA pura.** `vercel.json` publica `dist/playground/browser` y reescribe `/(.*)` a `/index.html`.
No hay SSR ni prerender **para el sitio**.

> Ojo con no confundirlo: **la librería sí soporta SSR** — lo prueba
> [scripts/ssr-smoke-test.ts](scripts/ssr-smoke-test.ts), que corre dentro de `verify:clean` y
> verifica el render sin `window` ni `document` reales. Que el consumidor pueda hacer SSR y que
> este sitio no lo haga son dos cosas distintas.

## 3 · Rutas

Todas por `loadComponent` — ver el porqué medido en la cabecera de
[projects/playground/src/app/app.routes.ts](projects/playground/src/app/app.routes.ts).

| Ruta | Componente |
|---|---|
| `/` | `features/iconos/iconos.ts` — portada + catálogo |
| `/patrones` | `features/patrones/patrones.ts` |
| `/editor` | `features/editor/editor.ts` |
| `/lab` | `features/lab/lab.ts` |
| `/docs` | `features/docs/docs.ts` (shell) → redirige a `empezando` |
| `/docs/empezando` | `features/docs/empezando.ts` |
| `/docs/accesibilidad` | `features/docs/accesibilidad.ts` |
| `/docs/ssr` | `features/docs/ssr.ts` |
| `/docs/api` | `features/docs/api.ts` |
| `**` | redirige a `/` |

Las rutas están **en español** y el sitio en inglés por defecto. Eso es lo que ataca T19.

## 4 · Árbol de la página de catálogo

La portada y el catálogo son **el mismo componente**: `features/iconos/iconos.ts` + `.html` + `.css`.

| Pieza | Dónde vive |
|---|---|
| Rejilla | `.grid` — **markup inline** en `iconos.html`, no es un componente |
| Tarjeta | `.card` — **inline** en el `@for` de `iconos.html`. No hay `IconCard` |
| Panel de detalle | `features/iconos/icon-detail-panel.ts` — **sí** es componente propio |
| Buscador | `shared/ui/campo-busqueda.ts`, usado como `<app-campo-busqueda>` |
| Filtros | `shared/ui/chip.ts` — selector de **atributo** (`button[app-chip]`), no de elemento |
| Insignias de tarjeta | `features/iconos/icon-badges.ts` (lógica) |
| Nombre compartido entre tarjeta y panel | `shared/ui/nombre-transicion.ts` (View Transitions) |

**Que tarjeta y rejilla no sean componentes importa para T1 y T5**: no hay una API que cambiar, se
edita markup y CSS dentro de `iconos.*`.

## 5 · De dónde salen los datos de los iconos — y el hueco que destapa

Del paquete publicado, en tiempo de build. No hay endpoint ni fetch: el catálogo viaja en el bundle.

Un registro **real** de `ICON_META`, copiado del código:

```json
{ "name": "bell", "source": "lucide", "autoDraw": true, "curated": true }
```

Su tipo, en `projects/glyphflow/src/lib/icon/animated-icons.registry.ts`:

```ts
export interface IconMeta {
  name: string;
  source: 'lucide';
  autoDraw: boolean;
  curated: boolean;
  morphTargets?: string[];
}
```

Medido el 2026-08-22 sobre el registro real:

| | |
|---|---|
| Catálogo (`ANIMATED_ICONS`) | **1767** |
| Curados (`ICON_META.curated === true`) | **911** |
| Registros con `morphTargets` poblado | **0** |
| Campos `tags` | **no existe** |
| Campos `categories` | **no existe** |

> ### ⚠️ Esto reescribe T7
>
> T7 se llama *"encender la metadata que YA se publica"* y pide orden de relevancia por
> `tag exacto → tag contiene → categoría`, chips de categoría con conteo, y `morphTargets` como
> sugerencia en el Lab. **Ninguno de los tres datos existe.** No vienen a medias: no están.
>
> El backlog ya avisaba de comprobarlo aquí antes de empezar, y decía que si faltaban era *"un
> ticket de datos aparte, no un motivo para inventar otra fuente"*. Esto es lo que hay:
>
> - **Tags: la fuente existe y la cobertura es perfecta.** `node_modules/lucide-static/tags.json`
>   trae **1767 iconos, el 100% con al menos un tag**, y sus claves **coinciden exactamente** con
>   el catálogo: 0 iconos del catálogo sin tag, 0 tags que sobren. `lucide-static` ya está fijado
>   exacto en el repo y ya lo usa el generador, así que **no es una dependencia nueva**.
>   Es un ticket de la LIBRERÍA: poblar `IconMeta.tags` en el generador y publicar una minor.
>   El criterio de aceptación de T7 ya está cubierto por el dato:
>   `trash-2 → ["garbage", "delete", "remove", "bin"]`, y `trash-2` está en el catálogo.
> - **Categorías: no hay fuente.** `lucide-static` NO publica categorías — solo `tags.json` e
>   `icon-nodes.json`. Viven en el monorepo de Lucide, no en el paquete. Los chips de categoría
>   de T7 **no se pueden hacer** sin traer otra fuente, que es justo lo que el backlog prohíbe.
> - **`morphTargets`: declarado, nunca poblado.** El comentario del código lo dice: *"reservado
>   para v2, sin poblar todavía, no se inventan relaciones sin base real"*. La sugerencia de morph
>   en el Lab depende de un campo vacío en los 1767.

## 6 · Sistema de estilos

**CSS plano**, sin Tailwind ni módulos. Dos niveles:

- **Global**: [projects/playground/src/styles.css](projects/playground/src/styles.css) — tokens,
  primitivas `.ui-*` compartidas, y las reglas que apuntan a nodos creados por `[innerHTML]`.
- **Por componente**: `styleUrl` con encapsulación emulada (`.css` junto a cada componente).

Tokens de color en `:root` de `styles.css`, prefijo `--gf-*`. `:root` es el tema **oscuro**;
`:root[data-tema='claro']` lo sobreescribe.

> **Cicatriz que cuesta cara si no se sabe:** el CSS de un componente **nunca** alcanza lo que se
> pinta con `[innerHTML]`. El sanitizador crea esos nodos en runtime sin el atributo
> `_ngcontent-*`, así que la regla no aplica — y no avisa, simplemente no pinta. Si una regla
> apunta a algo dentro de un `[innerHTML]`, va en `styles.css`. Ya mordió dos veces.

La escala de espaciado y la de tipografía están en la sección `Sistema de diseño` de
`docs/planning/plan-ux-glyphflow.md` (gitignoreado). Lo esencial: base 4, medida de lectura
**máximo 65 caracteres** (~620 px), mono a 14.5/1.6.

## 7 · Estado global

Todo por **señales en `core/`**, sin store ni servicio inyectado con estado.

| Qué | Dónde | Cómo persiste |
|---|---|---|
| Velocidad (`durationScale`) | `core/duration-scale.ts` | — |
| Tema | `core/tema.ts` | `localStorage` en `gf:tema`, atributo `data-tema` en `<html>` |
| Idioma | `core/i18n.ts` | `localStorage` en `translocoLang` (lo pone transloco-persist-lang) |
| Estrellas de GitHub | `core/github.ts` | caché propia con vigencia |
| Cifras de portada | `core/cifras.ts` | ancladas por `cifras.spec.ts` |

Las claves de `localStorage` están en español o con prefijo `gf:` mezclado — eso lo barre T19.

## 8 · Estrategia de i18n

Transloco v8, **inglés por defecto**, español por switcher. Configuración en
[projects/playground/src/app/core/i18n.ts](projects/playground/src/app/core/i18n.ts),
con `autoPrefixKeys: false`.

Cinco scopes perezosos más el diccionario raíz, con la **misma frontera que los `loadComponent`**:

| Scope | Archivos | Carga |
|---|---|---|
| raíz (shell, nav, marca, títulos de ruta) | `src/i18n/{en,es}.json` | eager |
| `iconos` | `src/i18n/iconos/{en,es}.json` | perezosa |
| `patrones` | `src/i18n/patrones/{en,es}.json` | perezosa |
| `editor` | `src/i18n/editor/{en,es}.json` | perezosa |
| `lab` | `src/i18n/lab/{en,es}.json` | perezosa |
| `docs` | `src/i18n/docs/{en,es}.json` | perezosa |

**El scope se declara en el `providers` del COMPONENTE, no en la ruta.** No es estilo: está medido.
Declararlo en la ruta encadena un `import()` extra *después* de bajar el chunk — en 3G lento los
textos del hero tardaban ~9.5 s y mientras tanto se veían cajas vacías. Declarado en el componente,
el inglés viaja dentro del mismo chunk. El comentario completo está en `iconos.ts`.

En plantillas: `| transloco` para texto plano, `[innerHTML]="'clave' | transloco"` cuando la cadena
trae marcado. Para leer una clave desde TypeScript, `translateSignal(...)`.

> Duplicar una clave top-level en el JSON gana la última, en silencio. Si un texto sale crudo,
> sospechar clave duplicada antes que clave faltante.

## 9 · Cadenas visibles de portada y catálogo

Todas viven en **dos archivos por idioma** — no hay texto suelto en plantillas salvo símbolos de
API y nombres de icono, que no se traducen:

- `src/i18n/iconos/{en,es}.json` → **63 cadenas**
- `src/i18n/{en,es}.json` (shell: header, nav, footer) → **38 cadenas**

Reparto del scope `iconos`:

| Grupo | Cadenas | Qué pinta |
|---|---|---|
| `iconos.hero` | 7 | Titular, bajada, cifras, CTAs |
| `iconos.showcase` | 5 | Bloque de morph y sus controles |
| `iconos.api` | 4 | Snippet de la portada (T4) |
| `iconos.argumentos` | 6 | Los tres argumentos |
| `iconos.barra` | 9 | Buscador, filtros, repetir todo |
| `iconos.grid` | 2 | `aria-label` de tarjeta y conteo de animaciones |
| `iconos.scrubber` | 3 | Control de avance |
| `iconos.detalle` | 27 | Panel de detalle — el grupo más pesado con diferencia |

**Que `detalle` sea casi la mitad del scope importa para T5**: mover el panel a overlay toca 27
cadenas y sus `aria-*`, no solo CSS.

---

## Lo que este mapa NO cubre, y dónde está

- Reglas del proyecto, verificación y publicación → `CLAUDE.md` de la raíz.
- Decisiones, cicatrices y estado en vuelo → memoria del proyecto (Engram).
- Especificación de los tickets y sistema de diseño → `docs/planning/` (gitignoreado).
- Arquitectura de la librería (tree-shaking, entry points, catálogo curado) → `CLAUDE.md`
  y `CONTRIBUTING.md`.
