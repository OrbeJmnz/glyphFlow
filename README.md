# glyphflow

Iconos de [Lucide](https://lucide.dev) animados de verdad para Angular — coreografía por figura sobre
Web Animations API nativa, sin `@angular/animations` ni librerías de animación de terceros. Más
morphing entre iconos y un editor de geometría, ambos en construcción.

Gratis, MIT, sin backend. Ver [NOTICE](./NOTICE) para atribuciones de terceros.

## Estado

En desarrollo — fase **v0.1 (Foundation)**. Nada publicado en npm todavía. El plan completo del
proyecto (arquitectura, roadmap, decisiones) vive fuera de este repo mientras se arma.

## Workspace

- `projects/glyphflow` — la librería (`ng-packagr`, prefix `max` → `<max-icon>`).
- `projects/playground` — app pública para animar/editar iconos (no publicada aún).

```bash
npm install
ng build glyphflow
ng test glyphflow
ng serve playground
```

## Licencia

MIT — ver [LICENSE](./LICENSE).
