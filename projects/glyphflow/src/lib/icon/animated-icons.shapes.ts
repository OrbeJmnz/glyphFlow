import { IconShape } from './animated-icon.model';

// Cada figura es un export individual (tree-shakeable) — SHAPES se compone a partir de ellas
// y existe solo como conveniencia para lookup dinámico (tooling, catálogo por name).

export const bellShapes: IconShape[] = [
    { tag: 'path', d: 'M10.268 21a2 2 0 0 0 3.464 0' },
    {
      tag: 'path',
      d: 'M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326',
    },
  ];

export const bellRingShapes: IconShape[] = [
    { tag: 'path', d: 'M10.268 21a2 2 0 0 0 3.464 0' },
    { tag: 'path', d: 'M22 8c0-2.3-.8-4.3-2-6' },
    {
      tag: 'path',
      d: 'M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326',
    },
    { tag: 'path', d: 'M4 2C2.8 3.7 2 5.7 2 8' },
  ];

export const checkShapes: IconShape[] = [{ tag: 'path', d: 'M20 6 9 17l-5-5' }];

export const circleAlertShapes: IconShape[] = [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'line', x1: 12, y1: 8, x2: 12, y2: 12 },
    { tag: 'line', x1: 12, y1: 16, x2: 12.01, y2: 16 },
  ];

export const circleCheckShapes: IconShape[] = [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'm9 12 2 2 4-4' },
  ];

export const circleXShapes: IconShape[] = [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'm15 9-6 6' },
    { tag: 'path', d: 'm9 9 6 6' },
  ];

export const copyShapes: IconShape[] = [
    { tag: 'rect', x: 8, y: 8, width: 14, height: 14, rx: 2, ry: 2 },
    { tag: 'path', d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' },
  ];

export const copyCheckShapes: IconShape[] = [
    { tag: 'path', d: 'm12 15 2 2 4-4' },
    { tag: 'rect', x: 8, y: 8, width: 14, height: 14, rx: 2, ry: 2 },
    { tag: 'path', d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' },
  ];

export const copyMinusShapes: IconShape[] = [
    { tag: 'line', x1: 12, y1: 15, x2: 18, y2: 15 },
    { tag: 'rect', x: 8, y: 8, width: 14, height: 14, rx: 2, ry: 2 },
    { tag: 'path', d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' },
  ];

export const copyPlusShapes: IconShape[] = [
    { tag: 'line', x1: 15, y1: 12, x2: 15, y2: 18 },
    { tag: 'line', x1: 12, y1: 15, x2: 18, y2: 15 },
    { tag: 'rect', x: 8, y: 8, width: 14, height: 14, rx: 2, ry: 2 },
    { tag: 'path', d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' },
  ];

export const copySlashShapes: IconShape[] = [
    { tag: 'line', x1: 12, y1: 18, x2: 18, y2: 12 },
    { tag: 'rect', x: 8, y: 8, width: 14, height: 14, rx: 2, ry: 2 },
    { tag: 'path', d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' },
  ];

export const copyXShapes: IconShape[] = [
    { tag: 'line', x1: 12, y1: 12, x2: 18, y2: 18 },
    { tag: 'line', x1: 12, y1: 18, x2: 18, y2: 12 },
    { tag: 'rect', x: 8, y: 8, width: 14, height: 14, rx: 2, ry: 2 },
    { tag: 'path', d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' },
  ];

export const calendarShapes: IconShape[] = [
    { tag: 'path', d: 'M8 2v3' },
    { tag: 'path', d: 'M16 2v3' },
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: 'M3 9h18' },
  ];

export const chevronRightShapes: IconShape[] = [{ tag: 'path', d: 'm9 18 6-6-6-6' }];

export const arrowLeftShapes: IconShape[] = [
    { tag: 'path', d: 'm12 19-7-7 7-7' },
    { tag: 'path', d: 'M19 12H5' },
  ];

export const downloadShapes: IconShape[] = [
    { tag: 'path', d: 'M12 15V3' },
    { tag: 'path', d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' },
    { tag: 'path', d: 'm7 10 5 5 5-5' },
  ];

export const eyeShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0',
    },
    { tag: 'circle', cx: 12, cy: 12, r: 3 },
  ];

export const eyeOffShapes: IconShape[] = [
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
  ];

export const hatGlassesShapes: IconShape[] = [
    { tag: 'path', d: 'M14 18a2 2 0 0 0-4 0' },
    {
      tag: 'path',
      d: 'm19 11-2.11-6.657a2 2 0 0 0-2.752-1.148l-1.276.61A2 2 0 0 1 12 4H8.5a2 2 0 0 0-1.925 1.456L5 11',
    },
    { tag: 'path', d: 'M2 11h20' },
    { tag: 'circle', cx: 17, cy: 18, r: 3 },
    { tag: 'circle', cx: 7, cy: 18, r: 3 },
  ];

export const heartPulseShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5',
    },
    { tag: 'path', d: 'M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27' },
  ];

export const imagesShapes: IconShape[] = [
    { tag: 'path', d: 'm22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16' },
    { tag: 'path', d: 'M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2' },
    { tag: 'circle', cx: 13, cy: 7, r: 1, fill: 'currentColor' },
    { tag: 'rect', x: 8, y: 2, width: 14, height: 14, rx: 2 },
  ];

export const infoShapes: IconShape[] = [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'M12 16v-4' },
    { tag: 'path', d: 'M12 8h.01' },
  ];

export const loaderCircleShapes: IconShape[] = [{ tag: 'path', d: 'M21 12a9 9 0 1 1-6.219-8.56' }];

export const lockShapes: IconShape[] = [
    { tag: 'rect', x: 3, y: 11, width: 18, height: 11, rx: 2, ry: 2 },
    { tag: 'path', d: 'M7 11V7a5 5 0 0 1 10 0v4' },
  ];

export const mailShapes: IconShape[] = [
    { tag: 'path', d: 'm22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7' },
    { tag: 'rect', x: 2, y: 4, width: 20, height: 16, rx: 2 },
  ];

export const mousePointerClickShapes: IconShape[] = [
    { tag: 'path', d: 'M14 4.1 12 6' },
    { tag: 'path', d: 'm5.1 8-2.9-.8' },
    { tag: 'path', d: 'm6 12-1.9 2' },
    { tag: 'path', d: 'M7.2 2.2 8 5.1' },
    {
      tag: 'path',
      d: 'M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z',
    },
  ];

export const pencilShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z',
    },
    { tag: 'path', d: 'm15 5 4 4' },
  ];

export const plusShapes: IconShape[] = [
    { tag: 'path', d: 'M5 12h14' },
    { tag: 'path', d: 'M12 5v14' },
  ];

export const refreshCwShapes: IconShape[] = [
    { tag: 'path', d: 'M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8' },
    { tag: 'path', d: 'M21 3v5h-5' },
    { tag: 'path', d: 'M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16' },
    { tag: 'path', d: 'M8 16H3v5' },
  ];

export const saveShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z',
    },
    { tag: 'path', d: 'M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7' },
    { tag: 'path', d: 'M7 3v4a1 1 0 0 0 1 1h7' },
  ];

export const saveAllShapes: IconShape[] = [
    { tag: 'path', d: 'M10 2v3a1 1 0 0 0 1 1h5' },
    { tag: 'path', d: 'M18 18v-6a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6' },
    { tag: 'path', d: 'M18 22H4a2 2 0 0 1-2-2V6' },
    {
      tag: 'path',
      d: 'M8 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 22 6.828V16a2 2 0 0 1-2.01 2z',
    },
  ];

export const saveCheckShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M12.5 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10.2a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4v4.35',
    },
    { tag: 'path', d: 'm16 19 2 2 4-4' },
    { tag: 'path', d: 'M17 15.13V14a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7' },
    { tag: 'path', d: 'M7 3v4a1 1 0 0 0 1 1h7' },
  ];

export const saveOffShapes: IconShape[] = [
    { tag: 'path', d: 'M13 13H8a1 1 0 0 0-1 1v7' },
    { tag: 'path', d: 'M14 8h1' },
    { tag: 'path', d: 'M17 21v-4' },
    { tag: 'path', d: 'm2 2 20 20' },
    { tag: 'path', d: 'M20.41 20.41A2 2 0 0 1 19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 .59-1.41' },
    { tag: 'path', d: 'M29.5 11.5s5 5 4 5' },
    { tag: 'path', d: 'M9 3h6.2a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V15' },
  ];

export const savePenShapes: IconShape[] = [
    { tag: 'path', d: 'M13.33 13H8a1 1 0 00-1 1v7' },
    {
      tag: 'path',
      d: 'M14.363 17.634a2 2 0 00-.506.854l-.837 2.87a.5.5 0 00.62.62l2.87-.837a2 2 0 00.854-.506l4.013-4.009a1 1 0 10-3.004-3.004z',
    },
    { tag: 'path', d: 'M7 3v4a1 1 0 001 1h7' },
    {
      tag: 'path',
      d: 'M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h10.2a2 2 0 011.4.6l3.8 3.8a2 2 0 01.6 1.4v.3',
    },
  ];

export const savePlusShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M12.5 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10.2a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V12',
    },
    { tag: 'path', d: 'M16 13H8a1 1 0 0 0-1 1v7' },
    { tag: 'path', d: 'M19 22v-6' },
    { tag: 'path', d: 'M22 19h-6' },
    { tag: 'path', d: 'M7 3v4a1 1 0 0 0 1 1h7' },
  ];

export const searchShapes: IconShape[] = [
    { tag: 'path', d: 'm21 21-4.34-4.34' },
    { tag: 'circle', cx: 11, cy: 11, r: 8 },
  ];

export const searchCheckShapes: IconShape[] = [
    { tag: 'path', d: 'm8 11 2 2 4-4' },
    { tag: 'circle', cx: 11, cy: 11, r: 8 },
    { tag: 'path', d: 'm21 21-4.3-4.3' },
  ];

export const searchSlashShapes: IconShape[] = [
    { tag: 'path', d: 'm13.5 8.5-5 5' },
    { tag: 'circle', cx: 11, cy: 11, r: 8 },
    { tag: 'path', d: 'm21 21-4.3-4.3' },
  ];

export const searchXShapes: IconShape[] = [
    { tag: 'path', d: 'm13.5 8.5-5 5' },
    { tag: 'path', d: 'm8.5 8.5 5 5' },
    { tag: 'circle', cx: 11, cy: 11, r: 8 },
    { tag: 'path', d: 'm21 21-4.3-4.3' },
  ];

export const sendShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z',
    },
    { tag: 'path', d: 'm21.854 2.147-10.94 10.939' },
  ];

