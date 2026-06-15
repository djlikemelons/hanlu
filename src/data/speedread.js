// ⏱️ 速读 Speed-Reading: kurze Texte im Zeitungsstil (HSK 4–5).
// Der Text erscheint Satz für Satz im gewählten Tempo und verschwindet
// wieder – wie beim echten Zeitunglesen gibt es kein Zurück. Danach
// prüfen Fragen das Verständnis. Neue Texte: einfach Muster kopieren.

export const TEMPI = [
  { id: 'langsam', emoji: '🐢', name: 'Gemütlich', zeichenProSek: 2, faktor: 1 },
  { id: 'mittel', emoji: '🚶', name: 'Zeitungsleser', zeichenProSek: 3.2, faktor: 1.5 },
  { id: 'schnell', emoji: '🚀', name: 'Profi', zeichenProSek: 5, faktor: 2 },
]

export const SPEED_TEXTE = [
  {
    id: 'sr1',
    titel: '共享单车',
    titelDe: 'Leihfahrräder',
    text: '近年来，共享单车在中国的大城市里越来越流行。人们用手机扫码就能骑车，价格也很便宜。这种方式不但方便，而且对环境友好。不过，乱停乱放的问题也让城市管理变得更难。',
    fragen: [
      { f: '人们怎么使用共享单车？', optionen: ['用手机扫码', '去商店租', '打电话预订', '买月票'], richtig: 0 },
      { f: '文章提到了什么问题？', optionen: ['价格太贵', '乱停乱放', '骑车太危险', '车太少'], richtig: 1 },
    ],
  },
  {
    id: 'sr2',
    titel: '咖啡文化',
    titelDe: 'Kaffeekultur',
    text: '以前，中国人见面常常喝茶；现在，越来越多的年轻人喜欢喝咖啡。市场调查显示，中国的咖啡店数量五年里增长了一倍多。专家认为，这说明年轻人的生活方式正在改变。',
    fragen: [
      { f: '现在很多年轻人喜欢喝什么？', optionen: ['茶', '咖啡', '啤酒', '果汁'], richtig: 1 },
      { f: '五年里，咖啡店的数量怎么样了？', optionen: ['少了一半', '没有变化', '增长了一倍多', '全都关门了'], richtig: 2 },
    ],
  },
  {
    id: 'sr3',
    titel: '中国高铁',
    titelDe: 'Hochgeschwindigkeitszüge',
    text: '中国的高铁网是世界上最长的，总长度超过四万公里。坐高铁从北京到上海只需要四个半小时左右。因为又快又安全，高铁已经成为很多人出门的第一选择。',
    fragen: [
      { f: '中国高铁的总长度是多少？', optionen: ['四千公里', '超过四万公里', '一万公里', '文章没说'], richtig: 1 },
      { f: '为什么很多人选择高铁？', optionen: ['因为便宜', '因为又快又安全', '因为可以看风景', '因为没有飞机'], richtig: 1 },
    ],
  },
  {
    id: 'sr4',
    titel: '手机支付',
    titelDe: 'Mobiles Bezahlen',
    text: '在中国，几乎人人都用手机支付。买菜、坐车、看病，只要扫一下二维码就可以付钱。很多人出门已经不带现金了。不过，一些老年人觉得这种变化太快，学起来有点儿难。',
    fragen: [
      { f: '在中国，人们现在常用什么方式付钱？', optionen: ['现金', '银行卡', '手机扫码', '支票'], richtig: 2 },
      { f: '谁觉得这种变化学起来难？', optionen: ['年轻人', '一些老年人', '外国人', '孩子'], richtig: 1 },
    ],
  },
  {
    id: 'sr5',
    titel: '黄金周',
    titelDe: 'Die Goldene Woche',
    text: '每年十月初，中国人迎来国庆假期，也叫“黄金周”。几亿人在这几天旅行，火车票常常很难买到。有名的景点到处都是人，所以也有人干脆待在家里休息。',
    fragen: [
      { f: '黄金周是什么时候？', optionen: ['一月初', '五月底', '十月初', '十二月'], richtig: 2 },
      { f: '为什么有人待在家里？', optionen: ['因为景点人太多', '因为天气不好', '因为要上班', '因为没有钱'], richtig: 0 },
    ],
  },
  {
    id: 'sr6',
    titel: '大熊猫',
    titelDe: 'Große Pandas',
    text: '大熊猫是中国的国宝，主要生活在四川的山里。它们每天要吃十几公斤竹子。经过多年的保护，野生大熊猫的数量已经增加到一千八百多只，不再是“濒危”动物了。',
    fragen: [
      { f: '大熊猫主要吃什么？', optionen: ['竹子', '鱼', '水果', '米饭'], richtig: 0 },
      { f: '现在野生大熊猫大约有多少只？', optionen: ['一百多只', '一千八百多只', '八千多只', '十万多只'], richtig: 1 },
    ],
  },
]
