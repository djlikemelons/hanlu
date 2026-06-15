// ============================================================
// STARTER-DECK – editierbare Vokabeldatei
// ============================================================
// Hier kannst du Karten direkt ergänzen oder ändern. Felder:
//   thema                – Themen-ID (siehe themen.js)
//   hsk_level            – 3–6 (Slang/Fachwörter sind als 5 eingestuft)
//   hanzi                – vereinfachte Zeichen
//   pinyin               – mit Tonzeichen
//   bedeutung            – Deutsch
//   beispielsatz         – Wort-Tokens (für Satzbauer & Lückentext)
//   beispiel_pinyin      – Pinyin des Beispielsatzes
//   beispiel_uebersetzung– deutsche Übersetzung des Satzes
//
// ERWEITERUNG: Automatische Kartengenerierung über die Anthropic-API –
// neue Karten könnten per API (https://docs.claude.com, Modell z. B.
// 'claude-sonnet-4-6') aus einem Thema generiert und über die
// Kartenverwaltung importiert werden. Einstiegspunkt: Themen.jsx.
// ============================================================

import { STARTER_DECK_EXTRA } from './starterDeckExtra.js'

const K = (thema, hsk_level, hanzi, pinyin, bedeutung, beispielsatz, beispiel_pinyin, beispiel_uebersetzung) => ({
  id: `${thema}-${hanzi}`,
  thema,
  hsk_level,
  hanzi,
  pinyin,
  bedeutung,
  beispielsatz,
  beispiel_pinyin,
  beispiel_uebersetzung,
})

