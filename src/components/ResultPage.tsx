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
  pill: string;
} {
  switch (rank) {
    case "特級":
      return {
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-300",
        pill: "bg-amber-600 text-white",
      };
    case "特別1級":
      return {
        bg: "bg-amber-50",
        text: "text-amber-600",
        border: "border-amber-200",
        pill: "bg-amber-500 text-white",
      };
    case "1級":
      return {
        bg: "bg-slate-50",
        text: "text-slate-700",
        border: "border-slate-300",
        pill: "bg-slate-600 text-white",
      };
    case "準1級":
      return {
        bg: "bg-slate-50",
        text: "text-slate-600",
        border: "border-slate-200",
        pill: "bg-slate-500 text-white",
      };
    case "2級":
      return {
        bg: "bg-orange-50",
        text: "text-orange-700",
        border: "border-orange-200",
        pill: "bg-orange-500 text-white",
      };
    case "準2級":
      return {
        bg: "bg-orange-50",
        text: "text-orange-600",
        border: "border-orange-200",
        pill: "bg-orange-400 text-white",
      };
    case "3級":
      return {
        bg: "bg-stone-50",
        text: "text-stone-600",
        border: "border-stone-200",
        pill: "bg-stone-500 text-white",
      };
    case "4級":
      return {
        bg: "bg-stone-50",
        text: "text-stone-500",
        border: "border-stone-200",
        pill: "bg-stone-400 text-white",
      };
    case "等級不明":
      return {
        bg: "bg-violet-50",
        text: "text-violet-600",
        border: "border-violet-200",
        pill: "bg-violet-500 text-white",
      };
    default:
      return {
        bg: "bg-stone-50",
        text: "text-stone-500",
        border: "border-stone-200",
        pill: "bg-stone-400 text-white",
      };
  }
}

