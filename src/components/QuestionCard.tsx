"use client";

import { useState, useEffect } from "react";

interface QuestionCardProps {
  question: {
    id: number;
    text: string;
    choices: { text: string; tags: Record<string, number> }[];
    special?: string;
  };
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (choice: { text: string; tags: Record<string, number> }) => void;
}

export default function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  onAnswer,
}: QuestionCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Reset selection state when question changes
  useEffect(() => {
    setSelectedIndex(null);
    setIsAnimating(false);
  }, [question.id]);

  const isYukiQuestion = question.special === "yuki";

  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const handleChoiceClick = (
    choice: { text: string; tags: Record<string, number> },
    index: number
  ) => {
    if (selectedIndex !== null) return; // prevent double-click
    setSelectedIndex(index);
    setIsAnimating(true);

    // Brief highlight, then fire callback
    setTimeout(() => {
      onAnswer(choice);
    }, 400);
  };

  return (
    <div
      key={question.id}
      className={`question-slide-in mx-auto w-full max-w-xl px-4 ${isYukiQuestion ? "yuki-special" : ""}`}
    >
      {/* Yuki Tsukumo special effect */}
      {isYukiQuestion && (
        <div className="yuki-overlay pointer-events-none fixed inset-0 z-0">
          <div className="yuki-aura absolute inset-0" />
          <div className="yuki-silhouette absolute bottom-0 right-0 h-80 w-60 opacity-[0.06]" />
        </div>
      )}

      {/* ---------- Progress bar ---------- */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-xs font-medium tracking-wider text-zinc-500">
          <span>
            {currentIndex + 1} / {totalQuestions}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="relative h-3 w-full overflow-hidden rounded-full bg-zinc-800">
          <div
            className="cursed-progress-fill absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
          {/* Shimmer on the leading edge */}
          <div
            className="absolute inset-y-0 w-8 rounded-full opacity-60"
            style={{
              left: `calc(${progress}% - 32px)`,
              background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.6), transparent)",
              filter: "blur(4px)",
              transition: "left 0.7s ease-out",
            }}
          />
        </div>
      </div>

      {/* ---------- Question number ---------- */}
      <p className="mb-2 text-sm font-bold tracking-widest text-purple-400">
        Q.{currentIndex + 1}
      </p>

      {/* ---------- Question text ---------- */}
      <h2 className={`mb-8 text-xl font-bold leading-relaxed sm:text-2xl ${isYukiQuestion ? "yuki-text text-amber-200" : "text-zinc-100"}`}>
        {isYukiQuestion && (
          <span className="mb-2 block text-xs font-medium tracking-[0.3em] text-amber-400/60">
            ― 九十九由基 ―
          </span>
        )}
        {question.text}
      </h2>

      {/* ---------- Choice buttons ---------- */}
      <div className="flex flex-col gap-3">
        {question.choices.map((choice, idx) => {
          const isSelected = selectedIndex === idx;

          return (
            <button
              key={idx}
              disabled={selectedIndex !== null}
              onClick={() => handleChoiceClick(choice, idx)}
              className={`
                choice-btn relative w-full rounded-xl border px-5 py-4
                text-left text-sm font-medium transition-all duration-200
                sm:text-base
                ${
                  isSelected
                    ? "scale-[1.02] border-purple-500 bg-purple-500/20 text-purple-200 shadow-[0_0_20px_rgba(168,85,247,0.35)]"
                    : "border-zinc-700/60 bg-zinc-900/70 text-zinc-300 hover:border-purple-500/50 hover:bg-zinc-800/80 hover:text-zinc-100 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] active:scale-[0.97]"
                }
                ${selectedIndex !== null && !isSelected ? "opacity-40" : ""}
                ${isAnimating && isSelected ? "choice-flash" : ""}
              `}
            >
              <span className="relative z-10">{choice.text}</span>
            </button>
          );
        })}
      </div>

      {/* ---------- Inline styles ---------- */}
      <style>{`
        .question-slide-in {
          animation: slideIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .choice-flash {
          animation: flash 0.4s ease-out;
        }

        @keyframes flash {
          0% { box-shadow: 0 0 0 rgba(168, 85, 247, 0); }
          40% { box-shadow: 0 0 30px rgba(168, 85, 247, 0.6); }
          100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.35); }
        }

        .cursed-progress-fill {
          background: linear-gradient(90deg, #4c1d95, #7c3aed, #3b82f6, #7c3aed);
          background-size: 300% 100%;
          animation: cursedFlow 3s ease-in-out infinite;
          box-shadow: 0 0 8px rgba(124, 58, 237, 0.5), 0 0 16px rgba(59, 130, 246, 0.3);
        }

        @keyframes cursedFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Yuki Tsukumo special question effects */
        .yuki-special {
          position: relative;
          z-index: 1;
        }

        .yuki-overlay {
          animation: yukiFadeIn 0.8s ease-out both;
        }

        .yuki-aura {
          background: radial-gradient(
            ellipse at 70% 80%,
            rgba(251, 191, 36, 0.08) 0%,
            rgba(245, 158, 11, 0.03) 40%,
            transparent 70%
          );
        }

        .yuki-silhouette {
          background: linear-gradient(
            to top,
            rgba(251, 191, 36, 0.3) 0%,
            rgba(251, 191, 36, 0.1) 40%,
            transparent 70%
          );
          mask-image: linear-gradient(to top, black 20%, transparent 80%);
          -webkit-mask-image: linear-gradient(to top, black 20%, transparent 80%);
        }

        .yuki-text {
          animation: yukiTextGlow 2s ease-in-out infinite alternate;
        }

        @keyframes yukiFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes yukiTextGlow {
          0% {
            text-shadow: 0 0 10px rgba(251, 191, 36, 0.2);
          }
          100% {
            text-shadow: 0 0 20px rgba(251, 191, 36, 0.4), 0 0 40px rgba(251, 191, 36, 0.1);
          }
        }
      `}</style>
    </div>
  );
}