// Grunddeck (Teil 1). Die Erweiterung (Teil 2) liegt in starterDeckExtra.js
// und wird am Ende angehängt – so bleibt die Datei übersichtlich.
const DECK_TEIL1 = [
  // ---------- HSK-Grundwortschatz (4 → 5) ----------
  K('hsk', 4, '经验', 'jīngyàn', 'Erfahrung', ['他', '在', '这', '方面', '有', '很多', '经验'], 'Tā zài zhè fāngmiàn yǒu hěn duō jīngyàn.', 'Er hat in diesem Bereich viel Erfahrung.'),
  K('hsk', 4, '解决', 'jiějué', 'lösen (Problem)', ['我们', '必须', '马上', '解决', '这个', '问题'], 'Wǒmen bìxū mǎshàng jiějué zhège wèntí.', 'Wir müssen dieses Problem sofort lösen.'),
  K('hsk', 4, '影响', 'yǐngxiǎng', 'Einfluss; beeinflussen', ['天气', '对', '我', '的', '心情', '有', '很大', '的', '影响'], 'Tiānqì duì wǒ de xīnqíng yǒu hěn dà de yǐngxiǎng.', 'Das Wetter hat großen Einfluss auf meine Stimmung.'),
  K('hsk', 4, '态度', 'tàidù', 'Einstellung, Haltung', ['他', '的', '态度', '突然', '变', '了'], 'Tā de tàidù tūrán biàn le.', 'Seine Haltung hat sich plötzlich geändert.'),
  K('hsk', 4, '坚持', 'jiānchí', 'durchhalten, beharren auf', ['只要', '坚持', '，', '你', '一定', '会', '成功'], 'Zhǐyào jiānchí, nǐ yídìng huì chénggōng.', 'Wenn du durchhältst, wirst du sicher Erfolg haben.'),
  K('hsk', 4, '增加', 'zēngjiā', 'erhöhen, zunehmen', ['公司', '今年', '增加', '了', '三十', '个', '员工'], 'Gōngsī jīnnián zēngjiā le sānshí ge yuángōng.', 'Die Firma hat dieses Jahr 30 Mitarbeiter dazubekommen.'),
  K('hsk', 4, '减少', 'jiǎnshǎo', 'verringern, reduzieren', ['我们', '应该', '减少', '塑料', '的', '使用'], 'Wǒmen yīnggāi jiǎnshǎo sùliào de shǐyòng.', 'Wir sollten den Gebrauch von Plastik verringern.'),
  K('hsk', 4, '改变', 'gǎibiàn', '(ver)ändern; Veränderung', ['这', '次', '旅行', '改变', '了', '我', '的', '想法'], 'Zhè cì lǚxíng gǎibiàn le wǒ de xiǎngfǎ.', 'Diese Reise hat meine Sichtweise verändert.'),
  K('hsk', 4, '发展', 'fāzhǎn', 'Entwicklung; sich entwickeln', ['这个', '城市', '发展', '得', '非常', '快'], 'Zhège chéngshì fāzhǎn de fēicháng kuài.', 'Diese Stadt entwickelt sich sehr schnell.'),
  K('hsk', 4, '适应', 'shìyìng', 'sich anpassen, sich gewöhnen an', ['我', '慢慢', '适应', '了', '这里', '的', '生活'], 'Wǒ mànmàn shìyìng le zhèlǐ de shēnghuó.', 'Ich habe mich langsam an das Leben hier gewöhnt.'),
  K('hsk', 5, '究竟', 'jiūjìng', 'eigentlich, denn nun (in Fragen)', ['你', '究竟', '想', '说', '什么'], 'Nǐ jiūjìng xiǎng shuō shénme?', 'Was willst du denn nun eigentlich sagen?'),
  K('hsk', 5, '显然', 'xiǎnrán', 'offensichtlich', ['他', '显然', '没有', '准备', '好'], 'Tā xiǎnrán méiyǒu zhǔnbèi hǎo.', 'Er ist offensichtlich nicht gut vorbereitet.'),

  // ---------- Fotografie & Video ----------
  K('foto', 4, '相机', 'xiàngjī', 'Kamera', ['我', '的', '新', '相机', '拍照', '效果', '很', '好'], 'Wǒ de xīn xiàngjī pāizhào xiàoguǒ hěn hǎo.', 'Meine neue Kamera macht sehr gute Fotos.'),
  K('foto', 5, '镜头', 'jìngtóu', 'Objektiv; Einstellung (Film)', ['这个', '镜头', '适合', '拍', '人像'], 'Zhège jìngtóu shìhé pāi rénxiàng.', 'Dieses Objektiv eignet sich für Porträts.'),
  K('foto', 5, '拍摄', 'pāishè', 'aufnehmen, drehen, fotografieren', ['我们', '明天', '在', '外滩', '拍摄', '视频'], 'Wǒmen míngtiān zài Wàitān pāishè shìpín.', 'Wir drehen morgen am Bund ein Video.'),
  K('foto', 5, '光线', 'guāngxiàn', 'Licht, Lichtverhältnisse', ['早上', '的', '光线', '特别', '柔和'], 'Zǎoshang de guāngxiàn tèbié róuhé.', 'Das Licht am Morgen ist besonders weich.'),
  K('foto', 4, '背景', 'bèijǐng', 'Hintergrund', ['这', '张', '照片', '的', '背景', '太', '乱', '了'], 'Zhè zhāng zhàopiàn de bèijǐng tài luàn le.', 'Der Hintergrund auf diesem Foto ist zu unruhig.'),
  K('foto', 5, '角度', 'jiǎodù', 'Winkel, Perspektive', ['换', '个', '角度', '再', '拍', '一', '张'], 'Huàn ge jiǎodù zài pāi yì zhāng.', 'Mach noch ein Foto aus einem anderen Winkel.'),
  K('foto', 5, '视频', 'shìpín', 'Video', ['这个', '视频', '我', '剪', '了', '三', '个', '小时'], 'Zhège shìpín wǒ jiǎn le sān ge xiǎoshí.', 'An diesem Video habe ich drei Stunden geschnitten.'),
  K('foto', 5, '剪辑', 'jiǎnjí', 'schneiden (Video); Schnitt', ['剪辑', '比', '拍摄', '花', '的', '时间', '更', '多'], 'Jiǎnjí bǐ pāishè huā de shíjiān gèng duō.', 'Der Schnitt kostet mehr Zeit als der Dreh.'),
  K('foto', 5, '曝光', 'bàoguāng', 'Belichtung', ['这', '张', '照片', '曝光', '不足'], 'Zhè zhāng zhàopiàn bàoguāng bùzú.', 'Dieses Foto ist unterbelichtet.'),
  K('foto', 5, '构图', 'gòutú', 'Bildkomposition', ['好', '的', '构图', '让', '照片', '更', '有', '感觉'], 'Hǎo de gòutú ràng zhàopiàn gèng yǒu gǎnjué.', 'Eine gute Komposition gibt dem Foto mehr Ausdruck.'),

  // ---------- Steuern & Global Trade ----------
  K('steuern', 5, '关税', 'guānshuì', 'Zoll (Abgabe)', ['这', '批', '货', '的', '关税', '是', '百分之十'], 'Zhè pī huò de guānshuì shì bǎifēnzhī shí.', 'Der Zoll auf diese Warenlieferung beträgt zehn Prozent.'),
  K('steuern', 5, '贸易', 'màoyì', 'Handel', ['两', '国', '的', '贸易', '关系', '越来越', '好'], 'Liǎng guó de màoyì guānxi yuèláiyuè hǎo.', 'Die Handelsbeziehungen der beiden Länder werden immer besser.'),
  K('steuern', 5, '出口', 'chūkǒu', 'Export; exportieren', ['这', '家', '公司', '主要', '出口', '机器'], 'Zhè jiā gōngsī zhǔyào chūkǒu jīqì.', 'Diese Firma exportiert hauptsächlich Maschinen.'),
  K('steuern', 5, '进口', 'jìnkǒu', 'Import; importieren', ['德国', '从', '中国', '进口', '很多', '产品'], 'Déguó cóng Zhōngguó jìnkǒu hěn duō chǎnpǐn.', 'Deutschland importiert viele Produkte aus China.'),
  K('steuern', 5, '海关', 'hǎiguān', 'Zoll (Behörde)', ['我们', '的', '货', '还', '在', '海关'], 'Wǒmen de huò hái zài hǎiguān.', 'Unsere Ware ist noch beim Zoll.'),
  K('steuern', 4, '发票', 'fāpiào', 'Rechnung, Quittung', ['请', '给', '我', '开', '一', '张', '发票'], 'Qǐng gěi wǒ kāi yì zhāng fāpiào.', 'Bitte stellen Sie mir eine Rechnung aus.'),
  K('steuern', 5, '税率', 'shuìlǜ', 'Steuersatz', ['不同', '产品', '的', '税率', '不', '一样'], 'Bùtóng chǎnpǐn de shuìlǜ bù yíyàng.', 'Verschiedene Produkte haben unterschiedliche Steuersätze.'),
  K('steuern', 5, '汇率', 'huìlǜ', 'Wechselkurs', ['最近', '欧元', '的', '汇率', '变化', '很', '大'], 'Zuìjìn Ōuyuán de huìlǜ biànhuà hěn dà.', 'Der Eurokurs schwankt in letzter Zeit stark.'),
  K('steuern', 5, '报关', 'bàoguān', 'Zollanmeldung machen', ['这些', '货物', '需要', '先', '报关'], 'Zhèxiē huòwù xūyào xiān bàoguān.', 'Diese Waren müssen zuerst beim Zoll angemeldet werden.'),
  K('steuern', 5, '供应链', 'gōngyìngliàn', 'Lieferkette', ['疫情', '影响', '了', '全球', '供应链'], 'Yìqíng yǐngxiǎng le quánqiú gōngyìngliàn.', 'Die Pandemie hat die globalen Lieferketten beeinträchtigt.'),

  // ---------- Business & Verhandlung ----------
  K('business', 4, '会议', 'huìyì', 'Meeting, Konferenz', ['明天', '的', '会议', '几', '点', '开始'], 'Míngtiān de huìyì jǐ diǎn kāishǐ?', 'Um wie viel Uhr beginnt das Meeting morgen?'),
  K('business', 5, '谈判', 'tánpàn', 'Verhandlung; verhandeln', ['这', '次', '谈判', '进行', '得', '很', '顺利'], 'Zhè cì tánpàn jìnxíng de hěn shùnlì.', 'Diese Verhandlung verlief sehr reibungslos.'),
  K('business', 4, '合作', 'hézuò', 'Zusammenarbeit; kooperieren', ['希望', '我们', '以后', '有', '更多', '合作'], 'Xīwàng wǒmen yǐhòu yǒu gèng duō hézuò.', 'Ich hoffe, wir arbeiten künftig noch mehr zusammen.'),
  K('business', 5, '客户', 'kèhù', 'Kunde, Klient', ['下午', '我', '要', '见', '一', '位', '重要', '的', '客户'], 'Xiàwǔ wǒ yào jiàn yí wèi zhòngyào de kèhù.', 'Heute Nachmittag treffe ich einen wichtigen Kunden.'),
  K('business', 5, '报价', 'bàojià', '(Preis-)Angebot', ['请', '把', '报价', '发', '到', '我', '的', '邮箱'], 'Qǐng bǎ bàojià fā dào wǒ de yóuxiāng.', 'Bitte schicken Sie das Angebot an meine E-Mail.'),
  K('business', 4, '合同', 'hétong', 'Vertrag', ['我们', '下', '周', '签', '合同'], 'Wǒmen xià zhōu qiān hétong.', 'Wir unterschreiben nächste Woche den Vertrag.'),
  K('business', 5, '名片', 'míngpiàn', 'Visitenkarte', ['这', '是', '我', '的', '名片', '，', '请', '多', '指教'], 'Zhè shì wǒ de míngpiàn, qǐng duō zhǐjiào.', 'Das ist meine Visitenkarte – ich freue mich auf die Zusammenarbeit.'),
  K('business', 4, '安排', 'ānpái', 'arrangieren, planen', ['我', '来', '安排', '下', '周', '的', '行程'], 'Wǒ lái ānpái xià zhōu de xíngchéng.', 'Ich übernehme die Planung der nächsten Woche.'),
  K('business', 4, '条件', 'tiáojiàn', 'Bedingung, Voraussetzung', ['这个', '条件', '我们', '可以', '接受'], 'Zhège tiáojiàn wǒmen kěyǐ jiēshòu.', 'Diese Bedingung können wir akzeptieren.'),
  K('business', 5, '敬酒', 'jìngjiǔ', 'einen Toast ausbringen (Etikette)', ['在', '中国', '，', '吃饭', '时', '敬酒', '很', '常见'], 'Zài Zhōngguó, chīfàn shí jìngjiǔ hěn chángjiàn.', 'In China ist es beim Essen üblich, einander zuzuprosten.'),

  // ---------- Essen & Restaurant ----------
  K('essen', 3, '菜单', 'càidān', 'Speisekarte', ['服务员', '，', '请', '给', '我们', '看', '一下', '菜单'], 'Fúwùyuán, qǐng gěi wǒmen kàn yíxià càidān.', 'Bedienung, bitte zeigen Sie uns die Speisekarte.'),
  K('essen', 4, '点菜', 'diǎncài', '(Essen) bestellen', ['你们', '准备', '好', '点菜', '了', '吗'], 'Nǐmen zhǔnbèi hǎo diǎncài le ma?', 'Seid ihr bereit zu bestellen?'),
  K('essen', 4, '味道', 'wèidào', 'Geschmack', ['这', '道', '菜', '的', '味道', '有点', '奇怪'], 'Zhè dào cài de wèidào yǒudiǎn qíguài.', 'Diese Speise schmeckt etwas seltsam.'),
  K('essen', 4, '推荐', 'tuījiàn', 'empfehlen', ['你', '有', '什么', '推荐', '的', '菜', '吗'], 'Nǐ yǒu shénme tuījiàn de cài ma?', 'Kannst du ein Gericht empfehlen?'),
  K('essen', 5, '结账', 'jiézhàng', 'die Rechnung begleichen, zahlen', ['服务员', '，', '我们', '要', '结账'], 'Fúwùyuán, wǒmen yào jiézhàng.', 'Bedienung, wir möchten zahlen.'),
  K('essen', 4, '打包', 'dǎbāo', '(Essensreste) einpacken lassen', ['吃', '不', '完', '可以', '打包', '带', '走'], 'Chī bù wán kěyǐ dǎbāo dài zǒu.', 'Was man nicht aufisst, kann man einpacken lassen.'),
  K('essen', 5, '特色菜', 'tèsècài', 'Spezialität (des Hauses)', ['这', '是', '我们', '饭店', '的', '特色菜'], 'Zhè shì wǒmen fàndiàn de tèsècài.', 'Das ist die Spezialität unseres Restaurants.'),
  K('essen', 5, '预订', 'yùdìng', 'reservieren, vorbestellen', ['我', '想', '预订', '明晚', '七', '点', '的', '位子'], 'Wǒ xiǎng yùdìng míngwǎn qī diǎn de wèizi.', 'Ich möchte für morgen Abend sieben Uhr einen Tisch reservieren.'),
  K('essen', 4, '辣', 'là', 'scharf', ['我', '不', '太', '能', '吃', '辣'], 'Wǒ bú tài néng chī là.', 'Ich vertrage scharfes Essen nicht so gut.'),
  K('essen', 5, '口味', 'kǒuwèi', 'Geschmack(srichtung), Vorliebe', ['四川', '菜', '很', '符合', '我', '的', '口味'], 'Sìchuān cài hěn fúhé wǒ de kǒuwèi.', 'Sichuan-Küche entspricht genau meinem Geschmack.'),

  // ---------- Reisen in China ----------
  K('reisen', 4, '签证', 'qiānzhèng', 'Visum', ['去', '中国', '之前', '要', '先', '办', '签证'], 'Qù Zhōngguó zhīqián yào xiān bàn qiānzhèng.', 'Vor der Reise nach China muss man ein Visum beantragen.'),
  K('reisen', 4, '航班', 'hángbān', 'Flug(verbindung)', ['我们', '的', '航班', '推迟', '了', '两', '个', '小时'], 'Wǒmen de hángbān tuīchí le liǎng ge xiǎoshí.', 'Unser Flug hat sich um zwei Stunden verspätet.'),
  K('reisen', 3, '行李', 'xíngli', 'Gepäck', ['我', '的', '行李', '超重', '了'], 'Wǒ de xíngli chāozhòng le.', 'Mein Gepäck hat Übergewicht.'),
  K('reisen', 5, '高铁', 'gāotiě', 'Hochgeschwindigkeitszug', ['坐', '高铁', '去', '上海', '只', '要', '四', '个', '小时'], 'Zuò gāotiě qù Shànghǎi zhǐ yào sì ge xiǎoshí.', 'Mit dem Schnellzug braucht man nach Shanghai nur vier Stunden.'),
  K('reisen', 5, '景点', 'jǐngdiǎn', 'Sehenswürdigkeit', ['这个', '景点', '周末', '人', '太', '多', '了'], 'Zhège jǐngdiǎn zhōumò rén tài duō le.', 'An dieser Sehenswürdigkeit sind am Wochenende zu viele Leute.'),
  K('reisen', 4, '导游', 'dǎoyóu', 'Reiseführer (Person)', ['导游', '给', '我们', '介绍', '了', '当地', '的', '历史'], 'Dǎoyóu gěi wǒmen jièshào le dāngdì de lìshǐ.', 'Der Reiseführer erklärte uns die Geschichte des Ortes.'),
  K('reisen', 4, '风景', 'fēngjǐng', 'Landschaft, Aussicht', ['桂林', '的', '风景', '美', '得', '像', '画', '一样'], 'Guìlín de fēngjǐng měi de xiàng huà yíyàng.', 'Die Landschaft von Guilin ist schön wie ein Gemälde.'),
  K('reisen', 5, '入住', 'rùzhù', 'einchecken (Hotel)', ['我们', '可以', '下午', '两', '点', '入住'], 'Wǒmen kěyǐ xiàwǔ liǎng diǎn rùzhù.', 'Wir können um 14 Uhr einchecken.'),
  K('reisen', 4, '订票', 'dìngpiào', 'Tickets buchen', ['节假日', '最好', '提前', '订票'], 'Jiéjiàrì zuìhǎo tíqián dìngpiào.', 'An Feiertagen bucht man Tickets am besten im Voraus.'),
  K('reisen', 4, '迷路', 'mílù', 'sich verlaufen', ['我们', '在', '老', '城区', '迷路', '了'], 'Wǒmen zài lǎo chéngqū mílù le.', 'Wir haben uns in der Altstadt verlaufen.'),

  // ---------- Alltag & Smalltalk (inkl. Slang) ----------
  K('alltag', 3, '聊天', 'liáotiān', 'plaudern, chatten', ['有', '空', '一起', '喝', '咖啡', '聊天', '吧'], 'Yǒu kòng yìqǐ hē kāfēi liáotiān ba.', 'Lass uns mal zusammen Kaffee trinken und plaudern, wenn du Zeit hast.'),
  K('alltag', 5, '靠谱', 'kàopǔ', 'zuverlässig, seriös (umgangssprachlich)', ['他', '这个', '人', '做', '事', '很', '靠谱'], 'Tā zhège rén zuò shì hěn kàopǔ.', 'Auf ihn ist bei der Arbeit echt Verlass.'),
  K('alltag', 4, '麻烦', 'máfan', 'Mühe machen; lästig; Umstände', ['麻烦', '你', '帮', '我', '看', '一下', '行李'], 'Máfan nǐ bāng wǒ kàn yíxià xíngli.', 'Wärst du so nett, kurz auf mein Gepäck aufzupassen?'),
  K('alltag', 4, '随便', 'suíbiàn', 'wie man möchte; egal, beliebig', ['随便', '坐', '，', '别', '客气'], 'Suíbiàn zuò, bié kèqi.', 'Setz dich, wohin du willst – keine Umstände.'),
  K('alltag', 3, '加油', 'jiāyóu', '„Gib alles!", viel Erfolg (wörtl. Öl nachgeben)', ['别', '放弃', '，', '加油'], 'Bié fàngqì, jiāyóu!', 'Gib nicht auf – du schaffst das!'),
  K('alltag', 5, '吐槽', 'tǔcáo', 'lästern, sich beschweren (Slang)', ['他', '总', '爱', '吐槽', '公司', '的', '食堂'], 'Tā zǒng ài tǔcáo gōngsī de shítáng.', 'Er lästert ständig über die Firmenkantine.'),
  K('alltag', 4, '打折', 'dǎzhé', 'Rabatt geben, reduziert sein', ['这', '双', '鞋', '正在', '打折'], 'Zhè shuāng xié zhèngzài dǎzhé.', 'Diese Schuhe sind gerade im Angebot.'),
  K('alltag', 4, '顺便', 'shùnbiàn', 'bei der Gelegenheit, nebenbei', ['你', '出去', '的话', '，', '顺便', '买', '点', '水果'], 'Nǐ chūqù dehuà, shùnbiàn mǎi diǎn shuǐguǒ.', 'Wenn du rausgehst, bring doch gleich etwas Obst mit.'),
  K('alltag', 4, '约', 'yuē', 'verabreden, ausmachen', ['我们', '约', '个', '时间', '见面', '吧'], 'Wǒmen yuē ge shíjiān jiànmiàn ba.', 'Lass uns einen Termin zum Treffen ausmachen.'),
  K('alltag', 4, '没事儿', 'méishìr', 'kein Problem, macht nichts', ['没事儿', '，', '这', '不', '是', '你', '的', '错'], 'Méishìr, zhè bú shì nǐ de cuò.', 'Macht nichts – das ist nicht deine Schuld.'),

  // ---------- Wirtschaft & Nachrichten ----------
  K('nachrichten', 4, '经济', 'jīngjì', 'Wirtschaft', ['今年', '的', '经济', '情况', '不', '太', '好'], 'Jīnnián de jīngjì qíngkuàng bú tài hǎo.', 'Die Wirtschaftslage ist dieses Jahr nicht besonders gut.'),
  K('nachrichten', 5, '增长', 'zēngzhǎng', 'Wachstum; wachsen', ['出口', '比', '去年', '增长', '了', '百分之五'], 'Chūkǒu bǐ qùnián zēngzhǎng le bǎifēnzhī wǔ.', 'Die Exporte sind gegenüber dem Vorjahr um fünf Prozent gewachsen.'),
  K('nachrichten', 5, '政策', 'zhèngcè', 'Politik (Maßnahmen), Richtlinie', ['政府', '公布', '了', '新', '的', '税收', '政策'], 'Zhèngfǔ gōngbù le xīn de shuìshōu zhèngcè.', 'Die Regierung hat eine neue Steuerpolitik verkündet.'),
  K('nachrichten', 4, '市场', 'shìchǎng', 'Markt', ['中国', '市场', '的', '竞争', '非常', '激烈'], 'Zhōngguó shìchǎng de jìngzhēng fēicháng jīliè.', 'Der Wettbewerb auf dem chinesischen Markt ist sehr hart.'),
  K('nachrichten', 5, '企业', 'qǐyè', 'Unternehmen', ['很多', '外国', '企业', '在', '上海', '设立', '了', '办公室'], 'Hěn duō wàiguó qǐyè zài Shànghǎi shèlì le bàngōngshì.', 'Viele ausländische Unternehmen haben in Shanghai Büros eröffnet.'),
  K('nachrichten', 5, '投资', 'tóuzī', 'Investition; investieren', ['他', '把', '钱', '投资', '到', '了', '房地产'], 'Tā bǎ qián tóuzī dào le fángdìchǎn.', 'Er hat sein Geld in Immobilien investiert.'),
  K('nachrichten', 5, '报道', 'bàodào', 'Bericht; berichten (Medien)', ['媒体', '报道', '了', '这', '件', '事'], 'Méitǐ bàodào le zhè jiàn shì.', 'Die Medien haben über diese Sache berichtet.'),
  K('nachrichten', 4, '记者', 'jìzhě', 'Journalist', ['记者', '采访', '了', '公司', '的', '经理'], 'Jìzhě cǎifǎng le gōngsī de jīnglǐ.', 'Der Journalist interviewte den Manager der Firma.'),
  K('nachrichten', 5, '危机', 'wēijī', 'Krise', ['金融', '危机', '影响', '了', '整个', '世界'], 'Jīnróng wēijī yǐngxiǎng le zhěnggè shìjiè.', 'Die Finanzkrise hat die ganze Welt getroffen.'),
  K('nachrichten', 5, '数据', 'shùjù', 'Daten, Zahlen', ['这些', '数据', '说明', '问题', '很', '严重'], 'Zhèxiē shùjù shuōmíng wèntí hěn yánzhòng.', 'Diese Daten zeigen, dass das Problem gravierend ist.'),

  // ---------- Wohnen, Umzug & Behörden ----------
  K('wohnen', 4, '房租', 'fángzū', 'Miete', ['这里', '的', '房租', '一', '个', '月', '多少', '钱'], 'Zhèlǐ de fángzū yí ge yuè duōshao qián?', 'Wie hoch ist hier die Monatsmiete?'),
  K('wohnen', 5, '押金', 'yājīn', 'Kaution', ['退', '房', '的', '时候', '会', '退', '押金'], 'Tuì fáng de shíhou huì tuì yājīn.', 'Beim Auszug bekommt man die Kaution zurück.'),
  K('wohnen', 4, '搬家', 'bānjiā', 'umziehen', ['下', '个', '月', '我们', '要', '搬家', '了'], 'Xià ge yuè wǒmen yào bānjiā le.', 'Nächsten Monat ziehen wir um.'),
  K('wohnen', 3, '邻居', 'línjū', 'Nachbar', ['我们', '的', '邻居', '对', '我们', '很', '友好'], 'Wǒmen de línjū duì wǒmen hěn yǒuhǎo.', 'Unsere Nachbarn sind sehr freundlich zu uns.'),
  K('wohnen', 5, '物业', 'wùyè', 'Hausverwaltung', ['电梯', '坏', '了', '，', '快', '给', '物业', '打', '电话'], 'Diàntī huài le, kuài gěi wùyè dǎ diànhuà.', 'Der Aufzug ist kaputt – ruf schnell die Hausverwaltung an.'),
  K('wohnen', 5, '登记', 'dēngjì', 'sich registrieren, anmelden', ['外国人', '到', '了', '要', '去', '派出所', '登记'], 'Wàiguórén dào le yào qù pàichūsuǒ dēngjì.', 'Ausländer müssen sich nach der Ankunft bei der Polizeiwache registrieren.'),
  K('wohnen', 4, '手续', 'shǒuxù', 'Formalitäten, Prozedur', ['办', '这些', '手续', '需要', '几', '天'], 'Bàn zhèxiē shǒuxù xūyào jǐ tiān.', 'Diese Formalitäten zu erledigen dauert einige Tage.'),
  K('wohnen', 5, '水电费', 'shuǐdiànfèi', 'Wasser- und Stromkosten', ['房租', '不', '包括', '水电费'], 'Fángzū bù bāokuò shuǐdiànfèi.', 'In der Miete sind Wasser und Strom nicht enthalten.'),
  K('wohnen', 4, '家具', 'jiājù', 'Möbel', ['这', '套', '公寓', '带', '家具', '吗'], 'Zhè tào gōngyù dài jiājù ma?', 'Ist diese Wohnung möbliert?'),
  K('wohnen', 4, '修理', 'xiūlǐ', 'reparieren', ['空调', '坏', '了', '，', '得', '找', '人', '修理'], 'Kōngtiáo huài le, děi zhǎo rén xiūlǐ.', 'Die Klimaanlage ist kaputt – wir müssen jemanden zum Reparieren holen.'),

  // ---------- Technik & Digitales ----------
  K('technik', 4, '软件', 'ruǎnjiàn', 'Software', ['这个', '软件', '可以', '免费', '下载'], 'Zhège ruǎnjiàn kěyǐ miǎnfèi xiàzài.', 'Diese Software kann man kostenlos herunterladen.'),
  K('technik', 4, '下载', 'xiàzài', 'herunterladen', ['我', '下载', '了', '一', '个', '学', '中文', '的', '应用'], 'Wǒ xiàzài le yí ge xué Zhōngwén de yìngyòng.', 'Ich habe eine App zum Chinesischlernen heruntergeladen.'),
  K('technik', 4, '充电', 'chōngdiàn', 'aufladen (Akku)', ['手机', '没', '电', '了', '，', '得', '充电'], 'Shǒujī méi diàn le, děi chōngdiàn.', 'Das Handy ist leer – ich muss es aufladen.'),
  K('technik', 4, '网络', 'wǎngluò', 'Netzwerk, Internet', ['酒店', '的', '网络', '有点', '慢'], 'Jiǔdiàn de wǎngluò yǒudiǎn màn.', 'Das Internet im Hotel ist etwas langsam.'),
  K('technik', 5, '人工智能', 'réngōng zhìnéng', 'Künstliche Intelligenz', ['人工智能', '正在', '改变', '我们', '的', '生活'], 'Réngōng zhìnéng zhèngzài gǎibiàn wǒmen de shēnghuó.', 'Künstliche Intelligenz verändert gerade unser Leben.'),
  K('technik', 5, '设备', 'shèbèi', 'Gerät, Ausrüstung', ['拍摄', '设备', '都', '准备', '好', '了'], 'Pāishè shèbèi dōu zhǔnbèi hǎo le.', 'Die Aufnahmegeräte sind alle bereit.'),
  K('technik', 5, '屏幕', 'píngmù', 'Bildschirm, Display', ['我', '的', '手机', '屏幕', '碎', '了'], 'Wǒ de shǒujī píngmù suì le.', 'Mein Handydisplay ist zersprungen.'),
  K('technik', 4, '密码', 'mìmǎ', 'Passwort', ['请问', '，', 'Wi-Fi', '的', '密码', '是', '多少'], 'Qǐngwèn, Wi-Fi de mìmǎ shì duōshao?', 'Entschuldigung, wie lautet das WLAN-Passwort?'),
  K('technik', 5, '升级', 'shēngjí', 'aktualisieren, upgraden', ['系统', '需要', '升级', '到', '最新', '版本'], 'Xìtǒng xūyào shēngjí dào zuìxīn bǎnběn.', 'Das System muss auf die neueste Version aktualisiert werden.'),
  K('technik', 5, '扫码', 'sǎomǎ', 'einen QR-Code scannen', ['在', '中国', '，', '付款', '一般', '都', '扫码'], 'Zài Zhōngguó, fùkuǎn yìbān dōu sǎomǎ.', 'In China bezahlt man üblicherweise per QR-Code.'),

  // ---------- Kultur, Feiertage & Chengyu ----------
  K('kultur', 4, '春节', 'Chūnjié', 'Frühlingsfest (chinesisches Neujahr)', ['春节', '是', '中国', '最', '重要', '的', '节日'], 'Chūnjié shì Zhōngguó zuì zhòngyào de jiérì.', 'Das Frühlingsfest ist Chinas wichtigstes Fest.'),
  K('kultur', 4, '传统', 'chuántǒng', 'Tradition; traditionell', ['包', '饺子', '是', '北方', '的', '传统'], 'Bāo jiǎozi shì běifāng de chuántǒng.', 'Jiaozi zu machen ist eine Tradition Nordchinas.'),
  K('kultur', 5, '风俗', 'fēngsú', 'Sitten und Bräuche', ['每', '个', '地方', '都', '有', '自己', '的', '风俗'], 'Měi ge dìfang dōu yǒu zìjǐ de fēngsú.', 'Jede Region hat ihre eigenen Bräuche.'),
  K('kultur', 4, '庆祝', 'qìngzhù', 'feiern', ['我们', '一起', '庆祝', '他', '的', '生日'], 'Wǒmen yìqǐ qìngzhù tā de shēngrì.', 'Wir feiern zusammen seinen Geburtstag.'),
  K('kultur', 5, '红包', 'hóngbāo', 'roter Umschlag (Geldgeschenk)', ['过年', '时', '孩子', '会', '收到', '红包'], 'Guònián shí háizi huì shōudào hóngbāo.', 'Zum Neujahrsfest bekommen Kinder rote Umschläge.'),
  K('kultur', 5, '中秋节', 'Zhōngqiūjié', 'Mondfest', ['中秋节', '大家', '一起', '吃', '月饼'], 'Zhōngqiūjié dàjiā yìqǐ chī yuèbǐng.', 'Zum Mondfest isst man gemeinsam Mondkuchen.'),
  K('kultur', 5, '京剧', 'jīngjù', 'Peking-Oper', ['我', '第一', '次', '看', '京剧', '，', '觉得', '很', '特别'], 'Wǒ dì-yī cì kàn jīngjù, juéde hěn tèbié.', 'Ich habe zum ersten Mal Peking-Oper gesehen und fand sie sehr besonders.'),
  K('kultur', 5, '入乡随俗', 'rù xiāng suí sú', 'Chengyu: andere Länder, andere Sitten (sich anpassen)', ['来', '到', '中国', '，', '就', '要', '入乡随俗'], 'Lái dào Zhōngguó, jiù yào rùxiāngsuísú.', 'Wer nach China kommt, sollte sich den Bräuchen anpassen.'),
  K('kultur', 4, '马马虎虎', 'mǎmǎhūhū', 'so lala; nachlässig, schludrig', ['他', '做', '作业', '总是', '马马虎虎'], 'Tā zuò zuòyè zǒngshì mǎmǎhūhū.', 'Er macht seine Hausaufgaben immer schludrig.'),
  K('kultur', 5, '一举两得', 'yì jǔ liǎng dé', 'Chengyu: zwei Fliegen mit einer Klappe', ['骑', '车', '上班', '省', '钱', '又', '锻炼', '，', '真是', '一举两得'], 'Qí chē shàngbān shěng qián yòu duànliàn, zhēnshi yìjǔliǎngdé.', 'Mit dem Rad zur Arbeit spart Geld und hält fit – zwei Fliegen mit einer Klappe.'),
]

// Gesamtes Starter-Deck (Teil 1 + Erweiterung) – ca. 230 Karten.
export const STARTER_DECK = [...DECK_TEIL1, ...STARTER_DECK_EXTRA]
