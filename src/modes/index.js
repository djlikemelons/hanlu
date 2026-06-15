// Spielmodi als modulare Plugins: Jeder Modus ist eine eigenständige
// Komponente, die auf denselben Kartendaten (useStore) arbeitet.
// Neuen Modus hinzufügen = Komponente schreiben + hier registrieren.
// verstecktImMenue: true → nicht im Home-Grid (z. B. Mochi, die als
// dauerhaftes Widget auf dem Startbildschirm lebt).

import Satzbauer from './Satzbauer.jsx'
import Sprint from './Sprint.jsx'
import TonDetektiv from './TonDetektiv.jsx'
import Memory from './Memory.jsx'
import Boss from './Boss.jsx'
import Story from './Story.jsx'
import Entdecken from './Entdecken.jsx'
import Lesen from './Lesen.jsx'
import Restaurant from './Restaurant.jsx'
import Hoerjagd from './Hoerjagd.jsx'
import SpeedReading from './SpeedReading.jsx'
import Katze from './Katze.jsx'
import Reisekarte from './Reisekarte.jsx'

export const SPIELMODI = [
  { id: 'satzbauer', emoji: '🧩', titel: '拼句 Satzbauer', untertitel: 'Sätze richtig zusammensetzen', Komponente: Satzbauer },
  { id: 'sprint', emoji: '⚡', titel: '词语冲刺 Sprint', untertitel: '45 Sekunden Vokabel-Rausch', Komponente: Sprint },
  { id: 'ton', emoji: '🎵', titel: '声调 Ton-Detektiv', untertitel: 'Finde die richtigen Töne', Komponente: TonDetektiv },
  { id: 'hoerjagd', emoji: '🎧', titel: '听力 Hörjagd', untertitel: 'Wort hören, Zeichen finden', Komponente: Hoerjagd },
  { id: 'memory', emoji: '🃏', titel: '配对 Memory', untertitel: 'Paare finden mit 3D-Flip', Komponente: Memory },
  { id: 'speedread', emoji: '⏱️', titel: '速读 Speed-Reading', untertitel: 'Zeitungstempo trainieren', Komponente: SpeedReading },
  { id: 'lesen', emoji: '📖', titel: '阅读 Lesen', untertitel: 'Lange Texte · Monatslektüre', Komponente: Lesen },
  { id: 'restaurant', emoji: '🍜', titel: '饭馆 Restaurant', untertitel: 'Gäste auf Chinesisch bedienen', Komponente: Restaurant },
  { id: 'boss', emoji: '⚔️', titel: '闯关 Boss-Battle', untertitel: 'Lesetexte in der 3D-Arena', Komponente: Boss },
  { id: 'story', emoji: '📖', titel: '互动小说 Story', untertitel: 'Interaktive Geschichte', Komponente: Story },
  { id: 'entdecken', emoji: '🧭', titel: '中国探索 Entdecken', untertitel: 'Kultur lesen & Geschichten erarbeiten', Komponente: Entdecken },
  { id: 'reise', emoji: '🗺️', titel: '中国地图 Reisekarte', untertitel: 'Durch China lernen', Komponente: Reisekarte },
  { id: 'katze', emoji: '🐱', titel: '学习猫 Lern-Katze', untertitel: 'Dein Begleiter wächst mit', Komponente: Katze, verstecktImMenue: true },
]
