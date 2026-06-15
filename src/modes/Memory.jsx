// 配对 Memory: klassisches Paare-Suchen mit 3D-Kartenflip –
// Hanzi ↔ deutsche Bedeutung. Wenige Züge = mehr Punkte.

import React, { useEffect, useState } from 'react'
import { useStore } from '../store.jsx'
import { mischen, stichprobe } from '../lib/utils.js'
import { Panel, Knopf, BackBar } from '../components/UI.jsx'
import { Konfetti } from '../components/Feedback.jsx'

const PAARE = 6

export default function Memory() {
  const { state, geheZu, highscoreSetzen, xpHinzu } = useStore()

  const baueSpiel = () => {
    const aktiv = new Set(state.themen.filter((t) => t.aktiv).map((t) => t.id))
    const alle = state.karten.filter((k) => aktiv.has(k.thema))
    const gelernt = alle.filter((k) => k.wiederholungen > 0)
    const auswahl = stichprobe(gelernt.length >= PAARE ? gelernt : alle, PAARE)
    return mischen(
      auswahl.flatMap((k) => [
        { schluessel: `${k.id}-zh`, paarId: k.id, seite: 'zh', label: k.hanzi },
        { schluessel: `${k.id}-de`, paarId: k.id, seite: 'de', label: k.bedeutung },
      ])
    )
  }

  const [kacheln, setKacheln] = useState(baueSpiel)
  const [offen, setOffen] = useState([]) // Indizes der gerade umgedrehten Karten
  const [geloest, setGeloest] = useState(new Set())
  const [zuege, setZuege] = useState(0)
  const [gesperrt, setGesperrt] = useState(false)
  const [belohnt, setBelohnt] = useState(false)

  const fertig = geloest.size === kacheln.length && kacheln.length > 0
  const punkte = Math.max(10, 120 - Math.max(0, zuege - PAARE) * 6)

  // Belohnung einmalig nach Spielende gutschreiben (Effekt, nicht im Render)
  useEffect(() => {
    if (fertig && !belohnt) {
      setBelohnt(true)
      highscoreSetzen('memory', punkte)
      xpHinzu(Math.round(punkte / 10))
    }
  }, [fertig, belohnt])

  const drehe = (idx) => {
    if (gesperrt || fertig) return
    if (offen.includes(idx) || geloest.has(kacheln[idx].schluessel)) return
    const neu = [...offen, idx]
    setOffen(neu)
    if (neu.length === 2) {
      setZuege((z) => z + 1)
      const [a, b] = neu.map((i) => kacheln[i])
      if (a.paarId === b.paarId) {
        setGeloest((g) => new Set([...g, a.schluessel, b.schluessel]))
        setOffen([])
      } else {
        setGesperrt(true)
        setTimeout(() => { setOffen([]); setGesperrt(false) }, 750)
      }
    }
  }

  const neustart = () => {
    setKacheln(baueSpiel())
    setOffen([]); setGeloest(new Set()); setZuege(0); setBelohnt(false)
  }

  if (kacheln.length < PAARE * 2) {
    return (
      <div>
        <BackBar titel="🃏 配对 Memory" onZurueck={() => geheZu('home')} />
        <Panel className="text-center py-10 text-matt">Zu wenige Karten in den aktiven Themen.</Panel>
      </div>
    )
  }

  return (
    <div>
      <BackBar
        titel="🃏 配对 Memory"
        onZurueck={() => geheZu('home')}
        rechts={<span className="text-sm text-matt whitespace-nowrap">{zuege} Züge</span>}
      />

      {fertig ? (
        <Panel className="text-center py-10 relative overflow-hidden">
          {punkte >= (state.highscores.memory || 0) && <Konfetti />}
          <div className="text-5xl mb-3 anim-sieg-pop relative">🏆</div>
          <div className="text-3xl font-bold text-akzent mb-1">{punkte} Punkte</div>
          <p className="text-matt mb-6">{zuege} Züge · Rekord: {state.highscores.memory || 0}</p>
          <div className="flex flex-col gap-2 max-w-xs mx-auto">
            <Knopf onClick={neustart}>Noch eine Runde</Knopf>
            <Knopf variante="sekundaer" onClick={() => geheZu('home')}>Zurück</Knopf>
          </div>
        </Panel>
      ) : (
        <>
          <p className="text-xs text-matt text-center mb-3">Finde die Paare: Zeichen ↔ Bedeutung</p>
          <div className="grid grid-cols-3 gap-2.5">
            {kacheln.map((k, idx) => {
              const istOffen = offen.includes(idx) || geloest.has(k.schluessel)
              const istGeloest = geloest.has(k.schluessel)
              return (
                <button key={k.schluessel} onClick={() => drehe(idx)} className="flip-aussen aspect-[3/4]" aria-label="Memory-Karte">
                  <div className={`flip-innen w-full h-full ${istOffen ? 'offen' : ''}`}>
                    {/* Rückseite (verdeckt) */}
                    <div className="flip-seite absolute inset-0 rounded-2xl border border-linie bg-panel2 flex items-center justify-center">
                      <span className="zeichen text-2xl text-akzent/60 font-bold">汉</span>
                    </div>
                    {/* Vorderseite (aufgedeckt) */}
                    <div
                      className={`flip-seite flip-rueck absolute inset-0 rounded-2xl border flex items-center justify-center p-1.5 text-center ${
                        istGeloest ? 'border-ok bg-ok/15 text-ok' : 'border-akzent bg-akzent/10'
                      }`}
                    >
                      <span className={k.seite === 'zh' ? 'zeichen text-2xl font-bold' : 'text-[11px] leading-tight font-medium'}>
                        {k.label}
                      </span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