export const settingsShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915',
    },
    { tag: 'circle', cx: 12, cy: 12, r: 3 },
  ];

export const shieldCheckShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
    },
    { tag: 'path', d: 'm9 12 2 2 4-4' },
  ];

export const sparklesShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z',
    },
    { tag: 'path', d: 'M20 2v4' },
    { tag: 'path', d: 'M22 4h-4' },
    { tag: 'circle', cx: 4, cy: 20, r: 2 },
  ];

export const trashShapes: IconShape[] = [
    { tag: 'path', d: 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6' },
    { tag: 'path', d: 'M3 6h18' },
    { tag: 'path', d: 'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' },
  ];

export const trash2Shapes: IconShape[] = [
    { tag: 'path', d: 'M10 11v6' },
    { tag: 'path', d: 'M14 11v6' },
    { tag: 'path', d: 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6' },
    { tag: 'path', d: 'M3 6h18' },
    { tag: 'path', d: 'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' },
  ];

export const triangleAlertShapes: IconShape[] = [
    { tag: 'path', d: 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3' },
    { tag: 'path', d: 'M12 9v4' },
    { tag: 'path', d: 'M12 17h.01' },
  ];

export const uploadShapes: IconShape[] = [
    { tag: 'path', d: 'M12 3v12' },
    { tag: 'path', d: 'm17 8-5-5-5 5' },
    { tag: 'path', d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' },
  ];

export const userShapes: IconShape[] = [
    { tag: 'path', d: 'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' },
    { tag: 'circle', cx: 12, cy: 7, r: 4 },
  ];

export const wrenchShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z',
    },
  ];

export const xShapes: IconShape[] = [
    { tag: 'path', d: 'M18 6 6 18' },
    { tag: 'path', d: 'm6 6 12 12' },
  ];

export const fileTextShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
    { tag: 'path', d: 'M10 9H8' },
    { tag: 'path', d: 'M16 13H8' },
    { tag: 'path', d: 'M16 17H8' },
  ];

export const monitorShapes: IconShape[] = [
    { tag: 'rect', x: 2, y: 3, width: 20, height: 14, rx: 2 },
    { tag: 'line', x1: 8, y1: 21, x2: 16, y2: 21 },
    { tag: 'line', x1: 12, y1: 17, x2: 12, y2: 21 },
  ];

export const packageShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z',
    },
    { tag: 'path', d: 'M12 22V12' },
    { tag: 'polyline', points: '3.29 7 12 12 20.71 7' },
    { tag: 'path', d: 'm7.5 4.27 9 5.15' },
  ];

export const packageCheckShapes: IconShape[] = [
    { tag: 'path', d: 'M12 22V12' },
    { tag: 'path', d: 'm16 17 2 2 4-4' },
    {
      tag: 'path',
      d: 'M21 11.127V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.32-.753',
    },
    { tag: 'path', d: 'M3.29 7 12 12l8.71-5' },
    { tag: 'path', d: 'm7.5 4.27 8.997 5.148' },
  ];

export const packageMinusShapes: IconShape[] = [
    { tag: 'path', d: 'M12 22V12' },
    { tag: 'path', d: 'M16 17h6' },
    {
      tag: 'path',
      d: 'M21 13V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.675-.955',
    },
    { tag: 'path', d: 'M3.29 7 12 12l8.71-5' },
    { tag: 'path', d: 'm7.5 4.27 8.997 5.148' },
  ];

export const packageOpenShapes: IconShape[] = [
    { tag: 'path', d: 'M12 22v-9' },
    {
      tag: 'path',
      d: 'M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z',
    },
    {
      tag: 'path',
      d: 'M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13',
    },
    {
      tag: 'path',
      d: 'M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z',
    },
  ];

export const packagePlusShapes: IconShape[] = [
    { tag: 'path', d: 'M12 22V12' },
    { tag: 'path', d: 'M16 17h6' },
    { tag: 'path', d: 'M19 14v6' },
    {
      tag: 'path',
      d: 'M21 10.535V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.675-.955',
    },
    { tag: 'path', d: 'M3.29 7 12 12l8.71-5' },
    { tag: 'path', d: 'm7.5 4.27 8.997 5.148' },
  ];

export const packageXShapes: IconShape[] = [
    { tag: 'path', d: 'M12 22V12' },
    { tag: 'path', d: 'm16.5 14.5 5 5' },
    { tag: 'path', d: 'm16.5 19.5 5-5' },
    {
      tag: 'path',
      d: 'M21 10.5V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l.13-.074',
    },
    { tag: 'path', d: 'M3.29 7 12 12l8.71-5' },
    { tag: 'path', d: 'm7.5 4.27 8.997 5.148' },
  ];

export const rotateCcwClockShapes: IconShape[] = [
    { tag: 'path', d: 'M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8' },
    { tag: 'path', d: 'M3 3v5h5' },
    { tag: 'path', d: 'M12 7v5l4 2' },
  ];

export const shirtShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z',
    },
  ];

export const folderOpenShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'm6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2',
    },
  ];

export const planeShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z',
    },
  ];

export const globeShapes: IconShape[] = [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20' },
    { tag: 'path', d: 'M2 12h20' },
  ];

export const globeCheckShapes: IconShape[] = [
    { tag: 'path', d: 'm15 6 2 2 4-4' },
    { tag: 'path', d: 'M2 12h20A10 10 0 1 1 12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 4-10' },
  ];

export const globeLockShapes: IconShape[] = [
    { tag: 'path', d: 'M15.686 15A14.5 14.5 0 0 1 12 22a14.5 14.5 0 0 1 0-20 10 10 0 1 0 9.542 13' },
    { tag: 'path', d: 'M2 12h8.5' },
    { tag: 'path', d: 'M20 6V4a2 2 0 1 0-4 0v2' },
    { tag: 'rect', x: 14, y: 6, width: 8, height: 5, rx: 1 },
  ];

export const globeOffShapes: IconShape[] = [
    { tag: 'path', d: 'M10.114 4.462A14.5 14.5 0 0 1 12 2a10 10 0 0 1 9.313 13.643' },
    { tag: 'path', d: 'M15.557 15.556A14.5 14.5 0 0 1 12 22 10 10 0 0 1 4.929 4.929' },
    { tag: 'path', d: 'M15.892 10.234A14.5 14.5 0 0 0 12 2a10 10 0 0 0-3.643.687' },
    { tag: 'path', d: 'M17.656 12H22' },
    { tag: 'path', d: 'M19.071 19.071A10 10 0 0 1 12 22 14.5 14.5 0 0 1 8.44 8.45' },
    { tag: 'path', d: 'M2 12h10' },
    { tag: 'path', d: 'm2 2 20 20' },
  ];

export const globeXShapes: IconShape[] = [
    { tag: 'path', d: 'm16 3 5 5' },
    { tag: 'path', d: 'M2 12h20A10 10 0 1 1 12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 4-10' },
    { tag: 'path', d: 'm21 3-5 5' },
  ];

export const bookmarkShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z',
    },
  ];

export const bookmarkCheckShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z',
    },
    { tag: 'path', d: 'm9 10 2 2 4-4' },
  ];

export const bookmarkMinusShapes: IconShape[] = [
    { tag: 'path', d: 'M15 10H9' },
    {
      tag: 'path',
      d: 'M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z',
    },
  ];

export const bookmarkOffShapes: IconShape[] = [
    { tag: 'path', d: 'M19 19v1a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5' },
    { tag: 'path', d: 'm2 2 20 20' },
    { tag: 'path', d: 'M8.656 3H17a2 2 0 0 1 2 2v8.344' },
  ];

export const bookmarkPlusShapes: IconShape[] = [
    { tag: 'path', d: 'M12 7v6' },
    { tag: 'path', d: 'M15 10H9' },
    {
      tag: 'path',
      d: 'M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z',
    },
  ];

export const bookmarkXShapes: IconShape[] = [
    { tag: 'path', d: 'm14.5 7.5-5 5' },
    {
      tag: 'path',
      d: 'M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z',
    },
    { tag: 'path', d: 'm9.5 7.5 5 5' },
  ];

export const stickyNoteShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z',
    },
    { tag: 'path', d: 'M15 3v5a1 1 0 0 0 1 1h5' },
  ];

export const stickyNoteCheckShapes: IconShape[] = [
    { tag: 'path', d: 'm15 19 2 2 4-4' },
    { tag: 'path', d: 'M15 3v5a1 1 0 0 0 1 1h5' },
    {
      tag: 'path',
      d: 'M21 13V9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6.5',
    },
  ];

export const stickyNoteMinusShapes: IconShape[] = [
    { tag: 'path', d: 'M15 3v5a1 1 0 0 0 1 1h5' },
    {
      tag: 'path',
      d: 'M21 14V9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.35',
    },
    { tag: 'path', d: 'M21 18h-6' },
  ];

export const stickyNoteOffShapes: IconShape[] = [
    { tag: 'path', d: 'M15 3v5a1 1 0 0 0 1 1h5' },
    { tag: 'path', d: 'm2 2 20 20' },
    { tag: 'path', d: 'M3.586 3.586A2 2 0 0 0 3 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.414-.586' },
    { tag: 'path', d: 'M8.656 3H15a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 21 9v6.344' },
  ];

export const stickyNotePlusShapes: IconShape[] = [
    { tag: 'path', d: 'M15 3v5a1 1 0 0 0 1 1h5' },
    { tag: 'path', d: 'M18 15v6' },
    {
      tag: 'path',
      d: 'M21 12.356V9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7.355',
    },
    { tag: 'path', d: 'M21 18h-6' },
  ];

export const stickyNoteXShapes: IconShape[] = [
    { tag: 'path', d: 'M15 3v5a1 1 0 0 0 1 1h5' },
    { tag: 'path', d: 'm16 16 5 5' },
    {
      tag: 'path',
      d: 'M21 12V9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7',
    },
    { tag: 'path', d: 'm21 16-5 5' },
  ];

export const ticketShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z',
    },
    { tag: 'path', d: 'M13 5v2' },
    { tag: 'path', d: 'M13 17v2' },
    { tag: 'path', d: 'M13 11v2' },
  ];

export const ticketCheckShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z',
    },
    { tag: 'path', d: 'm9 12 2 2 4-4' },
  ];

export const ticketMinusShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z',
    },
    { tag: 'path', d: 'M9 12h6' },
  ];

export const ticketPercentShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M2 9a3 3 0 1 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 1 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z',
    },
    { tag: 'path', d: 'M9 9h.01' },
    { tag: 'path', d: 'm15 9-6 6' },
    { tag: 'path', d: 'M15 15h.01' },
  ];

