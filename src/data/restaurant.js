// 🍜 Restaurant-Simulator: Speisekarte + Bestellsatz-Vorlagen.
// Jedes Gericht hat sein echtes Zählwort (碗/份/盘/杯/瓶/笼/串) – genau die
// Zählwörter, die im HSK-Test ständig geprüft werden. Preise in Yuan (¥)
// sind die Punkte: richtig servieren = Geld verdienen.
// Neue Gerichte/Sätze: einfach dem Muster folgen.

export const GERICHTE = [
  { id: 'niuroumian', emoji: '🍜', hanzi: '牛肉面', pinyin: 'niúròu miàn', de: 'Rindfleisch-Nudeln', zw: '碗', preis: 18 },
  { id: 'jiaozi', emoji: '🥟', hanzi: '饺子', pinyin: 'jiǎozi', de: 'Teigtaschen', zw: '盘', preis: 15 },
  { id: 'xiaolongbao', emoji: '🥟', hanzi: '小笼包', pinyin: 'xiǎolóngbāo', de: 'Suppenteigtaschen', zw: '笼', preis: 20 },
  { id: 'mifan', emoji: '🍚', hanzi: '米饭', pinyin: 'mǐfàn', de: 'Reis', zw: '碗', preis: 3 },
  { id: 'chaofan', emoji: '🍳', hanzi: '蛋炒饭', pinyin: 'dàn chǎofàn', de: 'gebratener Reis mit Ei', zw: '份', preis: 12 },
  { id: 'kaoya', emoji: '🦆', hanzi: '烤鸭', pinyin: 'kǎoyā', de: 'Pekingente', zw: '份', preis: 88 },
  { id: 'huoguo', emoji: '🍲', hanzi: '火锅', pinyin: 'huǒguō', de: 'Feuertopf', zw: '份', preis: 98 },
  { id: 'mapodoufu', emoji: '🌶️', hanzi: '麻婆豆腐', pinyin: 'mápó dòufu', de: 'Mapo-Tofu', zw: '份', preis: 22 },
  { id: 'tangculiji', emoji: '🍖', hanzi: '糖醋里脊', pinyin: 'tángcù lǐji', de: 'süß-saures Schweinefilet', zw: '份', preis: 32 },
  { id: 'yangrouchuan', emoji: '🍢', hanzi: '羊肉串', pinyin: 'yángròu chuàn', de: 'Lammspieße', zw: '串', preis: 5 },
  { id: 'baozi', emoji: '🥠', hanzi: '包子', pinyin: 'bāozi', de: 'gefüllte Dampfbrötchen', zw: '笼', preis: 10 },
  { id: 'jidantang', emoji: '🥣', hanzi: '鸡蛋汤', pinyin: 'jīdàn tāng', de: 'Eier-Suppe', zw: '碗', preis: 8 },
  { id: 'chunjuan', emoji: '🌯', hanzi: '春卷', pinyin: 'chūnjuǎn', de: 'Frühlingsrollen', zw: '盘', preis: 12 },
  { id: 'lücha', emoji: '🍵', hanzi: '绿茶', pinyin: 'lǜchá', de: 'grüner Tee', zw: '杯', preis: 6 },
  { id: 'pijiu', emoji: '🍺', hanzi: '啤酒', pinyin: 'píjiǔ', de: 'Bier', zw: '瓶', preis: 8 },
  { id: 'suanlatang', emoji: '🥘', hanzi: '酸辣汤', pinyin: 'suānlà tāng', de: 'sauer-scharfe Suppe', zw: '碗', preis: 10 },
]

// Bestellsatz-Vorlagen: {a} = Anzahl, {zw} = Zählwort, {g} = Gericht.
// py/de dienen der Hilfe-Anzeige nach dem Servieren.
export const BESTELLUNGEN = [
  { zh: '你好，我要{a}{zw}{g}。', py: 'Nǐ hǎo, wǒ yào {a} {zw} {g}.', de: 'Hallo, ich möchte {a} {zw} {g}.' },
  { zh: '服务员，请给我来{a}{zw}{g}！', py: 'Fúwùyuán, qǐng gěi wǒ lái {a} {zw} {g}!', de: 'Bedienung, bringen Sie mir bitte {a} {zw} {g}!' },
  { zh: '老板，来{a}{zw}{g}，谢谢！', py: 'Lǎobǎn, lái {a} {zw} {g}, xièxie!', de: 'Chef, {a} {zw} {g} bitte, danke!' },
  { zh: '麻烦你，我想点{a}{zw}{g}。', py: 'Máfan nǐ, wǒ xiǎng diǎn {a} {zw} {g}.', de: 'Entschuldigung, ich würde gern {a} {zw} {g} bestellen.' },
  { zh: '请问有{g}吗？我要{a}{zw}。', py: 'Qǐngwèn yǒu {g} ma? Wǒ yào {a} {zw}.', de: 'Haben Sie {g}? Ich nehme {a} {zw}.' },
]

// Zahlwörter 1–3 (两 statt 二 vor Zählwörtern – typischer HSK-Stolperstein!)
export const ANZAHLEN = [
  { zahl: 1, zh: '一', py: 'yì' },
  { zahl: 2, zh: '两', py: 'liǎng' },
  { zahl: 3, zh: '三', py: 'sān' },
]

export const GAESTE = ['👵', '👴', '👨‍💼', '👩‍💼', '🧑‍🎓', '👩‍🦰', '🧔', '👧', '👨‍🍳', '🤵']