// Rank display label for share text
function getRankLabel(rank: string, charCategory: string): string {
  if (rank === "等級不明") {
    return "【等級不明】規格外";
  }
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
  const siteUrl = "https://jujutsu-shindan.vercel.app";
  const twitterUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(siteUrl)}`;
  const lineUrl = `https://line.me/R/share?text=${shareText}%0A${encodeURIComponent(siteUrl)}`;

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes barFill {
          from { width: 0%; }
        }
        @keyframes headerReveal {
          0% { opacity: 0; transform: translateY(-15px); letter-spacing: 0.5em; }
          60% { opacity: 1; transform: translateY(0); letter-spacing: 0.3em; }
          100% { opacity: 1; transform: translateY(0); letter-spacing: 0.2em; }
        }
        @keyframes nameReveal {
          0% { opacity: 0; transform: scale(0.7); filter: blur(8px); }
          50% { opacity: 0.9; transform: scale(1.03); filter: blur(1px); }
          100% { opacity: 1; transform: scale(1); filter: blur(0px); }
        }

        .anim-fade-in-up { animation: fadeInUp 0.7s ease-out forwards; }
        .anim-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        .anim-scale-in { animation: scaleIn 0.5s ease-out forwards; }
        .anim-slide-left { animation: slideInLeft 0.4s ease-out forwards; }
        .anim-header { animation: headerReveal 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
        .anim-name { animation: nameReveal 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
      `}</style>

      {/* Full-page white background container — self-contained, overrides body dark */}
      <div
        className="min-h-screen overflow-hidden"
        style={{
          background: "#FFFFFF",
          color: "#1D1D1F",
          position: "relative",
          zIndex: 20,
        }}
      >
        {/* Soft accent gradient at top */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-80 opacity-40"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${character.color}18 0%, transparent 70%)`,
          }}
        />

        <div className="relative mx-auto max-w-2xl px-5 py-12">
          {/* ===== Header: 診断結果 ===== */}
          <div
            className="anim-header mb-10 text-center opacity-0"
            style={{ animationDelay: "0.2s" }}
          >
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: "#86868B" }}>
              Jujutsu Kaisen Character Diagnosis
            </p>
            <h1 className="text-3xl font-black tracking-[0.15em] sm:text-4xl" style={{ color: "#1D1D1F" }}>
              診断結果
            </h1>
            <div
              className="mx-auto mt-3 h-[2px] w-20 rounded-full"
              style={{ background: `linear-gradient(90deg, transparent, ${character.color}, transparent)` }}
            />
          </div>

          {/* ===== Character Name ===== */}
          <div
            className="anim-name mb-8 text-center opacity-0"
            style={{ animationDelay: "0.8s" }}
          >
            <p className="mb-2 text-sm font-medium tracking-widest" style={{ color: "#86868B" }}>
              あなたは…
            </p>
            <h2
              className="text-4xl font-black sm:text-5xl"
              style={{ color: character.color }}
            >
              {character.name}
            </h2>
            <p className="mt-1 text-sm font-medium" style={{ color: "#AEAEB2" }}>{character.fullName}</p>
            <p
              className="mt-2 text-sm font-bold tracking-wider"
              style={{ color: character.color }}
            >
              あなたは{rankLabel}
            </p>
          </div>

          {/* ===== Catchcopy ===== */}
          <div
            className="anim-fade-in-up mb-6 text-center opacity-0"
            style={{ animationDelay: "1.1s" }}
          >
            <p
              className="text-base font-bold italic tracking-wider sm:text-lg"
              style={{ color: character.color }}
            >
              {character.catchcopy}
            </p>
          </div>

          {/* ===== SNS Share (Primary Position) ===== */}
          <div
            className="anim-fade-in-up mb-8 opacity-0"
            style={{ animationDelay: "1.4s" }}
          >
            <p className="mb-3 text-center text-xs font-medium tracking-wider" style={{ color: "#86868B" }}>
              結果をシェアして友達と比べよう！
            </p>
            <div className="flex gap-3">
              {/* X (Twitter) Share */}
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2.5 rounded-2xl py-4 text-base font-bold text-white transition-all hover:opacity-90 active:scale-95 sm:text-lg"
                style={{
                  background: "#1D1D1F",
                }}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span>Xでシェア</span>
              </a>

              {/* LINE Share */}
              <a
                href={lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2.5 rounded-2xl bg-[#06C755] py-4 text-base font-bold text-white transition-all hover:opacity-90 active:scale-95 sm:text-lg"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 5.82 2 10.5c0 3.57 2.96 6.6 7.16 7.72-.08.58-.5 2.13-.57 2.46-.1.44.16.43.34.31.13-.08 2.15-1.46 3.03-2.06.33.04.67.07 1.04.07 5.52 0 10-3.82 10-8.5S17.52 2 12 2z" />
                </svg>
                <span>LINEでシェア</span>
              </a>
            </div>
          </div>

          {/* ===== Quote ===== */}
          <div
            className="anim-fade-in-up mb-10 text-center opacity-0"
            style={{ animationDelay: "1.7s" }}
          >
            <div className="relative inline-block px-6 py-4">
              <span
                className="absolute left-0 top-0 text-4xl leading-none opacity-20"
                style={{ color: character.color }}
              >
                &ldquo;
              </span>
              <p
                className="text-lg font-semibold italic tracking-wide sm:text-xl"
                style={{ color: "#1D1D1F" }}
              >
                {character.quote}
              </p>
              <span
                className="absolute bottom-0 right-0 text-4xl leading-none opacity-20"
                style={{ color: character.color }}
              >
                &rdquo;
              </span>
            </div>
          </div>

          {/* ===== Stats Section ===== */}
          <div
            className="anim-fade-in-up mb-8 space-y-5 opacity-0"
            style={{ animationDelay: "2.0s" }}
          >
            {/* Rank Badge */}
            <div className="flex items-center justify-center gap-4">
              <div
                className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 ${rankStyle.bg} ${rankStyle.border}`}
              >
                <span className="text-xs font-medium tracking-wider" style={{ color: "#86868B" }}>
                  あなたの呪術師ランク
                </span>
                <span className={`rounded-full px-3 py-0.5 text-base font-black ${rankStyle.pill}`}>
                  {rank}
                </span>
              </div>
            </div>

            {/* Technique */}
            <div className="text-center">
              <span className="text-xs font-medium tracking-wider" style={{ color: "#86868B" }}>
                術式
              </span>
              <p
                className="mt-1 text-lg font-bold"
                style={{ color: character.color }}
              >
                {character.technique}
              </p>
            </div>

            {/* Match Score */}
            <div className="mx-auto max-w-md">
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium" style={{ color: "#86868B" }}>マッチ度</span>
                <span
                  className="font-mono text-lg font-black"
                  style={{ color: character.color }}
                >
                  {score}%
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full" style={{ background: "#F5F5F7" }}>
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
            className="anim-fade-in-up mb-8 rounded-3xl border p-6 opacity-0"
            style={{
              animationDelay: "2.3s",
              borderColor: "#E5E5EA",
              background: "#F5F5F7",
            }}
          >
            <h3 className="mb-4 text-center text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#86868B" }}>
              あなたの属性
            </h3>
            <div className="space-y-3">
              {topTags.map((tag, i) => (
                <div
                  key={tag.key}
                  className="anim-slide-left opacity-0"
                  style={{ animationDelay: `${2.6 + i * 0.15}s` }}
                >
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-bold" style={{ color: "#1D1D1F" }}>
                      {tag.label}
                    </span>
                    <span className="font-mono text-xs font-bold" style={{ color: "#86868B" }}>
                      {tag.value}
                    </span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full" style={{ background: "#E5E5EA" }}>
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
            className="anim-fade-in-up mb-8 rounded-3xl border p-6 opacity-0"
            style={{
              animationDelay: "2.7s",
              borderColor: "#E5E5EA",
              background: "#F5F5F7",
            }}
          >
            <h3 className="mb-3 text-center text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#86868B" }}>
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
            className="anim-fade-in-up mb-8 rounded-3xl border p-6 opacity-0"
            style={{
              animationDelay: "3.0s",
              borderColor: "#E5E5EA",
              background: "#F5F5F7",
            }}
          >
            <p className="text-sm font-medium leading-relaxed" style={{ color: "#48484A" }}>
              {character.description}
            </p>
          </div>

          {/* ===== Ad Slot (result) — controlled by SHOW_ADS in page.tsx ===== */}

          {/* ===== Compatibility Section ===== */}
          <div
            className="anim-fade-in-up mb-8 grid grid-cols-2 gap-4 opacity-0"
            style={{ animationDelay: "3.5s" }}
          >
            {/* Best Friend */}
            <div
              className="rounded-3xl border p-5 text-center"
              style={{ borderColor: "#E5E5EA", background: "#F5F5F7" }}
            >
              <p className="mb-1 text-xs font-bold tracking-wider" style={{ color: "#86868B" }}>
                親友（ベストフレンド）
              </p>
              <div
                className="mx-auto my-2 h-[2px] w-10 rounded-full"
                style={{ background: `linear-gradient(90deg, transparent, ${character.color}66, transparent)` }}
              />
              {bestFriend ? (
                <p
                  className="text-base font-black sm:text-lg"
                  style={{ color: bestFriend.color }}
                >
                  {bestFriend.name}
                </p>
              ) : (
                <p className="text-base font-bold" style={{ color: "#AEAEB2" }}>---</p>
              )}
            </div>

            {/* Rival */}
            <div
              className="rounded-3xl border p-5 text-center"
              style={{ borderColor: "#E5E5EA", background: "#F5F5F7" }}
            >
              <p className="mb-1 text-xs font-bold tracking-wider" style={{ color: "#86868B" }}>
                宿敵（ライバル）
              </p>
              <div
                className="mx-auto my-2 h-[2px] w-10 rounded-full"
                style={{ background: "linear-gradient(90deg, transparent, #EF444466, transparent)" }}
              />
              {rival ? (
                <p className="text-base font-black text-red-500 sm:text-lg">
                  {rival.name}
                </p>
              ) : (
                <p className="text-base font-bold" style={{ color: "#AEAEB2" }}>---</p>
              )}
            </div>
          </div>

          {/* ===== OGP-style Card ===== */}
          <div
            className="anim-scale-in mb-10 overflow-hidden rounded-3xl opacity-0"
            style={{
              animationDelay: "3.8s",
              border: `1.5px solid ${character.color}30`,
              background: `linear-gradient(160deg, ${character.color}08 0%, #FFFFFF 40%, #FFFFFF 60%, ${character.color}05 100%)`,
            }}
          >
            <div className="relative px-6 py-8 sm:px-8">
              {/* Decorative corner accents */}
              <div
                className="absolute left-0 top-0 h-12 w-12 opacity-40"
                style={{
                  borderTop: `2px solid ${character.color}`,
                  borderLeft: `2px solid ${character.color}`,
                }}
              />
              <div
                className="absolute bottom-0 right-0 h-12 w-12 opacity-40"
                style={{
                  borderBottom: `2px solid ${character.color}`,
                  borderRight: `2px solid ${character.color}`,
                }}
              />

              <p className="mb-1 text-center text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: "#AEAEB2" }}>
                呪術廻戦キャラ診断
              </p>

              <h3
                className="mb-2 text-center text-3xl font-black sm:text-4xl"
                style={{ color: character.color }}
              >
                {character.name}
              </h3>

              <div className="mb-3 flex items-center justify-center gap-3">
                <div
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs ${rankStyle.bg} ${rankStyle.border}`}
                >
                  <span style={{ color: "#86868B" }}>あなたのランク</span>
                  <span className={`font-black ${rankStyle.text}`}>{rank}</span>
                </div>
                <span className="text-xs" style={{ color: "#D2D2D7" }}>|</span>
                <span
                  className="text-xs font-bold"
                  style={{ color: character.color }}
                >
                  {character.technique}
                </span>
              </div>

              <p
                className="mb-2 text-center text-xs font-bold italic tracking-wider"
                style={{ color: `${character.color}` }}
              >
                {character.catchcopy}
              </p>
              <p
                className="text-center text-sm italic leading-relaxed"
                style={{ color: "#48484A" }}
              >
                &ldquo;{character.quote}&rdquo;
              </p>

              <div className="mt-4 text-center">
                <p className="text-[10px] font-medium tracking-wider" style={{ color: "#AEAEB2" }}>
                  #呪術廻戦キャラ診断
                </p>
              </div>
            </div>
          </div>

          {/* ===== Bottom Actions ===== */}
          <div
            className="anim-fade-in-up mb-8 space-y-3 opacity-0"
            style={{ animationDelay: "4.2s" }}
          >
            {/* Secondary share reminder */}
            <div className="flex gap-3">
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition-all hover:opacity-80"
                style={{ background: "#1D1D1F", color: "#FFFFFF" }}
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
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#06C755] px-4 py-3 text-sm font-bold text-white transition-all hover:opacity-90"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 5.82 2 10.5c0 3.57 2.96 6.6 7.16 7.72-.08.58-.5 2.13-.57 2.46-.1.44.16.43.34.31.13-.08 2.15-1.46 3.03-2.06.33.04.67.07 1.04.07 5.52 0 10-3.82 10-8.5S17.52 2 12 2z" />
                </svg>
                <span>LINEでシェア</span>
              </a>
            </div>

            {/* Restart Button — Apple black CTA */}
            <button
              onClick={onRestart}
              className="mt-2 w-full rounded-2xl border px-5 py-4 text-sm font-bold transition-all active:scale-[0.97]"
              style={{
                borderColor: "#D2D2D7",
                background: "#F5F5F7",
                color: "#1D1D1F",
              }}
            >
              もう一度診断する
            </button>
          </div>

          {/* ===== Disclaimer Footer ===== */}
          <footer
            className="mt-6 border-t px-4 pb-10 pt-6 text-center"
            style={{ borderColor: "#E5E5EA" }}
          >
            <p className="text-[10px] leading-relaxed tracking-wide" style={{ color: "#AEAEB2" }}>
              ©芥見下々／集英社・呪術廻戦製作委員会
            </p>
            <p className="mt-1.5 text-[10px] leading-relaxed" style={{ color: "#C7C7CC" }}>
              本サイトは有志による非公式のファンコンテンツであり、
              <br className="sm:hidden" />
              公式とは一切関係ありません。
            </p>
            <p className="mt-1 text-[10px] leading-relaxed" style={{ color: "#C7C7CC" }}>
              使用されている画像の著作権は権利所有者に帰属します。
            </p>
            <p className="mt-1 text-[10px] leading-relaxed" style={{ color: "#C7C7CC" }}>
              不適切な内容や権利侵害がございましたら、
              <a
                href="mailto:km.gattaca@gmail.com"
                className="underline decoration-dotted underline-offset-2 transition-colors hover:text-[#86868B]"
                style={{ color: "#AEAEB2" }}
              >
                km.gattaca@gmail.com
              </a>
              {" "}までご連絡ください。
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
