// ============================================================
// 阅读 LESEN – längere Fließtexte (≈300+ Zeichen)
// ============================================================
// Gedacht als „Monatslektüre": einmal im Monat (oder öfter) einen
// zusammenhängenden Text durcharbeiten, das Sachverständnis aufbauen
// und in den Fragen wiedergeben. Schwere Wörter stehen im `glossar`
// (Schlüssel = exakte Zeichenfolge, wie sie im Text vorkommt) und
// werden in der App automatisch antippbar → Pinyin + Bedeutung.
//
// Format:
//   id      – eindeutig
//   titel   – chinesischer Titel
//   titelDe – deutscher Titel
//   thema   – Emoji + kurzes Label (Thema ist bewusst frei wählbar)
//   niveau  – grobe HSK-Einordnung
//   text    – der Fließtext (≈300+ Zeichen, mit 。！？ als Satzenden)
//   glossar – { '词': ['pīnyīn', 'deutsche Bedeutung'], ... }
//   fragen  – Verständnisfragen [{ f, optionen, richtig (Index) }]
// Neue Texte einfach nach diesem Muster ergänzen.

export const LESETEXTE = [
  {
    id: 'lt-elektroauto',
    titel: '中国的电动汽车',
    titelDe: 'Chinas Elektroautos',
    thema: '🚗 Wirtschaft & Technik',
    niveau: 'HSK 4–5',
    text:
      '最近几年，电动汽车在中国发展得非常快。走在大城市的街道上，你会发现路上的绿色车牌越来越多，那就是电动汽车的标志。' +
      '十年前，很多人还觉得电动汽车又贵又不方便，因为充电站很少，而且电池跑不远。但是现在情况完全不同了。' +
      '政府不但鼓励企业研究新技术，而且在全国建了几百万个充电站。同时，电池的价格越来越便宜，性能也越来越好，一次充电可以跑五六百公里。' +
      '对很多年轻人来说，买一辆电动汽车已经成了很自然的选择。他们认为，电动汽车不仅省钱，还能保护环境，减少空气污染。' +
      '当然，也有人担心：如果大家都用电，那么电够用吗？旧电池又应该怎么处理呢？这些问题还需要时间来解决。不过专家普遍认为，未来的汽车市场一定属于电动汽车。',
    glossar: {
      电动汽车: ['diàndòng qìchē', 'Elektroauto'],
      街道: ['jiēdào', 'Straße'],
      车牌: ['chēpái', 'Nummernschild'],
      标志: ['biāozhì', 'Zeichen, Symbol'],
      充电站: ['chōngdiànzhàn', 'Ladestation'],
      电池: ['diànchí', 'Batterie, Akku'],
      情况: ['qíngkuàng', 'Situation, Lage'],
      政府: ['zhèngfǔ', 'Regierung'],
      鼓励: ['gǔlì', 'ermutigen, fördern'],
      企业: ['qǐyè', 'Unternehmen'],
      技术: ['jìshù', 'Technik, Technologie'],
      性能: ['xìngnéng', 'Leistung (eines Geräts)'],
      省钱: ['shěng qián', 'Geld sparen'],
      环境: ['huánjìng', 'Umwelt'],
      污染: ['wūrǎn', 'Verschmutzung'],
      处理: ['chǔlǐ', 'behandeln, entsorgen'],
      专家: ['zhuānjiā', 'Experte'],
      未来: ['wèilái', 'Zukunft'],
      市场: ['shìchǎng', 'Markt'],
      属于: ['shǔyú', 'gehören zu'],
    },
    fragen: [
      { f: '十年前，人们为什么觉得电动汽车不方便？', optionen: ['因为太贵，充电站少，电池跑不远', '因为没有颜色', '因为开起来太快', '因为政府不允许'], richtig: 0 },
      { f: '政府做了什么来帮助电动汽车发展？', optionen: ['降低了汽油价格', '建了很多充电站并鼓励企业研究技术', '禁止了普通汽车', '只在北京卖电动车'], richtig: 1 },
      { f: '年轻人为什么喜欢电动汽车？', optionen: ['因为可以跑得最快', '因为省钱又能保护环境', '因为不用学开车', '因为是免费的'], richtig: 1 },
      { f: '文章中提到的担心是什么？', optionen: ['电动车太安静', '电够不够用、旧电池怎么处理', '颜色太多', '充电站太大'], richtig: 1 },
      { f: '专家对电动汽车的未来怎么看？', optionen: ['没有未来', '只适合老人', '未来的市场属于电动汽车', '十年后会消失'], richtig: 2 },
    ],
  },
  {
    id: 'lt-zhang-kaffee',
    titel: '老张的咖啡馆',
    titelDe: 'Herrn Zhangs Café',
    thema: '☕ Alltag & Gesellschaft',
    niveau: 'HSK 4',
    text:
      '老张今年五十岁，以前在一家大公司工作了二十多年。去年，他突然决定辞职，在自己住的小区里开了一家咖啡馆。' +
      '很多朋友都不理解，觉得他放弃了稳定的工作，太冒险了。老张却笑着说：“人这一辈子，总得做一件自己真正喜欢的事。”' +
      '咖啡馆不大，只有十几个座位，但是布置得很温馨。墙上挂着老张自己拍的照片，桌子上放着新鲜的花。' +
      '每天早上，附近的老人会来喝一杯茶，聊聊天；下午，常常有学生在这里看书、写作业。老张记得每一位常客喜欢的口味，见到他们总是热情地打招呼。' +
      '虽然开店比上班还累，收入也没有以前高，但是老张觉得现在的生活更有意思。他说，最让他高兴的不是赚了多少钱，而是这家小店让邻居们有了一个聚在一起的地方。',
    glossar: {
      公司: ['gōngsī', 'Firma'],
      辞职: ['cízhí', 'kündigen, den Job aufgeben'],
      小区: ['xiǎoqū', 'Wohnviertel'],
      咖啡馆: ['kāfēiguǎn', 'Café'],
      理解: ['lǐjiě', 'verstehen'],
      放弃: ['fàngqì', 'aufgeben'],
      稳定: ['wěndìng', 'stabil'],
      冒险: ['màoxiǎn', 'ein Risiko eingehen'],
      一辈子: ['yíbèizi', 'ein ganzes Leben lang'],
      座位: ['zuòwèi', 'Sitzplatz'],
      布置: ['bùzhì', 'einrichten, dekorieren'],
      温馨: ['wēnxīn', 'gemütlich, warmherzig'],
      新鲜: ['xīnxiān', 'frisch'],
      附近: ['fùjìn', 'in der Nähe'],
      常客: ['chángkè', 'Stammgast'],
      口味: ['kǒuwèi', 'Geschmack(svorliebe)'],
      热情: ['rèqíng', 'herzlich, freundlich'],
      收入: ['shōurù', 'Einkommen'],
      赚: ['zhuàn', 'verdienen'],
      邻居: ['línjū', 'Nachbar'],
      聚: ['jù', 'sich versammeln'],
    },
    fragen: [
      { f: '老张以前做什么？', optionen: ['他是老师', '他在一家大公司工作', '他一直开咖啡馆', '他是医生'], richtig: 1 },
      { f: '朋友们为什么不理解他的决定？', optionen: ['因为他搬到了外国', '因为他放弃了稳定的工作去冒险', '因为他不会做咖啡', '因为咖啡馆太大'], richtig: 1 },
      { f: '下午常常有谁来咖啡馆？', optionen: ['老板的家人', '来跳舞的人', '看书写作业的学生', '送货的工人'], richtig: 2 },
      { f: '关于现在的生活，老张是怎么想的？', optionen: ['他后悔了', '虽然更累、钱更少，但更有意思', '他想回去上班', '他觉得很无聊'], richtig: 1 },
      { f: '最让老张高兴的是什么？', optionen: ['赚了很多钱', '照片卖得好', '小店让邻居们有了聚在一起的地方', '咖啡馆很有名'], richtig: 2 },
    ],
  },
  {
    id: 'lt-ki-alltag',
    titel: '人工智能走进生活',
    titelDe: 'Künstliche Intelligenz im Alltag',
    thema: '🤖 Technik & Gesellschaft',
    niveau: 'HSK 5',
    text:
      '几年前，人工智能听起来还像是科幻电影里的东西，离普通人的生活很远。可是今天，它已经悄悄地走进了我们的日常生活。' +
      '我们用手机里的地图找路，让它帮我们翻译外语，或者向智能音箱问明天的天气，这背后都有人工智能在工作。' +
      '在医院，医生可以借助这种技术更快地看出病人的问题；在工厂，机器人可以代替工人完成又重又危险的工作。' +
      '不少人因此感到担心：如果机器越来越聪明，那么很多人是不是会失去工作？也有人担心个人的信息会不会被滥用。' +
      '专家指出，技术本身没有好坏，关键在于人怎么使用它。与其害怕被机器取代，不如学习和它合作，把那些重复的工作交给机器，让自己去做更需要想象力和感情的事情。' +
      '换句话说，未来真正重要的，也许不是和机器比谁更快，而是学会做机器做不到的事。',
    glossar: {
      人工智能: ['réngōng zhìnéng', 'künstliche Intelligenz'],
      科幻: ['kēhuàn', 'Science-Fiction'],
      普通: ['pǔtōng', 'gewöhnlich'],
      悄悄: ['qiāoqiāo', 'leise, unbemerkt'],
      日常: ['rìcháng', 'alltäglich'],
      翻译: ['fānyì', 'übersetzen'],
      智能音箱: ['zhìnéng yīnxiāng', 'smarter Lautsprecher'],
      借助: ['jièzhù', 'mit Hilfe von'],
      代替: ['dàitì', 'ersetzen'],
      危险: ['wēixiǎn', 'gefährlich'],
      失去: ['shīqù', 'verlieren'],
      信息: ['xìnxī', 'Information'],
      滥用: ['lànyòng', 'missbrauchen'],
      指出: ['zhǐchū', 'darauf hinweisen'],
      关键: ['guānjiàn', 'der entscheidende Punkt'],
      取代: ['qǔdài', 'verdrängen, ersetzen'],
      合作: ['hézuò', 'zusammenarbeiten'],
      重复: ['chóngfù', 'sich wiederholend'],
      想象力: ['xiǎngxiànglì', 'Vorstellungskraft'],
      感情: ['gǎnqíng', 'Gefühl, Emotion'],
    },
    fragen: [
      { f: '文章说，人工智能现在和我们的关系怎么样？', optionen: ['还很遥远', '已经走进了日常生活', '只在电影里出现', '只有科学家用'], richtig: 1 },
      { f: '下面哪个不是文章提到的人工智能的用途？', optionen: ['帮我们找路和翻译', '帮医生看病', '在工厂代替工人', '帮我们做饭洗碗'], richtig: 3 },
      { f: '人们为什么感到担心？', optionen: ['机器太贵', '怕失去工作、个人信息被滥用', '机器太慢', '没有人会用'], richtig: 1 },
      { f: '专家认为技术的好坏取决于什么？', optionen: ['机器的价格', '人怎么使用它', '机器的颜色', '政府的态度'], richtig: 1 },
      { f: '作者建议人们怎么面对人工智能？', optionen: ['完全不用它', '和它比谁更快', '学习和它合作，去做机器做不到的事', '把所有工作都交给它'], richtig: 2 },
    ],
  },
  {
    id: 'lt-dorf-internet',
    titel: '网络改变了山村',
    titelDe: 'Das Internet verändert ein Bergdorf',
    thema: '🏔️ Wandel & Land',
    niveau: 'HSK 5',
    text:
      '小李出生在中国西南的一个山村。那里风景很美，但是因为交通不方便，村民们种的水果常常卖不出去，只能眼看着烂在地里，生活一直很困难。' +
      '大学毕业以后，小李没有像别人一样留在大城市，而是决定回到家乡。他相信，互联网也许能给村子带来新的机会。' +
      '一开始，他用手机拍下村里美丽的山水和新鲜的水果，放到网上。慢慢地，越来越多的人开始关注这个安静的小村子。' +
      '后来，他教村民们怎么在网上开店，把水果直接卖给全国各地的顾客。没有了中间商，价格更合理，村民的收入也提高了不少。' +
      '几年过去，村子的变化让人吃惊：破旧的房子重新修好了，年轻人也愿意回来工作了。小李常说，真正改变山村的不是网络本身，而是村民们重新找回的信心和希望。',
    glossar: {
      山村: ['shāncūn', 'Bergdorf'],
      风景: ['fēngjǐng', 'Landschaft'],
      交通: ['jiāotōng', 'Verkehr'],
      村民: ['cūnmín', 'Dorfbewohner'],
      烂: ['làn', 'verfaulen'],
      困难: ['kùnnán', 'schwierig; Schwierigkeit'],
      毕业: ['bìyè', 'das Studium abschließen'],
      家乡: ['jiāxiāng', 'Heimat(ort)'],
      互联网: ['hùliánwǎng', 'Internet'],
      机会: ['jīhuì', 'Gelegenheit, Chance'],
      关注: ['guānzhù', 'Aufmerksamkeit schenken'],
      顾客: ['gùkè', 'Kunde'],
      中间商: ['zhōngjiānshāng', 'Zwischenhändler'],
      合理: ['hélǐ', 'angemessen, vernünftig'],
      提高: ['tígāo', 'erhöhen, verbessern'],
      变化: ['biànhuà', 'Veränderung'],
      吃惊: ['chījīng', 'erstaunt sein'],
      破旧: ['pòjiù', 'alt und kaputt'],
      信心: ['xìnxīn', 'Zuversicht, Selbstvertrauen'],
      希望: ['xīwàng', 'Hoffnung'],
    },
    fragen: [
      { f: '为什么村民种的水果常常卖不出去？', optionen: ['因为水果不好吃', '因为交通不方便', '因为没有人种水果', '因为价格太低'], richtig: 1 },
      { f: '大学毕业后，小李做了什么决定？', optionen: ['留在大城市工作', '出国留学', '回到家乡', '开一家工厂'], richtig: 2 },
      { f: '小李是怎么帮助村子的？', optionen: ['修了一条新路', '教村民在网上开店卖水果', '请明星来旅游', '给每家发钱'], richtig: 1 },
      { f: '没有了中间商以后，发生了什么？', optionen: ['水果烂得更多了', '价格更合理，村民收入提高', '没有人买水果了', '村子更穷了'], richtig: 1 },
      { f: '小李认为真正改变山村的是什么？', optionen: ['网络本身', '城里来的游客', '村民重新找回的信心和希望', '政府的命令'], richtig: 2 },
    ],
  },
]
