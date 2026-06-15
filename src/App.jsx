// App-Hülle: Kopfzeile (Streak, Vollbild, Dark/Light) + einfacher Router.
// Beim allerersten Start wird der Einstufungstest angeboten.

import React from 'react'
import { useStore } from './store.jsx'
import Home from './screens/Home.jsx'
import Lernen from './screens/Lernen.jsx'
import Dashboard from './screens/Dashboard.jsx'
import TestModus from './screens/TestModus.jsx'
import Einstellungen from './screens/Einstellungen.jsx'
import Themen from './screens/Themen.jsx'
import Einstufung from './screens/Einstufung.jsx'
import { SPIELMODI } from './modes/index.js'

function Kopfzeile() {
  const { state, geheZu, einstellungenSetzen } = useStore()

  // Echtes Vollbild über die Fullscreen-API (besonders fürs Handy / PWA)
  const vollbild = () => {
    if (document.fullscreenElement) document.exitFullscreen()
    else document.documentElement.requestFullscreen?.().catch(() => {})
  }

  return (
    <header className="flex items-center gap-2 py-4">
      <button onClick={() => geheZu('home')} className="flex items-baseline gap-2 mr-auto">
        <span className="zeichen text-2xl font-bold text-akzent">汉路</span>
        <span className="text-sm text-matt font-medium tracking-wide">HànLù</span>
      </button>
      <div
        className="px-3 h-11 rounded-2xl bg-panel2 border border-linie flex items-center gap-1.5 text-sm font-semibold"
        title="Lern-Streak"
      >
        🔥 {state.stats.streak}
      </div>
      <button
        onClick={vollbild}
        aria-label="Vollbild umschalten"
        className="w-11 h-11 rounded-2xl bg-panel2 border border-linie hover:border-akzent/60 transition"
      >
        ⛶
      </button>
      <button
        onClick={() => einstellungenSetzen({ hell: !state.einstellungen.hell })}
        aria-label="Hell/Dunkel umschalten"
        className="w-11 h-11 rounded-2xl bg-panel2 border border-linie hover:border-akzent/60 transition"
      >
        {state.einstellungen.hell ? '🌙' : '☀️'}
      </button>
      <button
        onClick={() => geheZu('einstellungen')}
        aria-label="Einstellungen"
        className="w-11 h-11 rounded-2xl bg-panel2 border border-linie hover:border-akzent/60 transition"
      >
        ⚙️
      </button>
    </header>
  )
}

export default function App() {
  const { state, ansicht } = useStore()

  // Erster Start → Einstufungstest (überspringbar)
  const erzwungeneEinstufung = !state.einstufungFertig

  let inhalt
  if (erzwungeneEinstufung || ansicht.name === 'einstufung') {
    inhalt = <Einstufung />
  } else {
    switch (ansicht.name) {
      case 'lernen': inhalt = <Lernen />; break
      case 'dashboard': inhalt = <Dashboard />; break
      case 'test': inhalt = <TestModus />; break
      case 'themen': inhalt = <Themen />; break
      case 'einstellungen': inhalt = <Einstellungen />; break
      case 'spiel': {
        const modus = SPIELMODI.find((m) => m.id === ansicht.params.id)
        inhalt = modus ? <modus.Komponente /> : <Home />
        break
      }
      default: inhalt = <Home />
    }
  }

  return (
    <div className="min-h-dvh hintergrund-glow">
      <div className="max-w-2xl mx-auto px-4 pb-12">
        {!erzwungeneEinstufung && <Kopfzeile />}
        {inhalt}
      </div>
    </div>
  )
}