export const ticketPlusShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z',
    },
    { tag: 'path', d: 'M9 12h6' },
    { tag: 'path', d: 'M12 9v6' },
  ];

export const ticketSlashShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z',
    },
    { tag: 'path', d: 'm9.5 14.5 5-5' },
  ];

export const ticketXShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z',
    },
    { tag: 'path', d: 'm9.5 14.5 5-5' },
    { tag: 'path', d: 'm9.5 9.5 5 5' },
  ];

export const grid2x2Shapes: IconShape[] = [
    { tag: 'path', d: 'M12 3v18' },
    { tag: 'path', d: 'M3 12h18' },
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
  ];

export const grid2x2CheckShapes: IconShape[] = [
    { tag: 'path', d: 'M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3' },
    { tag: 'path', d: 'm16 19 2 2 4-4' },
  ];

export const grid2x2PlusShapes: IconShape[] = [
    { tag: 'path', d: 'M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3' },
    { tag: 'path', d: 'M16 19h6' },
    { tag: 'path', d: 'M19 22v-6' },
  ];

export const grid2x2XShapes: IconShape[] = [
    { tag: 'path', d: 'M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3' },
    { tag: 'path', d: 'm16 16 5 5' },
    { tag: 'path', d: 'm16 21 5-5' },
  ];

export const keyShapes: IconShape[] = [
    { tag: 'path', d: 'm15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4' },
    { tag: 'path', d: 'm21 2-9.6 9.6' },
    { tag: 'circle', cx: 7.5, cy: 15.5, r: 5.5 },
  ];

export const usersShapes: IconShape[] = [
    { tag: 'path', d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' },
    { tag: 'path', d: 'M16 3.128a4 4 0 0 1 0 7.744' },
    { tag: 'path', d: 'M22 21v-2a4 4 0 0 0-3-3.87' },
    { tag: 'circle', cx: 9, cy: 7, r: 4 },
  ];

export const truckShapes: IconShape[] = [
    { tag: 'path', d: 'M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2' },
    { tag: 'path', d: 'M15 18H9' },
    {
      tag: 'path',
      d: 'M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14',
    },
    { tag: 'circle', cx: 17, cy: 18, r: 2 },
    { tag: 'circle', cx: 7, cy: 18, r: 2 },
  ];

export const mapPinShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0',
    },
    { tag: 'circle', cx: 12, cy: 10, r: 3 },
  ];

export const mapPinCheckShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M19.43 12.935c.357-.967.57-1.955.57-2.935a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32.197 32.197 0 0 0 .813-.728',
    },
    { tag: 'circle', cx: 12, cy: 10, r: 3 },
    { tag: 'path', d: 'm16 18 2 2 4-4' },
  ];

export const mapPinCheckInsideShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0',
    },
    { tag: 'path', d: 'm9 10 2 2 4-4' },
  ];

export const mapPinHouseShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z',
    },
    { tag: 'path', d: 'M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2' },
    { tag: 'path', d: 'M18 22v-3' },
    { tag: 'circle', cx: 10, cy: 10, r: 3 },
  ];

export const mapPinMinusShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M18.977 14C19.6 12.701 20 11.343 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32 32 0 0 0 .824-.738',
    },
    { tag: 'circle', cx: 12, cy: 10, r: 3 },
    { tag: 'path', d: 'M16 18h6' },
  ];

export const mapPinMinusInsideShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0',
    },
    { tag: 'path', d: 'M9 10h6' },
  ];

export const mapPinPlusShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M19.914 11.105A7.298 7.298 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 32 32 0 0 0 .824-.738',
    },
    { tag: 'circle', cx: 12, cy: 10, r: 3 },
    { tag: 'path', d: 'M16 18h6' },
    { tag: 'path', d: 'M19 15v6' },
  ];

export const mapPinPlusInsideShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0',
    },
    { tag: 'path', d: 'M12 7v6' },
    { tag: 'path', d: 'M9 10h6' },
  ];

export const mapPinSearchShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M 12.248 21.969 a 1 1 0 0 1 -0.849 -0.17 C 9.539 20.193 4 14.993 4 10 a 8 8 0 0 1 16 0 C 20 10.42 19.961 10.841 19.888 11.262',
    },
    { tag: 'path', d: 'm22 22-1.88-1.88' },
    { tag: 'circle', cx: 12, cy: 10, r: 3 },
    { tag: 'circle', cx: 18, cy: 18, r: 3 },
  ];

export const mapPinXShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M19.752 11.901A7.78 7.78 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 19 19 0 0 0 .09-.077',
    },
    { tag: 'circle', cx: 12, cy: 10, r: 3 },
    { tag: 'path', d: 'm21.5 15.5-5 5' },
    { tag: 'path', d: 'm21.5 20.5-5-5' },
  ];

export const mapPinXInsideShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0',
    },
    { tag: 'path', d: 'm14.5 7.5-5 5' },
    { tag: 'path', d: 'm9.5 7.5 5 5' },
  ];

export const externalLinkShapes: IconShape[] = [
    { tag: 'path', d: 'M15 3h6v6' },
    { tag: 'path', d: 'M10 14 21 3' },
    { tag: 'path', d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' },
  ];

export const briefcaseShapes: IconShape[] = [
    { tag: 'path', d: 'M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16' },
    { tag: 'rect', x: 2, y: 6, width: 20, height: 14, rx: 2 },
  ];

export const bookOpenShapes: IconShape[] = [
    { tag: 'path', d: 'M12 5v16' },
    {
      tag: 'path',
      d: 'M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z',
    },
  ];

export const smartphoneShapes: IconShape[] = [
    { tag: 'rect', x: 5, y: 2, width: 14, height: 20, rx: 2, ry: 2 },
    { tag: 'path', d: 'M12 18h.01' },
  ];

export const phoneShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384',
    },
  ];

export const receiptShapes: IconShape[] = [
    { tag: 'path', d: 'M12 17V7' },
    { tag: 'path', d: 'M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8' },
    {
      tag: 'path',
      d: 'M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z',
    },
  ];

export const rotateCcwShapes: IconShape[] = [
    { tag: 'path', d: 'M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8' },
    { tag: 'path', d: 'M3 3v5h5' },
  ];

export const shoppingCartShapes: IconShape[] = [
    { tag: 'circle', cx: 8, cy: 21, r: 1 },
    { tag: 'circle', cx: 19, cy: 21, r: 1 },
    {
      tag: 'path',
      d: 'M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12',
    },
  ];

export const banknoteShapes: IconShape[] = [
    { tag: 'rect', x: 2, y: 6, width: 20, height: 12, rx: 2 },
    { tag: 'circle', cx: 12, cy: 12, r: 2 },
    { tag: 'path', d: 'M6 12h.01M18 12h.01' },
  ];

export const crownShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z',
    },
    { tag: 'path', d: 'M5 21h14' },
  ];

export const sunShapes: IconShape[] = [
    { tag: 'circle', cx: 12, cy: 12, r: 4 },
    { tag: 'path', d: 'M12 2v2' },
    { tag: 'path', d: 'M12 20v2' },
    { tag: 'path', d: 'm4.93 4.93 1.41 1.41' },
    { tag: 'path', d: 'm17.66 17.66 1.41 1.41' },
    { tag: 'path', d: 'M2 12h2' },
    { tag: 'path', d: 'M20 12h2' },
    { tag: 'path', d: 'm6.34 17.66-1.41 1.41' },
    { tag: 'path', d: 'm19.07 4.93-1.41 1.41' },
  ];

export const moonShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401',
    },
  ];

export const zapShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z',
    },
  ];

export const clockShapes: IconShape[] = [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'M12 6v6l4 2' },
  ];

export const lightbulbShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5',
    },
    { tag: 'path', d: 'M9 18h6' },
    { tag: 'path', d: 'M10 22h4' },
  ];

export const cameraShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z',
    },
    { tag: 'circle', cx: 12, cy: 13, r: 3 },
  ];

export const cakeShapes: IconShape[] = [
    { tag: 'path', d: 'M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8' },
    { tag: 'path', d: 'M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1' },
    { tag: 'path', d: 'M2 21h20' },
    { tag: 'path', d: 'M7 8v3' },
    { tag: 'path', d: 'M12 8v3' },
    { tag: 'path', d: 'M17 8v3' },
    { tag: 'path', d: 'M7 4h.01' },
    { tag: 'path', d: 'M12 4h.01' },
    { tag: 'path', d: 'M17 4h.01' },
  ];

export const banShapes: IconShape[] = [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'M4.929 4.929 19.07 19.071' },
  ];

export const atSignShapes: IconShape[] = [
    { tag: 'circle', cx: 12, cy: 12, r: 4 },
    { tag: 'path', d: 'M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8' },
  ];

export const logOutShapes: IconShape[] = [
    { tag: 'path', d: 'm16 17 5-5-5-5' },
    { tag: 'path', d: 'M21 12H9' },
    { tag: 'path', d: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' },
  ];

export const funnelShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z',
    },
  ];

export const starShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z',
    },
  ];

export const starCheckShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'm19.06 12.501 2.78-2.707a.53.53 0 0 0-.294-.905l-5.166-.755a2.1 2.1 0 0 1-1.595-1.16l-2.31-4.68a.53.53 0 0 0-.95.001L9.216 6.974a2.1 2.1 0 0 1-1.597 1.16l-5.165.755a.53.53 0 0 0-.294.906l3.736 3.637a2.1 2.1 0 0 1 .611 1.879l-.88 5.139a.53.53 0 0 0 .769.56l4.617-2.428.027-.014',
    },
    { tag: 'path', d: 'm15 18 2 2 4-4' },
  ];

export const starHalfShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M12 18.338a2.1 2.1 0 0 0-.987.244L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16l2.309-4.679A.53.53 0 0 1 12 2',
    },
  ];

export const starMinusShapes: IconShape[] = [
    { tag: 'path', d: 'M15 18h6' },
    {
      tag: 'path',
      d: 'M17.688 14a2.1 2.1 0 0 1 .416-.568l3.736-3.638a.53.53 0 0 0-.294-.905l-5.166-.755a2.1 2.1 0 0 1-1.595-1.16l-2.31-4.68a.53.53 0 0 0-.95.001L9.216 6.974a2.1 2.1 0 0 1-1.597 1.16l-5.165.755a.53.53 0 0 0-.294.906l3.736 3.637a2.1 2.1 0 0 1 .611 1.879l-.88 5.139a.53.53 0 0 0 .769.56l4.617-2.428.027-.014',
    },
  ];

