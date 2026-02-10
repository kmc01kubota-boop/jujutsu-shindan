import { Character, characters, ALL_TAG_KEYS, TagScores, TagKey } from "@/data/characters";
import { Choice } from "@/data/questions";

/**
 * ユーザーの回答から各タグの合計スコアを算出
 */
export function calculateUserScores(answers: Choice[]): TagScores {
  const scores: TagScores = {
    passion: 0, cool: 0, rational: 0, madness: 0,
    solitude: 0, bond: 0, pride: 0, humor: 0,
    duty: 0, rebellion: 0, instinct: 0, intellect: 0,
  };

  for (const choice of answers) {
    for (const [key, value] of Object.entries(choice.tags)) {
      scores[key as TagKey] += value;
    }
  }

  return scores;
}

/**
 * コサイン類似度を使ったマッチングアルゴリズム
 * 単純なユークリッド距離よりも、パラメータの「傾向」を重視するため
 * 意外なサブキャラへの着地も可能になる
 */
function cosineSimilarity(a: TagScores, b: TagScores): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (const key of ALL_TAG_KEYS) {
    dotProduct += a[key] * b[key];
    normA += a[key] * a[key];
    normB += b[key] * b[key];
  }

  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * ユークリッド距離（正規化済み）
 */
function normalizedEuclidean(a: TagScores, b: TagScores): number {
  let sumSq = 0;
  for (const key of ALL_TAG_KEYS) {
    const diff = a[key] - b[key];
    sumSq += diff * diff;
  }
  // 最大距離で正規化して0-1に
  const maxDist = Math.sqrt(ALL_TAG_KEYS.length * 100); // 各タグ最大10
  return 1 - Math.sqrt(sumSq) / maxDist;
}

/**
 * ハイブリッドマッチングスコア
 * コサイン類似度（傾向の一致）とユークリッド距離（絶対値の近さ）を
 * 重み付けして組み合わせる
 */
function hybridScore(userScores: TagScores, charScores: TagScores): number {
  const cosine = cosineSimilarity(userScores, charScores);
  const euclidean = normalizedEuclidean(userScores, charScores);

  // コサイン類似度 60% + ユークリッド距離 40%
  return cosine * 0.6 + euclidean * 0.4;
}

export interface MatchResult {
  character: Character;
  score: number;
  topTags: { key: TagKey; label: string; value: number }[];
  userScores: TagScores;
}

/**
 * メインのマッチング関数
 * 全キャラクターとのスコアを算出し、最もマッチするキャラを返す
 * - directBoost: 選択肢に指定されたキャラへのスコア加算
 * - 隠しキャラ判定: 直哉・髙羽の出現条件チェック
 */
export function findBestMatch(answers: Choice[]): MatchResult {
  const userScores = calculateUserScores(answers);
  const maxPossible = answers.length * 8;
  const normalizedUser: TagScores = { ...userScores };
  for (const key of ALL_TAG_KEYS) {
    normalizedUser[key] = (userScores[key] / maxPossible) * 10;
  }

  // Collect directBoost targets from answers
  const boostCounts: Record<string, number> = {};
  for (const choice of answers) {
    if (choice.directBoost) {
      for (const charId of choice.directBoost) {
        boostCounts[charId] = (boostCounts[charId] || 0) + 1;
      }
    }
  }

  // Determine which hidden characters are eligible
  const sortedUserTags = ALL_TAG_KEYS
    .map((key) => ({ key, value: userScores[key] }))
    .sort((a, b) => b.value - a.value);

  const top3Keys = sortedUserTags.slice(0, 3).map((t) => t.key);
  const userMaxTag = sortedUserTags[0]?.value || 0;
  const naoyaThreshold = userMaxTag * 0.7;

  // Naoya: pride + rational both in top 3 AND both >= 70% of user's top tag
  const naoyaEligible =
    top3Keys.includes("pride") &&
    top3Keys.includes("rational") &&
    userScores.pride >= naoyaThreshold &&
    userScores.rational >= naoyaThreshold;

  // Takaba: humor + madness both in top 3 AND humor is #1
  const takabaEligible =
    top3Keys.includes("humor") &&
    top3Keys.includes("madness") &&
    sortedUserTags[0].key === "humor";

  let bestChar: Character = characters[0];
  let bestScore = -1;

  for (const char of characters) {
    // Skip hidden characters unless eligible
    if (char.hidden) {
      if (char.id === "takaba" && !takabaEligible) continue;
      // Naoya is not hidden by default, but we add a special check
    }

    // If naoya is NOT eligible, reduce his score significantly
    if (char.id === "naoya" && !naoyaEligible) {
      // Still calculate but apply penalty
      const baseScore = hybridScore(normalizedUser, char.tags);
      const penalized = baseScore * 0.7;
      if (penalized > bestScore) {
        bestScore = penalized;
        bestChar = char;
      }
      continue;
    }

    let score = hybridScore(normalizedUser, char.tags);

    // Apply directBoost bonus
    if (boostCounts[char.id]) {
      score += 0.08 * boostCounts[char.id];
    }

    // Secret character bonus when eligible
    if (char.id === "naoya" && naoyaEligible) {
      score += 0.12;
    }
    if (char.id === "takaba" && takabaEligible) {
      score += 0.15;
    }

    if (score > bestScore) {
      bestScore = score;
      bestChar = char;
    }
  }

  // Cap score at 100%
  const displayScore = Math.min(Math.round(bestScore * 100), 100);

  const TAG_LABELS: Record<TagKey, string> = {
    passion: "情熱", cool: "冷静", rational: "合理", madness: "狂気",
    solitude: "孤独", bond: "絆", pride: "矜持", humor: "ユーモア",
    duty: "使命感", rebellion: "反逆", instinct: "本能", intellect: "知略",
  };

  return {
    character: bestChar,
    score: displayScore,
    topTags: sortedUserTags.slice(0, 3).map((t) => ({
      key: t.key,
      label: TAG_LABELS[t.key],
      value: t.value,
    })),
    userScores,
  };
}

/**
 * 呪術師ランクを決定（スコアのばらつき具合から）
 */
export function determineRank(answers: Choice[]): string {
  const scores = calculateUserScores(answers);
  const values = ALL_TAG_KEYS.map((k) => scores[k]);
  const max = Math.max(...values);
  const total = values.reduce((a, b) => a + b, 0);

  // 最大値が高い＝突出した才能 → 高ランク
  if (max >= 35 && total >= 110) return "特級";
  if (max >= 28 && total >= 90) return "1級";
  if (max >= 22 && total >= 75) return "準1級";
  if (max >= 16 && total >= 60) return "2級";
  if (max >= 12) return "3級";
  return "4級";
}
