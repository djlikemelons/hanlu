// ============================================================
// VOKABEL-RESERVOIR · Auto-Nachschub
// ============================================================
// Diese Karten sind anfangs NICHT im aktiven Deck. Sobald dein Vorrat an
// ungelernten Karten zur Neige geht (Schwelle: ~3 Tage Lernstoff), zieht
// die App automatisch Nachschub aus diesem Reservoir – du musst nichts tun.
// Logik: reservoirAuffuellen() in src/store.jsx.
//
// So bleibt das System über Monate „selbstfüllend". Wenn das Reservoir leer
// ist: einfach hier neue K(...)-Zeilen ergänzen – oder die geplante
// ERWEITERUNG nutzen: Kartengenerierung über die Anthropic-API
// (https://docs.claude.com, z. B. Modell 'claude-sonnet-4-6'), die dieses
// Reservoir automatisch wieder auffüllt (API-Key nie im Frontend, sondern
// über eine Serverless-Function proxyen).
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

export const RESERVOIR = [
  // ---------- HSK-Grundwortschatz ----------
  K('hsk', 5, '表达', 'biǎodá', 'ausdrücken', ['他', '很', '会', '表达', '自己', '的', '想法'], 'Tā hěn huì biǎodá zìjǐ de xiǎngfǎ.', 'Er kann seine Gedanken sehr gut ausdrücken.'),
  K('hsk', 5, '范围', 'fànwéi', 'Bereich, Umfang', ['这个', '问题', '不', '在', '讨论', '范围', '内'], 'Zhège wèntí bú zài tǎolùn fànwéi nèi.', 'Diese Frage liegt außerhalb des Diskussionsrahmens.'),
  K('hsk', 5, '程度', 'chéngdù', 'Grad, Ausmaß, Niveau', ['他', '的', '中文', '已经', '达到', '很', '高', '的', '程度'], 'Tā de Zhōngwén yǐjīng dádào hěn gāo de chéngdù.', 'Sein Chinesisch hat schon ein hohes Niveau erreicht.'),
  K('hsk', 5, '目标', 'mùbiāo', 'Ziel', ['我', '的', '目标', '是', '通过', 'HSK', '五', '级'], 'Wǒ de mùbiāo shì tōngguò HSK wǔ jí.', 'Mein Ziel ist es, HSK 5 zu bestehen.'),
  K('hsk', 5, '方式', 'fāngshì', 'Art und Weise, Methode', ['每', '个', '人', '的', '学习', '方式', '不', '一样'], 'Měi ge rén de xuéxí fāngshì bù yíyàng.', 'Jeder hat eine andere Art zu lernen.'),
  K('hsk', 4, '结果', 'jiéguǒ', 'Ergebnis; schließlich', ['考试', '结果', '明天', '公布'], 'Kǎoshì jiéguǒ míngtiān gōngbù.', 'Die Prüfungsergebnisse werden morgen bekanntgegeben.'),

  // ---------- Fotografie & Video ----------
  K('foto', 5, '快门', 'kuàimén', 'Auslöser, Verschluss(zeit)', ['拍', '运动', '要', '用', '快', '的', '快门'], 'Pāi yùndòng yào yòng kuài de kuàimén.', 'Für Sportaufnahmen braucht man eine kurze Verschlusszeit.'),
  K('foto', 5, '风格', 'fēnggé', 'Stil', ['我', '很', '喜欢', '你', '照片', '的', '风格'], 'Wǒ hěn xǐhuan nǐ zhàopiàn de fēnggé.', 'Ich mag den Stil deiner Fotos sehr.'),
  K('foto', 5, '黑白', 'hēibái', 'schwarz-weiß', ['黑白', '照片', '更', '有', '气氛'], 'Hēibái zhàopiàn gèng yǒu qìfēn.', 'Schwarz-Weiß-Fotos haben mehr Atmosphäre.'),
  K('foto', 5, '灵感', 'línggǎn', 'Inspiration', ['老', '城区', '给', '了', '我', '很多', '灵感'], 'Lǎo chéngqū gěi le wǒ hěn duō línggǎn.', 'Die Altstadt hat mir viel Inspiration gegeben.'),
  K('foto', 5, '作品', 'zuòpǐn', 'Werk, Arbeit (künstlerisch)', ['他', '的', '作品', '在', '国外', '展出', '过'], 'Tā de zuòpǐn zài guówài zhǎnchū guo.', 'Seine Werke wurden schon im Ausland ausgestellt.'),
  K('foto', 5, '细节', 'xìjié', 'Detail', ['好', '照片', '的', '细节', '很', '重要'], 'Hǎo zhàopiàn de xìjié hěn zhòngyào.', 'Bei guten Fotos sind die Details wichtig.'),

  // ---------- Steuern & Global Trade ----------
  K('steuern', 5, '订单', 'dìngdān', 'Bestellung, Auftrag', ['我们', '收到', '了', '一', '个', '大', '订单'], 'Wǒmen shōudào le yí ge dà dìngdān.', 'Wir haben einen großen Auftrag erhalten.'),
  K('steuern', 5, '物流', 'wùliú', 'Logistik', ['物流', '成本', '越来越', '高'], 'Wùliú chéngběn yuèláiyuè gāo.', 'Die Logistikkosten steigen immer weiter.'),
  K('steuern', 5, '仓库', 'cāngkù', 'Lager(halle)', ['货物', '已经', '到', '仓库', '了'], 'Huòwù yǐjīng dào cāngkù le.', 'Die Ware ist schon im Lager angekommen.'),
  K('steuern', 5, '运费', 'yùnfèi', 'Frachtkosten, Versandkosten', ['这', '批', '货', '的', '运费', '谁', '来', '付'], 'Zhè pī huò de yùnfèi shéi lái fù?', 'Wer übernimmt die Frachtkosten für diese Lieferung?'),
  K('steuern', 5, '样品', 'yàngpǐn', 'Muster, Warenprobe', ['请', '先', '寄', '一', '个', '样品', '给', '我们'], 'Qǐng xiān jì yí ge yàngpǐn gěi wǒmen.', 'Bitte schicken Sie uns zuerst ein Muster.'),
  K('steuern', 5, '交货', 'jiāohuò', 'liefern, Lieferung', ['我们', '保证', '按时', '交货'], 'Wǒmen bǎozhèng ànshí jiāohuò.', 'Wir garantieren pünktliche Lieferung.'),

  // ---------- Business & Verhandlung ----------
  K('business', 5, '方案', 'fāng’àn', 'Konzept, Plan, Lösung', ['我们', '准备', '了', '两', '个', '方案'], 'Wǒmen zhǔnbèi le liǎng ge fāng’àn.', 'Wir haben zwei Konzepte vorbereitet.'),
  K('business', 5, '优势', 'yōushì', 'Vorteil, Stärke', ['价格', '是', '我们', '最', '大', '的', '优势'], 'Jiàgé shì wǒmen zuì dà de yōushì.', 'Der Preis ist unsere größte Stärke.'),
  K('business', 5, '期限', 'qīxiàn', 'Frist, Termin', ['合同', '的', '期限', '是', '两', '年'], 'Hétong de qīxiàn shì liǎng nián.', 'Die Vertragslaufzeit beträgt zwei Jahre.'),
  K('business', 5, '利益', 'lìyì', 'Interesse, Nutzen, Vorteil', ['合作', '对', '双方', '都', '有', '利益'], 'Hézuò duì shuāngfāng dōu yǒu lìyì.', 'Die Zusammenarbeit nützt beiden Seiten.'),
  K('business', 5, '信任', 'xìnrèn', 'Vertrauen; vertrauen', ['生意', '的', '基础', '是', '互相', '信任'], 'Shēngyi de jīchǔ shì hùxiāng xìnrèn.', 'Die Grundlage des Geschäfts ist gegenseitiges Vertrauen.'),
  K('business', 5, '对手', 'duìshǒu', 'Konkurrent, Gegner', ['我们', '的', '对手', '降价', '了'], 'Wǒmen de duìshǒu jiàngjià le.', 'Unsere Konkurrenz hat die Preise gesenkt.'),

  // ---------- Essen & Restaurant ----------
  K('essen', 4, '香', 'xiāng', 'duftend, köstlich', ['厨房', '里', '的', '菜', '真', '香'], 'Chúfáng lǐ de cài zhēn xiāng.', 'Das Essen in der Küche duftet herrlich.'),
  K('essen', 5, '嫩', 'nèn', 'zart (Fleisch, Gemüse)', ['这个', '牛肉', '又', '嫩', '又', '香'], 'Zhège niúròu yòu nèn yòu xiāng.', 'Dieses Rindfleisch ist zart und aromatisch.'),
  K('essen', 5, '主食', 'zhǔshí', 'Hauptspeise, Grundnahrung (Reis/Nudeln)', ['你们', '主食', '要', '米饭', '还是', '面条'], 'Nǐmen zhǔshí yào mǐfàn háishi miàntiáo?', 'Möchtet ihr als Beilage Reis oder Nudeln?'),
  K('essen', 5, '海鲜', 'hǎixiān', 'Meeresfrüchte', ['沿海', '城市', '的', '海鲜', '特别', '新鲜'], 'Yánhǎi chéngshì de hǎixiān tèbié xīnxiān.', 'In Küstenstädten sind die Meeresfrüchte besonders frisch.'),
  K('essen', 5, '地道', 'dìdao', 'authentisch, original', ['这', '家', '店', '的', '川菜', '很', '地道'], 'Zhè jiā diàn de chuāncài hěn dìdao.', 'Die Sichuan-Küche in diesem Lokal ist sehr authentisch.'),
  K('essen', 5, '夜市', 'yèshì', 'Nachtmarkt', ['我们', '晚上', '去', '逛', '夜市', '吧'], 'Wǒmen wǎnshang qù guàng yèshì ba.', 'Lass uns abends über den Nachtmarkt bummeln.'),

  // ---------- Reisen in China ----------
  K('reisen', 3, '护照', 'hùzhào', 'Reisepass', ['请', '出示', '您', '的', '护照'], 'Qǐng chūshì nín de hùzhào.', 'Bitte zeigen Sie Ihren Pass.'),
  K('reisen', 5, '直达', 'zhídá', 'Direktverbindung, direkt', ['有', '没', '有', '直达', '上海', '的', '火车'], 'Yǒu méi yǒu zhídá Shànghǎi de huǒchē?', 'Gibt es einen Direktzug nach Shanghai?'),
  K('reisen', 5, '换乘', 'huànchéng', 'umsteigen', ['我们', '要', '在', '南京', '换乘'], 'Wǒmen yào zài Nánjīng huànchéng.', 'Wir müssen in Nanjing umsteigen.'),
  K('reisen', 5, '旺季', 'wàngjì', 'Hochsaison', ['旺季', '的', '机票', '贵', '很多'], 'Wàngjì de jīpiào guì hěn duō.', 'In der Hochsaison sind Flüge viel teurer.'),
  K('reisen', 5, '攻略', 'gōnglüè', 'Reiseguide, Insider-Tipps (umg.)', ['出发', '前', '我', '看', '了', '很多', '攻略'], 'Chūfā qián wǒ kàn le hěn duō gōnglüè.', 'Vor der Abreise habe ich viele Reisetipps gelesen.'),
  K('reisen', 5, '旅程', 'lǚchéng', 'Reise, Reiseweg', ['这', '次', '旅程', '让', '我', '难忘'], 'Zhè cì lǚchéng ràng wǒ nánwàng.', 'Diese Reise war unvergesslich für mich.'),

  // ---------- Alltag & Smalltalk ----------
  K('alltag', 5, '干脆', 'gāncuì', 'kurzerhand, gleich ganz', ['时间', '不', '够', '，', '我们', '干脆', '打车', '吧'], 'Shíjiān bú gòu, wǒmen gāncuì dǎchē ba.', 'Die Zeit reicht nicht – nehmen wir kurzerhand ein Taxi.'),
  K('alltag', 4, '暖和', 'nuǎnhuo', 'angenehm warm', ['今天', '外面', '很', '暖和'], 'Jīntiān wàimiàn hěn nuǎnhuo.', 'Heute ist es draußen schön warm.'),
  K('alltag', 5, '难得', 'nándé', 'selten (und kostbar)', ['难得', '有', '这么', '好', '的', '天气'], 'Nándé yǒu zhème hǎo de tiānqì.', 'So gutes Wetter gibt es selten.'),
  K('alltag', 4, '礼貌', 'lǐmào', 'Höflichkeit; höflich', ['他', '对', '人', '一直', '很', '有', '礼貌'], 'Tā duì rén yìzhí hěn yǒu lǐmào.', 'Er ist zu allen stets sehr höflich.'),
  K('alltag', 4, '心情', 'xīnqíng', 'Stimmung, Laune', ['听', '音乐', '能', '让', '心情', '变', '好'], 'Tīng yīnyuè néng ràng xīnqíng biàn hǎo.', 'Musikhören kann die Stimmung heben.'),
  K('alltag', 4, '约会', 'yuēhuì', 'Verabredung, Date', ['他', '今晚', '有', '一', '个', '重要', '的', '约会'], 'Tā jīnwǎn yǒu yí ge zhòngyào de yuēhuì.', 'Er hat heute Abend eine wichtige Verabredung.'),

  // ---------- Wirtschaft & Nachrichten ----------
  K('nachrichten', 5, '消费', 'xiāofèi', 'Konsum; konsumieren', ['年轻人', '的', '消费', '习惯', '变', '了'], 'Niánqīngrén de xiāofèi xíguàn biàn le.', 'Die Konsumgewohnheiten junger Leute haben sich geändert.'),
  K('nachrichten', 5, '调查', 'diàochá', 'Umfrage, Untersuchung', ['调查', '显示', '物价', '在', '上涨'], 'Diàochá xiǎnshì wùjià zài shàngzhǎng.', 'Die Untersuchung zeigt, dass die Preise steigen.'),
  K('nachrichten', 5, '比例', 'bǐlì', 'Anteil, Verhältnis', ['出口', '占', '很', '大', '的', '比例'], 'Chūkǒu zhàn hěn dà de bǐlì.', 'Der Export macht einen großen Anteil aus.'),
  K('nachrichten', 5, '官方', 'guānfāng', 'offiziell, amtlich', ['官方', '还', '没有', '公布', '数据'], 'Guānfāng hái méiyǒu gōngbù shùjù.', 'Offizielle Zahlen wurden noch nicht veröffentlicht.'),
  K('nachrichten', 5, '发布', 'fābù', 'veröffentlichen, herausgeben', ['公司', '发布', '了', '新', '产品'], 'Gōngsī fābù le xīn chǎnpǐn.', 'Die Firma hat ein neues Produkt vorgestellt.'),
  K('nachrichten', 5, '下跌', 'xiàdiē', 'fallen, sinken (Kurse, Preise)', ['股票', '今天', '又', '下跌', '了'], 'Gǔpiào jīntiān yòu xiàdiē le.', 'Die Aktien sind heute wieder gefallen.'),

  // ---------- Wohnen & Behörden ----------
  K('wohnen', 5, '合租', 'hézū', 'gemeinsam mieten, WG', ['我', '和', '朋友', '合租', '一', '套', '房子'], 'Wǒ hé péngyou hézū yí tào fángzi.', 'Ich teile mir mit Freunden eine Wohnung.'),
  K('wohnen', 5, '噪音', 'zàoyīn', 'Lärm', ['马路', '上', '的', '噪音', '太', '大', '了'], 'Mǎlù shàng de zàoyīn tài dà le.', 'Der Straßenlärm ist zu laut.'),
  K('wohnen', 5, '小区', 'xiǎoqū', 'Wohnanlage, Viertel', ['我们', '小区', '的', '环境', '很', '安静'], 'Wǒmen xiǎoqū de huánjìng hěn ānjìng.', 'Unsere Wohnanlage ist sehr ruhig.'),
  K('wohnen', 4, '钥匙', 'yàoshi', 'Schlüssel', ['我', '把', '钥匙', '忘', '在', '家里', '了'], 'Wǒ bǎ yàoshi wàng zài jiālǐ le.', 'Ich habe den Schlüssel zu Hause vergessen.'),
  K('wohnen', 5, '水管', 'shuǐguǎn', 'Wasserrohr, Wasserleitung', ['厨房', '的', '水管', '漏', '水', '了'], 'Chúfáng de shuǐguǎn lòu shuǐ le.', 'Das Wasserrohr in der Küche ist undicht.'),
  K('wohnen', 5, '物业费', 'wùyèfèi', 'Hausgeld, Verwaltungsgebühr', ['物业费', '每', '个', '月', '两百', '块'], 'Wùyèfèi měi ge yuè liǎngbǎi kuài.', 'Das Hausgeld beträgt 200 Yuan pro Monat.'),

  // ---------- Technik & Digitales ----------
  K('technik', 5, '充电宝', 'chōngdiànbǎo', 'Powerbank', ['出门', '别', '忘', '了', '带', '充电宝'], 'Chūmén bié wàng le dài chōngdiànbǎo.', 'Vergiss nicht, die Powerbank mitzunehmen.'),
  K('technik', 5, '更新', 'gēngxīn', 'Update; aktualisieren', ['这个', '应用', '又', '要', '更新', '了'], 'Zhège yìngyòng yòu yào gēngxīn le.', 'Diese App braucht schon wieder ein Update.'),
  K('technik', 5, '网速', 'wǎngsù', 'Internetgeschwindigkeit', ['这里', '的', '网速', '快', '得', '惊人'], 'Zhèlǐ de wǎngsù kuài de jīngrén.', 'Das Internet hier ist erstaunlich schnell.'),
  K('technik', 5, '死机', 'sǐjī', 'abstürzen, einfrieren (Computer)', ['我', '的', '电脑', '又', '死机', '了'], 'Wǒ de diànnǎo yòu sǐjī le.', 'Mein Computer ist schon wieder abgestürzt.'),
  K('technik', 5, '芯片', 'xīnpiàn', '(Computer-)Chip', ['芯片', '行业', '发展', '很', '快'], 'Xīnpiàn hángyè fāzhǎn hěn kuài.', 'Die Chip-Branche entwickelt sich rasant.'),
  K('technik', 5, '云端', 'yúnduān', 'Cloud', ['照片', '都', '保存', '在', '云端'], 'Zhàopiàn dōu bǎocún zài yúnduān.', 'Die Fotos sind alle in der Cloud gespeichert.'),

  // ---------- Kultur, Feiertage & Chengyu ----------
  K('kultur', 5, '武术', 'wǔshù', 'Kampfkunst, Wushu', ['很多', '孩子', '周末', '学', '武术'], 'Hěn duō háizi zhōumò xué wǔshù.', 'Viele Kinder lernen am Wochenende Kampfkunst.'),
  K('kultur', 5, '茶艺', 'cháyì', 'Teekunst, Teezeremonie', ['她', '给', '我们', '表演', '了', '茶艺'], 'Tā gěi wǒmen biǎoyǎn le cháyì.', 'Sie führte uns die Teezeremonie vor.'),
  K('kultur', 5, '灯谜', 'dēngmí', 'Laternenrätsel', ['元宵节', '大家', '一起', '猜', '灯谜'], 'Yuánxiāojié dàjiā yìqǐ cāi dēngmí.', 'Zum Laternenfest rät man gemeinsam Laternenrätsel.'),
  K('kultur', 5, '生肖', 'shēngxiào', 'chinesisches Tierkreiszeichen', ['你', '的', '生肖', '是', '什么'], 'Nǐ de shēngxiào shì shénme?', 'Was ist dein chinesisches Tierkreiszeichen?'),
  K('kultur', 5, '对联', 'duìlián', 'Spruchpaare (an Türen)', ['过年', '家家', '门', '上', '贴', '对联'], 'Guònián jiājiā mén shàng tiē duìlián.', 'Zu Neujahr kleben alle Spruchpaare an die Türen.'),
  K('kultur', 5, '四合院', 'sìhéyuàn', 'traditionelles Hofhaus', ['北京', '的', '四合院', '越来越', '少', '了'], 'Běijīng de sìhéyuàn yuèláiyuè shǎo le.', 'Die traditionellen Hofhäuser in Peking werden immer weniger.'),
]