export const starOffShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'm10.344 4.688 1.181-2.393a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.237 3.152',
    },
    {
      tag: 'path',
      d: 'm17.945 17.945.43 2.505a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a8 8 0 0 0 .4-.099',
    },
    { tag: 'path', d: 'm2 2 20 20' },
  ];

export const starPlusShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M11.013 18.582 6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16l2.309-4.679a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904L20 11.5',
    },
    { tag: 'path', d: 'M15 18h6' },
    { tag: 'path', d: 'M18 15v6' },
  ];

export const starXShapes: IconShape[] = [
    { tag: 'path', d: 'm15.5 15.5 5 5' },
    {
      tag: 'path',
      d: 'm20.063 11.525 1.777-1.731a.53.53 0 0 0-.294-.905l-5.166-.755a2.1 2.1 0 0 1-1.595-1.16l-2.31-4.68a.53.53 0 0 0-.95.001L9.216 6.974a2.1 2.1 0 0 1-1.597 1.16l-5.165.755a.53.53 0 0 0-.294.906l3.736 3.637a2.1 2.1 0 0 1 .611 1.879l-.88 5.139a.53.53 0 0 0 .769.56l4.617-2.428a2.1 2.1 0 0 1 .987-.243 2 2 0 0 1 .132.004',
    },
    { tag: 'path', d: 'm20.5 15.5-5 5' },
  ];

export const activityShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2',
    },
  ];

export const alarmClockShapes: IconShape[] = [
    { tag: 'circle', cx: 12, cy: 13, r: 8 },
    { tag: 'path', d: 'M12 9v4l2 2' },
    { tag: 'path', d: 'M5 3 2 6' },
    { tag: 'path', d: 'm22 6-3-3' },
    { tag: 'path', d: 'M6.38 18.7 4 21' },
    { tag: 'path', d: 'M17.64 18.67 20 21' },
  ];

export const alarmClockCheckShapes: IconShape[] = [
    { tag: 'circle', cx: 12, cy: 13, r: 8 },
    { tag: 'path', d: 'M5 3 2 6' },
    { tag: 'path', d: 'm22 6-3-3' },
    { tag: 'path', d: 'M6.38 18.7 4 21' },
    { tag: 'path', d: 'M17.64 18.67 20 21' },
    { tag: 'path', d: 'm9 13 2 2 4-4' },
  ];

export const alarmClockMinusShapes: IconShape[] = [
    { tag: 'circle', cx: 12, cy: 13, r: 8 },
    { tag: 'path', d: 'M5 3 2 6' },
    { tag: 'path', d: 'm22 6-3-3' },
    { tag: 'path', d: 'M6.38 18.7 4 21' },
    { tag: 'path', d: 'M17.64 18.67 20 21' },
    { tag: 'path', d: 'M9 13h6' },
  ];

export const alarmClockOffShapes: IconShape[] = [
    { tag: 'path', d: 'M6.87 6.87a8 8 0 1 0 11.26 11.26' },
    { tag: 'path', d: 'M19.9 14.25a8 8 0 0 0-9.15-9.15' },
    { tag: 'path', d: 'm22 6-3-3' },
    { tag: 'path', d: 'M6.26 18.67 4 21' },
    { tag: 'path', d: 'm2 2 20 20' },
    { tag: 'path', d: 'M4 4 2 6' },
  ];

export const alarmClockPlusShapes: IconShape[] = [
    { tag: 'circle', cx: 12, cy: 13, r: 8 },
    { tag: 'path', d: 'M5 3 2 6' },
    { tag: 'path', d: 'm22 6-3-3' },
    { tag: 'path', d: 'M6.38 18.7 4 21' },
    { tag: 'path', d: 'M17.64 18.67 20 21' },
    { tag: 'path', d: 'M12 10v6' },
    { tag: 'path', d: 'M9 13h6' },
  ];

export const appWindowShapes: IconShape[] = [
    { tag: 'rect', x: 2, y: 4, width: 20, height: 16, rx: 2 },
    { tag: 'path', d: 'M10 4v4' },
    { tag: 'path', d: 'M2 8h20' },
    { tag: 'path', d: 'M6 4v4' },
  ];

export const badgeCheckShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z',
    },
    { tag: 'path', d: 'm9 12 2 2 4-4' },
  ];

export const chevronDownShapes: IconShape[] = [{ tag: 'path', d: 'm6 9 6 6 6-6' }];

export const chevronLeftShapes: IconShape[] = [{ tag: 'path', d: 'm15 18-6-6 6-6' }];

export const chevronUpShapes: IconShape[] = [{ tag: 'path', d: 'm18 15-6-6-6 6' }];

export const chevronsUpDownShapes: IconShape[] = [
    { tag: 'path', d: 'm7 15 5 5 5-5' },
    { tag: 'path', d: 'm7 9 5-5 5 5' },
  ];

export const circlePlusShapes: IconShape[] = [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'M8 12h8' },
    { tag: 'path', d: 'M12 8v8' },
  ];

export const circleQuestionMarkShapes: IconShape[] = [
    { tag: 'circle', cx: 12, cy: 12, r: 10 },
    { tag: 'path', d: 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3' },
    { tag: 'path', d: 'M12 17h.01' },
  ];

export const clipboardCheckShapes: IconShape[] = [
    { tag: 'rect', x: 8, y: 2, width: 8, height: 4, rx: 1, ry: 1 },
    { tag: 'path', d: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2' },
    { tag: 'path', d: 'm9 14 2 2 4-4' },
  ];

export const contactShapes: IconShape[] = [
    { tag: 'path', d: 'M16 2v2' },
    { tag: 'path', d: 'M7 21v-2a2 2 0 012-2h6a2 2 0 012 2v2' },
    { tag: 'path', d: 'M8 2v2' },
    { tag: 'circle', cx: 12, cy: 10, r: 3 },
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
  ];

export const cpuShapes: IconShape[] = [
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
  ];

export const creditCardShapes: IconShape[] = [
    { tag: 'rect', x: 2, y: 5, width: 20, height: 14, rx: 2 },
    { tag: 'line', x1: 2, y1: 10, x2: 22, y2: 10 },
  ];

export const databaseShapes: IconShape[] = [
    { tag: 'ellipse', cx: 12, cy: 5, rx: 9, ry: 3 },
    { tag: 'path', d: 'M3 5V19A9 3 0 0 0 21 19V5' },
    { tag: 'path', d: 'M3 12A9 3 0 0 0 21 12' },
  ];

export const ellipsisShapes: IconShape[] = [
    { tag: 'circle', cx: 12, cy: 12, r: 1 },
    { tag: 'circle', cx: 19, cy: 12, r: 1 },
    { tag: 'circle', cx: 5, cy: 12, r: 1 },
  ];

export const fileCheckShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
    { tag: 'path', d: 'm9 15 2 2 4-4' },
  ];

export const fileXShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
    { tag: 'path', d: 'm14.5 12.5-5 5' },
    { tag: 'path', d: 'm9.5 12.5 5 5' },
  ];

export const gitForkShapes: IconShape[] = [
    { tag: 'circle', cx: 12, cy: 18, r: 3 },
    { tag: 'circle', cx: 6, cy: 6, r: 3 },
    { tag: 'circle', cx: 18, cy: 6, r: 3 },
    { tag: 'path', d: 'M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9' },
    { tag: 'path', d: 'M12 12v3' },
  ];

export const graduationCapShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z',
    },
    { tag: 'path', d: 'M22 10v6' },
    { tag: 'path', d: 'M6 12.5V16a6 3 0 0 0 12 0v-3.5' },
  ];

export const hardDriveShapes: IconShape[] = [
    { tag: 'path', d: 'M10 16h.01' },
    {
      tag: 'path',
      d: 'M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z',
    },
    { tag: 'path', d: 'M21.946 12.013H2.054' },
    { tag: 'path', d: 'M6 16h.01' },
  ];

export const idCardShapes: IconShape[] = [
    { tag: 'path', d: 'M16 10h2' },
    { tag: 'path', d: 'M16 14h2' },
    { tag: 'path', d: 'M6.17 15a3 3 0 0 1 5.66 0' },
    { tag: 'circle', cx: 9, cy: 11, r: 2 },
    { tag: 'rect', x: 2, y: 5, width: 20, height: 14, rx: 2 },
  ];

export const inboxShapes: IconShape[] = [
    { tag: 'polyline', points: '22 12 16 12 14 15 10 15 8 12 2 12' },
    {
      tag: 'path',
      d: 'M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z',
    },
  ];

export const keyboardShapes: IconShape[] = [
    { tag: 'path', d: 'M10 8h.01' },
    { tag: 'path', d: 'M12 12h.01' },
    { tag: 'path', d: 'M14 8h.01' },
    { tag: 'path', d: 'M16 12h.01' },
    { tag: 'path', d: 'M18 8h.01' },
    { tag: 'path', d: 'M6 8h.01' },
    { tag: 'path', d: 'M7 16h10' },
    { tag: 'path', d: 'M8 12h.01' },
    { tag: 'rect', x: 2, y: 4, width: 20, height: 16, rx: 2 },
  ];

export const landmarkShapes: IconShape[] = [
    { tag: 'path', d: 'M10 18v-7' },
    {
      tag: 'path',
      d: 'M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z',
    },
    { tag: 'path', d: 'M14 18v-7' },
    { tag: 'path', d: 'M18 18v-7' },
    { tag: 'path', d: 'M3 22h18' },
    { tag: 'path', d: 'M6 18v-7' },
  ];

export const languagesShapes: IconShape[] = [
    { tag: 'path', d: 'm5 8 6 6' },
    { tag: 'path', d: 'm4 14 6-6 2-3' },
    { tag: 'path', d: 'M2 5h12' },
    { tag: 'path', d: 'M7 2h1' },
    { tag: 'path', d: 'm22 22-5-10-5 10' },
    { tag: 'path', d: 'M14 18h6' },
  ];

export const laptopShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z',
    },
    { tag: 'path', d: 'M20.054 15.987H3.946' },
  ];

export const layersShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z',
    },
    { tag: 'path', d: 'M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12' },
    { tag: 'path', d: 'M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17' },
  ];

export const layoutDashboardShapes: IconShape[] = [
    { tag: 'rect', x: 3, y: 3, width: 7, height: 9, rx: 1 },
    { tag: 'rect', x: 14, y: 3, width: 7, height: 5, rx: 1 },
    { tag: 'rect', x: 14, y: 12, width: 7, height: 9, rx: 1 },
    { tag: 'rect', x: 3, y: 16, width: 7, height: 5, rx: 1 },
  ];

