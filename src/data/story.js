// 互动小说 Story-Mode: interaktive Kurzgeschichte mit Entscheidungen.
// text = Wort-Tokens (antippbar), gloss = Pinyin/Übersetzung für schwierige Wörter.
// Neue Geschichten einfach als weiteres Objekt in STORIES ergänzen.

export const STORIES = [
  {
    id: 'shanghai-foto',
    titel: '外滩的光',
    untertitel: 'Ein Fotoauftrag in Shanghai',
    emoji: '📷',
    start: 's1',
    knoten: {
      s1: {
        szene: { emoji: '🏙️', deko: '✈️📷', ort: '上海 · Tag 1', farbe1: '#1d4ed8', farbe2: '#0b1226' },
        text: ['你', '是', '一', '名', '来自', '德国', '的', '摄影师', '，', '刚', '到', '上海', '。', '一', '家', '杂志', '请', '你', '拍', '一', '组', '「', '城市', '与', '光', '」', '的', '照片', '，', '三', '天', '后', '交稿', '。'],
        pinyin: 'Nǐ shì yì míng láizì Déguó de shèyǐngshī, gāng dào Shànghǎi. Yì jiā zázhì qǐng nǐ pāi yì zǔ «chéngshì yǔ guāng» de zhàopiàn, sān tiān hòu jiāogǎo.',
        gloss: { 摄影师: ['shèyǐngshī', 'Fotograf'], 杂志: ['zázhì', 'Zeitschrift'], 组: ['zǔ', 'Serie, Gruppe (ZEW)'], 交稿: ['jiāogǎo', 'das Material abgeben'], 来自: ['láizì', 'stammen aus'] },
        auswahl: [
          { label: '先去外滩看光线 · Zuerst zum Bund', ziel: 's2' },
          { label: '先去老城区找故事 · Zuerst in die Altstadt', ziel: 's3' },
        ],
      },
      s2: {
        szene: { emoji: '🌇', deko: '📷', ort: '外滩 · Nachmittag', farbe1: '#92400e', farbe2: '#172554' },
        text: ['下午', '的', '阳光', '太', '强', '，', '照片', '拍', '得', '一般', '。', '一', '位', '老人', '笑', '着', '说', '：', '「', '年轻人', '，', '外滩', '最', '美', '的', '光', '在', '晚上', '七', '点', '。', '」'],
        pinyin: 'Xiàwǔ de yángguāng tài qiáng, zhàopiàn pāi de yìbān. Yí wèi lǎorén xiào zhe shuō: «Niánqīngrén, Wàitān zuì měi de guāng zài wǎnshang qī diǎn.»',
        gloss: { 阳光: ['yángguāng', 'Sonnenlicht'], 一般: ['yìbān', 'mittelmäßig'], 外滩: ['Wàitān', 'der Bund (Uferpromenade in Shanghai)'], 年轻人: ['niánqīngrén', 'junger Mensch'] },
        auswahl: [
          { label: '等到晚上七点 · Auf das Abendlicht warten', ziel: 's4' },
          { label: 'nicht warten – in die Altstadt', ziel: 's3' },
        ],
      },
      s3: {
        szene: { emoji: '🏮', deko: '🧵', ort: '老城区 · Gasse', farbe1: '#b91c1c', farbe2: '#1f2937' },
        text: ['你', '走', '进', '一', '条', '小巷', '，', '遇到', '一', '位', '做', '灯笼', '的', '老师傅', '。', '他', '说', '：', '「', '你', '可以', '拍', '我', '工作', '，', '但', '要', '先', '陪', '我', '喝', '一', '杯', '茶', '。', '」'],
        pinyin: 'Nǐ zǒu jìn yì tiáo xiǎoxiàng, yùdào yí wèi zuò dēnglong de lǎoshīfu. Tā shuō: «Nǐ kěyǐ pāi wǒ gōngzuò, dàn yào xiān péi wǒ hē yì bēi chá.»',
        gloss: { 小巷: ['xiǎoxiàng', 'Gasse'], 遇到: ['yùdào', 'treffen, begegnen'], 灯笼: ['dēnglong', 'Laterne'], 老师傅: ['lǎoshīfu', 'alter Meister (Handwerker)'], 陪: ['péi', 'begleiten, Gesellschaft leisten'] },
        auswahl: [
          { label: 'Tee trinken und zuhören', ziel: 's5' },
          { label: 'Höflich ablehnen, allein weitersuchen', ziel: 's6' },
        ],
      },
      s4: {
        szene: { emoji: '🌃', deko: '✨📷', ort: '外滩 · 19:00 Uhr', farbe1: '#312e81', farbe2: '#020617' },
        text: ['晚上', '七', '点', '，', '江边', '的', '灯', '亮', '了', '，', '光线', '果然', '完美', '。', '你', '拍', '到', '了', '满意', '的', '照片', '，', '但', '照片', '里', '只', '有', '建筑', '，', '没有', '「', '人', '」', '的', '故事', '。'],
        pinyin: 'Wǎnshang qī diǎn, jiāngbiān de dēng liàng le, guāngxiàn guǒrán wánměi. Nǐ pāi dào le mǎnyì de zhàopiàn, dàn zhàopiàn lǐ zhǐ yǒu jiànzhù, méiyǒu «rén» de gùshi.',
        gloss: { 江边: ['jiāngbiān', 'Flussufer'], 果然: ['guǒrán', 'tatsächlich, wie erwartet'], 完美: ['wánměi', 'perfekt'], 建筑: ['jiànzhù', 'Gebäude, Architektur'] },
        auswahl: [
          { label: 'Diese Fotos reichen – abgeben', ziel: 'e2' },
          { label: 'Morgen in der Altstadt nach Menschen suchen', ziel: 's3' },
        ],
      },
      s5: {
        szene: { emoji: '🍵', deko: '🏮', ort: '灯笼铺 · Werkstatt', farbe1: '#854d0e', farbe2: '#1c1917' },
        text: ['老师傅', '一边', '做', '灯笼', '，', '一边', '讲', '他', '四十', '年', '的', '手艺', '。', '你', '拍', '下', '了', '他', '认真', '工作', '的', '手', '。', '这些', '照片', '有', '光', '，', '也', '有', '故事', '。'],
        pinyin: 'Lǎoshīfu yìbiān zuò dēnglong, yìbiān jiǎng tā sìshí nián de shǒuyì. Nǐ pāi xià le tā rènzhēn gōngzuò de shǒu. Zhèxiē zhàopiàn yǒu guāng, yě yǒu gùshi.',
        gloss: { 手艺: ['shǒuyì', 'Handwerk(skunst)'], 认真: ['rènzhēn', 'gewissenhaft, ernsthaft'] },
        auswahl: [
          { label: 'Ihn bitten, dir weitere Handwerker vorzustellen', ziel: 's7' },
          { label: 'Das reicht – zurück ins Hotel, Fotos auswählen', ziel: 'e2' },
        ],
      },
      s6: {
        szene: { emoji: '🌧️', deko: '📷', ort: '小巷 · Regen', farbe1: '#334155', farbe2: '#0f172a' },
        text: ['你', '一个人', '拍', '了', '一些', '街景', '，', '照片', '不错', '，', '但', '总', '觉得', '少', '了', '点', '什么', '。', '这时', '，', '天', '开始', '下雨', '了', '。'],
        pinyin: 'Nǐ yí ge rén pāi le yìxiē jiējǐng, zhàopiàn búcuò, dàn zǒng juéde shǎo le diǎn shénme. Zhèshí, tiān kāishǐ xiàyǔ le.',
        gloss: { 街景: ['jiējǐng', 'Straßenszene'], 总: ['zǒng', 'immer, ständig'], 这时: ['zhèshí', 'in diesem Moment'] },
        auswahl: [
          { label: 'In eine kleine Nudelküche flüchten', ziel: 's8' },
          { label: 'Zurück ins Hotel', ziel: 'e3' },
        ],
      },
      s7: {
        szene: { emoji: '🎭', deko: '📸🏮', ort: '三天 · unterwegs', farbe1: '#7e22ce', farbe2: '#1e1b4b' },
        text: ['三', '天', '里', '，', '你', '拍', '了', '灯笼', '师傅', '、', '茶馆', '老板', '和', '一', '位', '京剧', '演员', '。', '交稿', '那', '天', '，', '编辑', '说', '：', '「', '这', '正是', '我们', '要', '的', '——', '城市', '的', '光', '，', '在', '人', '身上', '。', '」'],
        pinyin: 'Sān tiān lǐ, nǐ pāi le dēnglong shīfu, cháguǎn lǎobǎn hé yí wèi jīngjù yǎnyuán. Jiāogǎo nà tiān, biānjí shuō: «Zhè zhèngshì wǒmen yào de — chéngshì de guāng, zài rén shēnshang.»',
        gloss: { 茶馆: ['cháguǎn', 'Teehaus'], 老板: ['lǎobǎn', 'Chef, Inhaber'], 演员: ['yǎnyuán', 'Schauspieler'], 编辑: ['biānjí', 'Redakteur'], 正是: ['zhèngshì', 'genau das'] },
        auswahl: [{ label: 'Weiter', ziel: 'e1' }],
      },
      s8: {
        szene: { emoji: '🍜', deko: '🌧️💡', ort: '面馆 · Abend', farbe1: '#b45309', farbe2: '#292524' },
        text: ['面馆', '的', '老板娘', '看', '你', '淋', '湿', '了', '，', '送', '你', '一', '碗', '热', '汤面', '。', '你', '拍', '下', '窗外', '的', '雨', '和', '店', '里', '温暖', '的', '灯光', '，', '意外', '拍', '出', '了', '全', '组', '最', '好', '的', '一', '张', '照片', '。'],
        pinyin: 'Miànguǎn de lǎobǎnniáng kàn nǐ lín shī le, sòng nǐ yì wǎn rè tāngmiàn. Nǐ pāi xià chuāngwài de yǔ hé diàn lǐ wēnnuǎn de dēngguāng, yìwài pāi chū le quán zǔ zuì hǎo de yì zhāng zhàopiàn.',
        gloss: { 老板娘: ['lǎobǎnniáng', 'Wirtin, Chefin'], 淋湿: ['lín shī', 'nass geregnet'], 汤面: ['tāngmiàn', 'Nudelsuppe'], 温暖: ['wēnnuǎn', 'warm, herzlich'], 意外: ['yìwài', 'unerwartet'] },
        auswahl: [
          { label: 'Daraus eine Serie machen: «Regennacht im Laden»', ziel: 'e1' },
          { label: 'Einfach so abgeben', ziel: 'e2' },
        ],
      },
      e1: {
        szene: { emoji: '🏆', deko: '📰', ort: '杂志社 · Titelseite', farbe1: '#ca8a04', farbe2: '#1c1917' },
        ende: true,
        xp: 40,
        bewertung: '🏆 Perfektes Ende',
        text: ['编辑', '非常', '满意', '，', '杂志', '用', '你', '的', '照片', '做', '了', '封面', '。', '你', '的', '上海', '故事', '才', '刚刚', '开始', '。'],
        pinyin: 'Biānjí fēicháng mǎnyì, zázhì yòng nǐ de zhàopiàn zuò le fēngmiàn. Nǐ de Shànghǎi gùshi cái gānggāng kāishǐ.',
        gloss: { 封面: ['fēngmiàn', 'Titelseite, Cover'], 刚刚: ['gānggāng', 'gerade erst'] },
      },
      e2: {
        szene: { emoji: '✅', deko: '📷', ort: '交稿 · geschafft', farbe1: '#15803d', farbe2: '#052e16' },
        ende: true,
        xp: 25,
        bewertung: '✅ Solides Ende',
        text: ['照片', '交', '上去', '了', '，', '编辑', '说', '「', '不错', '」', '。', '你', '知道', '，', '下', '次', '可以', '拍', '得', '更', '好', '。'],
        pinyin: 'Zhàopiàn jiāo shàngqù le, biānjí shuō «búcuò». Nǐ zhīdào, xià cì kěyǐ pāi de gèng hǎo.',
        gloss: { 交: ['jiāo', 'abgeben, einreichen'] },
      },
      e3: {
        szene: { emoji: '🌧️', deko: '🛫', ort: '截稿日 · verpasst', farbe1: '#475569', farbe2: '#0f172a' },
        ende: true,
        xp: 10,
        bewertung: '🌧️ Offenes Ende',
        text: ['截稿', '日', '到', '了', '，', '照片', '还', '不', '够', '。', '编辑', '给', '了', '你', '第二', '次', '机会', '——', '下', '个', '月', '去', '北京', '。'],
        pinyin: 'Jiégǎo rì dào le, zhàopiàn hái bú gòu. Biānjí gěi le nǐ dì-èr cì jīhuì — xià ge yuè qù Běijīng.',
        gloss: { 截稿: ['jiégǎo', 'Redaktionsschluss'], 机会: ['jīhuì', 'Chance, Gelegenheit'] },
      },
    },
  },
]
