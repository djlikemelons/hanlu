// Fortschritts-Dashboard: Streak, Tageszahlen, Mastery-Verteilung,
// Verlaufskurve (letzte 30 Tage) und HSK-Schätzung. Läuft ab Tag 1 mit.

import React from 'react'
import { useStore, kartenFuerPool, faelligeKarten } from '../store.jsx'
import { heuteISO, tageAb } from '../lib/srs.js'
import { Panel, BackBar, Statistik } from '../components/UI.jsx'

const MASTERY_FARBEN = ['#475569', '#60a5fa', '#3b82f6', '#2563eb', '#34d399', '#fbbf24']
const MASTERY_LABEL = ['neu', 'frisch', 'übend', 'stabil', 'sicher', 'gemeistert']

function Verlaufskurve({ verlauf }) {
  // letzte 30 Tage als kleine SVG-Kurve
  const heute = heuteISO()
  const tage = Array.from({ length: 30 }, (_, i) => tageAb(heute, i - 29))
  const werte = tage.map((d) => verlauf[d]?.wdh || 0)
  const max = Math.max(5, ...werte)
  const punkte = werte.map((w, i) => `${(i / 29) * 300},${60 - (w / max) * 52}`).join(' ')
  return (
    <svg viewBox="0 0 300 64" className="w-full h-20">
      <polyline points={punkte} fill="none" stroke="var(--akzent)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      <polygon points={`0,64 ${punkte} 300,64`} fill="var(--akzent)" opacity="0.12" />
    </svg>
  )
}

export default function Dashboard() {
  const { state, geheZu } = useStore()
  const { stats, karten } = state

  const begonnen = karten.filter((k) => k.wiederholungen > 0).length
  const gemeistert = karten.filter((k) => k.mastery_level >= 5).length
  const faellig = faelligeKarten(kartenFuerPool(state)).length
  const verteilung = [0, 1, 2, 3, 4, 5].map((lvl) => karten.filter((k) => k.mastery_level === lvl).length)
  const gesamt = karten.length

  return (
    <div className="space-y-5">
      <BackBar titel="Fortschritt" onZurueck={() => geheZu('home')} />

      <Panel>
        <div className="grid grid-cols-3 gap-4">
          <Statistik wert={`🔥 ${stats.streak}`} label="Tage Streak" />
          <Statistik wert={stats.heute.wdh} label="heute gelernt" />
          <Statistik wert={faellig} label="noch fällig" />
        </div>
        <div className="grid grid-cols-3 gap-4 mt-5 pt-5 border-t border-linie">
          <Statistik wert={stats.heute.neu} label="heute neu" />
          <Statistik wert={begonnen} label="Wörter begonnen" />
          <Statistik wert={gemeistert} label="gemeistert" />
        </div>
      </Panel>

      <Panel>
        <h3 className="font-bold mb-3 text-sm">Aktivität · letzte 30 Tage</h3>
        <Verlaufskurve verlauf={stats.verlauf} />
      </Panel>

      <Panel>
        <h3 className="font-bold mb-3 text-sm">Mastery-Verteilung · {gesamt} Karten</h3>
        <div className="flex h-5 rounded-full overflow-hidden border border-linie">
          {verteilung.map((n, i) =>
            n > 0 ? (
              <div key={i} style={{ width: `${(n / gesamt) * 100}%`, background: MASTERY_FARBEN[i] }} title={`${MASTERY_LABEL[i]}: ${n}`} />
            ) : null
          )}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-matt">
          {verteilung.map((n, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: MASTERY_FARBEN[i] }} />
              {MASTERY_LABEL[i]} ({n})
            </span>
          ))}
        </div>
      </Panel>

      <Panel className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-sm">Geschätztes Niveau</h3>
          <p className="text-xs text-matt mt-1">aus dem Einstufungstest · XP gesamt: {stats.xp}</p>
        </div>
        <div className="text-2xl font-bold text-akzent">
          {stats.hskSchaetzung ? `HSK ${stats.hskSchaetzung}` : '—'}
        </div>
      </Panel>
    </div>
  )
}
