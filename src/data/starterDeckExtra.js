// ============================================================
// STARTER-DECK · ERWEITERUNG (Teil 2)
// ============================================================
// Zweiter Schwung Karten – wird in starterDeck.js an STARTER_DECK
// angehängt. Gleiches Format wie dort (Tokens für Satzbauer & Lückentext).
// Einfach unten weitere K(...)-Zeilen ergänzen.
// ============================================================

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

export const STARTER_DECK_EXTRA = [
  // ---------- HSK-Grundwortschatz ----------
  K('hsk', 4, '估计', 'gūjì', 'schätzen, vermuten', ['我', '估计', '他', '今天', '不', '会', '来', '了'], 'Wǒ gūjì tā jīntiān bú huì lái le.', 'Ich schätze, er kommt heute nicht mehr.'),
  K('hsk', 4, '推迟', 'tuīchí', 'verschieben, aufschieben', ['会议', '推迟', '到', '下午', '三', '点'], 'Huìyì tuīchí dào xiàwǔ sān diǎn.', 'Das Meeting wurde auf 15 Uhr verschoben.'),
  K('hsk', 4, '总结', 'zǒngjié', 'zusammenfassen; Fazit', ['请', '你', '总结', '一下', '今天', '的', '内容'], 'Qǐng nǐ zǒngjié yíxià jīntiān de nèiróng.', 'Fasse bitte den heutigen Inhalt zusammen.'),
  K('hsk', 4, '区别', 'qūbié', 'Unterschied', ['这', '两', '个', '词', '的', '区别', '在', '哪里'], 'Zhè liǎng ge cí de qūbié zài nǎlǐ?', 'Worin liegt der Unterschied dieser beiden Wörter?'),
  K('hsk', 5, '重视', 'zhòngshì', 'Wert legen auf, schätzen', ['公司', '很', '重视', '员工', '的', '意见'], 'Gōngsī hěn zhòngshì yuángōng de yìjiàn.', 'Die Firma legt großen Wert auf die Meinung der Mitarbeiter.'),
  K('hsk', 5, '实际', 'shíjì', 'tatsächlich, real', ['实际', '情况', '比', '想象', '的', '复杂'], 'Shíjì qíngkuàng bǐ xiǎngxiàng de fùzá.', 'Die tatsächliche Lage ist komplexer als gedacht.'),
  K('hsk', 5, '难道', 'nándào', 'etwa? (rhetorische Frage)', ['难道', '你', '忘', '了', '今天', '的', '约会'], 'Nándào nǐ wàng le jīntiān de yuēhuì?', 'Hast du etwa unser Treffen heute vergessen?'),
  K('hsk', 4, '平时', 'píngshí', 'normalerweise, sonst', ['我', '平时', '六', '点', '起床'], 'Wǒ píngshí liù diǎn qǐchuáng.', 'Normalerweise stehe ich um sechs auf.'),
  K('hsk', 5, '尽管', 'jǐnguǎn', 'obwohl', ['尽管', '下', '着', '雨', '，', '他', '还是', '去', '了'], 'Jǐnguǎn xià zhe yǔ, tā háishi qù le.', 'Obwohl es regnete, ging er trotzdem.'),
  K('hsk', 4, '例如', 'lìrú', 'zum Beispiel', ['我', '喜欢', '运动', '，', '例如', '游泳', '和', '跑步'], 'Wǒ xǐhuan yùndòng, lìrú yóuyǒng hé pǎobù.', 'Ich mag Sport, zum Beispiel Schwimmen und Laufen.'),
  K('hsk', 5, '占', 'zhàn', 'einnehmen, ausmachen (Anteil)', ['这', '部分', '占', '总数', '的', '一半'], 'Zhè bùfen zhàn zǒngshù de yíbàn.', 'Dieser Teil macht die Hälfte des Gesamten aus.'),

  // ---------- Fotografie & Video ----------
  K('foto', 5, '焦距', 'jiāojù', 'Brennweite', ['长', '焦距', '适合', '拍', '远处', '的', '东西'], 'Cháng jiāojù shìhé pāi yuǎnchù de dōngxi.', 'Eine lange Brennweite eignet sich für entfernte Motive.'),
  K('foto', 5, '三脚架', 'sānjiǎojià', 'Stativ', ['拍', '夜景', '最好', '用', '三脚架'], 'Pāi yèjǐng zuìhǎo yòng sānjiǎojià.', 'Für Nachtaufnahmen nutzt man am besten ein Stativ.'),
  K('foto', 5, '后期', 'hòuqī', 'Postproduktion, Nachbearbeitung', ['这', '张', '照片', '我', '做', '了', '一些', '后期'], 'Zhè zhāng zhàopiàn wǒ zuò le yìxiē hòuqī.', 'Dieses Foto habe ich etwas nachbearbeitet.'),
  K('foto', 5, '像素', 'xiàngsù', 'Pixel', ['这', '台', '相机', '有', '四千万', '像素'], 'Zhè tái xiàngjī yǒu sìqiānwàn xiàngsù.', 'Diese Kamera hat 40 Megapixel.'),
  K('foto', 5, '对焦', 'duìjiāo', 'fokussieren, scharfstellen', ['拍照', '前', '要', '先', '对焦'], 'Pāizhào qián yào xiān duìjiāo.', 'Vor dem Foto muss man scharfstellen.'),
  K('foto', 4, '色彩', 'sècǎi', 'Farbe, Kolorit', ['这', '组', '照片', '的', '色彩', '很', '丰富'], 'Zhè zǔ zhàopiàn de sècǎi hěn fēngfù.', 'Diese Bildserie ist sehr farbenreich.'),
  K('foto', 4, '主题', 'zhǔtí', 'Thema, Motiv', ['这', '次', '展览', '的', '主题', '是', '城市', '生活'], 'Zhè cì zhǎnlǎn de zhǔtí shì chéngshì shēnghuó.', 'Das Thema dieser Ausstellung ist das Stadtleben.'),
  K('foto', 5, '抓拍', 'zhuāpāi', 'einen Schnappschuss machen', ['我', '喜欢', '抓拍', '人们', '自然', '的', '表情'], 'Wǒ xǐhuan zhuāpāi rénmen zìrán de biǎoqíng.', 'Ich fange gern natürliche Gesichtsausdrücke ein.'),
  K('foto', 4, '画面', 'huàmiàn', 'Bild(ausschnitt), Szene', ['这个', '画面', '让', '我', '很', '感动'], 'Zhège huàmiàn ràng wǒ hěn gǎndòng.', 'Dieses Bild hat mich sehr berührt.'),
  K('foto', 5, '闪光灯', 'shǎnguāngdēng', 'Blitz(licht)', ['在', '博物馆', '里', '不能', '用', '闪光灯'], 'Zài bówùguǎn lǐ bù néng yòng shǎnguāngdēng.', 'Im Museum darf man nicht blitzen.'),
  K('foto', 5, '修图', 'xiūtú', 'Bilder retuschieren/bearbeiten', ['她', '花', '了', '一', '晚上', '修图'], 'Tā huā le yì wǎnshang xiūtú.', 'Sie verbrachte einen ganzen Abend mit Bildbearbeitung.'),

  // ---------- Steuern & Global Trade ----------
  K('steuern', 5, '报税', 'bàoshuì', 'die Steuererklärung machen', ['每', '年', '三', '月', '我', '都', '要', '报税'], 'Měi nián sān yuè wǒ dōu yào bàoshuì.', 'Jeden März muss ich meine Steuererklärung machen.'),
  K('steuern', 5, '增值税', 'zēngzhíshuì', 'Mehrwertsteuer', ['德国', '的', '增值税', '是', '百分之十九'], 'Déguó de zēngzhíshuì shì bǎifēnzhī shíjiǔ.', 'Die Mehrwertsteuer in Deutschland beträgt 19 %.'),
  K('steuern', 5, '成本', 'chéngběn', 'Kosten', ['运输', '成本', '最近', '上涨', '了'], 'Yùnshū chéngběn zuìjìn shàngzhǎng le.', 'Die Transportkosten sind kürzlich gestiegen.'),
  K('steuern', 5, '利润', 'lìrùn', 'Gewinn, Profit', ['今年', '的', '利润', '比', '去年', '高'], 'Jīnnián de lìrùn bǐ qùnián gāo.', 'Der Gewinn ist dieses Jahr höher als letztes Jahr.'),
  K('steuern', 5, '协议', 'xiéyì', 'Abkommen, Vereinbarung', ['两', '家', '公司', '签', '了', '合作', '协议'], 'Liǎng jiā gōngsī qiān le hézuò xiéyì.', 'Die beiden Firmen unterzeichneten ein Kooperationsabkommen.'),
  K('steuern', 4, '货物', 'huòwù', 'Ware, Fracht', ['这', '批', '货物', '下', '周', '到', '港'], 'Zhè pī huòwù xià zhōu dào gǎng.', 'Diese Warenlieferung erreicht nächste Woche den Hafen.'),
  K('steuern', 5, '退税', 'tuìshuì', 'Steuerrückerstattung', ['外国', '游客', '购物', '可以', '退税'], 'Wàiguó yóukè gòuwù kěyǐ tuìshuì.', 'Ausländische Touristen können sich die Steuer erstatten lassen.'),
  K('steuern', 5, '清关', 'qīngguān', 'Zollabfertigung', ['货物', '正在', '清关'], 'Huòwù zhèngzài qīngguān.', 'Die Ware wird gerade verzollt.'),
  K('steuern', 5, '批发', 'pīfā', 'Großhandel', ['这', '家', '店', '做', '批发', '生意'], 'Zhè jiā diàn zuò pīfā shēngyi.', 'Dieser Laden betreibt Großhandel.'),
  K('steuern', 5, '零售', 'língshòu', 'Einzelhandel', ['零售', '价', '比', '批发', '价', '高', '很多'], 'Língshòu jià bǐ pīfā jià gāo hěn duō.', 'Der Einzelhandelspreis ist viel höher als der Großhandelspreis.'),
  K('steuern', 5, '申报', 'shēnbào', 'deklarieren, anmelden', ['超过', '规定', '金额', '必须', '申报'], 'Chāoguò guīdìng jīn’é bìxū shēnbào.', 'Über dem Freibetrag muss man deklarieren.'),

  // ---------- Business & Verhandlung ----------
  K('business', 4, '项目', 'xiàngmù', 'Projekt', ['这个', '项目', '下', '个', '月', '开始'], 'Zhège xiàngmù xià ge yuè kāishǐ.', 'Dieses Projekt beginnt nächsten Monat.'),
  K('business', 5, '预算', 'yùsuàn', 'Budget', ['我们', '的', '预算', '有限'], 'Wǒmen de yùsuàn yǒuxiàn.', 'Unser Budget ist begrenzt.'),
  K('business', 5, '签订', 'qiāndìng', 'abschließen (Vertrag)', ['双方', '签订', '了', '三', '年', '的', '合同'], 'Shuāngfāng qiāndìng le sān nián de hétong.', 'Beide Seiten schlossen einen Dreijahresvertrag.'),
  K('business', 5, '让步', 'ràngbù', 'nachgeben, Zugeständnis', ['在', '价格', '上', '我们', '可以', '做', '一点', '让步'], 'Zài jiàgé shàng wǒmen kěyǐ zuò yìdiǎn ràngbù.', 'Beim Preis können wir ein wenig entgegenkommen.'),
  K('business', 5, '达成', 'dáchéng', 'erreichen (Einigung)', ['双方', '达成', '了', '协议'], 'Shuāngfāng dáchéng le xiéyì.', 'Beide Seiten erzielten eine Einigung.'),
  K('business', 4, '团队', 'tuánduì', 'Team', ['我们', '的', '团队', '合作', '得', '很', '好'], 'Wǒmen de tuánduì hézuò de hěn hǎo.', 'Unser Team arbeitet sehr gut zusammen.'),
  K('business', 4, '负责', 'fùzé', 'verantwortlich sein', ['这个', '项目', '由', '我', '负责'], 'Zhège xiàngmù yóu wǒ fùzé.', 'Für dieses Projekt bin ich verantwortlich.'),
  K('business', 5, '汇报', 'huìbào', 'Bericht erstatten', ['我', '每', '周', '向', '经理', '汇报', '工作'], 'Wǒ měi zhōu xiàng jīnglǐ huìbào gōngzuò.', 'Ich berichte dem Manager wöchentlich über meine Arbeit.'),
  K('business', 4, '出差', 'chūchāi', 'eine Geschäftsreise machen', ['下', '周', '我', '要', '去', '上海', '出差'], 'Xià zhōu wǒ yào qù Shànghǎi chūchāi.', 'Nächste Woche bin ich geschäftlich in Shanghai.'),
  K('business', 5, '应酬', 'yìngchou', 'geschäftliches Beisammensein', ['晚上', '经常', '有', '应酬'], 'Wǎnshang jīngcháng yǒu yìngchou.', 'Abends gibt es oft geschäftliche Verpflichtungen.'),
  K('business', 4, '印象', 'yìnxiàng', 'Eindruck', ['他', '给', '客户', '留下', '了', '好', '印象'], 'Tā gěi kèhù liúxià le hǎo yìnxiàng.', 'Er hinterließ beim Kunden einen guten Eindruck.'),

  // ---------- Essen & Restaurant ----------
  K('essen', 5, '食材', 'shícái', 'Zutaten, Lebensmittel', ['这', '家', '店', '的', '食材', '很', '新鲜'], 'Zhè jiā diàn de shícái hěn xīnxiān.', 'Die Zutaten dieses Lokals sind sehr frisch.'),
  K('essen', 5, '清淡', 'qīngdàn', 'leicht, mild (Geschmack)', ['我', '喜欢', '清淡', '一点', '的', '菜'], 'Wǒ xǐhuan qīngdàn yìdiǎn de cài.', 'Ich mag eher leichte Gerichte.'),
  K('essen', 5, '油腻', 'yóunì', 'fettig', ['这个', '菜', '太', '油腻', '了'], 'Zhège cài tài yóunì le.', 'Dieses Gericht ist zu fettig.'),
  K('essen', 4, '份', 'fèn', 'Portion (Zähleinheit)', ['请', '来', '两', '份', '米饭'], 'Qǐng lái liǎng fèn mǐfàn.', 'Bitte zwei Portionen Reis.'),
  K('essen', 4, '小吃', 'xiǎochī', 'Snack, Imbiss', ['这', '条', '街', '有', '很多', '有名', '的', '小吃'], 'Zhè tiáo jiē yǒu hěn duō yǒumíng de xiǎochī.', 'In dieser Straße gibt es viele berühmte Snacks.'),
  K('essen', 5, '素食', 'sùshí', 'vegetarisches Essen', ['你们', '有', '素食', '吗'], 'Nǐmen yǒu sùshí ma?', 'Haben Sie vegetarische Gerichte?'),
  K('essen', 4, '干杯', 'gānbēi', 'Prost!, ex!', ['来', '，', '我们', '干杯'], 'Lái, wǒmen gānbēi!', 'Komm, lass uns anstoßen!'),
  K('essen', 5, '凉菜', 'liángcài', 'kalte Vorspeise', ['先', '点', '几', '个', '凉菜', '吧'], 'Xiān diǎn jǐ ge liángcài ba.', 'Lass uns erst ein paar kalte Vorspeisen bestellen.'),
  K('essen', 4, '服务', 'fúwù', 'Service, Dienstleistung', ['这', '家', '餐厅', '的', '服务', '很', '周到'], 'Zhè jiā cāntīng de fúwù hěn zhōudào.', 'Der Service dieses Restaurants ist sehr aufmerksam.'),
  K('essen', 5, '食欲', 'shíyù', 'Appetit', ['天气', '太', '热', '，', '我', '没', '什么', '食欲'], 'Tiānqì tài rè, wǒ méi shénme shíyù.', 'Bei der Hitze habe ich kaum Appetit.'),
  K('essen', 4, '外卖', 'wàimài', 'Essenslieferung, Takeaway', ['今天', '太', '累', '了', '，', '我们', '叫', '外卖', '吧'], 'Jīntiān tài lèi le, wǒmen jiào wàimài ba.', 'Heute bin ich zu müde, bestellen wir was.'),

  // ---------- Reisen in China ----------
  K('reisen', 4, '行程', 'xíngchéng', 'Reiseverlauf, Route', ['这', '次', '旅行', '的', '行程', '很', '紧'], 'Zhè cì lǚxíng de xíngchéng hěn jǐn.', 'Der Reiseplan ist diesmal sehr eng.'),
  K('reisen', 5, '民宿', 'mínsù', 'Gästehaus, B&B', ['我们', '订', '了', '一', '家', '有', '特色', '的', '民宿'], 'Wǒmen dìng le yì jiā yǒu tèsè de mínsù.', 'Wir haben ein besonderes Gästehaus gebucht.'),
  K('reisen', 5, '退房', 'tuìfáng', 'auschecken (Hotel)', ['我们', '明天', '中午', '退房'], 'Wǒmen míngtiān zhōngwǔ tuìfáng.', 'Wir checken morgen Mittag aus.'),
  K('reisen', 4, '当地', 'dāngdì', 'lokal, vor Ort', ['我', '想', '尝尝', '当地', '的', '特色菜'], 'Wǒ xiǎng chángchang dāngdì de tèsècài.', 'Ich möchte die lokalen Spezialitäten probieren.'),
  K('reisen', 4, '路线', 'lùxiàn', 'Route, Strecke', ['这', '条', '路线', '风景', '很', '美'], 'Zhè tiáo lùxiàn fēngjǐng hěn měi.', 'Diese Route ist landschaftlich sehr schön.'),
  K('reisen', 4, '门票', 'ménpiào', 'Eintrittskarte', ['这个', '景点', '的', '门票', '多少', '钱'], 'Zhège jǐngdiǎn de ménpiào duōshao qián?', 'Was kostet der Eintritt zu dieser Sehenswürdigkeit?'),
  K('reisen', 3, '地铁', 'dìtiě', 'U-Bahn', ['坐', '地铁', '去', '市中心', '很', '方便'], 'Zuò dìtiě qù shìzhōngxīn hěn fāngbiàn.', 'Mit der U-Bahn ist es bequem ins Zentrum.'),
  K('reisen', 4, '堵车', 'dǔchē', 'Stau', ['上班', '时间', '经常', '堵车'], 'Shàngbān shíjiān jīngcháng dǔchē.', 'Zur Rushhour gibt es oft Stau.'),
  K('reisen', 3, '出发', 'chūfā', 'aufbrechen, losfahren', ['我们', '明天', '早上', '六', '点', '出发'], 'Wǒmen míngtiān zǎoshang liù diǎn chūfā.', 'Wir brechen morgen um sechs Uhr auf.'),
  K('reisen', 5, '纪念品', 'jìniànpǐn', 'Souvenir', ['我', '给', '朋友', '买', '了', '一些', '纪念品'], 'Wǒ gěi péngyou mǎi le yìxiē jìniànpǐn.', 'Ich habe ein paar Souvenirs für Freunde gekauft.'),
  K('reisen', 5, '拥挤', 'yōngjǐ', 'überfüllt, gedrängt', ['假期', '的', '火车站', '非常', '拥挤'], 'Jiàqī de huǒchēzhàn fēicháng yōngjǐ.', 'In den Ferien ist der Bahnhof sehr voll.'),

  // ---------- Alltag & Smalltalk ----------
  K('alltag', 3, '无聊', 'wúliáo', 'langweilig', ['今天', '没', '事', '做', '，', '有点', '无聊'], 'Jīntiān méi shì zuò, yǒudiǎn wúliáo.', 'Heute gibt’s nichts zu tun, ein bisschen langweilig.'),
  K('alltag', 4, '排队', 'páiduì', 'Schlange stehen', ['买', '票', '要', '排', '很', '长', '的', '队'], 'Mǎi piào yào pái hěn cháng de duì.', 'Für Tickets muss man lange anstehen.'),
  K('alltag', 5, '划算', 'huásuàn', 'lohnenswert, günstig', ['这个', '套餐', '很', '划算'], 'Zhège tàocān hěn huásuàn.', 'Dieses Menü ist echt günstig.'),
  K('alltag', 4, '熟悉', 'shúxī', 'vertraut, gut kennen', ['我', '对', '这个', '城市', '很', '熟悉'], 'Wǒ duì zhège chéngshì hěn shúxī.', 'Ich kenne diese Stadt gut.'),
  K('alltag', 5, '凑合', 'còuhe', 'sich behelfen, geht so', ['这', '顿', '饭', '凑合', '着', '吃', '吧'], 'Zhè dùn fàn còuhe zhe chī ba.', 'Lass uns mit diesem Essen vorliebnehmen.'),
  K('alltag', 5, '八卦', 'bāguà', 'Klatsch; tratschen (Slang)', ['同事们', '最', '爱', '八卦'], 'Tóngshìmen zuì ài bāguà.', 'Die Kollegen tratschen am liebsten.'),
  K('alltag', 4, '改天', 'gǎitiān', 'ein andermal', ['今天', '没', '空', '，', '改天', '再', '聊'], 'Jīntiān méi kòng, gǎitiān zài liáo.', 'Heute keine Zeit, reden wir ein andermal.'),
  K('alltag', 4, '来得及', 'láidejí', 'es noch rechtzeitig schaffen', ['现在', '出发', '还', '来得及'], 'Xiànzài chūfā hái láidejí.', 'Wenn wir jetzt losgehen, schaffen wir es noch.'),
  K('alltag', 5, '嫌', 'xián', 'etw. unangenehm finden, meckern', ['他', '总', '嫌', '房间', '太', '小'], 'Tā zǒng xián fángjiān tài xiǎo.', 'Er beschwert sich ständig, das Zimmer sei zu klein.'),
  K('alltag', 4, '顺利', 'shùnlì', 'reibungslos, glatt', ['祝', '你', '一切', '顺利'], 'Zhù nǐ yíqiè shùnlì!', 'Ich wünsche dir, dass alles glattläuft!'),
  K('alltag', 5, '凑巧', 'còuqiǎo', 'zufällig, wie es der Zufall will', ['真', '凑巧', '，', '我们', '又', '见面', '了'], 'Zhēn còuqiǎo, wǒmen yòu jiànmiàn le.', 'So ein Zufall, wir treffen uns wieder.'),

  // ---------- Wirtschaft & Nachrichten ----------
  K('nachrichten', 5, '通货膨胀', 'tōnghuò péngzhàng', 'Inflation', ['通货膨胀', '让', '物价', '上涨'], 'Tōnghuò péngzhàng ràng wùjià shàngzhǎng.', 'Die Inflation lässt die Preise steigen.'),
  K('nachrichten', 5, '失业', 'shīyè', 'Arbeitslosigkeit; arbeitslos', ['经济', '不', '好', '，', '失业率', '上升', '了'], 'Jīngjì bù hǎo, shīyèlǜ shàngshēng le.', 'Die Wirtschaft schwächelt, die Arbeitslosenquote stieg.'),
  K('nachrichten', 5, '股票', 'gǔpiào', 'Aktie', ['他', '把', '钱', '都', '投', '到', '股票', '上', '了'], 'Tā bǎ qián dōu tóu dào gǔpiào shàng le.', 'Er hat sein ganzes Geld in Aktien gesteckt.'),
  K('nachrichten', 5, '趋势', 'qūshì', 'Trend, Tendenz', ['专家', '分析', '了', '市场', '的', '发展', '趋势'], 'Zhuānjiā fēnxī le shìchǎng de fāzhǎn qūshì.', 'Experten analysierten den Entwicklungstrend des Marktes.'),
  K('nachrichten', 5, '宣布', 'xuānbù', 'verkünden, ankündigen', ['政府', '宣布', '了', '新', '的', '政策'], 'Zhèngfǔ xuānbù le xīn de zhèngcè.', 'Die Regierung verkündete eine neue Politik.'),
  K('nachrichten', 4, '媒体', 'méitǐ', 'Medien', ['这', '件', '事', '引起', '了', '媒体', '的', '关注'], 'Zhè jiàn shì yǐnqǐ le méitǐ de guānzhù.', 'Diese Sache erregte mediale Aufmerksamkeit.'),
  K('nachrichten', 5, '行业', 'hángyè', 'Branche, Industrie', ['这个', '行业', '竞争', '激烈'], 'Zhège hángyè jìngzhēng jīliè.', 'In dieser Branche herrscht harter Wettbewerb.'),
  K('nachrichten', 5, '改革', 'gǎigé', 'Reform; reformieren', ['政府', '推动', '了', '教育', '改革'], 'Zhèngfǔ tuīdòng le jiàoyù gǎigé.', 'Die Regierung trieb eine Bildungsreform voran.'),
  K('nachrichten', 4, '下降', 'xiàjiàng', 'sinken, zurückgehen', ['这个', '月', '的', '销量', '下降', '了'], 'Zhège yuè de xiāoliàng xiàjiàng le.', 'Der Absatz ist diesen Monat gesunken.'),
  K('nachrichten', 5, '预计', 'yùjì', 'voraussichtlich, erwarten', ['预计', '明年', '经济', '会', '好转'], 'Yùjì míngnián jīngjì huì hǎozhuǎn.', 'Voraussichtlich erholt sich die Wirtschaft nächstes Jahr.'),
  K('nachrichten', 5, '贸易战', 'màoyìzhàn', 'Handelskrieg', ['贸易战', '影响', '了', '两', '国', '的', '经济'], 'Màoyìzhàn yǐngxiǎng le liǎng guó de jīngjì.', 'Der Handelskrieg traf die Wirtschaft beider Länder.'),

  // ---------- Wohnen & Behörden ----------
  K('wohnen', 4, '公寓', 'gōngyù', 'Apartment', ['我', '租', '了', '一', '套', '小', '公寓'], 'Wǒ zū le yí tào xiǎo gōngyù.', 'Ich habe ein kleines Apartment gemietet.'),
  K('wohnen', 5, '租房', 'zūfáng', 'eine Wohnung mieten', ['在', '大', '城市', '租房', '很', '贵'], 'Zài dà chéngshì zūfáng hěn guì.', 'In Großstädten ist Mieten teuer.'),
  K('wohnen', 5, '中介', 'zhōngjiè', 'Makler, Vermittler', ['我们', '通过', '中介', '找到', '了', '房子'], 'Wǒmen tōngguò zhōngjiè zhǎodào le fángzi.', 'Wir haben über einen Makler die Wohnung gefunden.'),
  K('wohnen', 5, '暖气', 'nuǎnqì', 'Heizung', ['北方', '的', '房子', '冬天', '有', '暖气'], 'Běifāng de fángzi dōngtiān yǒu nuǎnqì.', 'Wohnungen im Norden haben im Winter Heizung.'),
  K('wohnen', 4, '阳台', 'yángtái', 'Balkon', ['我', '喜欢', '在', '阳台', '上', '喝', '茶'], 'Wǒ xǐhuan zài yángtái shàng hē chá.', 'Ich trinke gern Tee auf dem Balkon.'),
  K('wohnen', 5, '装修', 'zhuāngxiū', 'renovieren, einrichten', ['楼上', '正在', '装修', '，', '很', '吵'], 'Lóushàng zhèngzài zhuāngxiū, hěn chǎo.', 'Oben wird renoviert, es ist sehr laut.'),
  K('wohnen', 4, '房东', 'fángdōng', 'Vermieter', ['房东', '答应', '下', '周', '来', '修', '门'], 'Fángdōng dāying xià zhōu lái xiū mén.', 'Der Vermieter versprach, nächste Woche die Tür zu reparieren.'),
  K('wohnen', 4, '申请', 'shēnqǐng', 'beantragen', ['我', '要', '去', '政府', '部门', '申请', '一', '个', '证件'], 'Wǒ yào qù zhèngfǔ bùmén shēnqǐng yí ge zhèngjiàn.', 'Ich muss bei der Behörde ein Dokument beantragen.'),
  K('wohnen', 5, '证件', 'zhèngjiàn', 'Ausweis(papier), Dokument', ['办', '手续', '请', '带', '好', '证件'], 'Bàn shǒuxù qǐng dài hǎo zhèngjiàn.', 'Bringen Sie für die Formalitäten Ihre Papiere mit.'),
  K('wohnen', 5, '盖章', 'gàizhāng', '(ein Dokument) abstempeln', ['这', '份', '文件', '需要', '盖章'], 'Zhè fèn wénjiàn xūyào gàizhāng.', 'Dieses Dokument muss abgestempelt werden.'),
  K('wohnen', 4, '垃圾', 'lājī', 'Müll, Abfall', ['这里', '的', '垃圾', '要', '分类'], 'Zhèlǐ de lājī yào fēnlèi.', 'Hier muss man den Müll trennen.'),

  // ---------- Technik & Digitales ----------
  K('technik', 4, '应用', 'yìngyòng', 'Anwendung, App', ['这个', '应用', '很', '好用'], 'Zhège yìngyòng hěn hǎoyòng.', 'Diese App ist sehr praktisch.'),
  K('technik', 5, '备份', 'bèifèn', 'Backup; sichern', ['记得', '定期', '备份', '你', '的', '文件'], 'Jìde dìngqī bèifèn nǐ de wénjiàn.', 'Denk daran, regelmäßig deine Dateien zu sichern.'),
  K('technik', 4, '系统', 'xìtǒng', 'System', ['手机', '的', '系统', '又', '更新', '了'], 'Shǒujī de xìtǒng yòu gēngxīn le.', 'Das Handysystem wurde wieder aktualisiert.'),
  K('technik', 5, '智能', 'zhìnéng', 'intelligent, smart', ['现在', '的', '家电', '越来越', '智能'], 'Xiànzài de jiādiàn yuèláiyuè zhìnéng.', 'Haushaltsgeräte werden immer smarter.'),
  K('technik', 5, '程序', 'chéngxù', 'Programm, Prozedur', ['这个', '程序', '出', '了', '点', '问题'], 'Zhège chéngxù chū le diǎn wèntí.', 'Dieses Programm hat ein Problem.'),
  K('technik', 4, '信号', 'xìnhào', 'Signal, Empfang', ['这里', '手机', '信号', '不', '好'], 'Zhèlǐ shǒujī xìnhào bù hǎo.', 'Hier ist der Handyempfang schlecht.'),
  K('technik', 4, '自动', 'zìdòng', 'automatisch', ['这个', '功能', '会', '自动', '保存'], 'Zhège gōngnéng huì zìdòng bǎocún.', 'Diese Funktion speichert automatisch.'),
  K('technik', 5, '虚拟', 'xūnǐ', 'virtuell', ['他们', '用', '虚拟', '技术', '做', '培训'], 'Tāmen yòng xūnǐ jìshù zuò péixùn.', 'Sie nutzen virtuelle Technik fürs Training.'),
  K('technik', 4, '电池', 'diànchí', 'Batterie, Akku', ['这个', '电池', '能', '用', '一', '整', '天'], 'Zhège diànchí néng yòng yì zhěng tiān.', 'Dieser Akku hält einen ganzen Tag.'),
  K('technik', 5, '流量', 'liúliàng', 'Datenvolumen', ['这个', '月', '的', '流量', '快', '用', '完', '了'], 'Zhège yuè de liúliàng kuài yòng wán le.', 'Das Datenvolumen ist diesen Monat fast aufgebraucht.'),
  K('technik', 5, '故障', 'gùzhàng', 'Störung, Defekt', ['电脑', '出现', '了', '故障'], 'Diànnǎo chūxiàn le gùzhàng.', 'Der Computer hat eine Störung.'),

  // ---------- Kultur, Feiertage & Chengyu ----------
  K('kultur', 5, '农历', 'nónglì', 'Mondkalender', ['春节', '是', '按', '农历', '算', '的'], 'Chūnjié shì àn nónglì suàn de.', 'Das Frühlingsfest richtet sich nach dem Mondkalender.'),
  K('kultur', 5, '庙会', 'miàohuì', 'Tempelfest, Jahrmarkt', ['过年', '时', '庙会', '非常', '热闹'], 'Guònián shí miàohuì fēicháng rènào.', 'Zu Neujahr sind die Tempelfeste sehr lebhaft.'),
  K('kultur', 5, '书法', 'shūfǎ', 'Kalligrafie', ['他', '从小', '就', '练', '书法'], 'Tā cóngxiǎo jiù liàn shūfǎ.', 'Er übt seit seiner Kindheit Kalligrafie.'),
  K('kultur', 5, '端午节', 'Duānwǔjié', 'Drachenbootfest', ['端午节', '人们', '吃', '粽子'], 'Duānwǔjié rénmen chī zòngzi.', 'Zum Drachenbootfest isst man Zongzi.'),
  K('kultur', 5, '习俗', 'xísú', 'Brauch, Sitte', ['不同', '地区', '有', '不同', '的', '习俗'], 'Bùtóng dìqū yǒu bùtóng de xísú.', 'Verschiedene Regionen haben verschiedene Bräuche.'),
  K('kultur', 5, '团圆', 'tuányuán', 'Familienzusammenkunft', ['中秋节', '是', '团圆', '的', '日子'], 'Zhōngqiūjié shì tuányuán de rìzi.', 'Das Mondfest ist ein Tag der Familienzusammenkunft.'),
  K('kultur', 5, '面子', 'miànzi', 'Gesicht (wahren), Ansehen', ['在', '中国', '，', '给', '别人', '面子', '很', '重要'], 'Zài Zhōngguó, gěi biérén miànzi hěn zhòngyào.', 'In China ist es wichtig, dem anderen sein Gesicht zu wahren.'),
  K('kultur', 5, '半途而废', 'bàntú’érfèi', 'Chengyu: auf halbem Weg aufgeben', ['学习', '不能', '半途而废'], 'Xuéxí bù néng bàntú’érfèi.', 'Beim Lernen darf man nicht auf halbem Weg aufgeben.'),
  K('kultur', 5, '一帆风顺', 'yìfān fēngshùn', 'Chengyu: alles läuft glatt', ['祝', '你', '新', '的', '一', '年', '一帆风顺'], 'Zhù nǐ xīn de yì nián yìfān fēngshùn.', 'Ich wünsche dir ein rundum erfolgreiches neues Jahr.'),
  K('kultur', 5, '名胜古迹', 'míngshèng gǔjì', 'Sehenswürdigkeiten & historische Stätten', ['西安', '有', '很多', '名胜古迹'], 'Xī’ān yǒu hěn duō míngshèng gǔjì.', 'Xi’an hat viele Sehenswürdigkeiten und historische Stätten.'),
  K('kultur', 5, '五颜六色', 'wǔyán liùsè', 'Chengyu: kunterbunt, vielfarbig', ['节日', '的', '夜晚', '，', '烟花', '五颜六色'], 'Jiérì de yèwǎn, yānhuā wǔyán liùsè.', 'In der Festnacht ist das Feuerwerk kunterbunt.'),
]
