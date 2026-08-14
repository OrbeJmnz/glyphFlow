# Contribuir a glyphflow

## Reportar un bug o proponer un icono/coreografía

Abre un issue. Para una coreografía nueva o un ajuste a una existente, el flujo es:

1. Genera el snippet desde el playground (cuando exista) o escríbelo a mano siguiendo el patrón de
   `animated-icons.registry.ts`.
2. Abre un PR contra `animated-icons.registry.ts`/`animated-icons.shapes.ts`.
3. El mantenedor revisa y mergea — no hay panel ni roles en runtime, la autorización es el PR mismo.

## Antes de abrir PR

- `npm test` (Vitest) en verde.
- `npm run build` en verde.
- Si tocaste una coreografía existente, confirma que no es un icono con geometría de Lucide
  recién actualizada (ver la estrategia de actualización de Lucide en el plan del proyecto).

## Qué NO se acepta

- Animaciones semánticas generadas en lote sin dirección humana figura por figura.
- Código copiado de Animate UI (MIT + Commons Clause — prohíbe redistribuir sus componentes).
- Dependencias nuevas en `projects/maxicons` sin discutirlo antes (el paquete es cero-deps a propósito).
