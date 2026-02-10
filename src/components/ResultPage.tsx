"use client";

import { Character, getCharacterById, TagKey, TagScores } from "@/data/characters";
import RadarChart from "./RadarChart";

interface MatchResult {
  character: Character;
  score: number;
  topTags: { key: TagKey; label: string; value: number }[];
  userScores: TagScores;
}

interface ResultPageProps {
  result: MatchResult;
  rank: string;
  yukiAnswer?: string;
  onRestart: () => void;
}

function getRankStyle(rank: string): {
  bg: string;
  text: string;
  border: string;
  glow: string;
} {
  switch (rank) {
    case "特級":
      return {
        bg: "bg-yellow-900/40",
        text: "text-yellow-300",
        border: "border-yellow-500/60",
        glow: "0 0 20px rgba(234,179,8,0.5), 0 0 40px rgba(234,179,8,0.2)",
      };
    case "1級":
      return {
        bg: "bg-slate-600/40",
        text: "text-slate-200",
        border: "border-slate-400/60",
        glow: "0 0 14px rgba(203,213,225,0.4)",
      };
    case "準1級":
      return {
        bg: "bg-slate-700/40",
        text: "text-slate-300",
        border: "border-slate-500/50",
        glow: "0 0 10px rgba(148,163,184,0.3)",
      };
    case "2級":
      return {
        bg: "bg-amber-900/30",
        text: "text-amber-400",
        border: "border-amber-600/40",
        glow: "0 0 8px rgba(217,119,6,0.3)",
      };
    case "3級":
      return {
        bg: "bg-stone-800/40",
        text: "text-stone-400",
        border: "border-stone-600/40",
        glow: "none",
      };
    case "4級":
      return {
        bg: "bg-stone-900/40",
        text: "text-stone-500",
        border: "border-stone-700/40",
        glow: "none",
      };
    default:
      return {
        bg: "bg-stone-800/40",
        text: "text-stone-400",
        border: "border-stone-600/40",
        glow: "none",
      };
  }
}

// Rank display label for share text
function getRankLabel(rank: string, charCategory: string): string {
  if (charCategory === "呪霊・呪詛師") {
    return `【${rank}呪霊】クラス`;
  }
  return `【${rank}呪術師】クラス`;
}

