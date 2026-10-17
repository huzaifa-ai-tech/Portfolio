import { useEffect, useRef } from "react";

// All glow colors derive from the live --color-accent, so the whole
// aurora follows the deck's accent.
const mix = (pct) =>
  `color-mix(in srgb, var(--color-accent) ${pct}%, transparent)`;

function AuroraBackdrop() {
  const layerRef = useRef(null);

  // Mouse parallax on the blob layer — rAF-throttled and written straight
  // to the transform (no CSS transition) so it tracks the cursor crisply.
  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    const apply = () => {
      raf = 0;
      layer.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0)`;
    };
    const onMove = (event) => {
      tx = (event.clientX / window.innerWidth - 0.5) * 22;
      ty = (event.clientY / window.innerHeight - 0.5) * 16;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden bg-ink">
      {/* Top glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 80% at 50% -10%, ${mix(16)}, transparent 52%)`,
        }}
      />

      {/* Drifting blobs (mouse parallax) */}
      <div ref={layerRef} className="absolute -inset-10 will-change-transform">
        <div
          className="animate-drift-slow absolute -left-[16%] -top-[22%] h-[70vh] w-[70vw] rounded-full"
          style={{ background: `radial-gradient(circle, ${mix(13)}, transparent 70%)` }}
        />
        <div
          className="animate-drift-slower absolute right-[-18%] top-[2%] h-[78vh] w-[64vw] rounded-full"
          style={{ background: `radial-gradient(circle, ${mix(10)}, transparent 70%)` }}
        />
        <div
          className="animate-drift-slow absolute bottom-[-26%] left-[18%] h-[68vh] w-[72vw] rounded-full"
          style={{
            background: `radial-gradient(circle, ${mix(12)}, transparent 70%)`,
            animationDelay: "-6s",
          }}
        />
        <div
          className="animate-drift-slower absolute bottom-[-20%] right-[-12%] h-[56vh] w-[52vw] rounded-full"
          style={{
            background: `radial-gradient(circle, ${mix(6)}, transparent 70%)`,
            animationDelay: "-12s",
          }}
        />
      </div>

      {/* Cinematic light beam */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(115deg, transparent 20%, ${mix(6)} 38%, ${mix(
            10
          )} 50%, ${mix(5)} 64%, transparent 80%)`,
        }}
      />

      {/* Fine dot grid */}
      <div className="absolute inset-0 [background-image:radial-gradient(rgba(237,239,243,0.045)_1px,transparent_1px)] [background-size:38px_38px] [mask-image:radial-gradient(78%_62%_at_50%_38%,black,transparent_75%)]" />

      {/* Ambient center glow */}
      <div
        className="absolute left-1/2 top-[42%] h-[64vh] w-[72vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: `radial-gradient(circle, ${mix(12)}, transparent 68%)` }}
      />

      {/* Grain + vignette */}
      <div className="bg-noise pointer-events-none absolute -inset-4 opacity-[0.03]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_100%_at_50%_0%,transparent_38%,rgba(4,6,10,0.74)_100%)]" />
    </div>
  );
}

export default AuroraBackdrop;