export const layoutGridShapes: IconShape[] = [
    { tag: 'rect', x: 3, y: 3, width: 7, height: 7, rx: 1 },
    { tag: 'rect', x: 14, y: 3, width: 7, height: 7, rx: 1 },
    { tag: 'rect', x: 14, y: 14, width: 7, height: 7, rx: 1 },
    { tag: 'rect', x: 3, y: 14, width: 7, height: 7, rx: 1 },
  ];

export const layoutPanelLeftShapes: IconShape[] = [
    { tag: 'rect', x: 3, y: 3, width: 7, height: 18, rx: 1 },
    { tag: 'rect', x: 14, y: 3, width: 7, height: 7, rx: 1 },
    { tag: 'rect', x: 14, y: 14, width: 7, height: 7, rx: 1 },
  ];

export const layoutPanelTopShapes: IconShape[] = [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 7, rx: 1 },
    { tag: 'rect', x: 3, y: 14, width: 7, height: 7, rx: 1 },
    { tag: 'rect', x: 14, y: 14, width: 7, height: 7, rx: 1 },
  ];

export const layoutListShapes: IconShape[] = [
    { tag: 'rect', x: 3, y: 3, width: 7, height: 7, rx: 1 },
    { tag: 'rect', x: 3, y: 14, width: 7, height: 7, rx: 1 },
    { tag: 'path', d: 'M14 4h7' },
    { tag: 'path', d: 'M14 9h7' },
    { tag: 'path', d: 'M14 15h7' },
    { tag: 'path', d: 'M14 20h7' },
  ];

export const layoutTemplateShapes: IconShape[] = [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 7, rx: 1 },
    { tag: 'rect', x: 3, y: 14, width: 9, height: 7, rx: 1 },
    { tag: 'rect', x: 16, y: 14, width: 5, height: 7, rx: 1 },
  ];

export const layoutFreeformShapes: IconShape[] = [
    { tag: 'rect', x: 3, y: 3, width: 7, height: 7, rx: 1 },
    { tag: 'rect', x: 14, y: 4, width: 7, height: 7, rx: 1 },
    { tag: 'rect', x: 4, y: 14, width: 7, height: 7, rx: 1 },
  ];

export const libraryShapes: IconShape[] = [
    { tag: 'path', d: 'm16 6 4 14' },
    { tag: 'path', d: 'M12 6v14' },
    { tag: 'path', d: 'M8 8v12' },
    { tag: 'path', d: 'M4 4v16' },
  ];

export const linkShapes: IconShape[] = [
    { tag: 'path', d: 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71' },
    { tag: 'path', d: 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71' },
  ];

export const link2Shapes: IconShape[] = [
    { tag: 'path', d: 'M9 17H7A5 5 0 0 1 7 7h2' },
    { tag: 'path', d: 'M15 7h2a5 5 0 1 1 0 10h-2' },
    { tag: 'line', x1: 8, y1: 12, x2: 16, y2: 12 },
  ];

export const listShapes: IconShape[] = [
    { tag: 'path', d: 'M3 5h.01' },
    { tag: 'path', d: 'M3 12h.01' },
    { tag: 'path', d: 'M3 19h.01' },
    { tag: 'path', d: 'M8 5h13' },
    { tag: 'path', d: 'M8 12h13' },
    { tag: 'path', d: 'M8 19h13' },
  ];

export const listChecksShapes: IconShape[] = [
    { tag: 'path', d: 'M13 5h8' },
    { tag: 'path', d: 'M13 12h8' },
    { tag: 'path', d: 'M13 19h8' },
    { tag: 'path', d: 'm3 17 2 2 4-4' },
    { tag: 'path', d: 'm3 7 2 2 4-4' },
  ];

export const minusShapes: IconShape[] = [{ tag: 'path', d: 'M5 12h14' }];

export const networkShapes: IconShape[] = [
    { tag: 'rect', x: 16, y: 16, width: 6, height: 6, rx: 1 },
    { tag: 'rect', x: 2, y: 16, width: 6, height: 6, rx: 1 },
    { tag: 'rect', x: 9, y: 2, width: 6, height: 6, rx: 1 },
    { tag: 'path', d: 'M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3' },
    { tag: 'path', d: 'M12 12V8' },
  ];

export const paletteShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z',
    },
    { tag: 'circle', cx: 13.5, cy: 6.5, r: 0.5, fill: 'currentColor' },
    { tag: 'circle', cx: 17.5, cy: 10.5, r: 0.5, fill: 'currentColor' },
    { tag: 'circle', cx: 6.5, cy: 12.5, r: 0.5, fill: 'currentColor' },
    { tag: 'circle', cx: 8.5, cy: 7.5, r: 0.5, fill: 'currentColor' },
  ];

export const playShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z',
    },
  ];

export const qrCodeShapes: IconShape[] = [
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
  ];

export const scrollTextShapes: IconShape[] = [
    { tag: 'path', d: 'M15 12h-5' },
    { tag: 'path', d: 'M15 8h-5' },
    { tag: 'path', d: 'M19 17V5a2 2 0 0 0-2-2H4' },
    {
      tag: 'path',
      d: 'M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3',
    },
  ];

export const serverShapes: IconShape[] = [
    { tag: 'rect', x: 2, y: 2, width: 20, height: 8, rx: 2, ry: 2 },
    { tag: 'rect', x: 2, y: 14, width: 20, height: 8, rx: 2, ry: 2 },
    { tag: 'line', x1: 6, y1: 6, x2: 6.01, y2: 6 },
    { tag: 'line', x1: 6, y1: 18, x2: 6.01, y2: 18 },
  ];

export const serverCogShapes: IconShape[] = [
    { tag: 'path', d: 'm10.852 14.772-.383.923' },
    { tag: 'path', d: 'M13.148 14.772a3 3 0 1 0-2.296-5.544l-.383-.923' },
    { tag: 'path', d: 'm13.148 9.228.383-.923' },
    { tag: 'path', d: 'm13.53 15.696-.382-.924a3 3 0 1 1-2.296-5.544' },
    { tag: 'path', d: 'm14.772 10.852.923-.383' },
    { tag: 'path', d: 'm14.772 13.148.923.383' },
    { tag: 'path', d: 'M4.5 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-.5' },
    { tag: 'path', d: 'M4.5 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-.5' },
    { tag: 'path', d: 'M6 18h.01' },
    { tag: 'path', d: 'M6 6h.01' },
    { tag: 'path', d: 'm9.228 10.852-.923-.383' },
    { tag: 'path', d: 'm9.228 13.148-.923.383' },
  ];

export const serverCrashShapes: IconShape[] = [
    { tag: 'path', d: 'M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2' },
    { tag: 'path', d: 'M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2' },
    { tag: 'path', d: 'M6 6h.01' },
    { tag: 'path', d: 'M6 18h.01' },
    { tag: 'path', d: 'm13 6-4 6h6l-4 6' },
  ];

export const serverOffShapes: IconShape[] = [
    { tag: 'path', d: 'M7 2h13a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-5' },
    { tag: 'path', d: 'M10 10 2.5 2.5C2 2 2 2.5 2 5v3a2 2 0 0 0 2 2h6z' },
    { tag: 'path', d: 'M22 17v-1a2 2 0 0 0-2-2h-1' },
    { tag: 'path', d: 'M4 14a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16.5l1-.5.5.5-8-8H4z' },
    { tag: 'path', d: 'M6 18h.01' },
    { tag: 'path', d: 'm2 2 20 20' },
  ];

export const serverPlusShapes: IconShape[] = [
    { tag: 'path', d: 'M12.5 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2' },
    { tag: 'path', d: 'M16 12h6' },
    { tag: 'path', d: 'M19 9v6' },
    { tag: 'path', d: 'M22 18v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h8.5' },
    { tag: 'path', d: 'M6 18h.01' },
    { tag: 'path', d: 'M6 6h.01' },
  ];

export const shieldShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
    },
  ];

export const shieldAlertShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z',
    },
    { tag: 'path', d: 'M12 8v4' },
    { tag: 'path', d: 'M12 16h.01' },
  ];

export const shieldOffShapes: IconShape[] = [
    { tag: 'path', d: 'm2 2 20 20' },
    {
      tag: 'path',
      d: 'M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71',
    },
    {
      tag: 'path',
      d: 'M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264',
    },
  ];

export const shoppingBagShapes: IconShape[] = [
    { tag: 'path', d: 'M16 10a4 4 0 0 1-8 0' },
    { tag: 'path', d: 'M3.103 6.034h17.794' },
    {
      tag: 'path',
      d: 'M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z',
    },
  ];

export const tagShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z',
    },
    { tag: 'circle', cx: 7.5, cy: 7.5, r: 0.5, fill: 'currentColor' },
  ];

export const unlinkShapes: IconShape[] = [
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
  ];

export const warehouseShapes: IconShape[] = [
    { tag: 'path', d: 'M18 21V10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v11' },
    {
      tag: 'path',
      d: 'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 1.132-1.803l7.95-3.974a2 2 0 0 1 1.837 0l7.948 3.974A2 2 0 0 1 22 8z',
    },
    { tag: 'path', d: 'M6 13h12' },
    { tag: 'path', d: 'M6 17h12' },
  ];

export const workflowShapes: IconShape[] = [
    { tag: 'rect', x: 3, y: 3, width: 8, height: 8, rx: 2 },
    { tag: 'path', d: 'M7 11v4a2 2 0 0 0 2 2h4' },
    { tag: 'rect', x: 13, y: 13, width: 8, height: 8, rx: 2 },
  ];

export const zoomInShapes: IconShape[] = [
    { tag: 'circle', cx: 11, cy: 11, r: 8 },
    { tag: 'line', x1: 21, y1: 21, x2: 16.65, y2: 16.65 },
    { tag: 'line', x1: 11, y1: 8, x2: 11, y2: 14 },
    { tag: 'line', x1: 8, y1: 11, x2: 14, y2: 11 },
  ];

export const zoomOutShapes: IconShape[] = [
    { tag: 'circle', cx: 11, cy: 11, r: 8 },
    { tag: 'line', x1: 21, y1: 21, x2: 16.65, y2: 16.65 },
    { tag: 'line', x1: 8, y1: 11, x2: 14, y2: 11 },
  ];

export const cctvShapes: IconShape[] = [
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
  ];

export const arrowRightShapes: IconShape[] = [
    { tag: 'path', d: 'M5 12h14' },
    { tag: 'path', d: 'm12 5 7 7-7 7' },
  ];

