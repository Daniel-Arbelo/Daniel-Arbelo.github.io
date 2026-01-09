(() => {
  const canvas = document.getElementById("mesh-bg");
  if (!canvas) return;

  const hero = canvas.closest("#hero") || canvas.parentElement || document.body;
  const ctx = canvas.getContext("2d", { alpha: true });
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  const CFG = {
    // Density configuration
    nxSmall: 80, nzSmall: 40,
    nxMed: 100, nzMed: 60,
    nxBig: 130, nzBig: 75,

    rangeZ: 2.5,
    aspectFill: 1.25,

    // Camera settings
    pitch: 0.95,
    yaw: 0.0,
    depthFactor: 0.7,
    fovFactor: 0.85,

    // Line style
    lineWidth: 1.0,
    alphaRows: 0.45,
    alphaCols: 0.35,

    // Interaction settings (SOFTER)
    bumpRadius: 0.9,      // was 0.65 (wider, softer)
    bumpAmp: 0.12,        // was 0.25 (less displacement)
    decay: 0.965,         // was 0.94  (smoother fade)

    // NEW: smoothing / easing
    rippleIn: 0.08,       // ripple ramp-up speed
    rippleOut: 0.05,      // ripple ramp-down speed
    mouseEase: 0.12,      // pointer smoothing
    waveSpatial: 4.2,     // was 6   (less jittery)
    waveTemporal: 2.2,    // was 4   (slower)

    // Edge fading
    edgeWhite: 0.15,

    // Terrain Configuration (Organic)
    duneAmp: 0.25,
    duneFreq: 0.85,
    duneDir: 0.7,
    duneMix: 0.4,

    warpAmp: 0.35,
    warpFreq: 0.55,

    edgeFlatten: 1.5,
    hardClamp: 0.45
  };

  let W = 0, H = 0;
  let NX = CFG.nxMed, NZ = CFG.nzMed;
  let RX = 3.0, RZ = CFG.rangeZ;
  let worldScale = 1;

  let base = [];

  let hovering = false;
  let mx = 0.5, my = 0.5;
  let smx = 0.5, smy = 0.5; // smoothed mouse
  let ripple = 0;
  let rippleTime = 0;
  let running = false;
  let rafId = null;

  function clamp01(v) { return Math.max(0, Math.min(1, v)); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  function computeRanges() {
    const aspect = W / Math.max(1, H);
    RZ = CFG.rangeZ;
    RX = CFG.rangeZ * aspect * CFG.aspectFill;
  }

  function warpXZ(x, z) {
    // Create fluid distortion
    const w1 = Math.sin((x + z * 0.5) * CFG.warpFreq) * CFG.warpAmp;
    const w2 = Math.cos((x * 0.6 - z) * (CFG.warpFreq * 0.8)) * (CFG.warpAmp * 0.8);
    return { x: x + w1 * 0.2, z: z + w2 * 0.2 };
  }

  function terrain(x, z) {
    const w = warpXZ(x, z);
    const wx = w.x, wz = w.z;

    // Organic flow (sine combination)
    const d1 = (wx * CFG.duneDir + wz * (1 - CFG.duneDir));
    const h1 = Math.sin(d1 * CFG.duneFreq);

    const d2 = (wx * (1 - CFG.duneDir) - wz * CFG.duneDir);
    const h2 = Math.sin(d2 * (CFG.duneFreq * 1.4));

    let h = (h1 + h2 * 0.8) * CFG.duneAmp;

    // Soft flatten at edges but keep it expansive
    const edgeDist = Math.sqrt((x / (RX * 0.55)) ** 2 + (z / (RZ * 0.55)) ** 2);
    const flatten = 1 / (1 + Math.pow(edgeDist, 4));

    h *= flatten;

    return clamp(h, -CFG.hardClamp, CFG.hardClamp);
  }

  function buildBaseGrid() {
    base = new Array(NZ);
    for (let j = 0; j < NZ; j++) {
      base[j] = new Array(NX);
      const z = (j / (NZ - 1) - 0.5) * RZ;
      for (let i = 0; i < NX; i++) {
        const x = (i / (NX - 1) - 0.5) * RX;
        base[j][i] = { x, z, y: terrain(x, z) };
      }
    }
  }

  function project(px, py, pz, yaw, pitch, fov, cx, cy, depth) {
    const cosY = Math.cos(yaw), sinY = Math.sin(yaw);
    let x = px * cosY - pz * sinY;
    let z = px * sinY + pz * cosY;

    const cosP = Math.cos(pitch), sinP = Math.sin(pitch);
    let y = py * cosP - z * sinP;
    z = py * sinP + z * cosP;

    z += depth;

    const s = fov / (fov + z);
    return { x: cx + x * s, y: cy + y * s, z };
  }

  function clearBG() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, W, H);

    // Deep black-to-gray gradient for background
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, "#0a0a0a");
    bg.addColorStop(1, "#000000");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);
  }

  function screenToPlaneXZ(sx, sy, cx, cy, fov, depth, pitch) {
    const dx = sx - cx;
    const dy = sy - cy;

    const cosP = Math.cos(pitch);
    const sinP = Math.sin(pitch);
    const safeSinP = Math.abs(sinP) < 1e-4 ? (sinP >= 0 ? 1e-4 : -1e-4) : sinP;

    const A = fov + depth;
    const B = (dy * cosP) / safeSinP;

    let s = (fov + B) / A;
    if (!isFinite(s) || Math.abs(s) < 1e-5) s = 1e-5;

    const wx = dx / s;
    const wz = -(dy / s) / safeSinP;

    return { x: wx / worldScale, z: wz / worldScale };
  }

  function drawStatic() {
    clearBG();
    drawMesh(smx, smy, true);
  }

  function drawMesh(localMx, localMy, staticOnly = false) {
    const cx = W * 0.5;
    const cy = H * 0.6;
    const fov = Math.max(W, H) * CFG.fovFactor;
    const depth = CFG.depthFactor * worldScale;

    // Mouse interaction point
    const sx = clamp01(localMx) * W;
    const sy = clamp01(localMy) * H;
    const picked = screenToPlaneXZ(sx, sy, cx, cy, fov, depth, CFG.pitch);
    const mX = clamp(picked.x, -RX * 0.7, RX * 0.7);
    const mZ = clamp(picked.z, -RZ * 0.7, RZ * 0.7);

    const sigma = CFG.bumpRadius;
    const sigma2 = sigma * sigma;

    const P = new Array(NZ);

    for (let j = 0; j < NZ; j++) {
      P[j] = new Array(NX);
      for (let i = 0; i < NX; i++) {
        const b = base[j][i];
        let wx = b.x * worldScale;
        let wz = b.z * worldScale;
        let wy = -b.y * worldScale;

        // Dynamic Ripple Logic (SOFTER WAVE)
        if (!staticOnly && ripple > 0.001) {
          const dx = (b.x - mX);
          const dz = (b.z - mZ);
          const dist2 = dx * dx + dz * dz;
          const dist = Math.sqrt(dist2);

          // Gaussian envelope
          const env = Math.exp(-dist2 / (2 * sigma2));

          // Ripple wave (slower + less aggressive)
          const wave = Math.cos(dist * CFG.waveSpatial - rippleTime * CFG.waveTemporal);

          const displacement = env * wave * CFG.bumpAmp * ripple;
          wy -= displacement * worldScale;
        }

        P[j][i] = project(wx, wy, wz, CFG.yaw, CFG.pitch, fov, cx, cy, depth);
      }
    }

    // Aesthetic Lines
    ctx.lineWidth = CFG.lineWidth * DPR;

    function depthAlpha(zVal, baseA) {
      const fade = 1 / (1 + Math.max(0, zVal) * 0.0015);
      return baseA * clamp(fade, 0.1, 1.0);
    }

    // Draw Rows
    for (let j = 0; j < NZ; j++) {
      ctx.beginPath();
      let hasPoints = false;
      for (let i = 0; i < NX; i++) {
        const p = P[j][i];
        // Optimization: Skip drawing if behind camera too much
        if (p.z < 0.1) continue;

        if (!hasPoints) { ctx.moveTo(p.x, p.y); hasPoints = true; }
        else ctx.lineTo(p.x, p.y);
      }
      if (hasPoints) {
        // Calculate approx mid depth for alpha
        const midZ = P[j][Math.floor(NX / 2)] ? P[j][Math.floor(NX / 2)].z : 1.0;
        ctx.strokeStyle = `rgba(255,255,255,${depthAlpha(midZ, CFG.alphaRows)})`;
        ctx.stroke();
      }
    }

    // Draw Cols
    for (let i = 0; i < NX; i++) {
      ctx.beginPath();
      let hasPoints = false;
      for (let j = 0; j < NZ; j++) {
        const p = P[j][i];
        if (p.z < 0.1) continue;

        if (!hasPoints) { ctx.moveTo(p.x, p.y); hasPoints = true; }
        else ctx.lineTo(p.x, p.y);
      }
      if (hasPoints) {
        const midZ = P[Math.floor(NZ / 2)][i] ? P[Math.floor(NZ / 2)][i].z : 1.0;
        ctx.strokeStyle = `rgba(255,255,255,${depthAlpha(midZ, CFG.alphaCols)})`;
        ctx.stroke();
      }
    }

    // Vignette / Fog Overlay
    const fog = ctx.createLinearGradient(0, H * 0.8, 0, H);
    fog.addColorStop(0, "rgba(0,0,0,0)");
    fog.addColorStop(1, "rgba(0,0,0,0.8)");
    ctx.fillStyle = fog;
    ctx.fillRect(0, 0, W, H);
  }

  function start() {
    if (running) return;
    running = true;
    rafId = requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
  }

  function loop(ts) {
    const dt = 0.016; // fixed timestep approx
    rippleTime += dt;

    // Smooth pointer
    smx += (mx - smx) * CFG.mouseEase;
    smy += (my - smy) * CFG.mouseEase;

    // Ripple easing (no hard 1.0)
    const target = hovering ? 0.6 : 0.0; // less aggressive than 1.0
    const k = hovering ? CFG.rippleIn : CFG.rippleOut;
    ripple += (target - ripple) * k;

    if (!hovering && ripple < 0.01) {
      ripple = 0;
      drawStatic();
      stop();
      return;
    }

    clearBG();
    drawMesh(smx, smy, false);
    rafId = requestAnimationFrame(loop);
  }

  function resize() {
    const r = hero.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return;

    const newW = Math.floor(r.width * DPR);
    const newH = Math.floor(r.height * DPR);
    if (newW === W && newH === H) return;

    W = newW; H = newH;
    canvas.width = W;
    canvas.height = H;

    const area = r.width * r.height;
    if (area < 500000) { NX = CFG.nxSmall; NZ = CFG.nzSmall; }
    else if (area < 900000) { NX = CFG.nxMed; NZ = CFG.nzMed; }
    else { NX = CFG.nxBig; NZ = CFG.nzBig; }

    // Logic: bigger screen = similar density by adjusting world scale
    worldScale = Math.max(W, H) * 0.8;
    computeRanges();
    buildBaseGrid();
    drawStatic();
  }

  const ro = new ResizeObserver(() => resize());
  ro.observe(hero);

  window.addEventListener("load", () => {
    resize();
    setTimeout(resize, 100);
  }, { once: true });

  hero.addEventListener("pointermove", (e) => {
    const r = hero.getBoundingClientRect();
    mx = clamp01((e.clientX - r.left) / r.width);
    my = clamp01((e.clientY - r.top) / r.height);
    hovering = true;
    start();
  }, { passive: true });

  hero.addEventListener("pointerenter", () => {
    hovering = true;
    start();
  }, { passive: true });

  hero.addEventListener("pointerleave", () => {
    hovering = false;
  }, { passive: true });

  resize();
})();
