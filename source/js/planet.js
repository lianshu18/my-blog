(function () {
    const canvas = document.createElement('canvas');
    canvas.id = 'damn-planet';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '1';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let w, h, cx, cy;
    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        cx = w / 2;
        cy = h / 2;
    }
    window.addEventListener('resize', resize);
    resize();

    const particles = [];
    const COUNT = 2000;
    const R = 160;
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < COUNT; i++) {
        let y = 1 - (i / (COUNT - 1)) * 2;
        let rAtY = Math.sqrt(1 - y * y);
        let theta = phi * i;
        let isRing = i > COUNT * 0.6;
        let r = isRing ? 220 + Math.random() * 160 : R;
        particles.push({
            x: Math.cos(theta) * rAtY * (isRing ? r : R),
            y: y * (isRing ? r : R),
            z: Math.sin(theta) * rAtY * (isRing ? r : R),
            col: isRing ? '180,255,255' : '150,200,255',
            s: Math.random() * 1.5 + 0.5
        });
    }

    let rx = 0.35, ry = 0;
    function render() {
        ctx.clearRect(0, 0, w, h);
        ry += 0.002;
        rx = 0.35 + Math.sin(Date.now() * 0.0005) * 0.05;
        const cosX = Math.cos(rx), sinX = Math.sin(rx);
        const cosY = Math.cos(ry), sinY = Math.sin(ry);
        const fov = 700;
        for (let p of particles) {
            let x1 = p.x * cosY - p.z * sinY;
            let z1 = p.x * sinY + p.z * cosY;
            let y1 = p.y;
            let y2 = y1 * cosX - z1 * sinX;
            let z2 = y1 * sinX + z1 * cosX;
            let scale = fov / (fov + z2);
            if (scale > 0) {
                let x2d = cx + x1 * scale;
                let y2d = cy + y2 * scale;
                let alpha = Math.max(0.05, 1 - (z2 + 400) / 800);
                ctx.fillStyle = `rgba(${p.col}, ${alpha})`;
                ctx.fillRect(x2d, y2d, p.s * scale, p.s * scale);
            }
        }
        requestAnimationFrame(render);
    }
    render();
})();