export default function ResultPage({ result, rank, yukiAnswer, onRestart }: ResultPageProps) {
  const { character, score, topTags, userScores } = result;
  const bestFriend = getCharacterById(character.bestMatch);
  const rival = getCharacterById(character.worstMatch);
  const rankStyle = getRankStyle(rank);

  const maxTagValue = Math.max(...topTags.map((t) => t.value), 1);
  const rankLabel = getRankLabel(rank, character.category);

  // Enhanced share text with Yuki's question answer
  const yukiPart = yukiAnswer ? `\nどんな女が好みかって？ ……「${yukiAnswer}」さ。` : "";
  const shareText = encodeURIComponent(
    `私は【${character.name}】タイプでした！\n${character.catchcopy}${yukiPart}\nあなたは${rankLabel}。\n術式：${character.technique}\n#呪術廻戦診断 #領域展開`
  );
  const twitterUrl = `https://twitter.com/intent/tweet?text=${shareText}`;
  const lineUrl = `https://social-plugins.line.me/lineit/share?text=${shareText}`;

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
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

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes barFill {
          from { width: 0%; }
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        @keyframes headerReveal {
          0% {
            opacity: 0;
            transform: translateY(-20px) scale(0.9);
            letter-spacing: 0.5em;
          }
          60% {
            opacity: 1;
            transform: translateY(0) scale(1.05);
            letter-spacing: 0.3em;
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            letter-spacing: 0.2em;
          }
        }

        @keyframes nameReveal {
          0% {
            opacity: 0;
            transform: scale(0.6);
            filter: blur(10px);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.08);
            filter: blur(2px);
          }
          100% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0px);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.5s ease-out forwards;
        }

        .animate-header-reveal {
          animation: headerReveal 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-name-reveal {
          animation: nameReveal 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-glow-pulse {
          animation: glowPulse 2s ease-in-out infinite;
        }
      `}</style>

      <div className="min-h-screen bg-zinc-950 text-white overflow-hidden">
        {/* Background accent gradient */}
        <div
          className="pointer-events-none fixed inset-0 opacity-20"
          style={{
            background: `radial-gradient(ellipse at 50% 20%, ${character.color}44 0%, transparent 60%)`,
          }}
        />

        <div className="relative mx-auto max-w-2xl px-5 py-12">
          {/* ===== Header: 診断結果 ===== */}
          <div
            className="animate-header-reveal mb-10 text-center opacity-0"
            style={{ animationDelay: "0.2s" }}
          >
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-zinc-500">
              Jujutsu Kaisen Character Diagnosis
            </p>
            <h1 className="text-3xl font-black tracking-[0.2em] text-white sm:text-4xl">
              診断結果
            </h1>
            <div
              className="mx-auto mt-3 h-px w-24"
              style={{ background: `linear-gradient(90deg, transparent, ${character.color}, transparent)` }}
            />
          </div>

          {/* ===== Character Name ===== */}
          <div
            className="animate-name-reveal mb-8 text-center opacity-0"
            style={{ animationDelay: "0.8s" }}
          >
            <p className="mb-2 text-sm tracking-widest text-zinc-500">
              あなたは…
            </p>
            <h2
              className="text-4xl font-black sm:text-5xl"
              style={{
                color: character.color,
                textShadow: `0 0 30px ${character.color}88, 0 0 60px ${character.color}44`,
              }}
            >
              {character.name}
            </h2>
            <p className="mt-1 text-sm text-zinc-600">{character.fullName}</p>
            <p
              className="mt-2 text-sm font-bold tracking-wider"
              style={{ color: character.color }}
            >
              あなたは{rankLabel}
            </p>
          </div>

          {/* ===== Catchcopy ===== */}
          <div
            className="animate-fade-in-up mb-6 text-center opacity-0"
            style={{ animationDelay: "1.1s" }}
          >
            <p
              className="text-base font-bold italic tracking-wider sm:text-lg"
              style={{
                color: character.color,
                textShadow: `0 0 20px ${character.color}44`,
              }}
            >
              {character.catchcopy}
            </p>
          </div>

          {/* ===== SNS Share (Primary Position) ===== */}
          <div
            className="animate-fade-in-up mb-8 opacity-0"
            style={{ animationDelay: "1.4s" }}
          >
            <p className="mb-3 text-center text-xs tracking-wider text-zinc-500">
              結果をシェアして友達と比べよう！
            </p>
            <div className="flex gap-3">
              {/* X (Twitter) Share */}
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2.5 rounded-xl bg-black py-4 text-base font-bold text-white transition-all hover:bg-zinc-800 active:scale-95 sm:text-lg"
                style={{
                  border: "1px solid rgba(255,255,255,0.15)",
                  boxShadow: "0 0 15px rgba(255,255,255,0.05)",
                }}
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>Xでシェア</span>
              </a>

              {/* LINE Share */}
              <a
                href={lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2.5 rounded-xl bg-[#06C755] py-4 text-base font-bold text-white transition-all hover:bg-[#05a849] active:scale-95 sm:text-lg"
                style={{
                  boxShadow: "0 0 15px rgba(6,199,85,0.2)",
                }}
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2C6.48 2 2 5.82 2 10.5c0 3.57 2.96 6.6 7.16 7.72-.08.58-.5 2.13-.57 2.46-.1.44.16.43.34.31.13-.08 2.15-1.46 3.03-2.06.33.04.67.07 1.04.07 5.52 0 10-3.82 10-8.5S17.52 2 12 2z" />
                </svg>
                <span>LINEでシェア</span>
              </a>
            </div>
          </div>

          {/* ===== Quote ===== */}
          <div
            className="animate-fade-in-up mb-10 text-center opacity-0"
            style={{ animationDelay: "1.7s" }}
          >
            <div className="relative inline-block px-6 py-4">
              <span
                className="absolute left-0 top-0 text-4xl leading-none opacity-30"
                style={{ color: character.color }}
              >
                &ldquo;
              </span>
              <p
                className="text-lg font-medium italic tracking-wide sm:text-xl"
                style={{ color: character.color }}
              >
                {character.quote}
              </p>
              <span
                className="absolute bottom-0 right-0 text-4xl leading-none opacity-30"
                style={{ color: character.color }}
              >
                &rdquo;
              </span>
            </div>
          </div>

          {/* ===== Stats Section ===== */}
          <div
            className="animate-fade-in-up mb-8 space-y-5 opacity-0"
            style={{ animationDelay: "2.0s" }}
          >
            {/* Rank Badge */}
            <div className="flex items-center justify-center gap-4">
              <div
                className={`inline-flex items-center gap-2 rounded-full border px-5 py-2 ${rankStyle.bg} ${rankStyle.border}`}
                style={{ boxShadow: rankStyle.glow }}
              >
                <span className="text-xs tracking-wider text-zinc-400">
                  呪術師ランク
                </span>
                <span className={`text-xl font-black ${rankStyle.text}`}>
                  {rank}
                </span>
              </div>
            </div>

            {/* Technique */}
            <div className="text-center">
              <span className="text-xs tracking-wider text-zinc-500">
                術式
              </span>
              <p
                className="mt-1 text-lg font-semibold"
                style={{ color: character.color }}
              >
                {character.technique}
              </p>
            </div>

            {/* Match Score */}
            <div className="mx-auto max-w-md">
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-zinc-400">マッチ度</span>
                <span
                  className="font-mono text-lg font-bold"
                  style={{ color: character.color }}
                >
                  {score}%
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-zinc-800">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${score}%`,
                    background: `linear-gradient(90deg, ${character.color}88, ${character.color})`,
                    animation: "barFill 1.5s ease-out forwards",
                    animationDelay: "2s",
                  }}
                />
              </div>
            </div>
          </div>

          {/* ===== Top Tags ===== */}
          <div
            className="animate-fade-in-up mb-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5 opacity-0"
            style={{ animationDelay: "2.3s" }}
          >
            <h3 className="mb-4 text-center text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              あなたの属性
            </h3>
            <div className="space-y-3">
              {topTags.map((tag, i) => (
                <div
                  key={tag.key}
                  className="animate-slide-in-left opacity-0"
                  style={{ animationDelay: `${2.6 + i * 0.15}s` }}
                >
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium text-zinc-300">
                      {tag.label}
                    </span>
                    <span className="font-mono text-xs text-zinc-500">
                      {tag.value}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(tag.value / maxTagValue) * 100}%`,
                        background: `linear-gradient(90deg, ${character.color}66, ${character.color})`,
                        animation: "barFill 1s ease-out forwards",
                        animationDelay: `${2.8 + i * 0.15}s`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ===== Radar Chart ===== */}
          <div
            className="animate-fade-in-up mb-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5 opacity-0"
            style={{ animationDelay: "2.7s" }}
          >
            <h3 className="mb-3 text-center text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              ステータス
            </h3>
            <RadarChart
              tags={userScores}
              color={character.color}
              maxTagValue={maxTagValue}
            />
          </div>

          {/* ===== Character Description ===== */}
          <div
            className="animate-fade-in-up mb-8 rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5 opacity-0"
            style={{ animationDelay: "3.0s" }}
          >
            <p className="text-sm leading-relaxed text-zinc-400">
              {character.description}
            </p>
          </div>

          {/* ===== Ad Slot (result) — controlled by SHOW_ADS in page.tsx ===== */}

          {/* ===== Compatibility Section ===== */}
          <div
            className="animate-fade-in-up mb-8 grid grid-cols-2 gap-4 opacity-0"
            style={{ animationDelay: "3.5s" }}
          >
            {/* Best Friend */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4 text-center">
              <p className="mb-1 text-xs tracking-wider text-zinc-500">
                親友（ベストフレンド）
              </p>
              <div
                className="mx-auto my-2 h-px w-10"
                style={{ background: `linear-gradient(90deg, transparent, ${character.color}66, transparent)` }}
              />
              {bestFriend ? (
                <p
                  className="text-base font-bold sm:text-lg"
                  style={{ color: bestFriend.color }}
                >
                  {bestFriend.name}
                </p>
              ) : (
                <p className="text-base font-bold text-zinc-500">---</p>
              )}
            </div>

            {/* Rival */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4 text-center">
              <p className="mb-1 text-xs tracking-wider text-zinc-500">
                宿敵（ライバル）
              </p>
              <div
                className="mx-auto my-2 h-px w-10"
                style={{ background: "linear-gradient(90deg, transparent, #ef444466, transparent)" }}
              />
              {rival ? (
                <p
                  className="text-base font-bold text-red-400 sm:text-lg"
                >
                  {rival.name}
                </p>
              ) : (
                <p className="text-base font-bold text-zinc-500">---</p>
              )}
            </div>
          </div>

          {/* ===== OGP-style Card ===== */}
          <div
            className="animate-scale-in mb-10 overflow-hidden rounded-2xl border border-zinc-700/60 opacity-0"
            style={{ animationDelay: "3.8s" }}
          >
            <div
              className="relative px-6 py-8 sm:px-8"
              style={{
                background: `linear-gradient(160deg, ${character.color}22 0%, #0a0a0a 40%, #0a0a0a 60%, ${character.color}11 100%)`,
              }}
            >
              {/* Decorative corner accents */}
              <div
                className="absolute left-0 top-0 h-16 w-16 opacity-30"
                style={{
                  borderTop: `2px solid ${character.color}`,
                  borderLeft: `2px solid ${character.color}`,
                }}
              />
              <div
                className="absolute bottom-0 right-0 h-16 w-16 opacity-30"
                style={{
                  borderBottom: `2px solid ${character.color}`,
                  borderRight: `2px solid ${character.color}`,
                }}
              />

              <p className="mb-1 text-center text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-600">
                呪術廻戦キャラ診断
              </p>

              <h3
                className="mb-2 text-center text-3xl font-black sm:text-4xl"
                style={{
                  color: character.color,
                  textShadow: `0 0 20px ${character.color}66`,
                }}
              >
                {character.name}
              </h3>

              <div className="mb-3 flex items-center justify-center gap-3">
                <div
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs ${rankStyle.bg} ${rankStyle.border}`}
                  style={{ boxShadow: rankStyle.glow }}
                >
                  <span className="text-zinc-500">ランク</span>
                  <span className={`font-bold ${rankStyle.text}`}>{rank}</span>
                </div>
                <span className="text-xs text-zinc-600">|</span>
                <span
                  className="text-xs font-medium"
                  style={{ color: character.color }}
                >
                  {character.technique}
                </span>
              </div>

              <p
                className="mb-2 text-center text-xs font-bold italic tracking-wider"
                style={{ color: `${character.color}99` }}
              >
                {character.catchcopy}
              </p>
              <p
                className="text-center text-sm italic leading-relaxed"
                style={{ color: `${character.color}cc` }}
              >
                &ldquo;{character.quote}&rdquo;
              </p>

              <div className="mt-4 text-center">
                <p className="text-[10px] tracking-wider text-zinc-700">
                  #呪術廻戦キャラ診断
                </p>
              </div>
            </div>
          </div>

          {/* ===== Bottom Actions ===== */}
          <div
            className="animate-fade-in-up mb-8 space-y-3 opacity-0"
            style={{ animationDelay: "4.2s" }}
          >
            {/* Secondary share reminder */}
            <div className="flex gap-3">
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-zinc-300 transition-all hover:bg-zinc-800"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>Xでシェア</span>
              </a>
              <a
                href={lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#06C755] px-4 py-3 text-sm font-bold text-white transition-all hover:bg-[#05a849]"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 5.82 2 10.5c0 3.57 2.96 6.6 7.16 7.72-.08.58-.5 2.13-.57 2.46-.1.44.16.43.34.31.13-.08 2.15-1.46 3.03-2.06.33.04.67.07 1.04.07 5.52 0 10-3.82 10-8.5S17.52 2 12 2z" />
                </svg>
                <span>LINEでシェア</span>
              </a>
            </div>

            {/* Restart Button */}
            <button
              onClick={onRestart}
              className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-5 py-3.5 text-sm font-medium text-zinc-400 transition-all hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
            >
              もう一度診断する
            </button>
          </div>

          {/* Footer spacer */}
          <div className="h-8" />
        </div>
      </div>
    </>
  );
}
