// ============================================================
// 探索故事 GESCHICHTEN – Lesetexte zum aktiven Erarbeiten
// ============================================================
// Jede Region der Entdecken-Karte hat eine Geschichte (HSK 4–5,
// bewusst OHNE eingebaute Hilfen): Du liest die Sätze selbst und
// holst dir bei Bedarf pro Satz Pinyin/Übersetzung über die
// Hilfe-Fläche. Danach prüfen Verständnisfragen, ob du den Text
// wirklich erarbeitet hast (XP gibt es nur bei voller Punktzahl).
// Neue Geschichten: einfach dem Muster folgen, region = Regions-ID
// aus entdecken.js.

export const GESCHICHTEN = [
  {
    id: 'g-beijing',
    region: 'beijing',
    titel: '胡同里的早晨',
    titelDe: 'Morgen in den Hutongs',
    niveau: 'HSK 4',
    saetze: [
      { zh: '清晨六点，老北京的胡同慢慢醒来。', py: 'Qīngchén liù diǎn, lǎo Běijīng de hútòng mànmàn xǐng lái.', de: 'Um sechs Uhr früh erwachen die Gassen des alten Peking langsam.' },
      { zh: '王大爷提着鸟笼，到公园里和老朋友们见面。', py: 'Wáng dàye tí zhe niǎolóng, dào gōngyuán lǐ hé lǎo péngyou men jiànmiàn.', de: 'Opa Wang trägt seinen Vogelkäfig in den Park und trifft dort seine alten Freunde.' },
      { zh: '他们一边打太极拳，一边聊最近的新闻。', py: 'Tāmen yìbiān dǎ tàijíquán, yìbiān liáo zuìjìn de xīnwén.', de: 'Sie machen Tai-Chi und unterhalten sich dabei über die neuesten Nachrichten.' },
      { zh: '早饭一般是豆浆和油条，又便宜又好吃。', py: 'Zǎofàn yìbān shì dòujiāng hé yóutiáo, yòu piányi yòu hǎochī.', de: 'Zum Frühstück gibt es meist Sojamilch und frittierte Teigstangen – billig und lecker.' },
      { zh: '虽然城市发展得很快，但是胡同里的生活还是那么安静。', py: 'Suīrán chéngshì fāzhǎn de hěn kuài, dànshì hútòng lǐ de shēnghuó háishi nàme ānjìng.', de: 'Obwohl sich die Stadt schnell entwickelt, ist das Leben in den Hutongs noch immer so ruhig.' },
      { zh: '对很多北京人来说，这才是真正的家的味道。', py: 'Duì hěn duō Běijīng rén lái shuō, zhè cái shì zhēnzhèng de jiā de wèidào.', de: 'Für viele Pekinger ist genau das der wahre Geschmack von Zuhause.' },
    ],
    fragen: [
      { f: '王大爷早上做什么？', optionen: ['提着鸟笼去公园见朋友', '在家看电视', '去公司上班', '在胡同里卖早饭'], richtig: 0 },
      { f: '胡同里的生活怎么样？', optionen: ['很吵', '发展得很快', '还是很安静', '越来越贵'], richtig: 2 },
    ],
  },
  {
    id: 'g-shanghai',
    region: 'shanghai',
    titel: '外滩的夜晚',
    titelDe: 'Abend am Bund',
    niveau: 'HSK 4–5',
    saetze: [
      { zh: '晚上七点，外滩的灯光亮了起来。', py: 'Wǎnshang qī diǎn, Wàitān de dēngguāng liàng le qǐlái.', de: 'Um sieben Uhr abends gehen am Bund die Lichter an.' },
      { zh: '江的对面是浦东的高楼，一百年前那里还是农田。', py: 'Jiāng de duìmiàn shì Pǔdōng de gāolóu, yìbǎi nián qián nàlǐ háishi nóngtián.', de: 'Auf der anderen Flussseite stehen die Hochhäuser von Pudong – vor hundert Jahren war dort noch Ackerland.' },
      { zh: '一位老人对孙子说：“我小时候，这里完全是另一个世界。”', py: 'Yí wèi lǎorén duì sūnzi shuō: “Wǒ xiǎoshíhou, zhèlǐ wánquán shì lìng yí gè shìjiè.”', de: 'Ein alter Mann sagt zu seinem Enkel: „Als ich klein war, war das hier eine völlig andere Welt."' },
      { zh: '游客们忙着拍照，谁都不想错过这个景色。', py: 'Yóukè men máng zhe pāizhào, shéi dōu bù xiǎng cuòguò zhège jǐngsè.', de: 'Die Touristen sind mit Fotografieren beschäftigt – niemand will sich diese Aussicht entgehen lassen.' },
      { zh: '上海就是这样一座城市：历史和未来每天晚上都在江边见面。', py: 'Shànghǎi jiùshì zhèyàng yí zuò chéngshì: lìshǐ hé wèilái měitiān wǎnshang dōu zài jiāng biān jiànmiàn.', de: 'Shanghai ist genau so eine Stadt: Geschichte und Zukunft treffen sich jeden Abend am Flussufer.' },
    ],
    fragen: [
      { f: '一百年前，浦东是什么样子？', optionen: ['已经有很多高楼', '是农田', '是一个公园', '是外国人的城市'], richtig: 1 },
      { f: '游客们在外滩做什么？', optionen: ['吃晚饭', '坐船过江', '忙着拍照', '买东西'], richtig: 2 },
    ],
  },
  {
    id: 'g-sichuan',
    region: 'sichuan',
    titel: '茶馆里的下午',
    titelDe: 'Nachmittag im Teehaus',
    niveau: 'HSK 4–5',
    saetze: [
      { zh: '在成都，人们最喜欢的地方就是茶馆。', py: 'Zài Chéngdū, rénmen zuì xǐhuan de dìfang jiùshì cháguǎn.', de: 'In Chengdu ist das Teehaus der Lieblingsort der Menschen.' },
      { zh: '下午两点，茶馆里已经坐满了客人。', py: 'Xiàwǔ liǎng diǎn, cháguǎn lǐ yǐjīng zuò mǎn le kèrén.', de: 'Um zwei Uhr nachmittags ist das Teehaus schon voll besetzt.' },
      { zh: '有人打麻将，有人看报纸，还有人什么都不做，只是喝茶。', py: 'Yǒu rén dǎ májiàng, yǒu rén kàn bàozhǐ, hái yǒu rén shénme dōu bú zuò, zhǐshì hē chá.', de: 'Manche spielen Mahjong, manche lesen Zeitung, und manche tun gar nichts – sie trinken einfach Tee.' },
      { zh: '服务员拿着长嘴茶壶，远远地把热水倒进杯子里，一滴都不洒。', py: 'Fúwùyuán ná zhe cháng zuǐ cháhú, yuǎnyuǎn de bǎ rè shuǐ dào jìn bēizi lǐ, yì dī dōu bù sǎ.', de: 'Der Kellner gießt mit der Langschnabel-Teekanne aus der Entfernung heißes Wasser in die Tasse – ohne einen Tropfen zu verschütten.' },
      { zh: '成都人常说：生活不是为了工作，工作是为了生活。', py: 'Chéngdū rén cháng shuō: shēnghuó bú shì wèile gōngzuò, gōngzuò shì wèile shēnghuó.', de: 'Die Leute in Chengdu sagen oft: Man lebt nicht, um zu arbeiten – man arbeitet, um zu leben.' },
    ],
    fragen: [
      { f: '茶馆里的客人不做下面哪件事？', optionen: ['打麻将', '看报纸', '喝茶', '打篮球'], richtig: 3 },
      { f: '服务员倒水有什么特别的？', optionen: ['用很小的杯子', '从很远的地方倒，一滴都不洒', '只给老人倒', '用凉水'], richtig: 1 },
    ],
  },
  {
    id: 'g-guangdong',
    region: 'guangdong',
    titel: '早茶的规矩',
    titelDe: 'Die Regeln des Morgentees',
    niveau: 'HSK 4–5',
    saetze: [
      { zh: '在广州，周末的早上全家人一起去喝早茶。', py: 'Zài Guǎngzhōu, zhōumò de zǎoshang quánjiā rén yìqǐ qù hē zǎochá.', de: 'In Guangzhou geht am Wochenende die ganze Familie zusammen zum Morgentee.' },
      { zh: '早茶其实不只是喝茶，更重要的是吃点心。', py: 'Zǎochá qíshí bù zhǐshì hē chá, gèng zhòngyào de shì chī diǎnxin.', de: 'Beim Morgentee geht es eigentlich nicht nur um Tee – wichtiger sind die Dim-Sum-Häppchen.' },
      { zh: '虾饺、烧卖、叉烧包，每张桌子上都放满了小笼子。', py: 'Xiājiǎo, shāomài, chāshāobāo, měi zhāng zhuōzi shàng dōu fàng mǎn le xiǎo lóngzi.', de: 'Garnelen-Dumplings, Shaomai, Schweinefleisch-Bao – jeder Tisch ist voller kleiner Dampfkörbchen.' },
      { zh: '有一个有趣的规矩：别人给你倒茶的时候，用两个手指轻轻敲桌子，表示感谢。', py: 'Yǒu yí gè yǒuqù de guīju: biérén gěi nǐ dào chá de shíhou, yòng liǎng gè shǒuzhǐ qīngqīng qiāo zhuōzi, biǎoshì gǎnxiè.', de: 'Es gibt eine interessante Regel: Wenn dir jemand Tee eingießt, klopfst du mit zwei Fingern leicht auf den Tisch, um dich zu bedanken.' },
      { zh: '一顿早茶常常要吃两三个小时，因为对广东人来说，这是和家人聊天的最好机会。', py: 'Yí dùn zǎochá chángcháng yào chī liǎng sān gè xiǎoshí, yīnwèi duì Guǎngdōng rén lái shuō, zhè shì hé jiārén liáotiān de zuì hǎo jīhuì.', de: 'Ein Morgentee dauert oft zwei bis drei Stunden, denn für die Kantonesen ist er die beste Gelegenheit, mit der Familie zu plaudern.' },
    ],
    fragen: [
      { f: '喝早茶的时候，最重要的是什么？', optionen: ['喝很多茶', '吃点心', '看手机', '快点吃完'], richtig: 1 },
      { f: '别人给你倒茶，你应该怎么表示感谢？', optionen: ['站起来说谢谢', '用两个手指敲桌子', '给他倒一杯', '点头三次'], richtig: 1 },
    ],
  },
  {
    id: 'g-shaanxi',
    region: 'shaanxi',
    titel: '兵马俑的发现',
    titelDe: 'Die Entdeckung der Terrakotta-Armee',
    niveau: 'HSK 5',
    saetze: [
      { zh: '一九七四年，几个农民在西安附近打井的时候，发现了一些奇怪的东西。', py: 'Yī jiǔ qī sì nián, jǐ gè nóngmín zài Xī’ān fùjìn dǎ jǐng de shíhou, fāxiàn le yìxiē qíguài de dōngxi.', de: '1974 stießen einige Bauern beim Brunnenbohren in der Nähe von Xi’an auf seltsame Dinge.' },
      { zh: '他们没想到，地下藏着八千多个两千年前的士兵。', py: 'Tāmen méi xiǎngdào, dìxià cáng zhe bāqiān duō gè liǎng qiān nián qián de shìbīng.', de: 'Sie ahnten nicht, dass unter der Erde über 8 000 Soldaten aus einer Zeit vor 2 000 Jahren verborgen lagen.' },
      { zh: '这些士兵是用泥土做的，每个人的脸都不一样。', py: 'Zhèxiē shìbīng shì yòng nítǔ zuò de, měi gè rén de liǎn dōu bù yíyàng.', de: 'Diese Soldaten sind aus Ton gefertigt – und jedes Gesicht ist anders.' },
      { zh: '秦始皇让工人们做了这支军队，为了在死后继续保护他。', py: 'Qín Shǐhuáng ràng gōngrén men zuò le zhè zhī jūnduì, wèile zài sǐ hòu jìxù bǎohù tā.', de: 'Der erste Kaiser Qin Shihuang ließ diese Armee bauen, damit sie ihn nach dem Tod weiter beschützt.' },
      { zh: '今天，兵马俑成了世界有名的景点，每年有几百万人来参观。', py: 'Jīntiān, bīngmǎyǒng chéng le shìjiè yǒumíng de jǐngdiǎn, měi nián yǒu jǐ bǎi wàn rén lái cānguān.', de: 'Heute ist die Terrakotta-Armee eine weltberühmte Sehenswürdigkeit mit Millionen Besuchern pro Jahr.' },
    ],
    fragen: [
      { f: '农民们本来想做什么？', optionen: ['找士兵', '打井', '盖房子', '种地'], richtig: 1 },
      { f: '秦始皇为什么让人做这支军队？', optionen: ['为了打仗', '为了卖钱', '为了在死后保护他', '为了送给朋友'], richtig: 2 },
    ],
  },
  {
    id: 'g-yunnan',
    region: 'yunnan',
    titel: '过桥米线的故事',
    titelDe: 'Die Legende der Über-die-Brücke-Nudeln',
    niveau: 'HSK 4–5',
    saetze: [
      { zh: '很久以前，云南有一个读书人，在湖中间的小岛上学习。', py: 'Hěn jiǔ yǐqián, Yúnnán yǒu yí gè dúshū rén, zài hú zhōngjiān de xiǎo dǎo shàng xuéxí.', de: 'Vor langer Zeit lernte in Yunnan ein Gelehrter auf einer kleinen Insel mitten im See.' },
      { zh: '他的妻子每天给他送饭，可是路很远，饭到了就凉了。', py: 'Tā de qīzi měitiān gěi tā sòng fàn, kěshì lù hěn yuǎn, fàn dào le jiù liáng le.', de: 'Seine Frau brachte ihm jeden Tag Essen, aber der Weg war weit – das Essen war immer schon kalt.' },
      { zh: '有一天，她发现汤上面的一层油可以让汤保持很热。', py: 'Yǒu yìtiān, tā fāxiàn tāng shàngmiàn de yì céng yóu kěyǐ ràng tāng bǎochí hěn rè.', de: 'Eines Tages entdeckte sie, dass eine Ölschicht auf der Suppe diese lange heiß hält.' },
      { zh: '于是她把米线、肉和菜分开带，到了岛上再放进热汤里。', py: 'Yúshì tā bǎ mǐxiàn, ròu hé cài fēnkāi dài, dào le dǎo shàng zài fàng jìn rè tāng lǐ.', de: 'Also trug sie Reisnudeln, Fleisch und Gemüse getrennt und gab sie erst auf der Insel in die heiße Suppe.' },
      { zh: '因为送饭要过一座桥，这道菜就叫“过桥米线”。', py: 'Yīnwèi sòng fàn yào guò yí zuò qiáo, zhè dào cài jiù jiào “guòqiáo mǐxiàn”.', de: 'Weil sie auf dem Weg eine Brücke überqueren musste, heißt das Gericht „Über-die-Brücke-Reisnudeln".' },
    ],
    fragen: [
      { f: '为什么饭总是凉的？', optionen: ['妻子做得太早', '路很远', '岛上很冷', '读书人吃得太慢'], richtig: 1 },
      { f: '什么东西让汤保持很热？', optionen: ['一层油', '一个盖子', '特别的碗', '很多辣椒'], richtig: 0 },
    ],
  },
  {
    id: 'g-guangxi',
    region: 'guangxi',
    titel: '漓江上的渔夫',
    titelDe: 'Der Fischer auf dem Li-Fluss',
    niveau: 'HSK 5',
    saetze: [
      { zh: '清晨，漓江上还有一层薄薄的雾。', py: 'Qīngchén, Lí Jiāng shàng hái yǒu yì céng báobáo de wù.', de: 'Am frühen Morgen liegt noch ein dünner Nebel über dem Li-Fluss.' },
      { zh: '一位老渔夫站在竹筏上，旁边站着他的鱼鹰。', py: 'Yí wèi lǎo yúfū zhàn zài zhúfá shàng, pángbiān zhàn zhe tā de yúyīng.', de: 'Ein alter Fischer steht auf seinem Bambusfloß, neben ihm sein Kormoran („Fischadler").' },
      { zh: '这种鸟会潜到水里抓鱼，然后把鱼交给主人。', py: 'Zhè zhǒng niǎo huì qián dào shuǐ lǐ zhuā yú, ránhòu bǎ yú jiāo gěi zhǔrén.', de: 'Dieser Vogel taucht ins Wasser, fängt Fische und übergibt sie seinem Herrn.' },
      { zh: '现在，用鸟抓鱼的人越来越少了，很多渔夫为游客表演。', py: 'Xiànzài, yòng niǎo zhuā yú de rén yuè lái yuè shǎo le, hěn duō yúfū wèi yóukè biǎoyǎn.', de: 'Heute fischen immer weniger Menschen mit Vögeln – viele Fischer treten stattdessen für Touristen auf.' },
      { zh: '桂林的山水加上这古老的传统，吸引了世界各地的摄影师。', py: 'Guìlín de shānshuǐ jiā shàng zhè gǔlǎo de chuántǒng, xīyǐn le shìjiè gèdì de shèyǐngshī.', de: 'Guilins Landschaft und diese alte Tradition ziehen Fotografen aus aller Welt an.' },
    ],
    fragen: [
      { f: '鱼鹰会做什么？', optionen: ['在天上唱歌', '潜到水里抓鱼', '拉竹筏', '吓走别的鸟'], richtig: 1 },
      { f: '现在很多渔夫为什么还用鸟抓鱼？', optionen: ['因为鱼太多', '为游客表演', '因为没有船', '因为政府要求'], richtig: 1 },
    ],
  },
  {
    id: 'g-zhejiang',
    region: 'zhejiang',
    titel: '西湖边的传说',
    titelDe: 'Die Legende am Westsee',
    niveau: 'HSK 5',
    saetze: [
      { zh: '在杭州，人人都知道白蛇的传说。', py: 'Zài Hángzhōu, rénrén dōu zhīdào Báishé de chuánshuō.', de: 'In Hangzhou kennt jeder die Legende der Weißen Schlange.' },
      { zh: '传说一条白蛇变成了美丽的女人，和一个年轻人结了婚。', py: 'Chuánshuō yì tiáo báishé biànchéng le měilì de nǚrén, hé yí gè niánqīng rén jié le hūn.', de: 'Der Sage nach verwandelte sich eine weiße Schlange in eine schöne Frau und heiratete einen jungen Mann.' },
      { zh: '一个和尚认为人和蛇不能在一起，把白蛇关在了雷峰塔下面。', py: 'Yí gè héshang rènwéi rén hé shé bù néng zài yìqǐ, bǎ báishé guān zài le Léifēng Tǎ xiàmiàn.', de: 'Ein Mönch fand, Mensch und Schlange dürften nicht zusammen sein, und sperrte die Weiße Schlange unter der Leifeng-Pagode ein.' },
      { zh: '今天，游客站在西湖边，还能看到那座塔。', py: 'Jīntiān, yóukè zhàn zài Xīhú biān, hái néng kàndào nà zuò tǎ.', de: 'Noch heute können Besucher am Westsee diese Pagode sehen.' },
      { zh: '对中国人来说，这个故事讲的是爱情的力量。', py: 'Duì Zhōngguó rén lái shuō, zhège gùshi jiǎng de shì àiqíng de lìliàng.', de: 'Für die Chinesen erzählt diese Geschichte von der Kraft der Liebe.' },
    ],
    fragen: [
      { f: '白蛇变成了什么？', optionen: ['一座塔', '一个美丽的女人', '一个和尚', '一条龙'], richtig: 1 },
      { f: '谁把白蛇关在塔下面？', optionen: ['她的丈夫', '一个和尚', '皇帝', '游客'], richtig: 1 },
    ],
  },
  {
    id: 'g-shandong',
    region: 'shandong',
    titel: '啤酒节的周末',
    titelDe: 'Ein Wochenende beim Bierfest',
    niveau: 'HSK 4–5',
    saetze: [
      { zh: '每年八月，青岛都会举办国际啤酒节。', py: 'Měi nián bāyuè, Qīngdǎo dōu huì jǔbàn guójì píjiǔ jié.', de: 'Jedes Jahr im August veranstaltet Qingdao ein internationales Bierfest.' },
      { zh: '这个传统和城市的历史有关：一百多年前，德国人在这里建了啤酒厂。', py: 'Zhège chuántǒng hé chéngshì de lìshǐ yǒuguān: yìbǎi duō nián qián, Déguó rén zài zhèlǐ jiàn le píjiǔ chǎng.', de: 'Diese Tradition hängt mit der Stadtgeschichte zusammen: Vor über hundert Jahren bauten Deutsche hier eine Brauerei.' },
      { zh: '在青岛，人们买啤酒的方式很特别：装在塑料袋里提回家。', py: 'Zài Qīngdǎo, rénmen mǎi píjiǔ de fāngshì hěn tèbié: zhuāng zài sùliàodài lǐ tí huí jiā.', de: 'In Qingdao kauft man Bier auf besondere Weise: abgefüllt in Plastiktüten zum Nach-Hause-Tragen.' },
      { zh: '晚上，朋友们坐在海边，一边吃海鲜，一边喝新鲜的啤酒。', py: 'Wǎnshang, péngyou men zuò zài hǎibiān, yìbiān chī hǎixiān, yìbiān hē xīnxiān de píjiǔ.', de: 'Abends sitzen Freunde am Meer, essen Meeresfrüchte und trinken dazu frisches Bier.' },
      { zh: '对青岛人来说，夏天的味道就是啤酒加海鲜。', py: 'Duì Qīngdǎo rén lái shuō, xiàtiān de wèidào jiùshì píjiǔ jiā hǎixiān.', de: 'Für die Menschen in Qingdao schmeckt der Sommer nach Bier und Meeresfrüchten.' },
    ],
    fragen: [
      { f: '青岛的啤酒传统是怎么来的？', optionen: ['美国人带来的', '德国人建了啤酒厂', '上海人发明的', '从日本学来的'], richtig: 1 },
      { f: '在青岛，人们怎么把啤酒带回家？', optionen: ['用塑料袋装', '用大瓶子', '让饭馆送', '不能带回家'], richtig: 0 },
    ],
  },
  {
    id: 'g-harbin',
    region: 'harbin',
    titel: '冰雪的城市',
    titelDe: 'Die Stadt aus Eis und Schnee',
    niveau: 'HSK 5',
    saetze: [
      { zh: '一月的哈尔滨，气温常常在零下二十度以下。', py: 'Yīyuè de Hā’ěrbīn, qìwēn chángcháng zài língxià èrshí dù yǐxià.', de: 'Im Januar liegen die Temperaturen in Harbin oft unter minus zwanzig Grad.' },
      { zh: '但是每年冬天，几百万游客来到这座城市。', py: 'Dànshì měi nián dōngtiān, jǐ bǎi wàn yóukè lái dào zhè zuò chéngshì.', de: 'Trotzdem kommen jeden Winter Millionen Touristen in diese Stadt.' },
      { zh: '他们来看世界上最大的冰雪节：用冰做的宫殿、塔和大桥，晚上亮着五颜六色的灯。', py: 'Tāmen lái kàn shìjiè shàng zuì dà de bīngxuě jié: yòng bīng zuò de gōngdiàn, tǎ hé dàqiáo, wǎnshang liàng zhe wǔyánliùsè de dēng.', de: 'Sie kommen zum größten Eis- und Schneefest der Welt: Paläste, Türme und Brücken aus Eis, nachts bunt beleuchtet.' },
      { zh: '工人们从河里切出几十万块冰，每一块都有几百公斤重。', py: 'Gōngrén men cóng hé lǐ qiē chū jǐ shí wàn kuài bīng, měi yí kuài dōu yǒu jǐ bǎi gōngjīn zhòng.', de: 'Arbeiter schneiden Hunderttausende Eisblöcke aus dem Fluss – jeder mehrere hundert Kilo schwer.' },
      { zh: '虽然天气很冷，但是没有人愿意早点回酒店。', py: 'Suīrán tiānqì hěn lěng, dànshì méiyǒu rén yuànyì zǎodiǎn huí jiǔdiàn.', de: 'Es ist zwar eiskalt, aber niemand will früher zurück ins Hotel.' },
    ],
    fragen: [
      { f: '游客冬天为什么来哈尔滨？', optionen: ['看冰雪节', '去海边游泳', '吃海鲜', '爬山'], richtig: 0 },
      { f: '做冰雪建筑的冰是从哪里来的？', optionen: ['从商店买的', '从河里切出来的', '用机器做的', '从北京运来的'], richtig: 1 },
    ],
  },
]