export const chartColumnShapes: IconShape[] = [
    { tag: 'path', d: 'M3 3v16a2 2 0 0 0 2 2h16' },
    { tag: 'path', d: 'M18 17V9' },
    { tag: 'path', d: 'M13 17V5' },
    { tag: 'path', d: 'M8 17v-3' },
  ];

export const buildingShapes: IconShape[] = [
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
  ];

export const building2Shapes: IconShape[] = [
    { tag: 'path', d: 'M10 12h4' },
    { tag: 'path', d: 'M10 8h4' },
    { tag: 'path', d: 'M14 21v-3a2 2 0 0 0-4 0v3' },
    { tag: 'path', d: 'M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2' },
    { tag: 'path', d: 'M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16' },
  ];

export const cableShapes: IconShape[] = [
    { tag: 'path', d: 'M17 19a1 1 0 0 1-1-1v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a1 1 0 0 1-1 1z' },
    { tag: 'path', d: 'M17 21v-2' },
    { tag: 'path', d: 'M19 14V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V10' },
    { tag: 'path', d: 'M21 21v-2' },
    { tag: 'path', d: 'M3 5V3' },
    { tag: 'path', d: 'M4 10a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2z' },
    { tag: 'path', d: 'M7 5V3' },
  ];

export const circleShapes: IconShape[] = [{ tag: 'circle', cx: 12, cy: 12, r: 10 }];

export const commandShapes: IconShape[] = [
    { tag: 'path', d: 'M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' },
  ];

export const squarePenShapes: IconShape[] = [
    { tag: 'path', d: 'M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7' },
    {
      tag: 'path',
      d: 'M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z',
    },
  ];

export const penShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z',
    },
  ];

export const penLineShapes: IconShape[] = [
    { tag: 'path', d: 'M13 21h8' },
    {
      tag: 'path',
      d: 'M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z',
    },
  ];

export const fileShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
  ];

export const fileCheckCornerShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M10.5 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v6',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
    { tag: 'path', d: 'm14 20 2 2 4-4' },
  ];

export const fileSpreadsheetShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
    },
    { tag: 'path', d: 'M14 2v5a1 1 0 0 0 1 1h5' },
    { tag: 'path', d: 'M8 13h2' },
    { tag: 'path', d: 'M14 13h2' },
    { tag: 'path', d: 'M8 17h2' },
    { tag: 'path', d: 'M14 17h2' },
  ];

export const fileBadgeShapes: IconShape[] = [
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
  ];

export const fileExclamationPointShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z',
    },
    { tag: 'path', d: 'M12 9v4' },
    { tag: 'path', d: 'M12 17h.01' },
  ];

export const squareCenterlineDashedHorizontalShapes: IconShape[] = [
    { tag: 'path', d: 'M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3' },
    { tag: 'path', d: 'M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3' },
    { tag: 'path', d: 'M12 20v2' },
    { tag: 'path', d: 'M12 14v2' },
    { tag: 'path', d: 'M12 8v2' },
    { tag: 'path', d: 'M12 2v2' },
  ];

export const squareCenterlineDashedVerticalShapes: IconShape[] = [
    { tag: 'path', d: 'M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3' },
    { tag: 'path', d: 'M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3' },
    { tag: 'path', d: 'M4 12H2' },
    { tag: 'path', d: 'M10 12H8' },
    { tag: 'path', d: 'M16 12h-2' },
    { tag: 'path', d: 'M22 12h-2' },
  ];

export const gripVerticalShapes: IconShape[] = [
    { tag: 'circle', cx: 9, cy: 12, r: 1 },
    { tag: 'circle', cx: 9, cy: 5, r: 1 },
    { tag: 'circle', cx: 9, cy: 19, r: 1 },
    { tag: 'circle', cx: 15, cy: 12, r: 1 },
    { tag: 'circle', cx: 15, cy: 5, r: 1 },
    { tag: 'circle', cx: 15, cy: 19, r: 1 },
  ];

export const hashShapes: IconShape[] = [
    { tag: 'line', x1: 4, y1: 9, x2: 20, y2: 9 },
    { tag: 'line', x1: 4, y1: 15, x2: 20, y2: 15 },
    { tag: 'line', x1: 10, y1: 3, x2: 8, y2: 21 },
    { tag: 'line', x1: 16, y1: 3, x2: 14, y2: 21 },
  ];

export const houseShapes: IconShape[] = [
    { tag: 'path', d: 'M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8' },
    {
      tag: 'path',
      d: 'M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
    },
  ];

export const imageShapes: IconShape[] = [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2, ry: 2 },
    { tag: 'circle', cx: 9, cy: 9, r: 2 },
    { tag: 'path', d: 'm21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21' },
  ];

export const imageOffShapes: IconShape[] = [
    { tag: 'line', x1: 2, y1: 2, x2: 22, y2: 22 },
    { tag: 'path', d: 'M10.41 10.41a2 2 0 1 1-2.83-2.83' },
    { tag: 'line', x1: 13.5, y1: 13.5, x2: 6, y2: 21 },
    { tag: 'line', x1: 18, y1: 12, x2: 21, y2: 15 },
    {
      tag: 'path',
      d: 'M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59',
    },
    { tag: 'path', d: 'M21 15V5a2 2 0 0 0-2-2H9' },
  ];

export const ellipsisVerticalShapes: IconShape[] = [
    { tag: 'circle', cx: 12, cy: 12, r: 1 },
    { tag: 'circle', cx: 12, cy: 5, r: 1 },
    { tag: 'circle', cx: 12, cy: 19, r: 1 },
  ];

export const mouseShapes: IconShape[] = [
    { tag: 'rect', x: 5, y: 2, width: 14, height: 20, rx: 7 },
    { tag: 'path', d: 'M12 6v4' },
  ];

export const navigationShapes: IconShape[] = [{ tag: 'polygon', points: '3 11 22 2 13 21 11 13 3 11' }];

export const packageSearchShapes: IconShape[] = [
    { tag: 'path', d: 'M12 22V12' },
    { tag: 'path', d: 'M20.27 18.27 22 20' },
    {
      tag: 'path',
      d: 'M21 10.498V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l.98-.559',
    },
    { tag: 'path', d: 'M3.29 7 12 12l8.71-5' },
    { tag: 'path', d: 'm7.5 4.27 8.997 5.148' },
    { tag: 'circle', cx: 18.5, cy: 16.5, r: 2.5 },
  ];

export const printerShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2',
    },
    { tag: 'path', d: 'M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6' },
    { tag: 'rect', x: 6, y: 14, width: 12, height: 8, rx: 1 },
  ];

export const rotateCwShapes: IconShape[] = [
    { tag: 'path', d: 'M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8' },
    { tag: 'path', d: 'M21 3v5h-5' },
  ];

export const routerShapes: IconShape[] = [
    { tag: 'rect', x: 2, y: 14, width: 20, height: 8, rx: 2 },
    { tag: 'path', d: 'M6.01 18H6' },
    { tag: 'path', d: 'M10.01 18H10' },
    { tag: 'path', d: 'M15 10v4' },
    { tag: 'path', d: 'M17.84 7.17a4 4 0 0 0-5.66 0' },
    { tag: 'path', d: 'M20.66 4.34a8 8 0 0 0-11.31 0' },
  ];

export const tabletShapes: IconShape[] = [
    { tag: 'rect', x: 4, y: 2, width: 16, height: 20, rx: 2, ry: 2 },
    { tag: 'line', x1: 12, y1: 18, x2: 12.01, y2: 18 },
  ];

export const triangleShapes: IconShape[] = [
    { tag: 'path', d: 'M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z' },
  ];

export const tvShapes: IconShape[] = [
    { tag: 'path', d: 'm17 2-5 5-5-5' },
    { tag: 'rect', x: 2, y: 7, width: 20, height: 15, rx: 2 },
  ];

export const cloudUploadShapes: IconShape[] = [
    { tag: 'path', d: 'M12 13v8' },
    { tag: 'path', d: 'M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242' },
    { tag: 'path', d: 'm8 17 4-4 4 4' },
  ];

