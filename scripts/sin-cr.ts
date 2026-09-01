/*
 * Comparar lo GENERADO contra lo que hay en disco, sin que los finales de línea mientan.
 *
 * Los generadores construyen su salida en memoria con `\n` y la escriben con `\n`. Pero en un
 * clon con `core.autocrlf=true` —el default de Git en Windows— el checkout deja esos mismos
 * archivos con `\r\n` en el árbol de trabajo. Comparar la cadena en memoria contra el archivo
 * leído tal cual da distinto SIEMPRE, aunque el contenido sea idéntico byte por byte para Git.
 *
 * El síntoma es inconfundible y por eso conviene nombrarlo: fallan TODOS los archivos a la vez,
 * incluidos los que el cambio no podía tocar (`package.json`, `tsconfig.json`). Un drift real
 * marca un subconjunto. Medido: `gen:examples --check` reportaba los 48 archivos de los 8
 * ejemplos mientras `git diff` salía vacío.
 *
 * Un check que grita en cada corrida es un check que se aprende a ignorar, y estos cuatro llevan
 * tiempo dando falsos positivos en esta máquina. Normalizar al comparar los devuelve a servir
 * para lo único que existen: avisar cuando el contenido de verdad se quedó atrás.
 *
 * NO se normaliza al ESCRIBIR: la salida sigue siendo `\n`, y de la conversión al árbol de
 * trabajo se encarga Git, que es quien sabe qué está configurado en cada máquina.
 */
export const sinCr = (texto: string): string => texto.replace(/\r\n/g, '\n');
