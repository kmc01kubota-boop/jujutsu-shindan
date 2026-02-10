"use client";

import { Zap, ChevronRight } from "lucide-react";

interface IntermissionProps {
  questionIndex: number; // 0-based, so 4 = after Q5, 14 = after Q15
  totalQuestions: number;
  onContinue: () => void;
}

export default function Intermission({
  questionIndex,
  totalQuestions,
  onContinue,
}: IntermissionProps) {
  const questionsCompleted = questionIndex + 1;
  const progress = (questionsCompleted / totalQuestions) * 100;

  // After Q5 (index 4) = first break, after Q15 (index 14) = second break
  const isFirstBreak = questionIndex <= 9;
  const heading = isFirstBreak ? "前半終了！" : "あと少し！";
  const subMessage = isFirstBreak
    ? "ここまでの回答から呪力の傾向が見えてきた..."
    : "領域展開まであとわずか...";

  return (
    <div className="intermission-fade-in mx-auto flex w-full max-w-xl flex-col items-center px-4 py-8">
      {/* ---------- Heading ---------- */}
      <h2 className="mb-2 text-2xl font-bold tracking-wide text-zinc-100 sm:text-3xl">
        {heading}
      </h2>

      {/* ---------- Motivational message with pulse ---------- */}
      <div className="mb-6 flex items-center gap-2 text-purple-400">
        <Zap size={18} className="intermission-pulse" />
        <span className="intermission-pulse text-sm font-medium tracking-wider sm:text-base">
          呪力チャージ中...
        </span>
      </div>

      {/* ---------- Sub-message ---------- */}
      <p className="mb-6 text-center text-sm leading-relaxed text-zinc-500">
        {subMessage}
      </p>

      {/* ---------- Progress indicator ---------- */}
      <div className="mb-8 w-full max-w-xs">
        <div className="mb-2 flex items-center justify-between text-xs font-medium tracking-wider text-zinc-500">
          <span>
            {questionsCompleted} / {totalQuestions} 問完了
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-600 via-violet-500 to-fuchsia-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* ---------- Ad slot placeholder ---------- */}
      <div
        className="ad-intermission-slot mb-8 flex h-[250px] w-[300px] flex-col items-center justify-center gap-2 rounded-md border border-dashed border-zinc-700/50 bg-zinc-900/60"
        role="complementary"
        aria-label="広告"
      >
        <span className="text-xs tracking-wider text-zinc-600">
          スポンサーリンク
        </span>
      </div>

      {/* ---------- Continue button ---------- */}
      <button
        onClick={onContinue}
        className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-500 px-8 py-3 text-sm font-bold tracking-wider text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] active:scale-[0.98] sm:text-base"
      >
        続ける
        <ChevronRight
          size={18}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </button>

      {/* ---------- Inline styles ---------- */}
      <style>{`
        .intermission-fade-in {
          animation: intermissionFadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes intermissionFadeIn {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .intermission-pulse {
          animation: intermissionPulse 2s ease-in-out infinite;
        }

        @keyframes intermissionPulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
