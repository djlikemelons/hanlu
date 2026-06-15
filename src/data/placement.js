// Fragenpool für den adaptiven Einstufungstest (HSK 3–6).
// Einträge mit `kartenId` verweisen auf das Starter-Deck: Wird so ein Wort
// richtig beantwortet, markiert das SRS die Karte als „bekannt" und legt
// sie nicht mehr unnötig zum Pauken vor.
// Eigenständige Einträge (HSK 3 / 6) dienen nur der Niveau-Messung.

export const EINSTUFUNGS_POOL = [
  // --- HSK 3 (Sonden, eigenständig) ---
  { hanzi: '打算', pinyin: 'dǎsuàn', bedeutung: 'vorhaben, planen', level: 3 },
  { hanzi: '关心', pinyin: 'guānxīn', bedeutung: 'sich kümmern um', level: 3 },
  { hanzi: '干净', pinyin: 'gānjìng', bedeutung: 'sauber', level: 3 },
  { hanzi: '环境', pinyin: 'huánjìng', bedeutung: 'Umgebung, Umwelt', level: 3 },
  { hanzi: '锻炼', pinyin: 'duànliàn', bedeutung: 'Sport treiben, trainieren', level: 3 },
  { hanzi: '习惯', pinyin: 'xíguàn', bedeutung: 'Gewohnheit; gewohnt sein', level: 3 },
  { hanzi: '重要', pinyin: 'zhòngyào', bedeutung: 'wichtig', level: 3 },
  { hanzi: '容易', pinyin: 'róngyì', bedeutung: 'einfach, leicht', level: 3 },
  { hanzi: '决定', pinyin: 'juédìng', bedeutung: 'entscheiden; Entscheidung', level: 3 },
  { hanzi: '周末', pinyin: 'zhōumò', bedeutung: 'Wochenende', level: 3 },

  // --- HSK 4 (aus dem Starter-Deck) ---
  { kartenId: 'hsk-经验', level: 4 },
  { kartenId: 'hsk-解决', level: 4 },
  { kartenId: 'hsk-态度', level: 4 },
  { kartenId: 'hsk-增加', level: 4 },
  { kartenId: 'hsk-改变', level: 4 },
  { kartenId: 'hsk-适应', level: 4 },
  { kartenId: 'hsk-影响', level: 4 },
  { kartenId: 'hsk-坚持', level: 4 },
  { kartenId: 'essen-推荐', level: 4 },
  { kartenId: 'business-安排', level: 4 },

  // --- HSK 5 (aus dem Starter-Deck + Sonden) ---
  { kartenId: 'hsk-究竟', level: 5 },
  { kartenId: 'hsk-显然', level: 5 },
  { kartenId: 'business-谈判', level: 5 },
  { kartenId: 'steuern-汇率', level: 5 },
  { kartenId: 'nachrichten-政策', level: 5 },
  { kartenId: 'nachrichten-投资', level: 5 },
  { kartenId: 'nachrichten-危机', level: 5 },
  { kartenId: 'kultur-风俗', level: 5 },
  { hanzi: '趋势', pinyin: 'qūshì', bedeutung: 'Trend, Tendenz', level: 5 },
  { hanzi: '利润', pinyin: 'lìrùn', bedeutung: 'Gewinn, Profit', level: 5 },
  { hanzi: '措施', pinyin: 'cuòshī', bedeutung: 'Maßnahme', level: 5 },
  { hanzi: '矛盾', pinyin: 'máodùn', bedeutung: 'Widerspruch, Konflikt', level: 5 },

  // --- HSK 6 (Sonden, eigenständig) ---
  { hanzi: '宏观', pinyin: 'hóngguān', bedeutung: 'Makro-, gesamtwirtschaftlich', level: 6 },
  { hanzi: '履行', pinyin: 'lǚxíng', bedeutung: 'erfüllen (Vertrag, Pflicht)', level: 6 },
  { hanzi: '衰退', pinyin: 'shuāituì', bedeutung: 'Rezession, Niedergang', level: 6 },
  { hanzi: '制裁', pinyin: 'zhìcái', bedeutung: 'Sanktion; sanktionieren', level: 6 },
  { hanzi: '渠道', pinyin: 'qúdào', bedeutung: 'Kanal, Weg (z. B. Vertriebsweg)', level: 6 },
  { hanzi: '谨慎', pinyin: 'jǐnshèn', bedeutung: 'vorsichtig, umsichtig', level: 6 },
  { hanzi: '频繁', pinyin: 'pínfán', bedeutung: 'häufig, wiederholt', level: 6 },
  { hanzi: '障碍', pinyin: 'zhàng’ài', bedeutung: 'Hindernis, Barriere', level: 6 },
]
