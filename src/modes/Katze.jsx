// 学习猫 Lern-Katze: Vollansicht von Mochi. Wächst mit XP und Streak,
// reagiert auf Lernerfolge. Die SVG-Katze, Level-Logik und Stimmung liegen
// in components/Mochi.jsx – dort lebt auch das dauerhafte Home-Widget.

import React, { useState } from 'react'
import { useStore, kartenFuerPool, faelligeKarten } from '../store.jsx'
import { KatzenSvg, levelAusXp, xpFuerLevel, stimmung } from '../components/Mochi.jsx'
import { Panel, BackBar, Fortschritt } from '../components/UI.jsx'

export default function Katze() {
  const { state, geheZu, katzeUmbenennen } = useStore()
  const xp = state.stats.xp
  const level = levelAusXp(xp)
  const naechstes = xpFuerLevel(level + 1)
  const aktuelles = xpFuerLevel(level)
  const faellig = faelligeKarten(kartenFuerPool(state)).length
  const [emoji, text] = stimmung(state, faellig)
  const [umbenennen, setUmbenennen] = useState(false)
  const [name, setName] = useState(state.katze.name)

  return (
    <div className="space-y-4">
      <BackBar titel="🐱 Lern-Katze" onZurueck={() => geheZu('home')} />

      <Panel className="text-center py-8 relative overflow-hidden">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-akzent/10 blur-3xl" />
        <div className="anim-mochi-bob inline-block">
          <KatzenSvg level={level} />
        </div>
        <div className="mt-4 flex items-center justify-center gap-2">
          {umbenennen ? (
            <>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-panel2 border border-linie rounded-xl px-3 py-1.5 text-center w-36"
                maxLength={16}
              />
              <button className="text-ok font-bold px-2 min-h-[40px]" onClick={() => { katzeUmbenennen(name.trim()); setUmbenennen(false) }}>✓</button>
            </>
          ) : (
            <button onClick={() => setUmbenennen(true)} className="text-xl font-bold min-h-[40px]">
              {state.katze.name} <span className="text-xs text-matt font-normal">✏️</span>
            </button>
          )}
        </div>
        <div className="text-akzent font-bold mt-1">Level {level}</div>
        <div className="max-w-xs mx-auto mt-3">
          <Fortschritt wert={xp - aktuelles} max={naechstes - aktuelles} farbe="bg-gold" />
          <div className="text-xs text-matt mt-1.5">{xp} XP · noch {Math.max(0, naechstes - xp)} XP bis Level {level + 1}</div>
        </div>
      </Panel>

      <Panel className="flex gap-3 items-start">
        <div className="text-3xl">{emoji}</div>
        <p className="text-sm leading-relaxed pt-1">{text}</p>
      </Panel>

      <Panel className="text-xs text-matt leading-relaxed">
        {state.katze.name} begleitet dich dauerhaft auf dem Startbildschirm und levelt mit allem, was du tust:
        SRS-Karten, Spiele, Bosse, Stories, entdeckte Regionen.
        Mit höheren Leveln gibt es Schal 🧣 (Lv 2), Mütze 🎩 (Lv 4), Brille 👓 (Lv 6), Aura ✨ (Lv 8) und einen Stern ⭐ (Lv 10).
      </Panel>
    </div>
  )
}
