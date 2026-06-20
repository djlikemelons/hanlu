// „Wort des Tages": Chengyu (成语) & kulturell interessante Wörter auf
// HSK-5/6-Niveau, je mit kurzer Kultur-/Hintergrundnotiz. Die App wählt
// täglich deterministisch einen Eintrag (siehe components/WortDesTages.jsx).

export const WORT_DES_TAGES = [
  { hanzi: '入乡随俗', pinyin: 'rù xiāng suí sú', bedeutung: 'sich den örtlichen Sitten anpassen', notiz: 'Wörtlich „betrittst du ein Dorf, folge seinen Bräuchen" – das chinesische „Andere Länder, andere Sitten".' },
  { hanzi: '一举两得', pinyin: 'yì jǔ liǎng dé', bedeutung: 'zwei Fliegen mit einer Klappe', notiz: '„Mit einer Handlung zweierlei gewinnen." Sehr häufiges Chengyu im Alltag und in Zeitungen.' },
  { hanzi: '熟能生巧', pinyin: 'shú néng shēng qiǎo', bedeutung: 'Übung macht den Meister', notiz: '„Vertrautheit erzeugt Geschick." Klassische Ermutigung beim Lernen.' },
  { hanzi: '画蛇添足', pinyin: 'huà shé tiān zú', bedeutung: 'des Guten zu viel tun', notiz: '„Einer Schlange Füße anmalen" – etwas Überflüssiges hinzufügen und es dadurch verschlechtern.' },
  { hanzi: '对牛弹琴', pinyin: 'duì niú tán qín', bedeutung: 'Perlen vor die Säue werfen', notiz: '„Einer Kuh auf der Zither vorspielen" – zu jemandem reden, der es nicht versteht.' },
  { hanzi: '半途而废', pinyin: 'bàn tú ér fèi', bedeutung: 'auf halbem Weg aufgeben', notiz: 'Mahnung, eine Sache nicht unvollendet zu lassen – beliebtes Prüfungsvokabular.' },
  { hanzi: '胸有成竹', pinyin: 'xiōng yǒu chéng zhú', bedeutung: 'einen festen Plan haben', notiz: '„Den fertigen Bambus schon vor Augen haben" – aus der Tuschmalerei: erst im Kopf, dann auf Papier.' },
  { hanzi: '井底之蛙', pinyin: 'jǐng dǐ zhī wā', bedeutung: 'jemand mit beschränktem Horizont', notiz: '„Der Frosch auf dem Grund des Brunnens" sieht nur ein kleines Stück Himmel.' },
  { hanzi: '自相矛盾', pinyin: 'zì xiāng máo dùn', bedeutung: 'sich selbst widersprechen', notiz: 'Aus der Geschichte vom Händler, der unbesiegbaren Speer (矛) und undurchdringlichen Schild (盾) zugleich anpries.' },
  { hanzi: '五湖四海', pinyin: 'wǔ hú sì hǎi', bedeutung: 'aus aller Welt / von überallher', notiz: '„Fünf Seen und vier Meere" – steht für das ganze Land bzw. die ganze Welt.' },
  { hanzi: '一帆风顺', pinyin: 'yì fān fēng shùn', bedeutung: 'reibungsloser Verlauf', notiz: '„Mit vollem Segel günstigen Wind haben." Häufiger Glückwunsch zu Neuanfängen und Reisen.' },
  { hanzi: '名胜古迹', pinyin: 'míngshèng gǔjì', bedeutung: 'Sehenswürdigkeiten & historische Stätten', notiz: 'Feststehender Ausdruck in Reiseprospekten und Nachrichten – typisches HSK-5-Vokabular.' },
  { hanzi: '春节', pinyin: 'chūnjié', bedeutung: 'Frühlingsfest (chin. Neujahr)', notiz: 'Wichtigstes Fest Chinas. Man isst 饺子 (Teigtaschen) und verschenkt 红包 (rote Umschläge mit Geld).' },
  { hanzi: '中秋节', pinyin: 'zhōngqiūjié', bedeutung: 'Mondfest', notiz: 'Im Herbst; man isst 月饼 (Mondkuchen) und bewundert gemeinsam den Vollmond – Symbol der Familienzusammenkunft.' },
  { hanzi: '红包', pinyin: 'hóngbāo', bedeutung: 'roter Geldumschlag', notiz: 'Geldgeschenk in rotem Kuvert zu Festen und Hochzeiten – heute oft digital via WeChat verschickt.' },
  { hanzi: '风水', pinyin: 'fēngshuǐ', bedeutung: 'Fengshui', notiz: '„Wind und Wasser" – die Lehre von der harmonischen Anordnung von Gebäuden und Räumen.' },
  { hanzi: '太极', pinyin: 'tàijí', bedeutung: 'Taiji (Schattenboxen)', notiz: 'Langsame Bewegungskunst; das 太极-Symbol steht für das Wechselspiel von 阴 (yīn) und 阳 (yáng).' },
  { hanzi: '面子', pinyin: 'miànzi', bedeutung: 'Gesicht (Prestige, Ansehen)', notiz: 'Zentrale soziale Vorstellung: jemandem „Gesicht geben" (给面子) oder „Gesicht verlieren" (丢面子).' },
  { hanzi: '关系', pinyin: 'guānxi', bedeutung: 'Beziehungen, Netzwerk', notiz: 'Persönliche Beziehungsnetzwerke – im Geschäftsleben Chinas von großer Bedeutung.' },
  { hanzi: '入木三分', pinyin: 'rù mù sān fēn', bedeutung: 'tiefgründig, scharfsinnig', notiz: '„Drei Zehntel tief ins Holz dringen" – über die kraftvolle Schrift des Kalligrafen 王羲之.' },
  { hanzi: '望梅止渴', pinyin: 'wàng méi zhǐ kě', bedeutung: 'sich mit Illusionen trösten', notiz: '„Pflaumen erblicken, um den Durst zu stillen" – aus einer List des Feldherrn 曹操.' },
  { hanzi: '塞翁失马', pinyin: 'sài wēng shī mǎ', bedeutung: 'Glück im Unglück', notiz: '„Der alte Mann an der Grenze verliert sein Pferd" – ein Unglück kann sich als Segen erweisen.' },
  { hanzi: '龙', pinyin: 'lóng', bedeutung: 'Drache', notiz: 'In China ein Glückssymbol für Macht und Kaiser – nicht das bedrohliche Wesen der westlichen Sagen.' },
  { hanzi: '福', pinyin: 'fú', bedeutung: 'Glück, Segen', notiz: 'Zu Neujahr oft kopfüber (福倒) aufgehängt – 倒 (umgekehrt) klingt wie 到 (ankommen): „Das Glück kommt an".' },
]
