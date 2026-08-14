# Política de seguridad

## Versiones soportadas

Mientras el proyecto esté en v0.x/v1.x, solo la última versión publicada recibe parches.

## Reportar una vulnerabilidad

Abre un issue privado de seguridad en GitHub (Security → Report a vulnerability) en vez de un issue
público. No hay backend ni datos de usuario en este proyecto (librería client-side + playground
estático sin cuentas), así que el radio de impacto esperado es bajo, pero repórtalo igual si
encuentras algo — por ejemplo, una animación que pueda usarse para inyectar contenido no confiable
vía `[iconDef]` con datos sin sanear.
