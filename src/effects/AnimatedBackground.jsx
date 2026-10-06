import { useEffect, useRef } from "react";

function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let rafId = null;
    let lastTime = null;
    let t = 0;
    let mouseX = null;
    let mouseY = null;
    let mouseTX = null;
    let mouseTY = null;

    const nodes = [];
    const stars = [];

    const colors = ["56,189,248", "34,211,238", "20,184,166", "14,165,233"];

    const setup = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const nodeCount = Math.min(70, Math.floor((width * height) / 30000));
      const starCount = Math.min(110, Math.floor((width * height) / 17000));

      nodes.length = 0;
      for (let i = 0; i < nodeCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() - 0.5) * 26 + 7;
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: Math.random() * 1.8 + 0.6,
          c: colors[Math.floor(Math.random() * colors.length)],
          ph: Math.random() * Math.PI * 2,
        });
      }

      stars.length = 0;
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.1 + 0.2,
          a: Math.random() * Math.PI * 2,
          sp: Math.random() * 1.2 + 0.5,
        });
      }
    };

    const draw = (time) => {
      const dt = lastTime == null ? 0.016 : Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      t += dt;

      ctx.clearRect(0, 0, width, height);

      // Static radial glows (drawn each frame, no blur filter)
      const glows = [
        { x: width * 0.12, y: height * 0.12, r: width * 0.5, c: "2,132,199" },
        { x: width * 0.9, y: height * 0.35, r: width * 0.4, c: "13,148,136" },
        { x: width * 0.15, y: height * 0.9, r: width * 0.45, c: "6,182,212" },
      ];
      for (const g of glows) {
        const grad = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, g.r);
        grad.addColorStop(0, `rgba(${g.c}, 0.16)`);
        grad.addColorStop(1, `rgba(${g.c}, 0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(g.x - g.r, g.y - g.r, g.r * 2, g.r * 2);
      }

      // Subtle drifting soft core (drawn via moving gradient)
      const pulseX = width * 0.5 + Math.cos(t * 0.2) * width * 0.05;
      const pulseY = height * 0.5 + Math.sin(t * 0.25) * height * 0.05;
      const pg = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, width * 0.45);
      pg.addColorStop(0, "rgba(14,165,233,0.10)");
      pg.addColorStop(1, "rgba(14,165,233,0)");
      ctx.fillStyle = pg;
      ctx.fillRect(0, 0, width, height);

      // Twinkling stars
      for (const s of stars) {
        s.a += s.sp * dt;
        const alpha = ((Math.sin(s.a) + 1) / 2) * 0.7;
        ctx.fillStyle = `rgba(207,240,246,${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Nodes + connections
      const connectDist = 130;
      const maxDist = connectDist * connectDist;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const d = dx * dx + dy * dy;
          if (d < maxDist) {
            const distVal = Math.sqrt(d);
            // A soft breathing pulse on links
            const pulse = 0.5 + 0.5 * Math.sin(t * 1.2 + n.ph + m.ph);
            const alpha = (1 - distVal / connectDist) * (0.2 + pulse * 0.2);
            ctx.strokeStyle = `rgba(34,211,238,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        }

        const tw = 0.6 + 0.4 * ((Math.sin(t * 2 + n.ph) + 1) / 2);
        ctx.fillStyle = `rgba(${n.c},${tw})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Cursor glow (eased, drawn cheaply with a radial gradient)
      if (mouseX != null) {
        mouseX += (mouseTX - mouseX) * 0.1;
        mouseY += (mouseTY - mouseY) * 0.1;
        const cr = width * 0.28;
        const cg = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, cr);
        cg.addColorStop(0, "rgba(6,182,212,0.20)");
        cg.addColorStop(1, "rgba(6,182,212,0)");
        ctx.fillStyle = cg;
        ctx.fillRect(mouseX - cr, mouseY - cr, cr * 2, cr * 2);

        // Highlight nodes near the cursor
        for (const n of nodes) {
          const dx = n.x - mouseX;
          const dy = n.y - mouseY;
          const d = Math.hypot(dx, dy);
          if (d < 150) {
            ctx.strokeStyle = `rgba(103,232,249,${(1 - d / 150) * 0.5})`;
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.moveTo(mouseX, mouseY);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    setup();
    rafId = requestAnimationFrame(draw);

    const onResize = () => setup();
    window.addEventListener("resize", onResize);

    const onMove = (e) => {
      mouseTX = e.clientX;
      mouseTY = e.clientY;
      if (mouseX == null) {
        mouseX = mouseTX;
        mouseY = mouseTY;
      }
    };
    window.addEventListener("mousemove", onMove);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) cancelAnimationFrame(rafId);

    return () => {
      cancelAnimationFrame(rafId);
      lastTime = null;
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#080d22]">
      <canvas ref={canvasRef} className="absolute inset-0 z-[1] opacity-95" />
      <div className="absolute inset-0 z-[3] bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(2,4,12,0.55)_100%)]" />
    </div>
  );
}

export default Background;