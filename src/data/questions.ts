import { TagKey } from "./characters";

export interface Choice {
  text: string;
  tags: Partial<Record<TagKey, number>>;
  directBoost?: string[];
}

export interface Question {
  id: number;
  text: string;
  choices: Choice[];
  special?: "yuki";
}

export const questions: Question[] = [
  {
    id: 1,
    text: "仲間が絶体絶命のピンチ。あなたの本能が選ぶ行動は？",
    choices: [
      { text: "考えるより先に飛び出す。助けたい気持ちが止められない", tags: { passion: 7, instinct: 5, bond: 4 } },
      { text: "冷静に状況を分析。最善手を見つけてから動く", tags: { rational: 7, cool: 5, intellect: 4 } },
      { text: "自分の得意分野で確実に貢献する", tags: { duty: 6, pride: 5, cool: 4 } },
      { text: "……正直、自分の命が最優先だ", tags: { solitude: 6, rational: 5, rebellion: 4 } },
    ],
  },
  {
    id: 2,
    text: "「強さ」の本質とは何だと思う？",
    choices: [
      { text: "大切なものを守り抜く覚悟", tags: { bond: 7, duty: 5, passion: 4 } },
      { text: "すべてを凌駕する圧倒的な才能と力", tags: { pride: 7, madness: 5, instinct: 4 } },
      { text: "何があっても折れない、静かな覚悟", tags: { cool: 7, solitude: 5, pride: 4 } },
      { text: "知恵と戦略で相手を上回ること", tags: { intellect: 7, rational: 5, cool: 4 } },
    ],
  },
  {
    id: 3,
    text: "理不尽を突きつけられた時、あなたの心は？",
    choices: [
      { text: "怒りが爆発する。黙っていられない", tags: { rebellion: 7, passion: 5, madness: 4 } },
      { text: "感情を押し殺して、じっと耐える", tags: { cool: 7, duty: 5, solitude: 4 } },
      { text: "皮肉の一つでも言って切り返す", tags: { humor: 7, pride: 5, rebellion: 4 } },
      { text: "合理的に考えて、戦略的に対処する", tags: { rational: 7, intellect: 5, cool: 4 } },
    ],
  },
  {
    id: 4,
    text: "チームでの自分のポジションは？",
    choices: [
      { text: "先頭に立って突撃するアタッカー", tags: { passion: 6, instinct: 6, pride: 4 } },
      { text: "全体を見渡す司令塔・参謀", tags: { intellect: 6, rational: 6, cool: 4 } },
      { text: "仲間を支えるサポーター", tags: { bond: 6, duty: 6, cool: 4 } },
      { text: "チームより一人で動いた方が早い", tags: { solitude: 6, pride: 5, rebellion: 5 } },
    ],
  },
  {
    id: 5,
    text: "一人の夜。あなたは何を思う？",
    choices: [
      { text: "明日会える仲間の顔を思い浮かべる", tags: { bond: 7, passion: 4, duty: 4 } },
      { text: "自分だけの時間を静かに楽しむ", tags: { solitude: 7, cool: 5, intellect: 4 } },
      { text: "もっと強くなるための計画を練る", tags: { pride: 6, rational: 5, instinct: 4 } },
      { text: "衝動的に外に出たくなる。刺激が欲しい", tags: { madness: 6, instinct: 6, rebellion: 4 } },
    ],
  },
  {
    id: 6,
    text: "人生で絶対に許せないことは？",
    choices: [
      { text: "弱い者への理不尽な暴力", tags: { passion: 7, duty: 5, bond: 4 } },
      { text: "信じた人間の裏切り", tags: { pride: 6, bond: 5, madness: 5 } },
      { text: "非合理な慣習や無駄な組織", tags: { rational: 7, rebellion: 5, intellect: 4 } },
      { text: "自分の可能性を否定されること", tags: { pride: 7, rebellion: 5, passion: 4 } },
    ],
  },
  {
    id: 7,
    text: "苦手な相手と仕事をすることになった。どうする？",
    choices: [
      { text: "プロとして割り切り、冷静に対応する", tags: { rational: 6, duty: 6, cool: 4 } },
      { text: "なるべく関わらず距離を取る", tags: { solitude: 7, cool: 5, rational: 4 } },
      { text: "逆に仲良くなってやろうと思う", tags: { bond: 6, humor: 5, passion: 5 } },
      { text: "正直に「苦手です」と伝える", tags: { rebellion: 5, pride: 5, passion: 5 } },
    ],
  },
  {
    id: 8,
    text: "……で、君はどんな女（男）が好み（タイプ）だい？",
    special: "yuki",
    choices: [
      {
        text: "中身がしっかりした、一緒にいて落ち着く人",
        tags: { bond: 6, duty: 5, cool: 4 },
        directBoost: ["itadori", "ijichi", "ino", "nanami", "miwa", "junpei", "tsumiki"],
      },
      {
        text: "自分を刺激し、共に高め合える強い人",
        tags: { passion: 6, pride: 5, instinct: 4 },
        directBoost: ["todo", "maki", "gojo", "okkotsu", "kashimo", "ishigori"],
      },
      {
        text: "……別に。興味ないね",
        tags: { solitude: 7, cool: 5, pride: 4 },
        directBoost: ["fushiguro", "toji", "sukuna", "naoya", "mahoraga", "tengen"],
      },
      {
        text: "面白くて、一緒にいると笑える人",
        tags: { humor: 7, bond: 5, madness: 4 },
        directBoost: ["hakari", "panda", "mahito", "takaba", "kusakabe"],
      },
    ],
  },
  {
    id: 9,
    text: "戦いにおいて最も重要なものは？",
    choices: [
      { text: "折れない気合いと根性", tags: { passion: 7, instinct: 5, madness: 4 } },
      { text: "情報と戦略がすべてを制す", tags: { intellect: 7, rational: 5, cool: 4 } },
      { text: "積み重ねた経験と磨いた技", tags: { duty: 6, cool: 5, pride: 5 } },
      { text: "運と直感。それが才能だ", tags: { instinct: 7, madness: 5, humor: 4 } },
    ],
  },
  {
    id: 10,
    text: "「正義」とは何だと思う？",
    choices: [
      { text: "すべての人を平等に守ること", tags: { duty: 7, bond: 5, passion: 4 } },
      { text: "自分が正しいと思うことを貫くこと", tags: { pride: 7, rebellion: 5, passion: 4 } },
      { text: "正義なんて立場で変わるもの", tags: { rational: 7, cool: 5, intellect: 4 } },
      { text: "力こそが正義", tags: { madness: 7, instinct: 5, pride: 4 } },
    ],
  },
  {
    id: 11,
    text: "困難な壁にぶつかった時、あなたは？",
    choices: [
      { text: "力づくでぶち破る", tags: { passion: 6, instinct: 6, madness: 4 } },
      { text: "冷静に迂回ルートを探す", tags: { rational: 6, intellect: 6, cool: 4 } },
      { text: "仲間と一緒に乗り越える", tags: { bond: 6, duty: 5, passion: 4 } },
      { text: "壁を登って超える。想定外の方法で", tags: { rebellion: 6, madness: 5, instinct: 5 } },
    ],
  },
  {
    id: 12,
    text: "もし世界が明日終わるなら、最後に何をする？",
    choices: [
      { text: "大切な人と最後まで一緒にいる", tags: { bond: 8, passion: 4 } },
      { text: "最後まで世界を救う方法を探す", tags: { duty: 7, passion: 4, rational: 4 } },
      { text: "最高の飯を食って、笑って過ごす", tags: { humor: 6, instinct: 5, cool: 4 } },
      { text: "一人で静かに終わりを受け入れる", tags: { solitude: 8, cool: 4 } },
    ],
  },
  {
    id: 13,
    text: "自分の「弱さ」と向き合ったとき、あなたは？",
    choices: [
      { text: "それでも前に進む。止まる方が怖い", tags: { passion: 7, instinct: 5, pride: 4 } },
      { text: "弱さを分析し、克服する方法を考える", tags: { rational: 7, intellect: 5, duty: 4 } },
      { text: "弱さも含めて自分。笑い飛ばす", tags: { humor: 7, rebellion: 4, bond: 4 } },
      { text: "弱さなんて見せない。誰にも", tags: { solitude: 7, pride: 5, cool: 4 } },
    ],
  },
  {
    id: 14,
    text: "もし超能力を一つ手に入れるなら？",
    choices: [
      { text: "テレパシー ― 心が読める力", tags: { intellect: 6, bond: 5, cool: 4 } },
      { text: "圧倒的な身体能力", tags: { instinct: 7, pride: 5, passion: 4 } },
      { text: "時間を操る力", tags: { rational: 6, cool: 5, intellect: 5 } },
      { text: "他者を支配する力", tags: { madness: 7, solitude: 5, rebellion: 4 } },
    ],
  },
  {
    id: 15,
    text: "あなたの死に際の一言は？",
    choices: [
      { text: "「後は……任せたぞ」", tags: { bond: 7, duty: 6, cool: 4 } },
      { text: "「悔いはない。最高の人生だった」", tags: { pride: 7, passion: 5, cool: 4 } },
      { text: "「まだ死ねない……！」", tags: { passion: 7, instinct: 6, madness: 4 } },
      { text: "「……つまらなかったな」", tags: { solitude: 6, madness: 7, rebellion: 4 } },
    ],
  },
];