export const userCheckShapes: IconShape[] = [
    { tag: 'path', d: 'm16 11 2 2 4-4' },
    { tag: 'path', d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' },
    { tag: 'circle', cx: 9, cy: 7, r: 4 },
  ];

export const userMinusShapes: IconShape[] = [
    { tag: 'path', d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' },
    { tag: 'circle', cx: 9, cy: 7, r: 4 },
    { tag: 'line', x1: 22, y1: 11, x2: 16, y2: 11 },
  ];

export const userPlusShapes: IconShape[] = [
    { tag: 'path', d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' },
    { tag: 'circle', cx: 9, cy: 7, r: 4 },
    { tag: 'line', x1: 19, y1: 8, x2: 19, y2: 14 },
    { tag: 'line', x1: 22, y1: 11, x2: 16, y2: 11 },
  ];

export const userXShapes: IconShape[] = [
    { tag: 'path', d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' },
    { tag: 'circle', cx: 9, cy: 7, r: 4 },
    { tag: 'line', x1: 17, y1: 8, x2: 22, y2: 13 },
    { tag: 'line', x1: 22, y1: 8, x2: 17, y2: 13 },
  ];

export const userRoundShapes: IconShape[] = [
    { tag: 'circle', cx: 12, cy: 8, r: 5 },
    { tag: 'path', d: 'M20 21a8 8 0 0 0-16 0' },
  ];

export const userRoundArrowLeftShapes: IconShape[] = [
    { tag: 'path', d: 'm19 16-3 3' },
    { tag: 'path', d: 'M2 21a8 8 0 0 1 12.664-6.5' },
    { tag: 'path', d: 'M22 19h-6l3 3' },
    { tag: 'circle', cx: 10, cy: 8, r: 5 },
  ];

export const userRoundCheckShapes: IconShape[] = [
    { tag: 'path', d: 'M2 21a8 8 0 0 1 13.292-6' },
    { tag: 'circle', cx: 10, cy: 8, r: 5 },
    { tag: 'path', d: 'm16 19 2 2 4-4' },
  ];

export const userRoundCogShapes: IconShape[] = [
    { tag: 'path', d: 'm14.305 19.53.923-.382' },
    { tag: 'path', d: 'm15.228 16.852-.923-.383' },
    { tag: 'path', d: 'm16.852 15.228-.383-.923' },
    { tag: 'path', d: 'm16.852 20.772-.383.924' },
    { tag: 'path', d: 'm19.148 15.228.383-.923' },
    { tag: 'path', d: 'm19.53 21.696-.382-.924' },
    { tag: 'path', d: 'M2 21a8 8 0 0 1 10.434-7.62' },
    { tag: 'path', d: 'm20.772 16.852.924-.383' },
    { tag: 'path', d: 'm20.772 19.148.924.383' },
    { tag: 'circle', cx: 10, cy: 8, r: 5 },
    { tag: 'circle', cx: 18, cy: 18, r: 3 },
  ];

export const userRoundKeyShapes: IconShape[] = [
    { tag: 'path', d: 'M19 11v6' },
    { tag: 'path', d: 'M19 13h2' },
    { tag: 'path', d: 'M2 21a8 8 0 0 1 12.868-6.349' },
    { tag: 'circle', cx: 10, cy: 8, r: 5 },
    { tag: 'circle', cx: 19, cy: 19, r: 2 },
  ];

export const userRoundMinusShapes: IconShape[] = [
    { tag: 'path', d: 'M2 21a8 8 0 0 1 13.292-6' },
    { tag: 'circle', cx: 10, cy: 8, r: 5 },
    { tag: 'path', d: 'M22 19h-6' },
  ];

export const userRoundPenShapes: IconShape[] = [
    { tag: 'path', d: 'M2 21a8 8 0 0 1 10.821-7.487' },
    { tag: 'path', d: 'M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z' },
    { tag: 'circle', cx: 10, cy: 8, r: 5 },
  ];

export const userRoundPlusShapes: IconShape[] = [
    { tag: 'path', d: 'M2 21a8 8 0 0 1 13.292-6' },
    { tag: 'circle', cx: 10, cy: 8, r: 5 },
    { tag: 'path', d: 'M19 16v6' },
    { tag: 'path', d: 'M22 19h-6' },
  ];

export const userRoundSearchShapes: IconShape[] = [
    { tag: 'circle', cx: 10, cy: 8, r: 5 },
    { tag: 'path', d: 'M2 21a8 8 0 0 1 10.434-7.62' },
    { tag: 'circle', cx: 18, cy: 18, r: 3 },
    { tag: 'path', d: 'm22 22-1.9-1.9' },
  ];

export const userRoundXShapes: IconShape[] = [
    { tag: 'path', d: 'M2 21a8 8 0 0 1 11.873-7' },
    { tag: 'circle', cx: 10, cy: 8, r: 5 },
    { tag: 'path', d: 'm17 17 5 5' },
    { tag: 'path', d: 'm22 17-5 5' },
  ];

export const arrowUpShapes: IconShape[] = [
    { tag: 'path', d: 'm5 12 7-7 7 7' },
    { tag: 'path', d: 'M12 19V5' },
  ];

export const arrowDownShapes: IconShape[] = [
    { tag: 'path', d: 'M12 5v14' },
    { tag: 'path', d: 'm19 12-7 7-7-7' },
  ];

export const arrowUpLeftShapes: IconShape[] = [
    { tag: 'path', d: 'M7 17V7h10' },
    { tag: 'path', d: 'M17 17 7 7' },
  ];

export const arrowUpRightShapes: IconShape[] = [
    { tag: 'path', d: 'M7 7h10v10' },
    { tag: 'path', d: 'M7 17 17 7' },
  ];

export const arrowDownLeftShapes: IconShape[] = [
    { tag: 'path', d: 'M17 7 7 17' },
    { tag: 'path', d: 'M17 17H7V7' },
  ];

export const arrowDownRightShapes: IconShape[] = [
    { tag: 'path', d: 'm7 7 10 10' },
    { tag: 'path', d: 'M17 7v10H7' },
  ];

export const wifiShapes: IconShape[] = [
    { tag: 'path', d: 'M12 20h.01' },
    { tag: 'path', d: 'M2 8.82a15 15 0 0 1 20 0' },
    { tag: 'path', d: 'M5 12.859a10 10 0 0 1 14 0' },
    { tag: 'path', d: 'M8.5 16.429a5 5 0 0 1 7 0' },
  ];

export const wifiHighShapes: IconShape[] = [
    { tag: 'path', d: 'M12 20h.01' },
    { tag: 'path', d: 'M5 12.859a10 10 0 0 1 14 0' },
    { tag: 'path', d: 'M8.5 16.429a5 5 0 0 1 7 0' },
  ];

export const wifiLowShapes: IconShape[] = [
    { tag: 'path', d: 'M12 20h.01' },
    { tag: 'path', d: 'M8.5 16.429a5 5 0 0 1 7 0' },
  ];

export const wifiZeroShapes: IconShape[] = [{ tag: 'path', d: 'M12 20h.01' }];

export const typeShapes: IconShape[] = [
    { tag: 'path', d: 'M12 4v16' },
    { tag: 'path', d: 'M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2' },
    { tag: 'path', d: 'M9 20h6' },
  ];

export const webhookShapes: IconShape[] = [
    { tag: 'path', d: 'M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2' },
    { tag: 'path', d: 'm6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06' },
    { tag: 'path', d: 'm12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8' },
  ];

export const powerShapes: IconShape[] = [
    { tag: 'path', d: 'M12 2v10' },
    { tag: 'path', d: 'M18.4 6.6a9 9 0 1 1-12.77.04' },
  ];

export const bracesShapes: IconShape[] = [
    { tag: 'path', d: 'M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1' },
    { tag: 'path', d: 'M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1' },
  ];

export const panelLeftShapes: IconShape[] = [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: 'M9 3v18' },
  ];

export const panelLeftCloseShapes: IconShape[] = [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: 'M9 3v18' },
    { tag: 'path', d: 'm16 15-3-3 3-3' },
  ];

export const panelLeftOpenShapes: IconShape[] = [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: 'M9 3v18' },
    { tag: 'path', d: 'm14 9 3 3-3 3' },
  ];

export const panelRightShapes: IconShape[] = [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: 'M15 3v18' },
  ];

export const panelRightCloseShapes: IconShape[] = [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: 'M15 3v18' },
    { tag: 'path', d: 'm8 9 3 3-3 3' },
  ];

export const panelRightOpenShapes: IconShape[] = [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: 'M15 3v18' },
    { tag: 'path', d: 'm10 15-3-3 3-3' },
  ];

export const panelTopShapes: IconShape[] = [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: 'M3 9h18' },
  ];

export const panelTopCloseShapes: IconShape[] = [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: 'M3 9h18' },
    { tag: 'path', d: 'm9 16 3-3 3 3' },
  ];

export const panelTopOpenShapes: IconShape[] = [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: 'M3 9h18' },
    { tag: 'path', d: 'm15 14-3 3-3-3' },
  ];

export const panelBottomShapes: IconShape[] = [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: 'M3 15h18' },
  ];

export const panelBottomCloseShapes: IconShape[] = [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: 'M3 15h18' },
    { tag: 'path', d: 'm15 8-3 3-3-3' },
  ];

export const panelBottomOpenShapes: IconShape[] = [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: 'M3 15h18' },
    { tag: 'path', d: 'm9 10 3-3 3 3' },
  ];

export const panelLeftDashedShapes: IconShape[] = [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: 'M9 14v1' },
    { tag: 'path', d: 'M9 19v2' },
    { tag: 'path', d: 'M9 3v2' },
    { tag: 'path', d: 'M9 9v1' },
  ];

export const panelRightDashedShapes: IconShape[] = [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: 'M15 14v1' },
    { tag: 'path', d: 'M15 19v2' },
    { tag: 'path', d: 'M15 3v2' },
    { tag: 'path', d: 'M15 9v1' },
  ];

export const panelTopDashedShapes: IconShape[] = [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: 'M14 9h1' },
    { tag: 'path', d: 'M19 9h2' },
    { tag: 'path', d: 'M3 9h2' },
    { tag: 'path', d: 'M9 9h1' },
  ];

export const panelBottomDashedShapes: IconShape[] = [
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: 'M14 15h1' },
    { tag: 'path', d: 'M19 15h2' },
    { tag: 'path', d: 'M3 15h2' },
    { tag: 'path', d: 'M9 15h1' },
  ];

export const panelTopBottomDashedShapes: IconShape[] = [
    { tag: 'path', d: 'M14 15h1' },
    { tag: 'path', d: 'M14 9h1' },
    { tag: 'path', d: 'M19 15h2' },
    { tag: 'path', d: 'M19 9h2' },
    { tag: 'path', d: 'M3 15h2' },
    { tag: 'path', d: 'M3 9h2' },
    { tag: 'path', d: 'M9 15h1' },
    { tag: 'path', d: 'M9 9h1' },
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
  ];

export const panelLeftRightDashedShapes: IconShape[] = [
    { tag: 'path', d: 'M15 10V9' },
    { tag: 'path', d: 'M15 15v-1' },
    { tag: 'path', d: 'M15 21v-2' },
    { tag: 'path', d: 'M15 5V3' },
    { tag: 'path', d: 'M9 10V9' },
    { tag: 'path', d: 'M9 15v-1' },
    { tag: 'path', d: 'M9 21v-2' },
    { tag: 'path', d: 'M9 5V3' },
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
  ];

export const calendarCheckShapes: IconShape[] = [
    { tag: 'path', d: 'M8 2v3' },
    { tag: 'path', d: 'M16 2v3' },
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: 'M3 9h18' },
    { tag: 'path', d: 'm9 15 2 2 4-4' },
  ];

export const calendarClockShapes: IconShape[] = [
    { tag: 'path', d: 'M16 14v2.2l1.6 1' },
    { tag: 'path', d: 'M16 2v3' },
    {
      tag: 'path',
      d: 'M21 7.338V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h2.338',
    },
    { tag: 'path', d: 'M3 9h5.859' },
    { tag: 'path', d: 'M8 2v3' },
    { tag: 'circle', cx: 16, cy: 16, r: 6 },
  ];

export const mapShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z',
    },
    { tag: 'path', d: 'M15 5.764v15' },
    { tag: 'path', d: 'M9 3.236v15' },
  ];

export const userCogShapes: IconShape[] = [
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
  ];

// Las figuras de `facebook`, `instagram`, `linkedin` y `twitter` se eliminaron junto con sus
// coreografías — ver la nota en curated-icons.ts (logos de marca, fuera del set canónico de
// Lucide, no se reintroducen sin verificación de licencia).

export const keyRoundShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z',
    },
    { tag: 'circle', cx: 16.5, cy: 7.5, r: 0.5, fill: 'currentColor' },
  ];

export const calendarDaysShapes: IconShape[] = [
    { tag: 'path', d: 'M8 2v3' },
    { tag: 'path', d: 'M16 2v3' },
    { tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 },
    { tag: 'path', d: 'M3 9h18' },
    { tag: 'path', d: 'M8 13h.01' },
    { tag: 'path', d: 'M12 13h.01' },
    { tag: 'path', d: 'M16 13h.01' },
    { tag: 'path', d: 'M8 17h.01' },
    { tag: 'path', d: 'M12 17h.01' },
    { tag: 'path', d: 'M16 17h.01' },
  ];

