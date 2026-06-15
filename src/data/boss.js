// 闯关 Boss-Battle-Lesen: Jede Welt entspricht einem HSK-Niveau,
// jeder Text ist ein „Gegner". Richtige Antwort = Schaden am Boss.
// Neue Texte einfach hier ergänzen – das Format erklärt sich selbst.

export const WELTEN = [
  {
    hsk: 3,
    name: 'Welt 1 · Aufwärmen (HSK 3)',
    boss: '👹',
    figur: 'oni', // Farb-Variante der animierten Boss-Figur (BossFigur.jsx)
    texte: [
      {
        id: 'w3t1',
        titel: '周末的计划',
        text: '这个周末我打算和朋友去公园拍照。如果天气不好，我们就去咖啡馆聊天。星期天晚上我要在家准备下周的会议。',
        fragen: [
          { f: '天气好的话，他们周末做什么？', optionen: ['去公园拍照', '去咖啡馆聊天', '在家开会', '去商店买东西'], richtig: 0 },
          { f: '如果天气不好呢？', optionen: ['不出门', '去咖啡馆聊天', '去朋友家', '去公园'], richtig: 1 },
          { f: '星期天晚上他要做什么？', optionen: ['看电影', '拍照', '准备下周的会议', '和朋友吃饭'], richtig: 2 },
        ],
      },
      {
        id: 'w3t2',
        titel: '在饭馆',
        text: '中午我们去了一家四川饭馆。我点了三个菜，都很辣，但是味道很好。吃不完的菜我们打包带走了。最后我们用手机扫码付款。',
        fragen: [
          { f: '菜怎么样？', optionen: ['很辣，但是很好吃', '不辣，也不好吃', '太贵了', '太甜了'], richtig: 0 },
          { f: '吃不完的菜怎么办？', optionen: ['留在桌子上', '送给服务员', '打包带走', '退给厨房'], richtig: 2 },
          { f: '他们怎么付款？', optionen: ['用现金', '用手机扫码', '用银行卡', '朋友请客'], richtig: 1 },
        ],
      },
    ],
  },
  {
    hsk: 4,
    name: 'Welt 2 · Auf Kurs (HSK 4)',
    boss: '🐲',
    figur: 'drache',
    texte: [
      {
        id: 'w4t1',
        titel: '一封邮件',
        text: '王经理您好：谢谢您昨天发来的报价。我们对价格基本满意，但是希望交货时间能提前一个星期。如果可以，我们下周就签合同。期待您的回复。',
        fragen: [
          { f: '这封邮件主要谈什么？', optionen: ['一次旅行', '报价和合同', '一个新产品', '公司的食堂'], richtig: 1 },
          { f: '客户希望改变什么？', optionen: ['价格', '交货时间', '产品颜色', '付款方式'], richtig: 1 },
          { f: '他们想什么时候签合同？', optionen: ['今天', '下个月', '下周', '明年'], richtig: 2 },
        ],
      },
      {
        id: 'w4t2',
        titel: '第一次坐高铁',
        text: '上个月我第一次在中国坐高铁，从北京到上海只用了四个半小时。车上很安静，也很干净。我一边看窗外的风景，一边给家人拍了很多视频。',
        fragen: [
          { f: '从北京到上海用了多长时间？', optionen: ['两个小时', '四个半小时', '六个小时', '一天'], richtig: 1 },
          { f: '车上怎么样？', optionen: ['很吵，人很多', '又安静又干净', '有点脏', '没有座位'], richtig: 1 },
          { f: '他在车上做了什么？', optionen: ['睡觉', '看书', '看风景、拍视频', '和邻座聊天'], richtig: 2 },
        ],
      },
    ],
  },
  {
    hsk: 5,
    name: 'Welt 3 · Zeitungsreif (HSK 5)',
    boss: '🐉',
    figur: 'gold',
    texte: [
      {
        id: 'w5t1',
        titel: '经济新闻',
        text: '据报道，今年第一季度该市的出口增长了百分之八，主要原因是新的贸易政策降低了部分产品的关税。不过，有专家提醒，全球供应链仍然存在风险，企业应该谨慎投资。',
        fragen: [
          { f: '第一季度出口增长了多少？', optionen: ['百分之五', '百分之八', '百分之十', '百分之十八'], richtig: 1 },
          { f: '增长的主要原因是什么？', optionen: ['新政策降低了关税', '工人增加了', '汇率变高了', '广告做得好'], richtig: 0 },
          { f: '专家建议企业怎么做？', optionen: ['多出口', '马上扩大生产', '谨慎投资', '提高价格'], richtig: 2 },
        ],
      },
      {
        id: 'w5t2',
        titel: '一场摄影展',
        text: '上周末，一场以「城市光线」为主题的摄影展在上海开幕。三十多位摄影师展出了他们的作品，内容包括老城区的生活和现代建筑。一位摄影师说：「好的照片不只是技术，更是对生活的态度。」',
        fragen: [
          { f: '摄影展的主题是什么？', optionen: ['城市光线', '自然风景', '美食文化', '老照片'], richtig: 0 },
          { f: '作品的内容包括什么？', optionen: ['只有建筑', '老城区的生活和现代建筑', '动物和植物', '体育比赛'], richtig: 1 },
          { f: '那位摄影师认为好照片是什么？', optionen: ['贵的相机', '运气好', '对生活的态度', '好的天气'], richtig: 2 },
        ],
      },
    ],
  },
]
