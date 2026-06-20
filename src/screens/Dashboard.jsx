// Fortschritts-Dashboard: Streak, Tageszahlen, Mastery-Verteilung,
// Verlaufskurve (letzte 30 Tage) und HSK-Schätzung. Läuft ab Tag 1 mit.

import React from 'react'
import { useStore, kartenFuerPool, faelligeKarten } from '../store.jsx'
import { heuteISO, tageAb } from '../lib/srs.js'
import { Panel, BackBar, Statistik } from '../components/UI.jsx'
import { SiegelSammlung } from '../components/Siegel.jsx'
import { SIEGEL } from '../lib/siegel.js'

const MASTERY_FARBEN = ['#475569', '#60a5fa', '#3b82f6', '#2563eb', '#34d399', '#fbbf24']
const MASTERY_LABEL = ['neu', 'frisch', 'übend', 'stabil', 'sicher', 'gemeistert']

// GitHub-artige Heatmap: letzte 18 Wochen, Spalte = Woche, Zeile = Wochentag.
function Heatmap({ verlauf }) {
  const wochen = 18
  const heute = heuteISO()
  const heuteWt = new Date(heute + 'T12:00:00').getDay() // 0 So … 6 Sa
  const endPad = 6 - heuteWt
  const gesamt = wochen * 7
  const zellen = []
  for (let i = 0; i < gesamt; i++) {
    const datum = tageAb(heute, i - (gesamt - 1 - endPad))
    const zukunft = datum > heute
    const n = verlauf[datum]?.wdh || 0
    const stil = zukunft
      ? { background: 'transparent' }
      : n === 0
        ? { background: 'var(--panel2)' }
        : { background: 'var(--akzent)', opacity: n >= 10 ? 1 : n >= 6 ? 0.8 : n >= 3 ? 0.55 : 0.32 }
    zellen.push(
      <div key={i} title={zukunft ? '' : `${datum}: ${n} Karten`} style={{ width: '100%', paddingBottom: '100%', borderRadius: 3, ...stil }} />
    )
  }
  return (
    <div
      className="grid gap-[3px]"
      style={{ gridTemplateRows: 'repeat(7, 1fr)', gridAutoFlow: 'column', gridAutoColumns: '1fr' }}
    >
      {zellen}
    </div>
  )
}

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
        <div className="text-xs text-matt mt-4 text-center">
          🛡️ {stats.freezes ?? 0} Streak-Schutz übrig · federt einen verpassten Tag ab
        </div>
      </Panel>

      <Panel>
        <h3 className="font-bold mb-3 text-sm">Lern-Heatmap · letzte 18 Wochen</h3>
        <Heatmap verlauf={stats.verlauf} />
        <div className="flex items-center gap-1.5 justify-end mt-3 text-[10px] text-matt">
          weniger
          {[0, 0.32, 0.55, 0.8, 1].map((o, i) => (
            <span
              key={i}
              className="inline-block w-2.5 h-2.5 rounded-[3px]"
              style={o === 0 ? { background: 'var(--panel2)' } : { background: 'var(--akzent)', opacity: o }}
            />
          ))}
          mehr
        </div>
      </Panel>

      <Panel>
        <h3 className="font-bold mb-3 text-sm">Aktivität · letzte 30 Tage</h3>
        <Verlaufskurve verlauf={stats.verlauf} />
      </Panel>

      <Panel>
        <h3 className="font-bold mb-1 text-sm">Siegel · 印章</h3>
        <p className="text-xs text-matt mb-4">Meilensteine: {(stats.siegel || []).length}/{SIEGEL.length} verdient</p>
        <SiegelSammlung verdienteIds={stats.siegel || []} />
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
