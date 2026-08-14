import { IconShape } from './animated-icon.model';

/**
 * Figuras de los iconos — data de **Lucide** (ISC), copiada tal cual del paquete.
 *
 * Archivo GENERADO y aburrido a propósito: aquí no hay decisiones, solo geometría. La coreografía
 * (que sí es criterio) vive en `animated-icons.registry.ts`. Separarlos evita que un archivo de
 * 900 líneas mezcle lo que se copia con lo que se piensa.
 *
 * El ORDEN importa: es el índice con el que la coreografía apunta cada figura, y también el orden
 * de pintado.
 */
export const SHAPES: Record<string, IconShape[]> = {
  bell: [
    { tag: 'path', d: 'M10.268 21a2 2 0 0 0 3.464 0' },
    {
      tag: 'path',
      d: 'M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326',
    },
  ],
  'bell-ring': [
    { tag: 'path', d: 'M10.268 21a2 2 0 0 0 3.464 0' },
    { tag: 'path', d: 'M22 8c0-2.3-.8-4.3-2-6' },
    {
      tag: 'path',
      d: 'M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326',
    },
    { tag: 'path', d: 'M4 2C2.8 3.7 2 5.7 2 8' },
  ],
  check: [{ tag: 'path', d: 'M20 6 9 17l-5-5' }],
  'circle-alert': [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'line', x1: 12, y1: 8, x2: 12, y2: 12 },
    { tag: 'line', x1: 12, y1: 16, x2: 12.01, y2: 16 },
  ],
  'circle-check': [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'm9 12 2 2 4-4' },
  ],
  'circle-x': [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'm15 9-6 6' },
    { tag: 'path', d: 'm9 9 6 6' },
  ],
  copy: [
    { tag: 'rect', x: 8, y: 8, width: 14, height: 14, rx: 2, ry: 2 },
    { tag: 'path', d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' },
  ],
  calendar: [
    { tag: 'path', d: 'M8 2v4' },
    { tag: 'path', d: 'M16 2v4' },
    { tag: 'rect', x: 3, y: 4, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: 'M3 10h18' },
  ],
  'chevron-right': [{ tag: 'path', d: 'm9 18 6-6-6-6' }],
  'arrow-left': [
    { tag: 'path', d: 'm12 19-7-7 7-7' },
    { tag: 'path', d: 'M19 12H5' },
  ],
  download: [
    { tag: 'path', d: 'M12 15V3' },
    { tag: 'path', d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' },
    { tag: 'path', d: 'm7 10 5 5 5-5' },
  ],
  eye: [
    {
      tag: 'path',
      d: 'M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0',
    },
    { tag: 'circle', cx: 12, cy: 12, r: 3 },
  ],
  'eye-off': [
    {
      tag: 'path',
      d: 'M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49',
    },
    { tag: 'path', d: 'M14.084 14.158a3 3 0 0 1-4.242-4.242' },
    {
      tag: 'path',
      d: 'M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143',
    },
    { tag: 'path', d: 'm2 2 20 20' },
  ],
  'hat-glasses': [
    { tag: 'path', d: 'M14 18a2 2 0 0 0-4 0' },
    {
      tag: 'path',
      d: 'm19 11-2.11-6.657a2 2 0 0 0-2.752-1.148l-1.276.61A2 2 0 0 1 12 4H8.5a2 2 0 0 0-1.925 1.456L5 11',
    },
    { tag: 'path', d: 'M2 11h20' },
    { tag: 'circle', cx: 17, cy: 18, r: 3 },
    { tag: 'circle', cx: 7, cy: 18, r: 3 },
  ],
  'heart-pulse': [
    {
      tag: 'path',
      d: 'M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5',
    },
    { tag: 'path', d: 'M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27' },
  ],
  images: [
    { tag: 'path', d: 'm22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16' },
    { tag: 'path', d: 'M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2' },
    { tag: 'circle', cx: 13, cy: 7, r: 1 },
    { tag: 'rect', x: 8, y: 2, width: 14, height: 14, rx: 2 },
  ],
  info: [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'M12 16v-4' },
    { tag: 'path', d: 'M12 8h.01' },
  ],
  'loader-circle': [{ tag: 'path', d: 'M21 12a9 9 0 1 1-6.219-8.56' }],
  lock: [
    { tag: 'rect', x: 3, y: 11, width: 18, height: 11, rx: 2, ry: 2 },
    { tag: 'path', d: 'M7 11V7a5 5 0 0 1 10 0v4' },
  ],
  mail: [
    { tag: 'path', d: 'm22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7' },
    { tag: 'rect', x: 2, y: 4, width: 20, height: 16, rx: 2 },
  ],
  'mouse-pointer-click': [
    { tag: 'path', d: 'M14 4.1 12 6' },
    { tag: 'path', d: 'm5.1 8-2.9-.8' },
    { tag: 'path', d: 'm6 12-1.9 2' },
    { tag: 'path', d: 'M7.2 2.2 8 5.1' },
    {
      tag: 'path',
      d: 'M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z',
    },
  ],
  pencil: [
    {
      tag: 'path',
      d: 'M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z',
    },
    { tag: 'path', d: 'm15 5 4 4' },
  ],
  plus: [
    { tag: 'path', d: 'M5 12h14' },
    { tag: 'path', d: 'M12 5v14' },
  ],
  'refresh-cw': [
    { tag: 'path', d: 'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8' },
    { tag: 'path', d: 'M21 3v5h-5' },
    { tag: 'path', d: 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16' },
    { tag: 'path', d: 'M8 16H3v5' },
  ],
  save: [
    {
      tag: 'path',
      d: 'M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z',
    },
    { tag: 'path', d: 'M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7' },
    { tag: 'path', d: 'M7 3v4a1 1 0 0 0 1 1h7' },
  ],
  search: [
    { tag: 'path', d: 'm21 21-4.34-4.34' },
    { tag: 'circle', cx: 11, cy: 11, r: 8 },
  ],
  'search-check': [
    { tag: 'path', d: 'm8 11 2 2 4-4' },
    { tag: 'circle', cx: 11, cy: 11, r: 8 },
    { tag: 'path', d: 'm21 21-4.3-4.3' },
  ],
  'search-slash': [
    { tag: 'path', d: 'm13.5 8.5-5 5' },
    { tag: 'circle', cx: 11, cy: 11, r: 8 },
    { tag: 'path', d: 'm21 21-4.3-4.3' },
  ],
  'search-x': [
    { tag: 'path', d: 'm13.5 8.5-5 5' },
    { tag: 'path', d: 'm8.5 8.5 5 5' },
    { tag: 'circle', cx: 11, cy: 11, r: 8 },
    { tag: 'path', d: 'm21 21-4.3-4.3' },
  ],
  send: [
    {
      tag: 'path',
      d: 'M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z',
    },
    { tag: 'path', d: 'm21.854 2.147-10.94 10.939' },
  ],
  settings: [
    {
      tag: 'path',
      d: 'M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915',
    },
    { tag: 'circle', cx: 12, cy: 12, r: 3 },
  ],
  'shield-check': [
    {
      tag: 'path',
      d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
    },
    { tag: 'path', d: 'm9 12 2 2 4-4' },
  ],
  sparkles: [
    {
      tag: 'path',
      d: 'M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z',
    },
    { tag: 'path', d: 'M20 2v4' },
    { tag: 'path', d: 'M22 4h-4' },
    { tag: 'circle', cx: 4, cy: 20, r: 2 },
  ],
  trash: [
    { tag: 'path', d: 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6' },
    { tag: 'path', d: 'M3 6h18' },
    { tag: 'path', d: 'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' },
  ],
  'trash-2': [
    { tag: 'path', d: 'M10 11v6' },
    { tag: 'path', d: 'M14 11v6' },
    { tag: 'path', d: 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6' },
    { tag: 'path', d: 'M3 6h18' },
    { tag: 'path', d: 'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' },
  ],
  'triangle-alert': [
    { tag: 'path', d: 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3' },
    { tag: 'path', d: 'M12 9v4' },
    { tag: 'path', d: 'M12 17h.01' },
  ],
  upload: [
    { tag: 'path', d: 'M12 3v12' },
    { tag: 'path', d: 'm17 8-5-5-5 5' },
    { tag: 'path', d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' },
  ],
  user: [
    { tag: 'path', d: 'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' },
    { tag: 'circle', cx: 12, cy: 7, r: 4 },
  ],
  wrench: [
    {
      tag: 'path',
      d: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z',
    },
  ],
  x: [
    { tag: 'path', d: 'M18 6 6 18' },
    { tag: 'path', d: 'm6 6 12 12' },
  ],
  'file-text': [
    {
      tag: 'path',
      d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
    { tag: 'path', d: 'M10 9H8' },
    { tag: 'path', d: 'M16 13H8' },
    { tag: 'path', d: 'M16 17H8' },
  ],
  monitor: [
    { tag: 'rect', x: 2, y: 3, width: 20, height: 14, rx: 2 },
    { tag: 'line', x1: 8, y1: 21, x2: 16, y2: 21 },
    { tag: 'line', x1: 12, y1: 17, x2: 12, y2: 21 },
  ],
  package: [
    {
      tag: 'path',
      d: 'M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z',
    },
    { tag: 'path', d: 'M12 22V12' },
    { tag: 'polyline', points: '3.29 7 12 12 20.71 7' },
    { tag: 'path', d: 'm7.5 4.27 9 5.15' },
  ],
  history: [
    { tag: 'path', d: 'M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8' },
    { tag: 'path', d: 'M3 3v5h5' },
    { tag: 'path', d: 'M12 7v5l4 2' },
  ],
  shirt: [
    {
      tag: 'path',
      d: 'M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z',
    },
  ],
  'folder-open': [
    {
      tag: 'path',
      d: 'm6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2',
    },
  ],
  plane: [
    {
      tag: 'path',
      d: 'M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z',
    },
  ],
  globe: [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20' },
    { tag: 'path', d: 'M2 12h20' },
  ],
  key: [
    { tag: 'path', d: 'm15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4' },
    { tag: 'path', d: 'm21 2-9.6 9.6' },
    { tag: 'circle', cx: 7.5, cy: 15.5, r: 5.5 },
  ],
  users: [
    { tag: 'path', d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' },
    { tag: 'path', d: 'M16 3.128a4 4 0 0 1 0 7.744' },
    { tag: 'path', d: 'M22 21v-2a4 4 0 0 0-3-3.87' },
    { tag: 'circle', cx: 9, cy: 7, r: 4 },
  ],
  truck: [
    { tag: 'path', d: 'M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2' },
    { tag: 'path', d: 'M15 18H9' },
    {
      tag: 'path',
      d: 'M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14',
    },
    { tag: 'circle', cx: 17, cy: 18, r: 2 },
    { tag: 'circle', cx: 7, cy: 18, r: 2 },
  ],
  'map-pin': [
    {
      tag: 'path',
      d: 'M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0',
    },
    { tag: 'circle', cx: 12, cy: 10, r: 3 },
  ],
  'external-link': [
    { tag: 'path', d: 'M15 3h6v6' },
    { tag: 'path', d: 'M10 14 21 3' },
    { tag: 'path', d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' },
  ],
  briefcase: [
    { tag: 'path', d: 'M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16' },
    { tag: 'rect', x: 2, y: 6, width: 20, height: 14, rx: 2 },
  ],
  'book-open': [
    { tag: 'path', d: 'M12 7v14' },
    {
      tag: 'path',
      d: 'M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z',
    },
  ],
  smartphone: [
    { tag: 'rect', x: 5, y: 2, width: 14, height: 20, rx: 2, ry: 2 },
    { tag: 'path', d: 'M12 18h.01' },
  ],
  phone: [
    {
      tag: 'path',
      d: 'M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384',
    },
  ],
  receipt: [
    { tag: 'path', d: 'M12 17V7' },
    { tag: 'path', d: 'M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8' },
    {
      tag: 'path',
      d: 'M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z',
    },
  ],
  'rotate-ccw': [
    { tag: 'path', d: 'M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8' },
    { tag: 'path', d: 'M3 3v5h5' },
  ],
  'shopping-cart': [
    { tag: 'circle', cx: 8, cy: 21, r: 1 },
    { tag: 'circle', cx: 19, cy: 21, r: 1 },
    {
      tag: 'path',
      d: 'M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12',
    },
  ],
  banknote: [
    { tag: 'rect', x: 2, y: 6, width: 20, height: 12, rx: 2 },
    { tag: 'circle', cx: 12, cy: 12, r: 2 },
    { tag: 'path', d: 'M6 12h.01M18 12h.01' },
  ],
  crown: [
    {
      tag: 'path',
      d: 'M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z',
    },
    { tag: 'path', d: 'M5 21h14' },
  ],
  sun: [
    { tag: 'circle', cx: 12, cy: 12, r: 4 },
    { tag: 'path', d: 'M12 2v2' },
    { tag: 'path', d: 'M12 20v2' },
    { tag: 'path', d: 'm4.93 4.93 1.41 1.41' },
    { tag: 'path', d: 'm17.66 17.66 1.41 1.41' },
    { tag: 'path', d: 'M2 12h2' },
    { tag: 'path', d: 'M20 12h2' },
    { tag: 'path', d: 'm6.34 17.66-1.41 1.41' },
    { tag: 'path', d: 'm19.07 4.93-1.41 1.41' },
  ],
  moon: [
    {
      tag: 'path',
      d: 'M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401',
    },
  ],
  zap: [
    {
      tag: 'path',
      d: 'M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z',
    },
  ],
  clock: [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'M12 6v6l4 2' },
  ],
  lightbulb: [
    {
      tag: 'path',
      d: 'M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5',
    },
    { tag: 'path', d: 'M9 18h6' },
    { tag: 'path', d: 'M10 22h4' },
  ],
  camera: [
    {
      tag: 'path',
      d: 'M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z',
    },
    { tag: 'circle', cx: 12, cy: 13, r: 3 },
  ],
  cake: [
    { tag: 'path', d: 'M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8' },
    { tag: 'path', d: 'M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1' },
    { tag: 'path', d: 'M2 21h20' },
    { tag: 'path', d: 'M7 8v3' },
    { tag: 'path', d: 'M12 8v3' },
    { tag: 'path', d: 'M17 8v3' },
    { tag: 'path', d: 'M7 4h.01' },
    { tag: 'path', d: 'M12 4h.01' },
    { tag: 'path', d: 'M17 4h.01' },
  ],
  ban: [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'M4.929 4.929 19.07 19.071' },
  ],
  'at-sign': [
    { tag: 'circle', cx: 12, cy: 12, r: 4 },
    { tag: 'path', d: 'M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8' },
  ],
  'log-out': [
    { tag: 'path', d: 'm16 17 5-5-5-5' },
    { tag: 'path', d: 'M21 12H9' },
    { tag: 'path', d: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' },
  ],
  funnel: [
    {
      tag: 'path',
      d: 'M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z',
    },
  ],
  star: [
    {
      tag: 'path',
      d: 'M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z',
    },
  ],
  activity: [
    {
      tag: 'path',
      d: 'M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2',
    },
  ],
  'alarm-clock': [
    { tag: 'circle', cx: 12, cy: 13, r: 8 },
    { tag: 'path', d: 'M12 9v4l2 2' },
    { tag: 'path', d: 'M5 3 2 6' },
    { tag: 'path', d: 'm22 6-3-3' },
    { tag: 'path', d: 'M6.38 18.7 4 21' },
    { tag: 'path', d: 'M17.64 18.67 20 21' },
  ],
  'app-window': [
    { tag: 'rect', x: 2, y: 4, width: 20, height: 16, rx: 2 },
    { tag: 'path', d: 'M10 4v4' },
    { tag: 'path', d: 'M2 8h20' },
    { tag: 'path', d: 'M6 4v4' },
  ],
  'badge-check': [
    {
      tag: 'path',
      d: 'M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z',
    },
    { tag: 'path', d: 'm9 12 2 2 4-4' },
  ],
  'chevron-down': [{ tag: 'path', d: 'm6 9 6 6 6-6' }],
  'chevron-left': [{ tag: 'path', d: 'm15 18-6-6 6-6' }],
  'chevron-up': [{ tag: 'path', d: 'm18 15-6-6-6 6' }],
  'chevrons-up-down': [
    { tag: 'path', d: 'm7 15 5 5 5-5' },
    { tag: 'path', d: 'm7 9 5-5 5 5' },
  ],
  'circle-plus': [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'M8 12h8' },
    { tag: 'path', d: 'M12 8v8' },
  ],
  'circle-question-mark': [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3' },
    { tag: 'path', d: 'M12 17h.01' },
  ],
  'clipboard-check': [
    { tag: 'rect', x: 8, y: 2, width: 8, height: 4, rx: 1, ry: 1 },
    { tag: 'path', d: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2' },
    { tag: 'path', d: 'm9 14 2 2 4-4' },
  ],
  contact: [
    { tag: 'path', d: 'M16 2v2' },
    { tag: 'path', d: 'M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2' },
    { tag: 'path', d: 'M8 2v2' },
    { tag: 'circle', cx: 12, cy: 11, r: 3 },
    { tag: 'rect', x: 3, y: 4, width: 18, height: 18, rx: 2 },
  ],
  cpu: [
    { tag: 'path', d: 'M12 20v2' },
    { tag: 'path', d: 'M12 2v2' },
    { tag: 'path', d: 'M17 20v2' },
    { tag: 'path', d: 'M17 2v2' },
    { tag: 'path', d: 'M2 12h2' },
    { tag: 'path', d: 'M2 17h2' },
    { tag: 'path', d: 'M2 7h2' },
    { tag: 'path', d: 'M20 12h2' },
    { tag: 'path', d: 'M20 17h2' },
    { tag: 'path', d: 'M20 7h2' },
    { tag: 'path', d: 'M7 20v2' },
    { tag: 'path', d: 'M7 2v2' },
    { tag: 'rect', x: 4, y: 4, width: 16, height: 16, rx: 2 },
    { tag: 'rect', x: 8, y: 8, width: 8, height: 8, rx: 1 },
  ],
  'credit-card': [
    { tag: 'rect', x: 2, y: 5, width: 20, height: 14, rx: 2 },
    { tag: 'line', x1: 2, y1: 10, x2: 22, y2: 10 },
  ],
  database: [
    { tag: 'ellipse', cx: 12, cy: 5, rx: 9, ry: 3 },
    { tag: 'path', d: 'M3 5V19A9 3 0 0 0 21 19V5' },
    { tag: 'path', d: 'M3 12A9 3 0 0 0 21 12' },
  ],
  ellipsis: [
    { tag: 'circle', cx: 12, cy: 12, r: 1 },
    { tag: 'circle', cx: 19, cy: 12, r: 1 },
    { tag: 'circle', cx: 5, cy: 12, r: 1 },
  ],
  'file-check': [
    {
      tag: 'path',
      d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
    { tag: 'path', d: 'm9 15 2 2 4-4' },
  ],
  'file-x': [
    {
      tag: 'path',
      d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
    { tag: 'path', d: 'm14.5 12.5-5 5' },
    { tag: 'path', d: 'm9.5 12.5 5 5' },
  ],
  'git-fork': [
    { tag: 'circle', cx: 12, cy: 18, r: 3 },
    { tag: 'circle', cx: 6, cy: 6, r: 3 },
    { tag: 'circle', cx: 18, cy: 6, r: 3 },
    { tag: 'path', d: 'M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9' },
    { tag: 'path', d: 'M12 12v3' },
  ],
  'graduation-cap': [
    {
      tag: 'path',
      d: 'M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z',
    },
    { tag: 'path', d: 'M22 10v6' },
    { tag: 'path', d: 'M6 12.5V16a6 3 0 0 0 12 0v-3.5' },
  ],
  'hard-drive': [
    { tag: 'path', d: 'M10 16h.01' },
    {
      tag: 'path',
      d: 'M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z',
    },
    { tag: 'path', d: 'M21.946 12.013H2.054' },
    { tag: 'path', d: 'M6 16h.01' },
  ],
  'id-card': [
    { tag: 'path', d: 'M16 10h2' },
    { tag: 'path', d: 'M16 14h2' },
    { tag: 'path', d: 'M6.17 15a3 3 0 0 1 5.66 0' },
    { tag: 'circle', cx: 9, cy: 11, r: 2 },
    { tag: 'rect', x: 2, y: 5, width: 20, height: 14, rx: 2 },
  ],
  inbox: [
    { tag: 'polyline', points: '22 12 16 12 14 15 10 15 8 12 2 12' },
    {
      tag: 'path',
      d: 'M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z',
    },
  ],
  keyboard: [
    { tag: 'path', d: 'M10 8h.01' },
    { tag: 'path', d: 'M12 12h.01' },
    { tag: 'path', d: 'M14 8h.01' },
    { tag: 'path', d: 'M16 12h.01' },
    { tag: 'path', d: 'M18 8h.01' },
    { tag: 'path', d: 'M6 8h.01' },
    { tag: 'path', d: 'M7 16h10' },
    { tag: 'path', d: 'M8 12h.01' },
    { tag: 'rect', x: 2, y: 4, width: 20, height: 16, rx: 2 },
  ],
  landmark: [
    { tag: 'path', d: 'M10 18v-7' },
    {
      tag: 'path',
      d: 'M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z',
    },
    { tag: 'path', d: 'M14 18v-7' },
    { tag: 'path', d: 'M18 18v-7' },
    { tag: 'path', d: 'M3 22h18' },
    { tag: 'path', d: 'M6 18v-7' },
  ],
  languages: [
    { tag: 'path', d: 'm5 8 6 6' },
    { tag: 'path', d: 'm4 14 6-6 2-3' },
    { tag: 'path', d: 'M2 5h12' },
    { tag: 'path', d: 'M7 2h1' },
    { tag: 'path', d: 'm22 22-5-10-5 10' },
    { tag: 'path', d: 'M14 18h6' },
  ],
  laptop: [
    {
      tag: 'path',
      d: 'M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z',
    },
    { tag: 'path', d: 'M20.054 15.987H3.946' },
  ],
  layers: [
    {
      tag: 'path',
      d: 'M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z',
    },
    { tag: 'path', d: 'M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12' },
    { tag: 'path', d: 'M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17' },
  ],
  'layout-dashboard': [
    { tag: 'rect', x: 3, y: 3, width: 7, height: 9, rx: 1 },
    { tag: 'rect', x: 14, y: 3, width: 7, height: 5, rx: 1 },
    { tag: 'rect', x: 14, y: 12, width: 7, height: 9, rx: 1 },
    { tag: 'rect', x: 3, y: 16, width: 7, height: 5, rx: 1 },
  ],
  'layout-grid': [
    { tag: 'rect', x: 3, y: 3, width: 7, height: 7, rx: 1 },
    { tag: 'rect', x: 14, y: 3, width: 7, height: 7, rx: 1 },
    { tag: 'rect', x: 14, y: 14, width: 7, height: 7, rx: 1 },
    { tag: 'rect', x: 3, y: 14, width: 7, height: 7, rx: 1 },
  ],
  library: [
    { tag: 'path', d: 'm16 6 4 14' },
    { tag: 'path', d: 'M12 6v14' },
    { tag: 'path', d: 'M8 8v12' },
    { tag: 'path', d: 'M4 4v16' },
  ],
  link: [
    { tag: 'path', d: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71' },
    { tag: 'path', d: 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71' },
  ],
  'link-2': [
    { tag: 'path', d: 'M9 17H7A5 5 0 0 1 7 7h2' },
    { tag: 'path', d: 'M15 7h2a5 5 0 1 1 0 10h-2' },
    { tag: 'line', x1: 8, y1: 12, x2: 16, y2: 12 },
  ],
  list: [
    { tag: 'path', d: 'M3 5h.01' },
    { tag: 'path', d: 'M3 12h.01' },
    { tag: 'path', d: 'M3 19h.01' },
    { tag: 'path', d: 'M8 5h13' },
    { tag: 'path', d: 'M8 12h13' },
    { tag: 'path', d: 'M8 19h13' },
  ],
  'list-checks': [
    { tag: 'path', d: 'M13 5h8' },
    { tag: 'path', d: 'M13 12h8' },
    { tag: 'path', d: 'M13 19h8' },
    { tag: 'path', d: 'm3 17 2 2 4-4' },
    { tag: 'path', d: 'm3 7 2 2 4-4' },
  ],
  minus: [{ tag: 'path', d: 'M5 12h14' }],
  network: [
    { tag: 'rect', x: 16, y: 16, width: 6, height: 6, rx: 1 },
    { tag: 'rect', x: 2, y: 16, width: 6, height: 6, rx: 1 },
    { tag: 'rect', x: 9, y: 2, width: 6, height: 6, rx: 1 },
    { tag: 'path', d: 'M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3' },
    { tag: 'path', d: 'M12 12V8' },
  ],
  palette: [
    {
      tag: 'path',
      d: 'M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z',
    },
    { tag: 'circle', cx: 13.5, cy: 6.5, r: 0.5 },
    { tag: 'circle', cx: 17.5, cy: 10.5, r: 0.5 },
    { tag: 'circle', cx: 6.5, cy: 12.5, r: 0.5 },
    { tag: 'circle', cx: 8.5, cy: 7.5, r: 0.5 },
  ],
  play: [
    {
      tag: 'path',
      d: 'M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z',
    },
  ],
  'qr-code': [
    { tag: 'rect', x: 3, y: 3, width: 5, height: 5, rx: 1 },
    { tag: 'rect', x: 16, y: 3, width: 5, height: 5, rx: 1 },
    { tag: 'rect', x: 3, y: 16, width: 5, height: 5, rx: 1 },
    { tag: 'path', d: 'M21 16h-3a2 2 0 0 0-2 2v3' },
    { tag: 'path', d: 'M21 21v.01' },
    { tag: 'path', d: 'M12 7v3a2 2 0 0 1-2 2H7' },
    { tag: 'path', d: 'M3 12h.01' },
    { tag: 'path', d: 'M12 3h.01' },
    { tag: 'path', d: 'M12 16v.01' },
    { tag: 'path', d: 'M16 12h1' },
    { tag: 'path', d: 'M21 12v.01' },
    { tag: 'path', d: 'M12 21v-1' },
  ],
  'scroll-text': [
    { tag: 'path', d: 'M15 12h-5' },
    { tag: 'path', d: 'M15 8h-5' },
    { tag: 'path', d: 'M19 17V5a2 2 0 0 0-2-2H4' },
    {
      tag: 'path',
      d: 'M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3',
    },
  ],
  server: [
    { tag: 'rect', x: 2, y: 2, width: 20, height: 8, rx: 2, ry: 2 },
    { tag: 'rect', x: 2, y: 14, width: 20, height: 8, rx: 2, ry: 2 },
    { tag: 'line', x1: 6, y1: 6, x2: 6.01, y2: 6 },
    { tag: 'line', x1: 6, y1: 18, x2: 6.01, y2: 18 },
  ],
  shield: [
    {
      tag: 'path',
      d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
    },
  ],
  'shield-alert': [
    {
      tag: 'path',
      d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
    },
    { tag: 'path', d: 'M12 8v4' },
    { tag: 'path', d: 'M12 16h.01' },
  ],
  'shield-off': [
    { tag: 'path', d: 'm2 2 20 20' },
    {
      tag: 'path',
      d: 'M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71',
    },
    {
      tag: 'path',
      d: 'M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264',
    },
  ],
  'shopping-bag': [
    { tag: 'path', d: 'M16 10a4 4 0 0 1-8 0' },
    { tag: 'path', d: 'M3.103 6.034h17.794' },
    {
      tag: 'path',
      d: 'M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z',
    },
  ],
  tag: [
    {
      tag: 'path',
      d: 'M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z',
    },
    { tag: 'circle', cx: 7.5, cy: 7.5, r: 0.5 },
  ],
  unlink: [
    {
      tag: 'path',
      d: 'm18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71',
    },
    {
      tag: 'path',
      d: 'm5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71',
    },
    { tag: 'line', x1: 8, y1: 2, x2: 8, y2: 5 },
    { tag: 'line', x1: 2, y1: 8, x2: 5, y2: 8 },
    { tag: 'line', x1: 16, y1: 19, x2: 16, y2: 22 },
    { tag: 'line', x1: 19, y1: 16, x2: 22, y2: 16 },
  ],
  warehouse: [
    { tag: 'path', d: 'M18 21V10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v11' },
    {
      tag: 'path',
      d: 'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 1.132-1.803l7.95-3.974a2 2 0 0 1 1.837 0l7.948 3.974A2 2 0 0 1 22 8z',
    },
    { tag: 'path', d: 'M6 13h12' },
    { tag: 'path', d: 'M6 17h12' },
  ],
  workflow: [
    { tag: 'rect', x: 3, y: 3, width: 8, height: 8, rx: 2 },
    { tag: 'path', d: 'M7 11v4a2 2 0 0 0 2 2h4' },
    { tag: 'rect', x: 13, y: 13, width: 8, height: 8, rx: 2 },
  ],
  'zoom-in': [
    { tag: 'circle', cx: 11, cy: 11, r: 8 },
    { tag: 'line', x1: 21, y1: 21, x2: 16.65, y2: 16.65 },
    { tag: 'line', x1: 11, y1: 8, x2: 11, y2: 14 },
    { tag: 'line', x1: 8, y1: 11, x2: 14, y2: 11 },
  ],
  'zoom-out': [
    { tag: 'circle', cx: 11, cy: 11, r: 8 },
    { tag: 'line', x1: 21, y1: 21, x2: 16.65, y2: 16.65 },
    { tag: 'line', x1: 8, y1: 11, x2: 14, y2: 11 },
  ],
  cctv: [
    {
      tag: 'path',
      d: 'M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97',
    },
    {
      tag: 'path',
      d: 'M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z',
    },
    { tag: 'path', d: 'M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15' },
    { tag: 'path', d: 'M2 21v-4' },
    { tag: 'path', d: 'M7 9h.01' },
  ],
  'arrow-right': [
    { tag: 'path', d: 'M5 12h14' },
    { tag: 'path', d: 'm12 5 7 7-7 7' },
  ],
  'chart-column': [
    { tag: 'path', d: 'M3 3v16a2 2 0 0 0 2 2h16' },
    { tag: 'path', d: 'M18 17V9' },
    { tag: 'path', d: 'M13 17V5' },
    { tag: 'path', d: 'M8 17v-3' },
  ],
  building: [
    { tag: 'path', d: 'M12 10h.01' },
    { tag: 'path', d: 'M12 14h.01' },
    { tag: 'path', d: 'M12 6h.01' },
    { tag: 'path', d: 'M16 10h.01' },
    { tag: 'path', d: 'M16 14h.01' },
    { tag: 'path', d: 'M16 6h.01' },
    { tag: 'path', d: 'M8 10h.01' },
    { tag: 'path', d: 'M8 14h.01' },
    { tag: 'path', d: 'M8 6h.01' },
    { tag: 'path', d: 'M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3' },
    { tag: 'rect', x: 4, y: 2, width: 16, height: 20, rx: 2 },
  ],
  'building-2': [
    { tag: 'path', d: 'M10 12h4' },
    { tag: 'path', d: 'M10 8h4' },
    { tag: 'path', d: 'M14 21v-3a2 2 0 0 0-4 0v3' },
    { tag: 'path', d: 'M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2' },
    { tag: 'path', d: 'M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16' },
  ],
  cable: [
    { tag: 'path', d: 'M17 19a1 1 0 0 1-1-1v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a1 1 0 0 1-1 1z' },
    { tag: 'path', d: 'M17 21v-2' },
    { tag: 'path', d: 'M19 14V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V10' },
    { tag: 'path', d: 'M21 21v-2' },
    { tag: 'path', d: 'M3 5V3' },
    { tag: 'path', d: 'M4 10a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2z' },
    { tag: 'path', d: 'M7 5V3' },
  ],
  circle: [{ tag: 'circle', cx: 12, cy: 12, r: 10 }],
  command: [
    { tag: 'path', d: 'M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' },
  ],
  'square-pen': [
    { tag: 'path', d: 'M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7' },
    {
      tag: 'path',
      d: 'M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z',
    },
  ],
  pen: [
    {
      tag: 'path',
      d: 'M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z',
    },
  ],
  'pen-line': [
    { tag: 'path', d: 'M13 21h8' },
    {
      tag: 'path',
      d: 'M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z',
    },
  ],
  file: [
    {
      tag: 'path',
      d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
  ],
  'file-check-corner': [
    {
      tag: 'path',
      d: 'M10.5 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v6',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
    { tag: 'path', d: 'm14 20 2 2 4-4' },
  ],
  'file-spreadsheet': [
    {
      tag: 'path',
      d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
    { tag: 'path', d: 'M8 13h2' },
    { tag: 'path', d: 'M14 13h2' },
    { tag: 'path', d: 'M8 17h2' },
    { tag: 'path', d: 'M14 17h2' },
  ],
  'file-badge': [
    {
      tag: 'path',
      d: 'M13 22h5a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.3',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
    {
      tag: 'path',
      d: 'm7.69 16.479 1.29 4.88a.5.5 0 0 1-.698.591l-1.843-.849a1 1 0 0 0-.879.001l-1.846.85a.5.5 0 0 1-.692-.593l1.29-4.88',
    },
    { tag: 'circle', cx: 6, cy: 14, r: 3 },
  ],
  'file-exclamation-point': [
    {
      tag: 'path',
      d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
    },
    { tag: 'path', d: 'M12 9v4' },
    { tag: 'path', d: 'M12 17h.01' },
  ],
  'square-centerline-dashed-horizontal': [
    { tag: 'path', d: 'M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3' },
    { tag: 'path', d: 'M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3' },
    { tag: 'path', d: 'M12 20v2' },
    { tag: 'path', d: 'M12 14v2' },
    { tag: 'path', d: 'M12 8v2' },
    { tag: 'path', d: 'M12 2v2' },
  ],
  'square-centerline-dashed-vertical': [
    { tag: 'path', d: 'M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3' },
    { tag: 'path', d: 'M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3' },
    { tag: 'path', d: 'M4 12H2' },
    { tag: 'path', d: 'M10 12H8' },
    { tag: 'path', d: 'M16 12h-2' },
    { tag: 'path', d: 'M22 12h-2' },
  ],
  'grip-vertical': [
    { tag: 'circle', cx: 9, cy: 12, r: 1 },
    { tag: 'circle', cx: 9, cy: 5, r: 1 },
    { tag: 'circle', cx: 9, cy: 19, r: 1 },
    { tag: 'circle', cx: 15, cy: 12, r: 1 },
    { tag: 'circle', cx: 15, cy: 5, r: 1 },
    { tag: 'circle', cx: 15, cy: 19, r: 1 },
  ],
  hash: [
    { tag: 'line', x1: 4, y1: 9, x2: 20, y2: 9 },
    { tag: 'line', x1: 4, y1: 15, x2: 20, y2: 15 },
    { tag: 'line', x1: 10, y1: 3, x2: 8, y2: 21 },
    { tag: 'line', x1: 16, y1: 3, x2: 14, y2: 21 },
  ],
  house: [
    { tag: 'path', d: 'M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8' },
    {
      tag: 'path',
      d: 'M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
    },
  ],
  image: [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2, ry: 2 },
    { tag: 'circle', cx: 9, cy: 9, r: 2 },
    { tag: 'path', d: 'm21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21' },
  ],
  'image-off': [
    { tag: 'line', x1: 2, y1: 2, x2: 22, y2: 22 },
    { tag: 'path', d: 'M10.41 10.41a2 2 0 1 1-2.83-2.83' },
    { tag: 'line', x1: 13.5, y1: 13.5, x2: 6, y2: 21 },
    { tag: 'line', x1: 18, y1: 12, x2: 21, y2: 15 },
    {
      tag: 'path',
      d: 'M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59',
    },
    { tag: 'path', d: 'M21 15V5a2 2 0 0 0-2-2H9' },
  ],
  'ellipsis-vertical': [
    { tag: 'circle', cx: 12, cy: 12, r: 1 },
    { tag: 'circle', cx: 12, cy: 5, r: 1 },
    { tag: 'circle', cx: 12, cy: 19, r: 1 },
  ],
  mouse: [
    { tag: 'rect', x: 5, y: 2, width: 14, height: 20, rx: 7 },
    { tag: 'path', d: 'M12 6v4' },
  ],
  navigation: [{ tag: 'polygon', points: '3 11 22 2 13 21 11 13 3 11' }],
  'package-search': [
    { tag: 'path', d: 'M12 22V12' },
    { tag: 'path', d: 'M20.27 18.27 22 20' },
    {
      tag: 'path',
      d: 'M21 10.498V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l.98-.559',
    },
    { tag: 'path', d: 'M3.29 7 12 12l8.71-5' },
    { tag: 'path', d: 'm7.5 4.27 8.997 5.148' },
    { tag: 'circle', cx: 18.5, cy: 16.5, r: 2.5 },
  ],
  printer: [
    {
      tag: 'path',
      d: 'M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2',
    },
    { tag: 'path', d: 'M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6' },
    { tag: 'rect', x: 6, y: 14, width: 12, height: 8, rx: 1 },
  ],
  'rotate-cw': [
    { tag: 'path', d: 'M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8' },
    { tag: 'path', d: 'M21 3v5h-5' },
  ],
  router: [
    { tag: 'rect', x: 2, y: 14, width: 20, height: 8, rx: 2 },
    { tag: 'path', d: 'M6.01 18H6' },
    { tag: 'path', d: 'M10.01 18H10' },
    { tag: 'path', d: 'M15 10v4' },
    { tag: 'path', d: 'M17.84 7.17a4 4 0 0 0-5.66 0' },
    { tag: 'path', d: 'M20.66 4.34a8 8 0 0 0-11.31 0' },
  ],
  tablet: [
    { tag: 'rect', x: 4, y: 2, width: 16, height: 20, rx: 2, ry: 2 },
    { tag: 'line', x1: 12, y1: 18, x2: 12.01, y2: 18 },
  ],
  triangle: [
    { tag: 'path', d: 'M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z' },
  ],
  tv: [
    { tag: 'path', d: 'm17 2-5 5-5-5' },
    { tag: 'rect', x: 2, y: 7, width: 20, height: 15, rx: 2 },
  ],
  'cloud-upload': [
    { tag: 'path', d: 'M12 13v8' },
    { tag: 'path', d: 'M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242' },
    { tag: 'path', d: 'm8 17 4-4 4 4' },
  ],
  'user-check': [
    { tag: 'path', d: 'm16 11 2 2 4-4' },
    { tag: 'path', d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' },
    { tag: 'circle', cx: 9, cy: 7, r: 4 },
  ],
  'user-minus': [
    { tag: 'path', d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' },
    { tag: 'circle', cx: 9, cy: 7, r: 4 },
    { tag: 'line', x1: 22, y1: 11, x2: 16, y2: 11 },
  ],
  'user-plus': [
    { tag: 'path', d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' },
    { tag: 'circle', cx: 9, cy: 7, r: 4 },
    { tag: 'line', x1: 19, y1: 8, x2: 19, y2: 14 },
    { tag: 'line', x1: 22, y1: 11, x2: 16, y2: 11 },
  ],
  'user-x': [
    { tag: 'path', d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' },
    { tag: 'circle', cx: 9, cy: 7, r: 4 },
    { tag: 'line', x1: 17, y1: 8, x2: 22, y2: 13 },
    { tag: 'line', x1: 22, y1: 8, x2: 17, y2: 13 },
  ],
  wifi: [
    { tag: 'path', d: 'M12 20h.01' },
    { tag: 'path', d: 'M2 8.82a15 15 0 0 1 20 0' },
    { tag: 'path', d: 'M5 12.859a10 10 0 0 1 14 0' },
    { tag: 'path', d: 'M8.5 16.429a5 5 0 0 1 7 0' },
  ],
  type: [
    { tag: 'path', d: 'M12 4v16' },
    { tag: 'path', d: 'M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2' },
    { tag: 'path', d: 'M9 20h6' },
  ],
  webhook: [
    { tag: 'path', d: 'M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2' },
    { tag: 'path', d: 'm6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06' },
    { tag: 'path', d: 'm12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8' },
  ],
  power: [
    { tag: 'path', d: 'M12 2v10' },
    { tag: 'path', d: 'M18.4 6.6a9 9 0 1 1-12.77.04' },
  ],
  braces: [
    { tag: 'path', d: 'M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1' },
    { tag: 'path', d: 'M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1' },
  ],
  'panel-left': [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: 'M9 3v18' },
  ],
  'panel-left-close': [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: 'M9 3v18' },
    { tag: 'path', d: 'm16 15-3-3 3-3' },
  ],
  'calendar-check': [
    { tag: 'path', d: 'M8 2v4' },
    { tag: 'path', d: 'M16 2v4' },
    { tag: 'rect', x: 3, y: 4, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: 'M3 10h18' },
    { tag: 'path', d: 'm9 16 2 2 4-4' },
  ],
  'calendar-clock': [
    { tag: 'path', d: 'M16 14v2.2l1.6 1' },
    { tag: 'path', d: 'M16 2v4' },
    { tag: 'path', d: 'M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5' },
    { tag: 'path', d: 'M3 10h5' },
    { tag: 'path', d: 'M8 2v4' },
    { tag: 'circle', cx: 16, cy: 16, r: 6 },
  ],
  map: [
    {
      tag: 'path',
      d: 'M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z',
    },
    { tag: 'path', d: 'M15 5.764v15' },
    { tag: 'path', d: 'M9 3.236v15' },
  ],
  'user-cog': [
    { tag: 'path', d: 'M10 15H6a4 4 0 0 0-4 4v2' },
    { tag: 'path', d: 'm14.305 16.53.923-.382' },
    { tag: 'path', d: 'm15.228 13.852-.923-.383' },
    { tag: 'path', d: 'm16.852 12.228-.383-.923' },
    { tag: 'path', d: 'm16.852 17.772-.383.924' },
    { tag: 'path', d: 'm19.148 12.228.383-.923' },
    { tag: 'path', d: 'm19.53 18.696-.382-.924' },
    { tag: 'path', d: 'm20.772 13.852.924-.383' },
    { tag: 'path', d: 'm20.772 16.148.924.383' },
    { tag: 'circle', cx: 18, cy: 15, r: 3 },
    { tag: 'circle', cx: 9, cy: 7, r: 4 },
  ],
  facebook: [
    { tag: 'path', d: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
  ],
  instagram: [
    { tag: 'rect', x: 2, y: 2, width: 20, height: 20, rx: 5, ry: 5 },
    { tag: 'path', d: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' },
    { tag: 'line', x1: 17.5, y1: 6.5, x2: 17.51, y2: 6.5 },
  ],
  linkedin: [
    {
      tag: 'path',
      d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z',
    },
    { tag: 'rect', x: 2, y: 9, width: 4, height: 12 },
    { tag: 'circle', cx: 4, cy: 4, r: 2 },
  ],
  twitter: [
    {
      tag: 'path',
      d: 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z',
    },
  ],
  'key-round': [
    {
      tag: 'path',
      d: 'M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z',
    },
    { tag: 'circle', cx: 16.5, cy: 7.5, r: 0.5 },
  ],
  'calendar-days': [
    { tag: 'path', d: 'M8 2v4' },
    { tag: 'path', d: 'M16 2v4' },
    { tag: 'rect', x: 3, y: 4, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: 'M3 10h18' },
    { tag: 'path', d: 'M8 14h.01' },
    { tag: 'path', d: 'M12 14h.01' },
    { tag: 'path', d: 'M16 14h.01' },
    { tag: 'path', d: 'M8 18h.01' },
    { tag: 'path', d: 'M12 18h.01' },
    { tag: 'path', d: 'M16 18h.01' },
  ],
  infinity: [{ tag: 'path', d: 'M6 16c5 0 7-8 12-8a4 4 0 0 1 0 8c-5 0-7-8-12-8a4 4 0 1 0 0 8' }],
  square: [{ tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 }],
  'volume-2': [
    {
      tag: 'path',
      d: 'M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z',
    },
    { tag: 'path', d: 'M16 9a5 5 0 0 1 0 6' },
    { tag: 'path', d: 'M19.364 18.364a9 9 0 0 0 0-12.728' },
  ],
};
