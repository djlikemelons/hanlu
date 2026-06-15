// ============================================================
// 中国探索 ENTDECKEN – interaktive Kulturkarte
// ============================================================
// Jede Region hat 4 Kategorien: Spezialitäten, Rituale & Bräuche,
// Geschichte, Sehenswürdigkeiten. In den Texten markieren {schluessel}
// chinesische Begriffe – sie werden in der App antippbar gerendert und
// zeigen dann Pinyin + deutsche Bedeutung.
// Neue Regionen/Einträge: einfach dem Muster folgen.
// Koordinaten beziehen sich auf die SVG-Karte (viewBox 0 0 420 340).

export const KATEGORIEN = [
  { id: 'essen', titel: 'Spezialitäten', emoji: '🍜' },
  { id: 'rituale', titel: 'Rituale & Bräuche', emoji: '🏮' },
  { id: 'geschichte', titel: 'Geschichte', emoji: '📜' },
  { id: 'sehen', titel: 'Sehenswürdigkeiten', emoji: '🗺️' },
]

export const REGIONEN = [
  {
    id: 'beijing', name: '北京', pinyin: 'Běijīng', deName: 'Peking', emoji: '🏯', x: 282, y: 114,
    inhalte: {
      essen: [{
        text: 'Das berühmteste Gericht ist die knusprige {kaoya}, hauchdünn aufgeschnitten und in Pfannkuchen gerollt. Im Alltag isst man {zhajiangmian} – und Mutige probieren {douzhi}, ein fermentiertes Mungbohnen-Getränk mit kultigem Ruf.',
        begriffe: { kaoya: ['烤鸭', 'kǎoyā', 'Pekingente'], zhajiangmian: ['炸酱面', 'zhájiàngmiàn', 'Nudeln mit Bohnenpaste'], douzhi: ['豆汁', 'dòuzhī', 'fermentierter Mungbohnen-Drink'] },
      }],
      rituale: [{
        text: 'Frühmorgens üben Ältere in den Parks {taijiquan}, abends wird auf öffentlichen Plätzen getanzt. Zum Frühlingsfest strömen alle auf die {miaohui}. Klassischer Pekinger Smalltalk: {chilema} als Begrüßung.',
        begriffe: { taijiquan: ['太极拳', 'tàijíquán', 'Tai-Chi'], miaohui: ['庙会', 'miàohuì', 'Tempelmärkte'], chilema: ['吃了吗', 'chī le ma', '„Schon gegessen?" (Begrüßung)'] },
      }],
      geschichte: [{
        text: 'Über 500 Jahre regierten Ming- und Qing-Kaiser aus dem {gugong} – mit 8 700 Räumen die größte Palastanlage der Welt (ab 1420). 1949 wurde auf dem {tiananmen} die Volksrepublik ausgerufen.',
        begriffe: { gugong: ['故宫', 'Gùgōng', 'Verbotene Stadt'], tiananmen: ['天安门', 'Tiān’ānmén', 'Tor des Himmlischen Friedens'] },
      }],
      sehen: [{
        text: 'Vor der Stadt windet sich die {changcheng} über die Berge (z. B. bei Badaling oder Mutianyu). In der Stadt lohnen die alten {hutong}-Gassen mit ihren Hofhäusern und der Sommerpalast {yiheyuan} am Kunming-See.',
        begriffe: { changcheng: ['长城', 'Chángchéng', 'Große Mauer'], hutong: ['胡同', 'hútòng', 'traditionelle Gassen'], yiheyuan: ['颐和园', 'Yíhéyuán', 'Sommerpalast'] },
      }],
    },
  },
  {
    id: 'shanghai', name: '上海', pinyin: 'Shànghǎi', deName: 'Shanghai', emoji: '🌃', x: 334, y: 208,
    inhalte: {
      essen: [{
        text: 'Pflichtprogramm: {xiaolongbao} – vorsichtig anbeißen, erst die Suppe schlürfen! Morgens gibt es knusprig gebratene {shengjianbao}. Die lokale {benbangcai} schmeckt süßer und dunkler als andere Regionalküchen.',
        begriffe: { xiaolongbao: ['小笼包', 'xiǎolóngbāo', 'Suppenteigtaschen'], shengjianbao: ['生煎包', 'shēngjiānbāo', 'gebratene Teigtaschen'], benbangcai: ['本帮菜', 'běnbāngcài', 'Shanghai-Küche'] },
      }],
      rituale: [{
        text: 'Am {waitan} machen Frühaufsteher {chenlian} mit Blick auf die Skyline. Kurios: Im People’s Park betreiben Eltern am {xiangqinjiao} Partnersuche für ihre Kinder – mit Lebensläufen auf aufgespannten Schirmen.',
        begriffe: { waitan: ['外滩', 'Wàitān', 'der Bund (Uferpromenade)'], chenlian: ['晨练', 'chénliàn', 'Morgengymnastik'], xiangqinjiao: ['相亲角', 'xiāngqīnjiǎo', '„Heiratsmarkt-Ecke"'] },
      }],
      geschichte: [{
        text: 'Nach 1843 wurde Shanghai Vertragshafen; die europäischen {zujie} prägen bis heute die Architektur am Bund und in der ehemaligen Französischen Konzession. In nur 30 Jahren wuchs gegenüber in {pudong} eine komplett neue Skyline.',
        begriffe: { zujie: ['租界', 'zūjiè', 'Konzessionen (Pachtgebiete)'], pudong: ['浦东', 'Pǔdōng', 'Stadtteil östlich des Huangpu'] },
      }],
      sehen: [{
        text: 'Wahrzeichen ist der {dongfangmingzhu} – am schönsten von der Uferpromenade bei Nacht. Ruhe findet man im klassischen {yuyuan}-Garten, Streetlife in den Plattenbau-Gassen von Tianzifang.',
        begriffe: { dongfangmingzhu: ['东方明珠', 'Dōngfāng Míngzhū', 'Oriental Pearl Tower'], yuyuan: ['豫园', 'Yùyuán', 'Yu-Garten'] },
      }],
    },
  },
  {
    id: 'sichuan', name: '四川', pinyin: 'Sìchuān', deName: 'Sichuan (Chengdu)', emoji: '🌶️', x: 170, y: 216,
    inhalte: {
      essen: [{
        text: 'Hauptstadt des {huoguo}: brodelnde Brühe, in die man alles tunkt. Klassiker wie {mapodoufu} leben vom Geschmack {mala} – der Sichuan-Pfeffer betäubt die Lippen, das Chili brennt. Süchtig machend!',
        begriffe: { huoguo: ['火锅', 'huǒguō', 'Feuertopf'], mapodoufu: ['麻婆豆腐', 'mápó dòufu', 'Mapo-Tofu'], mala: ['麻辣', 'málà', '„betäubend-scharf"'] },
      }],
      rituale: [{
        text: 'Nirgendwo ist das Leben entspannter: Man sitzt stundenlang im {chaguan} auf Bambusstühlen, lässt sich traditionell die Ohren reinigen und spielt lautstark {majiang}. Chengdus Motto: Gemütlichkeit ist eine Kunstform.',
        begriffe: { chaguan: ['茶馆', 'cháguǎn', 'Teehaus'], majiang: ['麻将', 'májiàng', 'Mahjong'] },
      }],
      geschichte: [{
        text: 'Schauplatz der {sanguo}-Epoche (Drei Reiche, 3. Jh.) – Helden wie Zhuge Liang werden hier bis heute verehrt. Das Bewässerungssystem {dujiangyan} von 256 v. Chr. funktioniert nach 2 200 Jahren immer noch.',
        begriffe: { sanguo: ['三国', 'Sānguó', 'Drei Reiche'], dujiangyan: ['都江堰', 'Dūjiāngyàn', 'antikes Bewässerungssystem'] },
      }],
      sehen: [{
        text: 'In der Aufzuchtstation nördlich von Chengdu siehst du {xiongmao} aus nächster Nähe. Der {dafo} von Leshan – 71 Meter, aus dem Fels gehauen – ist der größte sitzende Buddha der Welt.',
        begriffe: { xiongmao: ['熊猫', 'xióngmāo', 'Panda'], dafo: ['大佛', 'dàfó', 'Großer Buddha'] },
      }],
    },
  },
  {
    id: 'guangdong', name: '广东', pinyin: 'Guǎngdōng', deName: 'Guangdong (Guangzhou)', emoji: '🥟', x: 252, y: 296,
    inhalte: {
      essen: [{
        text: '{zaocha} ist hier Lebensart: Am Wochenende sitzt die ganze Familie stundenlang beim Tee und bestellt Körbchen um Körbchen {dianxin}. Dazu glänzt in den Schaufenstern {shaola} – kantonesisches BBQ.',
        begriffe: { zaocha: ['早茶', 'zǎochá', '„Morgentee" (Dim-Sum-Frühstück)'], dianxin: ['点心', 'diǎnxīn', 'Dim Sum'], shaola: ['烧腊', 'shāolà', 'kantonesisches Grillfleisch'] },
      }],
      rituale: [{
        text: 'Zu Geschäftseröffnungen springt der {wushi} nach dem Salat überm Türrahmen – das bringt Glück. Gesprochen wird neben Mandarin stolz {yueyu}, mit neun Tönen statt vier.',
        begriffe: { wushi: ['舞狮', 'wǔshī', 'Löwentanz'], yueyu: ['粤语', 'Yuèyǔ', 'Kantonesisch'] },
      }],
      geschichte: [{
        text: 'Guangzhou war Endpunkt der maritimen {sichouzhilu} und im 18. Jahrhundert mit den {shisanhang} der einzige für Ausländer geöffnete Handelshafen Chinas – die Wiege des China-Welthandels.',
        begriffe: { sichouzhilu: ['丝绸之路', 'Sīchóu zhī Lù', 'Seidenstraße'], shisanhang: ['十三行', 'Shísānháng', '„Dreizehn Faktoreien" (Handelshäuser)'] },
      }],
      sehen: [{
        text: 'Der futuristische {guangzhouta} leuchtet nachts über dem {zhujiang} – am schönsten bei einer Flussfahrt. Dazu: die kunstvoll verzierte Chen-Clan-Akademie und endlose Streetfood-Gassen.',
        begriffe: { guangzhouta: ['广州塔', 'Guǎngzhōutǎ', 'Canton Tower'], zhujiang: ['珠江', 'Zhūjiāng', 'Perlfluss'] },
      }],
    },
  },
  {
    id: 'shaanxi', name: '陕西', pinyin: 'Shǎnxī', deName: 'Shaanxi (Xi’an)', emoji: '🏺', x: 214, y: 178,
    inhalte: {
      essen: [{
        text: 'Xi’an ist Streetfood-Paradies: {roujiamo} („chinesischer Burger"), {yangroupaomo} – Fladenbrot, das man selbst in Lammsuppe bröselt – und die berühmt-breiten Biangbiang-Nudeln, deren Zeichen so komplex ist, dass es in kaum einem Font existiert.',
        begriffe: { roujiamo: ['肉夹馍', 'ròujiāmó', 'Fladenbrot mit Schmorfleisch'], yangroupaomo: ['羊肉泡馍', 'yángròu pàomó', 'Lammsuppe mit Brot'] },
      }],
      rituale: [{
        text: 'Im muslimischen Viertel {huiminjie} mischen sich seit 1 300 Jahren Kulturen der Seidenstraße. Abends führen Meister das uralte {piyingxi} auf – Schattenspiel mit Lederfiguren.',
        begriffe: { huiminjie: ['回民街', 'Huímínjiē', 'Muslimisches Viertel'], piyingxi: ['皮影戏', 'píyǐngxì', 'Schattenspiel'] },
      }],
      geschichte: [{
        text: 'Als {changan} war Xi’an Hauptstadt von 13 Dynastien und mit über einer Million Einwohnern zeitweise die größte Stadt der Welt – hier begann die {sichouzhilu} nach Westen.',
        begriffe: { changan: ['长安', 'Cháng’ān', '„Ewiger Friede" (alter Name Xi’ans)'], sichouzhilu: ['丝绸之路', 'Sīchóu zhī Lù', 'Seidenstraße'] },
      }],
      sehen: [{
        text: 'Die {bingmayong} – über 8 000 lebensgroße Soldaten für das Grab des Ersten Kaisers – sind Weltwunder-Niveau. Danach: mit dem Rad über die komplett erhaltene {chengqiang} (14 km!) und zur {dayanta}.',
        begriffe: { bingmayong: ['兵马俑', 'bīngmǎyǒng', 'Terrakotta-Armee'], chengqiang: ['城墙', 'chéngqiáng', 'Stadtmauer'], dayanta: ['大雁塔', 'Dàyàntǎ', 'Große Wildganspagode'] },
      }],
    },
  },
  {
    id: 'yunnan', name: '云南', pinyin: 'Yúnnán', deName: 'Yunnan (Kunming)', emoji: '🌸', x: 162, y: 276,
    inhalte: {
      essen: [{
        text: 'Berühmt sind {guoqiaomixian}: kochende Brühe kommt zuerst, die rohen Zutaten garen am Tisch. Im Sommer dreht sich alles um {yeshengjun} – Wildpilze, für die Yunnanesen jedes Risiko eingehen. Süß: {xianhuabing} mit echten Rosenblättern.',
        begriffe: { guoqiaomixian: ['过桥米线', 'guòqiáo mǐxiàn', '„Über-die-Brücke"-Reisnudeln'], yeshengjun: ['野生菌', 'yěshēngjūn', 'Wildpilze'], xianhuabing: ['鲜花饼', 'xiānhuābǐng', 'Blütenkuchen'] },
      }],
      rituale: [{
        text: 'In Yunnan leben 25 der 56 {shaoshuminzu} Chinas – jede mit eigener Sprache, Tracht und Festen. Spektakulär: das {huobajie} der Yi, wenn nachts tausende Fackeln durch die Dörfer ziehen.',
        begriffe: { shaoshuminzu: ['少数民族', 'shǎoshù mínzú', 'ethnische Minderheiten'], huobajie: ['火把节', 'Huǒbǎjié', 'Fackelfest'] },
      }],
      geschichte: [{
        text: 'Über die {chamagudao} tauschten Karawanen jahrhundertelang Pferde aus Tibet gegen gepressten {puercha} – die Teeziegel dienten unterwegs sogar als Währung.',
        begriffe: { chamagudao: ['茶马古道', 'Chámǎ Gǔdào', 'Tee-Pferde-Straße'], puercha: ['普洱茶', 'Pǔ’ěrchá', 'Pu-Erh-Tee'] },
      }],
      sehen: [{
        text: 'Der {shilin} ist ein Labyrinth aus messerscharfen Karstnadeln. Weiter nordwestlich locken die Altstadt von {lijiang} (UNESCO) und die Tigersprung-Schlucht – eine der tiefsten der Welt.',
        begriffe: { shilin: ['石林', 'Shílín', 'Steinwald'], lijiang: ['丽江', 'Lìjiāng', 'Lijiang (Altstadt)'] },
      }],
    },
  },
  {
    id: 'guangxi', name: '广西', pinyin: 'Guǎngxī', deName: 'Guangxi (Guilin)', emoji: '⛰️', x: 226, y: 268,
    inhalte: {
      essen: [{
        text: 'Frühstück in Guilin heißt {guilinmifen} – Reisnudeln mit eingelegtem Gemüse, jede Garküche hütet ihr Brühen-Rezept. Aus dem Nachbarort Liuzhou kommt {luosifen}, dessen Geruch spaltet und dessen Geschmack süchtig macht.',
        begriffe: { guilinmifen: ['桂林米粉', 'Guìlín mǐfěn', 'Guilin-Reisnudeln'], luosifen: ['螺蛳粉', 'luósīfěn', 'Schneckennudeln'] },
      }],
      rituale: [{
        text: 'Am {sanyuesan} (3. Tag des 3. Mondmonats) feiern die Zhuang ihr Gesangsfest – Paare finden sich traditionell im Wechselgesang. Auf dem Li-Fluss fischen Männer nachts mit zahmen {luci} im Laternenlicht.',
        begriffe: { sanyuesan: ['三月三', 'Sānyuèsān', 'Gesangsfest der Zhuang'], luci: ['鸬鹚', 'lúcí', 'Kormoran'] },
      }],
      geschichte: [{
        text: 'Die Karstberge inspirieren seit der Tang-Zeit die {shanshuihua}. Das Sprichwort {guilinshanshui} ziert sogar den 20-Yuan-Schein – halte ihn am Li-Fluss einfach neben die Kulisse.',
        begriffe: { shanshuihua: ['山水画', 'shānshuǐhuà', 'Landschaftsmalerei'], guilinshanshui: ['桂林山水甲天下', 'Guìlín shānshuǐ jiǎ tiānxià', '„Guilins Landschaft ist die schönste unter dem Himmel"'] },
      }],
      sehen: [{
        text: 'Die Bootsfahrt auf dem {lijiang2} nach {yangshuo} gehört zu den schönsten Flussreisen der Welt. Im Norden staffeln sich die Reisterrassen von Longji wie ein Drachenrücken die Hänge hinauf.',
        begriffe: { lijiang2: ['漓江', 'Líjiāng', 'Li-Fluss'], yangshuo: ['阳朔', 'Yángshuò', 'Yangshuo'] },
      }],
    },
  },
  {
    id: 'zhejiang', name: '浙江', pinyin: 'Zhèjiāng', deName: 'Zhejiang (Hangzhou)', emoji: '🍵', x: 318, y: 226,
    inhalte: {
      essen: [{
        text: 'Hangzhous Küche ist fein und leicht: {longjingxiaren} verbindet Garnelen mit frischen Teeblättern, {dongporou} ist nach dem Dichter Su Dongpo benannt – stundenlang geschmorter Schweinebauch, der auf der Zunge zergeht.',
        begriffe: { longjingxiaren: ['龙井虾仁', 'lóngjǐng xiārén', 'Garnelen mit Longjing-Tee'], dongporou: ['东坡肉', 'Dōngpōròu', 'Dongpo-Schweinebauch'] },
      }],
      rituale: [{
        text: 'Ende März beginnt die Teeernte: Der teuerste {mingqian}-Tee wird vor dem Qingming-Fest von Hand gepflückt. In den Dörfern um den Westsee kannst du beim Rösten in heißen Woks zusehen.',
        begriffe: { mingqian: ['明前', 'míngqián', '„vor Qingming" (früheste Teeernte)'] },
      }],
      geschichte: [{
        text: 'Als {linan} war Hangzhou Hauptstadt der Südlichen Song (1138–1276) und vermutlich die größte Stadt der Welt. Marco Polo schwärmte von ihr als der „prächtigsten Stadt des Erdkreises".',
        begriffe: { linan: ['临安', 'Lín’ān', 'Lin’an (Song-Hauptstadt)'] },
      }],
      sehen: [{
        text: 'Der {xihu} mit seinen Dämmen, Pagoden und Brücken ist seit Jahrhunderten DAS Sehnsuchtsmotiv chinesischer Poesie. Im Bambuswald versteckt liegt der {lingyinsi} mit hunderten Felsbuddhas.',
        begriffe: { xihu: ['西湖', 'Xīhú', 'Westsee'], lingyinsi: ['灵隐寺', 'Língyǐnsì', 'Lingyin-Tempel'] },
      }],
    },
  },
  {
    id: 'shandong', name: '山东', pinyin: 'Shāndōng', deName: 'Shandong (Qingdao)', emoji: '🍺', x: 304, y: 150,
    inhalte: {
      essen: [{
        text: 'Frisches {haixian} direkt vom Kutter, dazu {qingdaopijiu} – frisch gezapft kauft man es hier tatsächlich in Plastiktüten und trinkt mit dem Strohhalm daraus.',
        begriffe: { haixian: ['海鲜', 'hǎixiān', 'Meeresfrüchte'], qingdaopijiu: ['青岛啤酒', 'Qīngdǎo píjiǔ', 'Tsingtao-Bier'] },
      }],
      rituale: [{
        text: 'Jeden August feiert die Stadt ihr riesiges {pijiujie} – Chinas Antwort aufs Oktoberfest. Sonntags trifft man sich zum Schwimmen an den Stadtstränden, im Winter sogar zum Eisbaden.',
        begriffe: { pijiujie: ['啤酒节', 'píjiǔjié', 'Bierfest'] },
      }],
      geschichte: [{
        text: '1898 wurde Qingdao deutsche {zhimindi} – daher Backsteinvillen, das Gouverneurspalais und die 1903 gegründete Brauerei. Shandong ist außerdem Heimat von {kongzi}, dessen Lehren China bis heute prägen.',
        begriffe: { zhimindi: ['殖民地', 'zhímíndì', 'Kolonie'], kongzi: ['孔子', 'Kǒngzǐ', 'Konfuzius'] },
      }],
      sehen: [{
        text: 'Wahrzeichen ist die {zhanqiao}-Seebrücke mit ihrem Pavillon (sie ziert das Bier-Etikett!). Vor der Stadt erhebt sich der daoistische Küstenberg {laoshan} direkt aus dem Meer.',
        begriffe: { zhanqiao: ['栈桥', 'Zhànqiáo', 'Zhanqiao-Pier'], laoshan: ['崂山', 'Láoshān', 'Laoshan-Gebirge'] },
      }],
    },
  },
  {
    id: 'harbin', name: '哈尔滨', pinyin: 'Hā’ěrbīn', deName: 'Harbin (Heilongjiang)', emoji: '❄️', x: 330, y: 52,
    inhalte: {
      essen: [{
        text: 'Bei −20 °C wärmt {guobaorou} – knusprig-süßsaures Schweinefleisch, hier erfunden. Dazu russisch geprägte {hongchang}-Wurst und als Mutprobe: kandierte {bingtanghulu} und Speiseeis, das man im Winter draußen am Stand isst.',
        begriffe: { guobaorou: ['锅包肉', 'guōbāoròu', 'süß-saures Knusperfleisch'], hongchang: ['红肠', 'hóngcháng', 'Harbin-Rotwurst'], bingtanghulu: ['冰糖葫芦', 'bīngtánghúlu', 'kandierte Früchte am Spieß'] },
      }],
      rituale: [{
        text: 'Die härtesten Harbiner schwören aufs {dongyong}: Bei Minusgraden wird ein Loch ins Eis des Songhua-Flusses gesägt – und hineingesprungen. Zuschauen kostet nichts, Mitmachen Überwindung.',
        begriffe: { dongyong: ['冬泳', 'dōngyǒng', 'Winterschwimmen'] },
      }],
      geschichte: [{
        text: 'Harbin entstand um 1900 als Knotenpunkt der russisch gebauten {zhongdongtielu} und galt mit Kirchen, Boulevards und Emigranten aus aller Welt als „Moskau des Ostens".',
        begriffe: { zhongdongtielu: ['中东铁路', 'Zhōngdōng Tiělù', 'Chinesische Osteisenbahn'] },
      }],
      sehen: [{
        text: 'Im Januar verwandelt das Eisfestival {bingxuedashijie} die Stadt in Paläste aus beleuchtetem Eis – nachts ein Farbenrausch. Im Zentrum glänzt die Zwiebelkuppel der {suofeiya}.',
        begriffe: { bingxuedashijie: ['冰雪大世界', 'Bīngxuě Dàshìjiè', '„Große Eis- und Schneewelt"'], suofeiya: ['索菲亚教堂', 'Suǒfēiyà Jiàotáng', 'Sophienkathedrale'] },
      }],
    },
  },
]
