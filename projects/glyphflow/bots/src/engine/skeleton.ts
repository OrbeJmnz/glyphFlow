/**
 * El esqueleto SVG de un bot, portado del prototipo (artifact v68) con un solo cambio: la clase raíz
 * `.bot` es `.gf-bot-svg` (una clase tan genérica chocaría con cualquier app): defs (degradados,
 * filtros, máscaras), capas de luz y los huecos donde el motor monta cara, accesorios y efectos.
 *
 * Es una plantilla de texto pura — sin DOM — así que se prerenderiza igual en servidor y navegador.
 * `id` es el prefijo único de ESTE bot (`b1`, `b2`…): todos los `url(#…)` y `href="#…"` de adentro
 * cuelgan de él para que dos bots en la misma página no se pisen los degradados.
 *
 * Las clases (`.hop`, `.breath`, `.flip`, `.face`, `.skinBack`…) y los ids (`${id}-cs`, `-mblob`…)
 * son el CONTRATO con las pieles y el motor: renombrar una rompe en silencio. El orden de las
 * capas también es el orden de pintado.
 */
export function botSkeleton(id: string): string {
  const p = id;
  return `
<svg class="gf-bot-svg" viewBox="0 0 200 212" aria-hidden="true">
  <defs>
    <radialGradient id="${p}-body" gradientUnits="userSpaceOnUse" cx="80" cy="74" r="142">
      <stop offset="0" class="c1"/><stop offset=".42" class="c2"/><stop offset=".8" class="c2"/><stop offset="1" class="c3"/>
    </radialGradient>
    <linearGradient id="${p}-rim" gradientUnits="userSpaceOnUse" x1="0" y1="40" x2="0" y2="176">
      <stop offset=".6" class="c3" stop-opacity="0"/><stop offset="1" class="c3" stop-opacity=".22"/>
    </linearGradient>
    <radialGradient id="${p}-gloss" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="${p}-sw" x1="0" x2="1" y1="0" y2="0"><stop offset="0.00" stop-color="#fff" stop-opacity="0"/><stop offset="0.08" stop-color="#fff" stop-opacity="0.04"/><stop offset="0.16" stop-color="#fff" stop-opacity="0.16"/><stop offset="0.24" stop-color="#fff" stop-opacity="0.36"/><stop offset="0.32" stop-color="#fff" stop-opacity="0.6"/><stop offset="0.40" stop-color="#fff" stop-opacity="0.82"/><stop offset="0.48" stop-color="#fff" stop-opacity="0.96"/><stop offset="0.50" stop-color="#fff" stop-opacity="1"/><stop offset="0.52" stop-color="#fff" stop-opacity="0.96"/><stop offset="0.60" stop-color="#fff" stop-opacity="0.82"/><stop offset="0.68" stop-color="#fff" stop-opacity="0.6"/><stop offset="0.76" stop-color="#fff" stop-opacity="0.36"/><stop offset="0.84" stop-color="#fff" stop-opacity="0.16"/><stop offset="0.92" stop-color="#fff" stop-opacity="0.04"/><stop offset="1.00" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <linearGradient id="${p}-sb" x1="0" x2="1" y1="0" y2="0"><stop offset="0.00" stop-color="#000" stop-opacity="0"/><stop offset="0.08" stop-color="#000" stop-opacity="0.04"/><stop offset="0.16" stop-color="#000" stop-opacity="0.16"/><stop offset="0.24" stop-color="#000" stop-opacity="0.36"/><stop offset="0.32" stop-color="#000" stop-opacity="0.6"/><stop offset="0.40" stop-color="#000" stop-opacity="0.82"/><stop offset="0.48" stop-color="#000" stop-opacity="0.96"/><stop offset="0.50" stop-color="#000" stop-opacity="1"/><stop offset="0.52" stop-color="#000" stop-opacity="0.96"/><stop offset="0.60" stop-color="#000" stop-opacity="0.82"/><stop offset="0.68" stop-color="#000" stop-opacity="0.6"/><stop offset="0.76" stop-color="#000" stop-opacity="0.36"/><stop offset="0.84" stop-color="#000" stop-opacity="0.16"/><stop offset="0.92" stop-color="#000" stop-opacity="0.04"/><stop offset="1.00" stop-color="#000" stop-opacity="0"/></linearGradient>
    <linearGradient id="${p}-tw" x1="0" x2="0" y1="0" y2="1"><stop offset="0.00" stop-color="#fff" stop-opacity="0"/><stop offset="0.08" stop-color="#fff" stop-opacity="0.04"/><stop offset="0.16" stop-color="#fff" stop-opacity="0.16"/><stop offset="0.24" stop-color="#fff" stop-opacity="0.36"/><stop offset="0.32" stop-color="#fff" stop-opacity="0.6"/><stop offset="0.40" stop-color="#fff" stop-opacity="0.82"/><stop offset="0.48" stop-color="#fff" stop-opacity="0.96"/><stop offset="0.50" stop-color="#fff" stop-opacity="1"/><stop offset="0.52" stop-color="#fff" stop-opacity="0.96"/><stop offset="0.60" stop-color="#fff" stop-opacity="0.82"/><stop offset="0.68" stop-color="#fff" stop-opacity="0.6"/><stop offset="0.76" stop-color="#fff" stop-opacity="0.36"/><stop offset="0.84" stop-color="#fff" stop-opacity="0.16"/><stop offset="0.92" stop-color="#fff" stop-opacity="0.04"/><stop offset="1.00" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <linearGradient id="${p}-tb" x1="0" x2="0" y1="0" y2="1"><stop offset="0.00" stop-color="#000" stop-opacity="0"/><stop offset="0.08" stop-color="#000" stop-opacity="0.04"/><stop offset="0.16" stop-color="#000" stop-opacity="0.16"/><stop offset="0.24" stop-color="#000" stop-opacity="0.36"/><stop offset="0.32" stop-color="#000" stop-opacity="0.6"/><stop offset="0.40" stop-color="#000" stop-opacity="0.82"/><stop offset="0.48" stop-color="#000" stop-opacity="0.96"/><stop offset="0.50" stop-color="#000" stop-opacity="1"/><stop offset="0.52" stop-color="#000" stop-opacity="0.96"/><stop offset="0.60" stop-color="#000" stop-opacity="0.82"/><stop offset="0.68" stop-color="#000" stop-opacity="0.6"/><stop offset="0.76" stop-color="#000" stop-opacity="0.36"/><stop offset="0.84" stop-color="#000" stop-opacity="0.16"/><stop offset="0.92" stop-color="#000" stop-opacity="0.04"/><stop offset="1.00" stop-color="#000" stop-opacity="0"/></linearGradient>
    <linearGradient id="${p}-visor" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <filter id="${p}-blur" x="-50%" y="-200%" width="200%" height="500%"><feGaussianBlur stdDeviation="4"/></filter>
    <radialGradient id="${p}-eyeG" cx=".38" cy=".3" r=".85"><stop offset="0" stop-color="#4A3578"/><stop offset=".55" stop-color="#211336"/><stop offset="1" stop-color="#110822"/></radialGradient>
    <radialGradient id="${p}-cheekG" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FF7FA6" stop-opacity=".62"/><stop offset=".55" stop-color="#FF7FA6" stop-opacity=".3"/><stop offset="1" stop-color="#FF7FA6" stop-opacity="0"/></radialGradient>
    <radialGradient id="${p}-shadowG" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#1B1433" stop-opacity=".56"/><stop offset=".25" stop-color="#1B1433" stop-opacity=".38"/><stop offset=".6" stop-color="#1B1433" stop-opacity=".12"/><stop offset="1" stop-color="#1B1433" stop-opacity="0"/></radialGradient>
    <radialGradient id="${p}-rimG" gradientUnits="userSpaceOnUse" cx="86" cy="90" r="92"><stop offset=".72" style="stop-color:var(--rim,#fff)" stop-opacity="0"/><stop offset="1" style="stop-color:var(--rim,#fff)" stop-opacity=".38"/></radialGradient>
    <radialGradient id="${p}-fillG" gradientUnits="userSpaceOnUse" cx="100" cy="118" r="60"><stop offset="0" stop-color="#fff" stop-opacity=".1"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    <radialGradient id="${p}-glossSoft" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".62"/><stop offset=".6" stop-color="#fff" stop-opacity=".2"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    <linearGradient id="${p}-visorBase" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#1B2244"/><stop offset="1" stop-color="#0E1229"/></linearGradient>
    <linearGradient id="${p}-visorShade" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".5"/><stop offset=".32" stop-color="#000" stop-opacity="0"/></linearGradient>
    <linearGradient id="${p}-rl" gradientUnits="userSpaceOnUse" x1="34" x2="100" y1="0" y2="0"><stop offset="0" style="stop-color:var(--rl,#fff)"/><stop offset="1" style="stop-color:var(--rl,#fff)" stop-opacity="0"/></linearGradient>
    <linearGradient id="${p}-rr" gradientUnits="userSpaceOnUse" x1="166" x2="100" y1="0" y2="0"><stop offset="0" style="stop-color:var(--rr,#fff)"/><stop offset="1" style="stop-color:var(--rr,#fff)" stop-opacity="0"/></linearGradient>
    <linearGradient id="${p}-rt" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="38" y2="112"><stop offset="0" style="stop-color:var(--rt,#fff)"/><stop offset="1" style="stop-color:var(--rt,#fff)" stop-opacity="0"/></linearGradient>
    <linearGradient id="${p}-rb" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="180" y2="112"><stop offset="0" style="stop-color:var(--rb,#fff)"/><stop offset="1" style="stop-color:var(--rb,#fff)" stop-opacity="0"/></linearGradient>
    <linearGradient id="${p}-sheen" x1="0" x2="1" y1="0" y2="0"><stop offset="0" style="stop-color:var(--sh,#fff)" stop-opacity="0"/><stop offset=".5" style="stop-color:var(--sh,#fff)" stop-opacity=".9"/><stop offset="1" style="stop-color:var(--sh,#fff)" stop-opacity="0"/></linearGradient>
    <radialGradient id="${p}-metal" gradientUnits="userSpaceOnUse" cx="100" cy="-140" r="300">
      <stop offset="0" class="m1"/><stop offset=".6" class="m1"/><stop offset=".73" class="m2"/><stop offset=".815" class="m3"/>
      <stop offset=".842" class="m4"/><stop offset=".9" class="m5"/><stop offset="1" class="m6"/>
    </radialGradient>
    <radialGradient id="${p}-vig" class="vigG" gradientUnits="userSpaceOnUse" cx="100" cy="110" r="74">
      <stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".5"/>
    </radialGradient>
    <radialGradient id="${p}-glossHard" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#fff"/><stop offset=".6" stop-color="#fff" stop-opacity=".95"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="${p}-irid" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FF9EC7"/><stop offset=".5" stop-color="#8FF3FF"/><stop offset="1" stop-color="#FFE27A"/></linearGradient>
    <clipPath id="${p}-clip"><path class="clipShape" id="${p}-cs"/></clipPath>
    <linearGradient id="${p}-mb" gradientUnits="userSpaceOnUse" x1="0" y1="58" x2="0" y2="166"><stop offset="0" stop-color="#E9EBFC"/><stop offset=".35" stop-color="#E5E8FC"/><stop offset=".6" stop-color="#DCE0FB"/><stop offset=".82" stop-color="#D1D7FB"/><stop offset="1" stop-color="#D3D8FB"/></linearGradient>
    <linearGradient id="${p}-mside" gradientUnits="userSpaceOnUse" x1="34" y1="0" x2="166" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#B9C0F3" stop-opacity=".12"/></linearGradient>
    <linearGradient id="${p}-mrg" gradientUnits="userSpaceOnUse" x1="34" y1="70" x2="166" y2="160"><stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="#fff" stop-opacity=".8"/><stop offset="1" stop-color="#fff" stop-opacity=".35"/></linearGradient>
    <mask id="${p}-mrm" maskUnits="userSpaceOnUse" x="0" y="0" width="200" height="212"><rect width="200" height="212" fill="url(#${p}-mrg)"/></mask>
    <filter id="${p}-mblur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.7"/></filter>
    <filter id="${p}-mblob" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="9"/></filter>
    <linearGradient id="${p}-mapp" gradientUnits="userSpaceOnUse" x1="0" y1="58" x2="0" y2="166"><stop offset="0" stop-color="#F6F7FE"/><stop offset="1" stop-color="#ECEDFC"/></linearGradient>
    <filter id="${p}-mblur2" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2.6"/></filter>
    <filter id="${p}-mblur1" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="1.3"/></filter>
    <filter id="${p}-nglowf" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="5"/></filter>
    <filter id="${p}-glitch" x="-60" y="-60" width="320" height="340" filterUnits="userSpaceOnUse">
      <feTurbulence type="fractalNoise" baseFrequency="0.0001 0.11" numOctaves="1" seed="2" result="n"><animate attributeName="seed" values="1;6;11;3;8" dur=".9s" calcMode="discrete" repeatCount="indefinite"/></feTurbulence>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="A" result="d"><animate attributeName="scale" values="0;0;0;0;18;0;0;0;-12;4;0;0" dur="2.6s" calcMode="discrete" repeatCount="indefinite"/></feDisplacementMap>
      <feColorMatrix in="d" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r"/>
      <feOffset in="r" result="ro"><animate attributeName="dx" values="0;0;3;0;-2.5;0;0;4;0;-1.5;0;0" dur="2.6s" calcMode="discrete" repeatCount="indefinite"/></feOffset>
      <feColorMatrix in="d" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" result="gb"/>
      <feOffset in="gb" result="gbo"><animate attributeName="dx" values="0;0;-3;0;2.5;0;0;-4;0;1.5;0;0" dur="2.6s" calcMode="discrete" repeatCount="indefinite"/></feOffset>
      <feBlend in="ro" in2="gbo" mode="screen"/></filter>
    <filter id="${p}-pix" x="-60" y="-60" width="320" height="340" filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse">
      <feFlood x="2.5" y="2.5" width="1" height="1" flood-color="#000"/><feComposite width="6" height="6"/><feTile result="t"/>
      <feComposite in="SourceGraphic" in2="t" operator="in"/><feMorphology operator="dilate" radius="3"/></filter>
    <filter id="${p}-hblob" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="5"/></filter>
    <filter id="${p}-hcs" x="-40%" y="-80%" width="180%" height="260%"><feGaussianBlur stdDeviation="3.2"/></filter>
  </defs>
  <ellipse class="shadow" cx="100" cy="197" rx="52" ry="9" fill="url(#${p}-shadowG)"/>
  <g class="hop">
    <g class="breath">
      <g class="skinBack"></g>
      <g class="shapeFxBack"></g>
      <g class="accBack"></g>
      <!-- El cuerpo es luz FIJA recortada por la silueta: la silueta gira, la luz no -->
      <g clip-path="url(#${p}-clip)">
        <rect class="key" x="-60" y="-60" width="320" height="332" fill="url(#${p}-body)" data-paint/>
        <rect class="vig" x="0" y="0" width="200" height="212" fill="url(#${p}-vig)" opacity="0"/>
        <g class="skinPaint"></g>
        <g class="shapeFxIn"></g>
        <g class="hatShadowWrap"><g class="hatShadow"></g></g>
        <rect class="rimDark" x="0" y="0" width="200" height="212" fill="url(#${p}-rim)"/>
        <rect class="fill-light" x="0" y="0" width="200" height="212" fill="url(#${p}-fillG)"/>
        <rect class="rim-light" x="0" y="0" width="200" height="212" fill="url(#${p}-rimG)"/>
        <rect class="side" x="0" y="0" width="1" height="212" fill="url(#${p}-sw)" opacity="0"/>
        <rect class="side" x="0" y="0" width="1" height="212" fill="url(#${p}-sb)" opacity="0"/>
        <rect class="side" x="0" y="0" width="200" height="1" fill="url(#${p}-tw)" opacity="0"/>
        <rect class="side" x="0" y="0" width="200" height="1" fill="url(#${p}-tb)" opacity="0"/>
        <!-- Luces que reaccionan a lo que hace el bot -->
        <rect class="lite sheen" x="-24" y="-20" width="48" height="252" fill="url(#${p}-sheen)" opacity="0"/>
        <rect class="lite rl" x="0" y="0" width="200" height="212" fill="url(#${p}-rl)" opacity="0"/>
        <rect class="lite rr" x="0" y="0" width="200" height="212" fill="url(#${p}-rr)" opacity="0"/>
        <rect class="lite rt" x="0" y="0" width="200" height="212" fill="url(#${p}-rt)" opacity="0"/>
        <rect class="lite rb" x="0" y="0" width="200" height="212" fill="url(#${p}-rb)" opacity="0"/>
        <rect class="lite lift" x="0" y="0" width="200" height="212" fill="#fff" opacity="0"/>
        <rect class="lite mood" x="0" y="0" width="200" height="212" style="fill:var(--mood,#f00)" opacity="0"/>
        <rect class="lite dim" x="0" y="0" width="200" height="212" fill="#120E30" opacity="0"/>
      </g>
      <g class="skinOver"></g>
      <g class="shapeFxOut"></g>
      <g class="accFront"></g>
      <g class="flip">
        <g class="face"></g>
        <g class="light">
          <g class="gloss" style="transform-origin:78px 74px">
            <ellipse class="glossE" cx="80" cy="77" rx="28" ry="15.5" transform="rotate(-24 80 77)" fill="url(#${p}-glossSoft)"/>
            <ellipse cx="72" cy="70" rx="15" ry="8" transform="rotate(-30 72 70)" fill="url(#${p}-glossSoft)" opacity=".7"/>
            <ellipse cx="69" cy="68" rx="4.6" ry="2.6" transform="rotate(-28 69 68)" fill="#fff" opacity=".85"/>
          </g>
        </g>
      </g>
    </g>
    <g class="fx">
      <g class="dots" opacity="0">
        <circle class="dot" cx="86" cy="24" r="4.5"/><circle class="dot" cx="100" cy="24" r="4.5"/><circle class="dot" cx="114" cy="24" r="4.5"/>
      </g>
      <g class="thought" opacity="0">
        <circle cx="132" cy="44" r="3"/><circle cx="143" cy="31" r="4.5"/><circle cx="157" cy="16" r="7"/>
      </g>
      <circle class="spinner" cx="100" cy="22" r="9" opacity="0"/>
      <g class="zlayer"></g>
    </g>
  </g>
  <g class="world"></g>
  <g class="toys"></g>
</svg>`;
}