export const infinityShapes: IconShape[] = [{ tag: 'path', d: 'M6 16c5 0 7-8 12-8a4 4 0 0 1 0 8c-5 0-7-8-12-8a4 4 0 1 0 0 8' }];

export const squareShapes: IconShape[] = [{ tag: 'rect', x: 3, y: 3, width: 18, height: 18, rx: 2 }];

export const volume2Shapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z',
    },
    { tag: 'path', d: 'M16 9a5 5 0 0 1 0 6' },
    { tag: 'path', d: 'M19.364 18.364a9 9 0 0 0 0-12.728' },
  ];

export const volumeShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z',
    },
  ];

export const volume1Shapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z',
    },
    { tag: 'path', d: 'M16 9a5 5 0 0 1 0 6' },
  ];

export const volumeOffShapes: IconShape[] = [
    { tag: 'path', d: 'M16 9a5 5 0 0 1 .95 2.293' },
    { tag: 'path', d: 'M19.364 5.636a9 9 0 0 1 1.889 9.96' },
    { tag: 'path', d: 'm2 2 20 20' },
    {
      tag: 'path',
      d: 'm7 7-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11',
    },
    { tag: 'path', d: 'M9.828 4.172A.686.686 0 0 1 11 4.657v.686' },
  ];

export const volumeXShapes: IconShape[] = [
    {
      tag: 'path',
      d: 'M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z',
    },
    { tag: 'line', x1: 22, x2: 16, y1: 9, y2: 15 },
    { tag: 'line', x1: 16, x2: 22, y1: 9, y2: 15 },
  ];

export const signalShapes: IconShape[] = [
    { tag: 'path', d: 'M2 20h.01' },
    { tag: 'path', d: 'M7 20v-4' },
    { tag: 'path', d: 'M12 20v-8' },
    { tag: 'path', d: 'M17 20V8' },
    { tag: 'path', d: 'M22 4v16' },
  ];

export const signalHighShapes: IconShape[] = [
    { tag: 'path', d: 'M2 20h.01' },
    { tag: 'path', d: 'M7 20v-4' },
    { tag: 'path', d: 'M12 20v-8' },
    { tag: 'path', d: 'M17 20V8' },
  ];

export const signalMediumShapes: IconShape[] = [
    { tag: 'path', d: 'M2 20h.01' },
    { tag: 'path', d: 'M7 20v-4' },
    { tag: 'path', d: 'M12 20v-8' },
  ];

export const signalLowShapes: IconShape[] = [
    { tag: 'path', d: 'M2 20h.01' },
    { tag: 'path', d: 'M7 20v-4' },
  ];

export const signalZeroShapes: IconShape[] = [{ tag: 'path', d: 'M2 20h.01' }];

export const tally1Shapes: IconShape[] = [{ tag: 'path', d: 'M4 4v16' }];

export const tally2Shapes: IconShape[] = [
    { tag: 'path', d: 'M4 4v16' },
    { tag: 'path', d: 'M9 4v16' },
  ];

export const tally3Shapes: IconShape[] = [
    { tag: 'path', d: 'M4 4v16' },
    { tag: 'path', d: 'M9 4v16' },
    { tag: 'path', d: 'M14 4v16' },
  ];

export const tally4Shapes: IconShape[] = [
    { tag: 'path', d: 'M4 4v16' },
    { tag: 'path', d: 'M9 4v16' },
    { tag: 'path', d: 'M14 4v16' },
    { tag: 'path', d: 'M19 4v16' },
  ];

export const tally5Shapes: IconShape[] = [
    { tag: 'path', d: 'M4 4v16' },
    { tag: 'path', d: 'M9 4v16' },
    { tag: 'path', d: 'M14 4v16' },
    { tag: 'path', d: 'M19 4v16' },
    { tag: 'path', d: 'M22 6 2 18' },
  ];

export const SHAPES: Record<string, IconShape[]> = {
  bell: bellShapes,
  'bell-ring': bellRingShapes,
  check: checkShapes,
  'circle-alert': circleAlertShapes,
  'circle-check': circleCheckShapes,
  'circle-x': circleXShapes,
  copy: copyShapes,
  calendar: calendarShapes,
  'chevron-right': chevronRightShapes,
  'arrow-left': arrowLeftShapes,
  download: downloadShapes,
  eye: eyeShapes,
  'eye-off': eyeOffShapes,
  'hat-glasses': hatGlassesShapes,
  'heart-pulse': heartPulseShapes,
  images: imagesShapes,
  info: infoShapes,
  'loader-circle': loaderCircleShapes,
  lock: lockShapes,
  mail: mailShapes,
  'mouse-pointer-click': mousePointerClickShapes,
  pencil: pencilShapes,
  plus: plusShapes,
  'refresh-cw': refreshCwShapes,
  save: saveShapes,
  search: searchShapes,
  'search-check': searchCheckShapes,
  'search-slash': searchSlashShapes,
  'search-x': searchXShapes,
  send: sendShapes,
  settings: settingsShapes,
  'shield-check': shieldCheckShapes,
  sparkles: sparklesShapes,
  trash: trashShapes,
  'trash-2': trash2Shapes,
  'triangle-alert': triangleAlertShapes,
  upload: uploadShapes,
  user: userShapes,
  wrench: wrenchShapes,
  x: xShapes,
  'file-text': fileTextShapes,
  monitor: monitorShapes,
  package: packageShapes,
  'rotate-ccw-clock': rotateCcwClockShapes,
  shirt: shirtShapes,
  'folder-open': folderOpenShapes,
  plane: planeShapes,
  globe: globeShapes,
  key: keyShapes,
  users: usersShapes,
  truck: truckShapes,
  'map-pin': mapPinShapes,
  'external-link': externalLinkShapes,
  briefcase: briefcaseShapes,
  'book-open': bookOpenShapes,
  smartphone: smartphoneShapes,
  phone: phoneShapes,
  receipt: receiptShapes,
  'rotate-ccw': rotateCcwShapes,
  'shopping-cart': shoppingCartShapes,
  banknote: banknoteShapes,
  crown: crownShapes,
  sun: sunShapes,
  moon: moonShapes,
  zap: zapShapes,
  clock: clockShapes,
  lightbulb: lightbulbShapes,
  camera: cameraShapes,
  cake: cakeShapes,
  ban: banShapes,
  'at-sign': atSignShapes,
  'log-out': logOutShapes,
  funnel: funnelShapes,
  star: starShapes,
  activity: activityShapes,
  'alarm-clock': alarmClockShapes,
  'app-window': appWindowShapes,
  'badge-check': badgeCheckShapes,
  'chevron-down': chevronDownShapes,
  'chevron-left': chevronLeftShapes,
  'chevron-up': chevronUpShapes,
  'chevrons-up-down': chevronsUpDownShapes,
  'circle-plus': circlePlusShapes,
  'circle-question-mark': circleQuestionMarkShapes,
  'clipboard-check': clipboardCheckShapes,
  contact: contactShapes,
  cpu: cpuShapes,
  'credit-card': creditCardShapes,
  database: databaseShapes,
  ellipsis: ellipsisShapes,
  'file-check': fileCheckShapes,
  'file-x': fileXShapes,
  'git-fork': gitForkShapes,
  'graduation-cap': graduationCapShapes,
  'hard-drive': hardDriveShapes,
  'id-card': idCardShapes,
  inbox: inboxShapes,
  keyboard: keyboardShapes,
  landmark: landmarkShapes,
  languages: languagesShapes,
  laptop: laptopShapes,
  layers: layersShapes,
  'layout-dashboard': layoutDashboardShapes,
  'layout-grid': layoutGridShapes,
  library: libraryShapes,
  link: linkShapes,
  'link-2': link2Shapes,
  list: listShapes,
  'list-checks': listChecksShapes,
  minus: minusShapes,
  network: networkShapes,
  palette: paletteShapes,
  play: playShapes,
  'qr-code': qrCodeShapes,
  'scroll-text': scrollTextShapes,
  server: serverShapes,
  shield: shieldShapes,
  'shield-alert': shieldAlertShapes,
  'shield-off': shieldOffShapes,
  'shopping-bag': shoppingBagShapes,
  tag: tagShapes,
  unlink: unlinkShapes,
  warehouse: warehouseShapes,
  workflow: workflowShapes,
  'zoom-in': zoomInShapes,
  'zoom-out': zoomOutShapes,
  cctv: cctvShapes,
  'arrow-right': arrowRightShapes,
  'chart-column': chartColumnShapes,
  building: buildingShapes,
  'building-2': building2Shapes,
  cable: cableShapes,
  circle: circleShapes,
  command: commandShapes,
  'square-pen': squarePenShapes,
  pen: penShapes,
  'pen-line': penLineShapes,
  file: fileShapes,
  'file-check-corner': fileCheckCornerShapes,
  'file-spreadsheet': fileSpreadsheetShapes,
  'file-badge': fileBadgeShapes,
  'file-exclamation-point': fileExclamationPointShapes,
  'square-centerline-dashed-horizontal': squareCenterlineDashedHorizontalShapes,
  'square-centerline-dashed-vertical': squareCenterlineDashedVerticalShapes,
  'grip-vertical': gripVerticalShapes,
  hash: hashShapes,
  house: houseShapes,
  image: imageShapes,
  'image-off': imageOffShapes,
  'ellipsis-vertical': ellipsisVerticalShapes,
  mouse: mouseShapes,
  navigation: navigationShapes,
  'package-search': packageSearchShapes,
  printer: printerShapes,
  'rotate-cw': rotateCwShapes,
  router: routerShapes,
  tablet: tabletShapes,
  triangle: triangleShapes,
  tv: tvShapes,
  'cloud-upload': cloudUploadShapes,
  'user-check': userCheckShapes,
  'user-minus': userMinusShapes,
  'user-plus': userPlusShapes,
  'user-x': userXShapes,
  wifi: wifiShapes,
  type: typeShapes,
  webhook: webhookShapes,
  power: powerShapes,
  braces: bracesShapes,
  'panel-left': panelLeftShapes,
  'panel-left-close': panelLeftCloseShapes,
  'calendar-check': calendarCheckShapes,
  'calendar-clock': calendarClockShapes,
  map: mapShapes,
  'user-cog': userCogShapes,
  'key-round': keyRoundShapes,
  'calendar-days': calendarDaysShapes,
  infinity: infinityShapes,
  square: squareShapes,
  'volume-2': volume2Shapes,
};

