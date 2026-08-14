# glyphflow

Iconos de [Lucide](https://lucide.dev) animados de verdad para Angular — coreografía por figura
sobre Web Animations API nativa, sin `@angular/animations` ni librerías de animación de terceros.

Selector: `<max-icon>` — el prefijo del componente no está atado al nombre del paquete a propósito
(mismo patrón que `mat-button` en Angular Material o `p-button` en PrimeNG).

## Uso

```bash
npm install glyphflow
```

```html
<max-icon name="bell" trigger="hover" class="size-5" />
<max-icon name="search" label="Buscar" />
```

## Build

```bash
ng build glyphflow
ng test glyphflow
```

Ver el `README.md` en la raíz del workspace y el plan del proyecto para arquitectura completa.
