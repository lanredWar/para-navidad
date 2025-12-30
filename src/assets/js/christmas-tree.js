/*
  Pure JavaScript Christmas tree renderer.
  - No images
  - No external libs
  - Creates DOM nodes: trunk, tree layers, ornaments, lights, star
  - Animates sway + blinking lights

  Exposed API:
    window.renderChristmasTree(container) => { destroy() }
*/

(function () {
  const rand = (min, max) => min + Math.random() * (max - min);
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  function renderChristmasTree(container) {
    if (!container) throw new Error('Missing container');

    // Cleanup existing
    container.innerHTML = '';

    const root = document.createElement('div');
    root.className = 'ctree-root';

    const star = document.createElement('div');
    star.className = 'ctree-star';
    root.appendChild(star);

    const tree = document.createElement('div');
    tree.className = 'ctree';
    root.appendChild(tree);

    // Layers (triangles made with borders)
    const layers = 5;
    for (let i = 0; i < layers; i++) {
      const layer = document.createElement('div');
      layer.className = 'ctree-layer';
      layer.style.setProperty('--i', String(i));
      tree.appendChild(layer);
    }

    // Trunk
    const trunk = document.createElement('div');
    trunk.className = 'ctree-trunk';
    root.appendChild(trunk);

    // Ornaments
    const ornaments = document.createElement('div');
    ornaments.className = 'ctree-ornaments';
    root.appendChild(ornaments);

    // Lights
    const lights = document.createElement('div');
    lights.className = 'ctree-lights';
    root.appendChild(lights);

    // Palette (aligned to site theme)
    const css = getComputedStyle(document.documentElement);
    const palette = [
      css.getPropertyValue('--pink').trim() || '#f6b7bc',
      css.getPropertyValue('--blue-soft').trim() || '#89a3c1',
      css.getPropertyValue('--pink-soft').trim() || '#f8e4e5',
      '#f6d365',
      '#ffffff'
    ];

    const lightPalette = ['#fff3b0', '#b8fffd', '#ffd1dc', '#d0ffd6', '#fff'];

    const rect = () => root.getBoundingClientRect();

    const ornamentCount = 18;
    for (let i = 0; i < ornamentCount; i++) {
      const o = document.createElement('div');
      o.className = 'ctree-ornament';
      o.style.background = pick(palette);
      o.style.setProperty('--x', `${rand(-42, 42)}%`);
      o.style.setProperty('--y', `${rand(12, 72)}%`);
      o.style.setProperty('--s', `${rand(10, 18)}px`);
      o.style.setProperty('--d', `${rand(0, 1.8)}s`);
      ornaments.appendChild(o);
    }

    const lightCount = 26;
    for (let i = 0; i < lightCount; i++) {
      const l = document.createElement('div');
      l.className = 'ctree-light';
      l.style.background = pick(lightPalette);
      l.style.setProperty('--x', `${rand(-46, 46)}%`);
      l.style.setProperty('--y', `${rand(10, 76)}%`);
      l.style.setProperty('--d', `${rand(0, 2.2)}s`);
      l.style.setProperty('--p', `${rand(1.4, 2.8)}s`);
      lights.appendChild(l);
    }

    container.appendChild(root);

    // Motion (sway)
    let raf = 0;
    let t0 = performance.now();

    const tick = (t) => {
      const dt = (t - t0) / 1000;
      t0 = t;

      const w = rect().width || 1;
      const sway = Math.sin(t / 900) * 2.2;
      const micro = Math.sin(t / 240) * 0.6;
      root.style.transform = `translateZ(0) rotate(${sway + micro}deg)`;
      root.style.transformOrigin = `50% ${Math.max(40, w * 0.34)}px`;

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    // Subtle random twinkle for ornaments
    const twinkleTimer = setInterval(() => {
      const nodes = ornaments.querySelectorAll('.ctree-ornament');
      const n = nodes[Math.floor(Math.random() * nodes.length)];
      if (!n) return;
      n.classList.add('ctree-pop');
      setTimeout(() => n.classList.remove('ctree-pop'), 280);
    }, 520);

    return {
      destroy() {
        cancelAnimationFrame(raf);
        clearInterval(twinkleTimer);
        container.innerHTML = '';
      }
    };
  }

  window.renderChristmasTree = renderChristmasTree;
})();
