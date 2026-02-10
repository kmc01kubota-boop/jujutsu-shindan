"use client";

import { useEffect, useState } from "react";

interface LogoProps {
  onStart: () => void;
}

export default function Logo({ onStart }: LogoProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setIsVisible(true), 100);
    const timer2 = setTimeout(() => setIsButtonVisible(true), 1200);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes cursedPulse {
          0%, 100% {
            box-shadow:
              0 0 20px rgba(88, 28, 135, 0.4),
              0 0 40px rgba(88, 28, 135, 0.2),
              0 0 80px rgba(88, 28, 135, 0.1),
              inset 0 0 20px rgba(88, 28, 135, 0.1);
          }
          50% {
            box-shadow:
              0 0 30px rgba(88, 28, 135, 0.6),
              0 0 60px rgba(88, 28, 135, 0.4),
              0 0 120px rgba(88, 28, 135, 0.2),
              inset 0 0 40px rgba(88, 28, 135, 0.2);
          }
        }

        @keyframes energyWave {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes textGlow {
          0%, 100% {
            text-shadow:
              0 0 10px rgba(168, 85, 247, 0.4),
              0 0 20px rgba(168, 85, 247, 0.2),
              0 0 40px rgba(88, 28, 135, 0.2),
              0 0 80px rgba(88, 28, 135, 0.1);
          }
          50% {
            text-shadow:
              0 0 20px rgba(168, 85, 247, 0.6),
              0 0 40px rgba(168, 85, 247, 0.4),
              0 0 60px rgba(88, 28, 135, 0.3),
              0 0 100px rgba(88, 28, 135, 0.2);
          }
        }

        @keyframes subtitleGlow {
          0%, 100% {
            text-shadow:
              0 0 8px rgba(168, 85, 247, 0.3),
              0 0 16px rgba(88, 28, 135, 0.15);
          }
          50% {
            text-shadow:
              0 0 12px rgba(168, 85, 247, 0.5),
              0 0 24px rgba(88, 28, 135, 0.25);
          }
        }

        @keyframes borderRotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes buttonPulse {
          0%, 100% {
            box-shadow:
              0 0 12px rgba(168, 85, 247, 0.3),
              0 0 24px rgba(88, 28, 135, 0.15);
          }
          50% {
            box-shadow:
              0 0 20px rgba(168, 85, 247, 0.5),
              0 0 40px rgba(88, 28, 135, 0.25);
          }
        }

        @keyframes orbFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          33% { transform: translate(30px, -20px) scale(1.1); opacity: 0.5; }
          66% { transform: translate(-20px, -10px) scale(0.9); opacity: 0.2; }
        }

        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
          33% { transform: translate(-25px, 15px) scale(1.15); opacity: 0.4; }
          66% { transform: translate(15px, 20px) scale(0.85); opacity: 0.15; }
        }

        @keyframes orbFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.25; }
          50% { transform: translate(20px, 25px) scale(1.2); opacity: 0.45; }
        }

        /* === Black Flash (黒閃) sparks === */
        @keyframes blackFlashSpark {
          0% { opacity: 0; transform: scale(0) rotate(0deg); }
          20% { opacity: 1; transform: scale(1.2) rotate(45deg); }
          40% { opacity: 0.8; transform: scale(0.8) rotate(90deg); }
          100% { opacity: 0; transform: scale(0) rotate(180deg); }
        }

        @keyframes blackFlashSpark2 {
          0% { opacity: 0; transform: scale(0) rotate(0deg); }
          30% { opacity: 1; transform: scale(1) rotate(-30deg); }
          60% { opacity: 0.6; transform: scale(0.6) rotate(-60deg); }
          100% { opacity: 0; transform: scale(0) rotate(-120deg); }
        }

        @keyframes blueAura {
          0%, 100% {
            opacity: 0.3;
            filter: blur(20px);
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            filter: blur(30px);
            transform: scale(1.15);
          }
        }

        @keyframes blueAuraShift {
          0%, 100% {
            opacity: 0.2;
            transform: translateY(0) scale(1);
          }
          33% {
            opacity: 0.5;
            transform: translateY(-8px) scale(1.1);
          }
          66% {
            opacity: 0.3;
            transform: translateY(5px) scale(0.95);
          }
        }

        .black-flash-spark {
          position: absolute;
          width: 6px;
          height: 6px;
          background: linear-gradient(135deg, #000, #1a1a2e, #000);
          box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.8), 0 0 12px 4px rgba(30, 27, 75, 0.5);
          border-radius: 1px;
        }

        .blue-cursed-aura {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(59, 130, 246, 0) 70%);
          animation: blueAura 4s ease-in-out infinite;
        }

        .logo-container {
          animation: cursedPulse 3s ease-in-out infinite;
        }

        .energy-border {
          background: linear-gradient(
            270deg,
            #1e1b4b,
            #581c87,
            #1e1b4b,
            #312e81,
            #581c87,
            #1e1b4b
          );
          background-size: 400% 400%;
          animation: energyWave 4s ease-in-out infinite;
        }

        .title-text {
          animation: textGlow 3s ease-in-out infinite;
        }

        .subtitle-text {
          animation: subtitleGlow 3s ease-in-out infinite 0.5s;
        }

        .cta-button {
          animation: buttonPulse 2.5s ease-in-out infinite;
          transition: all 0.3s ease;
        }

        .cta-button:hover {
          transform: scale(1.05);
          box-shadow:
            0 0 30px rgba(168, 85, 247, 0.6),
            0 0 60px rgba(88, 28, 135, 0.3) !important;
        }

        .cta-button:active {
          transform: scale(0.98);
        }

        .rotating-border {
          animation: borderRotate 8s linear infinite;
        }
      `}</style>

      <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gray-950 px-4">
        {/* Background ambient orbs */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-purple-900/20 blur-3xl"
            style={{ animation: "orbFloat1 8s ease-in-out infinite" }}
          />
          <div
            className="absolute bottom-1/3 right-1/4 h-48 w-48 rounded-full bg-indigo-900/20 blur-3xl"
            style={{ animation: "orbFloat2 10s ease-in-out infinite" }}
          />
          <div
            className="absolute bottom-1/4 left-1/3 h-56 w-56 rounded-full bg-violet-900/15 blur-3xl"
            style={{ animation: "orbFloat3 12s ease-in-out infinite" }}
          />
        </div>

        {/* Main content */}
        <div
          className="relative z-10 flex flex-col items-center gap-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}
        >
          {/* Logo card with energy border */}
          <div className="relative p-[2px]">
            {/* Rotating conic gradient border */}
            <div
              className="absolute inset-[-2px] overflow-hidden rounded-2xl"
              aria-hidden="true"
            >
              <div
                className="rotating-border absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0%,#581c87_10%,transparent_20%,#312e81_30%,transparent_40%,#581c87_50%,transparent_60%,#312e81_70%,transparent_80%,#581c87_90%,transparent_100%)]"
              />
            </div>

            {/* Energy wave border */}
            <div className="energy-border relative rounded-2xl p-[2px]">
              {/* Inner container */}
              <div className="logo-container relative rounded-2xl bg-gray-950 px-10 py-12 sm:px-16 sm:py-14">
                {/* Inner subtle glow */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-purple-900/10 via-transparent to-indigo-900/10"
                  aria-hidden="true"
                />

                {/* Blue cursed energy aura */}
                <div
                  className="blue-cursed-aura pointer-events-none"
                  style={{ top: "-30px", left: "-40px", width: "180px", height: "180px", animationDelay: "0s" }}
                  aria-hidden="true"
                />
                <div
                  className="blue-cursed-aura pointer-events-none"
                  style={{ bottom: "-20px", right: "-30px", width: "150px", height: "150px", animationDelay: "1.5s" }}
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ width: "120%", height: "120%", background: "radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 60%)", animation: "blueAuraShift 5s ease-in-out infinite" }}
                  aria-hidden="true"
                />

                {/* Black flash sparks */}
                <div className="black-flash-spark pointer-events-none" style={{ top: "15%", left: "10%", animation: "blackFlashSpark 2.5s ease-in-out infinite 0s" }} aria-hidden="true" />
                <div className="black-flash-spark pointer-events-none" style={{ top: "70%", right: "12%", animation: "blackFlashSpark2 3s ease-in-out infinite 0.8s" }} aria-hidden="true" />
                <div className="black-flash-spark pointer-events-none" style={{ bottom: "20%", left: "25%", animation: "blackFlashSpark 2.8s ease-in-out infinite 1.2s" }} aria-hidden="true" />
                <div className="black-flash-spark pointer-events-none" style={{ top: "30%", right: "20%", animation: "blackFlashSpark2 2.2s ease-in-out infinite 0.4s" }} aria-hidden="true" />
                <div className="black-flash-spark pointer-events-none" style={{ bottom: "35%", right: "30%", animation: "blackFlashSpark 3.2s ease-in-out infinite 1.8s" }} aria-hidden="true" />

                {/* Title */}
                <div className="relative flex flex-col items-center gap-3">
                  <h1
                    className="title-text text-center text-4xl font-black tracking-widest text-white sm:text-5xl md:text-6xl"
                    style={{
                      fontFeatureSettings: "'palt' 1",
                    }}
                  >
                    <span className="block bg-gradient-to-r from-purple-200 via-white to-purple-200 bg-clip-text text-transparent">
                      呪術廻戦
                    </span>
                    <span className="mt-2 block bg-gradient-to-r from-violet-300 via-purple-100 to-violet-300 bg-clip-text text-transparent">
                      キャラ診断
                    </span>
                  </h1>

                  {/* Decorative line */}
                  <div className="my-2 flex items-center gap-3">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500/60" />
                    <div className="h-1.5 w-1.5 rotate-45 bg-purple-400/80" />
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500/60" />
                  </div>

                  {/* Subtitle */}
                  <p className="subtitle-text text-center text-sm tracking-[0.3em] text-purple-300/80 sm:text-base">
                    〜あなたの術式を解き明かす〜
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ===== Mobile-First CTA Button (Fixed Bottom) ===== */}
        <div
          className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
          style={{
            opacity: isButtonVisible ? 1 : 0,
            transform: isButtonVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            background: "linear-gradient(to top, rgba(3,7,18,0.95) 60%, transparent)",
            paddingBottom: "max(1.5rem, env(safe-area-inset-bottom, 1.5rem))",
          }}
        >
          <button
            type="button"
            onClick={onStart}
            className="cta-button group relative w-full max-w-lg overflow-hidden rounded-2xl border border-purple-500/40 bg-gradient-to-r from-purple-900/90 via-indigo-800/90 to-purple-900/90 py-6 text-xl font-black tracking-[0.25em] text-purple-50 backdrop-blur-sm sm:text-2xl"
          >
            {/* Button inner glow */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-purple-400/10 via-transparent to-indigo-400/10" />
            {/* Button hover shimmer */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-purple-400/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">診断を始める</span>
          </button>
        </div>
      </div>
    </>
  );
}
