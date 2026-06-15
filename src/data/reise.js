// 中国地图 China-Reisekarte: abgeschlossene Lern-Sessions „reisen" dich
// von Stadt zu Stadt. Pro Etappe sind SESSIONS_PRO_ETAPPE Sessions nötig.
// Koordinaten beziehen sich auf die stilisierte SVG-Karte (viewBox 0 0 420 340).

export const SESSIONS_PRO_ETAPPE = 3

// Grob stilisierter Umriss Chinas (dekorativ, nicht maßstabsgetreu).
// Wird von der Reisekarte und der Entdecken-Karte gemeinsam genutzt.
export const CHINA_PFAD =
  'M 95 60 L 130 38 L 175 30 L 215 42 L 250 30 L 290 42 L 318 70 L 345 92 L 352 120 ' +
  'L 340 150 L 352 178 L 342 208 L 320 238 L 296 252 L 274 282 L 254 308 L 232 300 ' +
  'L 214 282 L 188 292 L 160 296 L 134 282 L 116 258 L 92 244 L 70 222 L 56 192 ' +
  'L 44 162 L 56 130 L 72 98 Z'

export const STATIONEN = [
  { id: 'guangzhou', name: '广州', pinyin: 'Guǎngzhōu', x: 252, y: 296, happen: 'Kantonesische Küche: 早茶 (zǎochá) – „Morgentee" mit Dim Sum (点心) ist hier ein Wochenend-Ritual. Man sagt: 食在广州 – „Essen? In Guangzhou!"' },
  { id: 'guilin', name: '桂林', pinyin: 'Guìlín', x: 226, y: 268, happen: '桂林山水甲天下 (Guìlín shānshuǐ jiǎ tiānxià) – „Guilins Landschaft ist die schönste unter dem Himmel." Die Karstberge am Li-Fluss zieren den 20-Yuan-Schein – ein Traum für Fotografen.' },
  { id: 'kunming', name: '昆明', pinyin: 'Kūnmíng', x: 162, y: 276, happen: 'Die „Stadt des ewigen Frühlings" (春城 chūnchéng). Berühmt: 过桥米线 (guòqiáo mǐxiàn) – „Über-die-Brücke-Reisnudeln" mit eigener Legende.' },
  { id: 'chengdu', name: '成都', pinyin: 'Chéngdū', x: 170, y: 216, happen: 'Heimat der Pandas und des 火锅 (huǒguō, Feuertopf). Die Sichuan-Küche spielt mit 麻辣 (málà) – „betäubend-scharf" durch Sichuan-Pfeffer.' },
  { id: 'chongqing', name: '重庆', pinyin: 'Chóngqìng', x: 200, y: 226, happen: 'Die „Bergstadt" (山城 shānchéng) am Jangtse: Wolkenkratzer in Nebelschwaden, Monorail durch Wohnhäuser – nachts ein Paradies für Stadtfotografie.' },
  { id: 'xian', name: '西安', pinyin: 'Xī’ān', x: 214, y: 178, happen: 'Start der alten Seidenstraße und Heimat der Terrakotta-Armee (兵马俑 bīngmǎyǒng). Probiere 肉夹馍 (ròujiāmó) – den „chinesischen Burger".' },
  { id: 'luoyang', name: '洛阳', pinyin: 'Luòyáng', x: 244, y: 176, happen: 'Eine der ältesten Hauptstädte Chinas. Im April blüht hier die Päonie (牡丹 mǔdān) – Luoyangs Stadtblume mit eigenem Festival.' },
  { id: 'beijing', name: '北京', pinyin: 'Běijīng', x: 282, y: 114, happen: 'Verbotene Stadt, Hutongs und 烤鸭 (kǎoyā, Pekingente). Smalltalk-Klassiker der Pekinger: 吃了吗？ – „Schon gegessen?" als Begrüßung.' },
  { id: 'qingdao', name: '青岛', pinyin: 'Qīngdǎo', x: 304, y: 150, happen: 'Küstenstadt mit deutscher Kolonialgeschichte – daher Chinas berühmtestes Bier: 青岛啤酒 (Qīngdǎo píjiǔ). Frisch gezapft kauft man es hier in Plastiktüten!' },
  { id: 'nanjing', name: '南京', pinyin: 'Nánjīng', x: 298, y: 200, happen: '„Südliche Hauptstadt" mit gewaltiger Ming-Stadtmauer. Spezialität: 盐水鸭 (yánshuǐyā), die Salzwasser-Ente.' },
  { id: 'hangzhou', name: '杭州', pinyin: 'Hángzhōu', x: 318, y: 226, happen: '上有天堂，下有苏杭 – „Oben das Paradies, unten Suzhou und Hangzhou." Am Westsee (西湖 Xīhú) wächst der berühmte Longjing-Tee (龙井茶).' },
  { id: 'shanghai', name: '上海', pinyin: 'Shànghǎi', x: 334, y: 208, happen: 'Ziel erreicht! Skyline von Pudong, Licht am 外滩 (Wàitān, der Bund) – und 小笼包 (xiǎolóngbāo, Suppenteigtaschen). Die perfekte Stadt für dein Foto-Portfolio.' },
]
