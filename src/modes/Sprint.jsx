// 词语冲刺 Vokabel-Sprint: 45 Sekunden, schnell die richtige Bedeutung wählen.
// Schnelligkeits-Bonus + Combo-Multiplikator für schnelle Serien. Highscore.

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useStore } from '../store.jsx'
import { mischen, stichprobe } from '../lib/utils.js'
import { Panel, Knopf, BackBar } from '../components/UI.jsx'
import { useFeedback, FeedbackOverlay, wackelKlasse, Konfetti } from '../components/Feedback.jsx'

const DAUER = 45

export default function Sprint() {
  const { state, geheZu, highscoreSetzen, xpHinzu } = useStore()

  const pool = useMemo(() => {
    const aktiv = new Set(state.themen.filter((t) => t.aktiv).map((t) => t.id))
    const alle = state.karten.filter((k) => aktiv.has(k.thema))
    const gelernt = alle.filter((k) => k.wiederholungen > 0)
    return gelernt.length >= 8 ? gelernt : alle // bevorzugt bereits gelernte Wörter
  }, [])

  const [phase, setPhase] = useState('start') // start | lauf | ende
  const [zeit, setZeit] = useState(DAUER)
  const [punkte, setPunkte] = useState(0)
  const [combo, setCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)
  const [frage, setFrage] = useState(null)
  const [fb, zeigeFb] = useFeedback()
  const frageStart = useRef(0)
  const beendet = useRef(false)

  const neueFrage = () => {
    const k = pool[Math.floor(Math.random() * pool.length)]
    const falsche = stichprobe(pool.filter((x) => x.id !== k.id), 3).map((x) => x.bedeutung)
    frageStart.current = Date.now()
    setFrage({ karte: k, optionen: mischen([k.bedeutung, ...falsche]) })
  }

  // Countdown
  useEffect(() => {
    if (phase !== 'lauf') return
    const t = setInterval(() => setZeit((z) => z - 1), 1000)
    return () => clearInterval(t)
  }, [phase])

  // Spielende
  useEffect(() => {
    if (phase === 'lauf' && zeit <= 0 && !beendet.current) {
      beendet.current = true
      highscoreSetzen('sprint', punkte)
      xpHinzu(Math.round(punkte / 10))
      setPhase('ende')
    }
  }, [zeit, phase, punkte])

  const starten = () => {
    beendet.current = false
    setPunkte(0); setCombo(0); setMaxCombo(0); setZeit(DAUER)
    neueFrage()
    setPhase('lauf')
  }

  const antworten = (option) => {
    if (zeit <= 0) return
    const ok = option === frage.karte.bedeutung
    if (ok) {
      // je schneller, desto mehr Punkte; Combo multipliziert schnelle Serien
      const sek = (Date.now() - frageStart.current) / 1000
      const tempoBonus = sek < 2 ? 5 : sek < 4 ? 2 : 0
      const neueCombo = combo + 1
      const gewinn = 10 + tempoBonus + Math.min(10, neueCombo) * 2
      setPunkte((p) => p + gewinn)
      setCombo(neueCombo)
      setMaxCombo((m) => Math.max(m, neueCombo))
      zeigeFb(true, gewinn)
    } else {
      setCombo(0)
      zeigeFb(false)
    }
    neueFrage()
  }

  if (pool.length < 4) {
    return (
      <div>
        <BackBar titel="⚡ Vokabel-Sprint" onZurueck={() => geheZu('home')} />
        <Panel className="text-center py-10 text-matt">Zu wenige Karten in den aktiven Themen.</Panel>
      </div>
    )
  }

  if (phase === 'start' || phase === 'ende') {
    const rekord = state.highscores.sprint || 0
    return (
      <div>
        <BackBar titel="⚡ Vokabel-Sprint" onZurueck={() => geheZu('home')} />
        <Panel className="text-center py-10 relative overflow-hidden">
          {phase === 'ende' && punkte >= rekord && punkte > 0 && <Konfetti />}
          {phase === 'ende' ? (
            <>
              <div className={`text-5xl mb-3 relative ${punkte >= rekord && punkte > 0 ? 'anim-sieg-pop' : ''}`}>{punkte >= rekord && punkte > 0 ? '🏆' : '⏱️'}</div>
              <div className="text-3xl font-bold text-akzent mb-1">{punkte} Punkte</div>
              <p className="text-matt mb-6">
                {punkte >= rekord && punkte > 0 ? 'Neuer Rekord!' : `Rekord: ${rekord}`} · beste Combo: ×{maxCombo}
              </p>
            </>
          ) : (
            <>
              <div className="text-5xl mb-3">⚡</div>
              <h2 className="text-xl font-bold mb-2">{DAUER} Sekunden Vokabel-Rausch</h2>
              <p className="text-matt text-sm mb-6">
                Schnelle Antworten geben Bonuspunkte, Serien bauen eine Combo auf.
                <br />Rekord: <span className="text-akzent font-bold">{rekord}</span>
              </p>
            </>
          )}
          <div className="flex flex-col gap-2 max-w-xs mx-auto">
            <Knopf onClick={starten}>{phase === 'ende' ? 'Nochmal!' : 'Start!'}</Knopf>
            <Knopf variante="sekundaer" onClick={() => geheZu('home')}>Zurück</Knopf>
          </div>
        </Panel>
      </div>
    )
  }

  return (
    <div>
      <BackBar titel="⚡ Vokabel-Sprint" onZurueck={() => geheZu('home')} />
      <div className="flex justify-between items-center mb-3 px-1">
        <span className={`text-2xl font-bold ${zeit <= 10 ? 'text-err' : 'text-akzent'}`}>{Math.max(0, zeit)}s</span>
        <span className="text-sm">
          {combo >= 2 && <span className="text-gold font-bold mr-3">🔥 Combo ×{combo}</span>}
          <span className="font-bold">{punkte} P.</span>
        </span>
      </div>

      <Panel className={`relative text-center py-10 mb-4 ${wackelKlasse(fb)}`}>
        <FeedbackOverlay fb={fb} />
        <div className="zeichen text-6xl font-bold">{frage.karte.hanzi}</div>
      </Panel>

      <div className="grid gap-2">
        {frage.optionen.map((o, i) => (
          <button
            key={`${o}-${i}`}
            onClick={() => antworten(o)}
            className="rounded-2xl border border-linie bg-panel py-3.5 px-4 text-left font-medium hover:border-akzent/60 transition active:scale-[0.98] min-h-[52px]"
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  )
}
