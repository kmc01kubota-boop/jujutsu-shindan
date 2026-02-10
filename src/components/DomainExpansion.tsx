"use client";

import { useState, useEffect } from "react";

interface DomainExpansionProps {
  onComplete: () => void;
}

export default function DomainExpansion({ onComplete }: DomainExpansionProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Phase 1: White flash (0ms)
    timers.push(setTimeout(() => setPhase(1), 50));

    // Phase 2: Black + "領域展開" text (800ms)
    timers.push(setTimeout(() => setPhase(2), 800));

    // Phase 3: Radial energy waves (2000ms)
    timers.push(setTimeout(() => setPhase(3), 2000));

    // Phase 4: "領域展開中..." loading text with heartbeat (3500ms)
    timers.push(setTimeout(() => setPhase(4), 3500));

    // Phase 5: Final fade to black (5500ms)
    timers.push(setTimeout(() => setPhase(5), 5500));

    // Fire onComplete after full sequence (6000ms)
    timers.push(setTimeout(() => onComplete(), 6000));

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* ---- Phase 1: White flash ---- */}
      <div
        className={`absolute inset-0 bg-white transition-opacity ${
          phase >= 1 && phase < 2
            ? "opacity-100"
            : "opacity-0"
        }`}
        style={{
          transitionDuration: phase >= 2 ? "200ms" : "80ms",
          transitionTimingFunction: phase >= 1 && phase < 2
            ? "cubic-bezier(0, 0, 0.2, 1)"
            : "ease-out",
        }}
      />

      {/* ---- Phase 2+: Black background ---- */}
      <div
        className={`absolute inset-0 bg-black transition-opacity ${
          phase >= 2 ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDuration: "200ms" }}
      />

      {/* ---- Phase 2-3: 領域展開 text ---- */}
      {phase >= 2 && phase <= 3 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <h1
            className={`domain-text select-none text-center font-black tracking-[0.15em] text-white ${
              phase === 2
                ? "domain-text-enter"
                : "domain-text-exit"
            }`}
            style={{ fontSize: "clamp(3rem, 12vw, 8rem)" }}
          >
            領域展開
          </h1>
        </div>
      )}

      {/* ---- Phase 3: Radial energy waves ---- */}
      {phase >= 3 && phase < 5 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="energy-ring energy-ring-1" />
          <div className="energy-ring energy-ring-2" />
          <div className="energy-ring energy-ring-3" />
          {/* Central burst */}
          <div className="energy-core" />
        </div>
      )}

      {/* ---- Phase 4: "領域展開中..." heartbeat loading ---- */}
      {phase >= 4 && phase < 5 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-8">
          <p className="loading-text select-none text-center font-black tracking-[0.2em] text-white"
             style={{ fontSize: "clamp(1.5rem, 5vw, 3rem)" }}>
            領域展開中<span className="loading-dots">...</span>
          </p>
          {/* Sub text */}
          <p className="loading-sub-text text-sm tracking-[0.3em] text-purple-400/60 sm:text-base">
            ― 術式を解析しています ―
          </p>
          {/* Cursed energy particles */}
          <div className="cursed-particles">
            <div className="cursed-particle particle-1" />
            <div className="cursed-particle particle-2" />
            <div className="cursed-particle particle-3" />
            <div className="cursed-particle particle-4" />
          </div>
        </div>
      )}

      {/* ---- Phase 5: Final fade to black ---- */}
      <div
        className={`absolute inset-0 bg-black transition-opacity ${
          phase >= 5 ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDuration: "500ms" }}
      />

      {/* ---- Keyframe animations ---- */}
      <style>{`
        /* ---- Text entrance: scale up with glow ---- */
        .domain-text {
          text-shadow:
            0 0 20px rgba(147, 51, 234, 0.8),
            0 0 60px rgba(147, 51, 234, 0.5),
            0 0 120px rgba(99, 102, 241, 0.3);
          will-change: transform, opacity;
        }

        .domain-text-enter {
          animation: textReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .domain-text-exit {
          animation: textFade 0.6s ease-out both;
        }

        @keyframes textReveal {
          0% {
            opacity: 0;
            transform: scale(3);
            filter: blur(12px);
            text-shadow:
              0 0 80px rgba(147, 51, 234, 1),
              0 0 160px rgba(99, 102, 241, 0.8);
          }
          50% {
            opacity: 1;
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0px);
            text-shadow:
              0 0 20px rgba(147, 51, 234, 0.8),
              0 0 60px rgba(147, 51, 234, 0.5),
              0 0 120px rgba(99, 102, 241, 0.3);
          }
        }

        @keyframes textFade {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0.9);
          }
        }

        /* ---- Expanding energy rings ---- */
        .energy-ring {
          position: absolute;
          border-radius: 50%;
          border: 2px solid rgba(147, 51, 234, 0.7);
          box-shadow:
            0 0 30px rgba(147, 51, 234, 0.4),
            inset 0 0 30px rgba(147, 51, 234, 0.1);
          will-change: transform, opacity;
        }

        .energy-ring-1 {
          width: 80px;
          height: 80px;
          animation: ringExpand 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .energy-ring-2 {
          width: 80px;
          height: 80px;
          animation: ringExpand 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both;
          border-color: rgba(99, 102, 241, 0.6);
          box-shadow:
            0 0 30px rgba(99, 102, 241, 0.4),
            inset 0 0 30px rgba(99, 102, 241, 0.1);
        }

        .energy-ring-3 {
          width: 80px;
          height: 80px;
          animation: ringExpand 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both;
          border-color: rgba(168, 85, 247, 0.5);
          box-shadow:
            0 0 40px rgba(168, 85, 247, 0.3),
            inset 0 0 40px rgba(168, 85, 247, 0.1);
        }

        @keyframes ringExpand {
          0% {
            transform: scale(0.5);
            opacity: 1;
          }
          100% {
            transform: scale(25);
            opacity: 0;
          }
        }

        /* ---- Central energy core ---- */
        .energy-core {
          position: absolute;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(147, 51, 234, 0.8) 40%,
            rgba(99, 102, 241, 0.4) 70%,
            transparent 100%
          );
          box-shadow:
            0 0 40px rgba(147, 51, 234, 0.8),
            0 0 80px rgba(99, 102, 241, 0.5);
          animation: corePulse 0.8s ease-out both;
          will-change: transform, opacity;
        }

        @keyframes corePulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(4);
            opacity: 0.8;
          }
          100% {
            transform: scale(6);
            opacity: 0;
          }
        }

        /* ---- Loading text heartbeat ---- */
        .loading-text {
          text-shadow:
            0 0 20px rgba(147, 51, 234, 0.6),
            0 0 40px rgba(147, 51, 234, 0.3),
            0 0 80px rgba(99, 102, 241, 0.2);
          animation: heartbeatText 1.2s ease-in-out infinite;
        }

        @keyframes heartbeatText {
          0%, 100% {
            transform: scale(1);
            text-shadow:
              0 0 20px rgba(147, 51, 234, 0.6),
              0 0 40px rgba(147, 51, 234, 0.3),
              0 0 80px rgba(99, 102, 241, 0.2);
          }
          15% {
            transform: scale(1.08);
            text-shadow:
              0 0 30px rgba(147, 51, 234, 0.9),
              0 0 60px rgba(147, 51, 234, 0.5),
              0 0 120px rgba(99, 102, 241, 0.4);
          }
          30% {
            transform: scale(1);
          }
          45% {
            transform: scale(1.05);
            text-shadow:
              0 0 25px rgba(147, 51, 234, 0.7),
              0 0 50px rgba(147, 51, 234, 0.4),
              0 0 100px rgba(99, 102, 241, 0.3);
          }
          60% {
            transform: scale(1);
          }
        }

        /* ---- Loading dots animation ---- */
        .loading-dots {
          animation: dotsFlicker 1.5s steps(4, end) infinite;
        }

        @keyframes dotsFlicker {
          0% { content: ""; opacity: 0.3; }
          25% { opacity: 0.5; }
          50% { opacity: 0.8; }
          75% { opacity: 1; }
          100% { opacity: 0.3; }
        }

        /* ---- Sub text fade in ---- */
        .loading-sub-text {
          animation: subTextFade 0.8s ease-out 0.3s both;
        }

        @keyframes subTextFade {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ---- Cursed energy particles ---- */
        .cursed-particles {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .cursed-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(147, 51, 234, 0.8);
          box-shadow: 0 0 8px rgba(147, 51, 234, 0.6), 0 0 16px rgba(99, 102, 241, 0.3);
        }

        .particle-1 {
          left: 20%;
          bottom: 30%;
          animation: particleFloat 2s ease-in-out infinite;
        }

        .particle-2 {
          right: 25%;
          bottom: 40%;
          animation: particleFloat 2.3s ease-in-out infinite 0.3s;
        }

        .particle-3 {
          left: 40%;
          bottom: 25%;
          animation: particleFloat 1.8s ease-in-out infinite 0.6s;
        }

        .particle-4 {
          right: 35%;
          bottom: 35%;
          animation: particleFloat 2.1s ease-in-out infinite 0.9s;
        }

        @keyframes particleFloat {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-40px) scale(1.5);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}
