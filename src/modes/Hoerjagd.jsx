// 🎧 听力 Hörjagd: Ein Wort wird auf Chinesisch vorgelesen (Web Speech API,
// kostenlos im Browser eingebaut) – du wählst das richtige Zeichen.
// Trainiert genau die Brücke Hörverstehen → Schriftbild. Mit 🐢-Button
// zum langsamen Anhören. Nach der Antwort gibt es Pinyin + Bedeutung.

import React, { useEffect, useMemo, useState } from 'react'
import { useStore } from '../store.jsx'
import { mischen, distraktoren } from '../lib/utils.js'
import { sprich, ttsVerfuegbar } from '../lib/sprache.js'
import { Panel, Knopf, BackBar, Fortschritt } from '../components/UI.jsx'
import { useFeedback, FeedbackOverlay, wackelKlasse, Konfetti } from '../components/Feedback.jsx'

const RUNDEN = 10

export default function Hoerjagd() {
  const { state, geheZu, highscoreSetzen, xpHinzu } = useStore()

  // Karten aus aktiven Themen, bereits gelernte bevorzugt
  const pool = useMemo(() => {
    const aktiv = new Set(state.themen.filter((t) => t.aktiv).map((t) => t.id))
    const alle = state.karten.filter((k) => aktiv.has(k.thema))
    const gelernt = alle.filter((k) => k.wiederholungen > 0)
    return gelernt.length >= 8 ? gelernt : alle
  }, [])

  const [phase, setPhase] = useState('start')
  const [runde, setRunde] = useState(0)
  const [punkte, setPunkte] = useState(0)
  const [combo, setCombo] = useState(0)
  const [frage, setFrage] = useState(null) // { karte, optionen }
  const [aufgedeckt, setAufgedeckt] = useState(false)
  const [fb, zeigeFb] = useFeedback()

  const neueFrage = () => {
    const karte = pool[Math.floor(Math.random() * pool.length)]
    const falsche = distraktoren(pool, karte, 3, 'hanzi')
    setFrage({ karte, optionen: mischen([karte, ...falsche]) })
    setAufgedeckt(false)
    sprich(karte.hanzi)
  }

  // beim Verlassen laufende Sprachausgabe stoppen
  useEffect(() => () => window.speechSynthesis?.cancel(), [])

  const starten = () => {
    setPunkte(0); setCombo(0); setRunde(0)
    setPhase('lauf')
    neueFrage()
  }

  const antworten = (karte) => {
    if (aufgedeckt) return
    const ok = karte.id === frage.karte.id
    const gewinn = ok ? 10 + Math.min(5, combo) * 2 : 0
    zeigeFb(ok, gewinn)
    setAufgedeckt(true)
    setTimeout(() => {
      if (ok) { setPunkte((p) => p + gewinn); setCombo((c) => c + 1) }
      else setCombo(0)
      if (runde + 1 >= RUNDEN) {
        const ende = punkte + gewinn
        highscoreSetzen('hoerjagd', ende)
        xpHinzu(Math.round(ende / 10))
        setPhase('ende')
      } else {
        setRunde(runde + 1)
        neueFrage()
      }
    }, ok ? 1100 : 1500) // etwas länger, damit Pinyin + Bedeutung lesbar sind
  }

  if (!ttsVerfuegbar()) {
    return (
      <div>
        <BackBar titel="🎧 听力 Hörjagd" onZurueck={() => geheZu('home')} />
        <Panel className="text-center py-10 text-matt">
          Dein Browser unterstützt leider keine Sprachausgabe (Web Speech API).
          Probiere Chrome, Edge oder Safari.
        </Panel>
      </div>
    )
  }

  if (pool.length < 4) {
    return (
      <div>
        <BackBar titel="🎧 听力 Hörjagd" onZurueck={() => geheZu('home')} />
        <Panel className="text-center py-10 text-matt">Zu wenige Karten in den aktiven Themen.</Panel>
      </div>
    )
  }

  if (phase === 'start' || phase === 'ende') {
    const rekord = state.highscores.hoerjagd || 0
    const neuerRekord = phase === 'ende' && punkte >= rekord && punkte > 0
    return (
      <div>
        <BackBar titel="🎧 听力 Hörjagd" onZurueck={() => geheZu('home')} />
        <Panel className="text-center py-10 relative overflow-hidden">
          {neuerRekord && <Konfetti />}
          <div className={`text-5xl mb-3 relative ${neuerRekord ? 'anim-sieg-pop' : ''}`}>{neuerRekord ? '🏆' : '🎧'}</div>
          {phase === 'ende' ? (
            <>
              <div className="text-3xl font-bold text-akzent mb-1">{punkte} Punkte</div>
              <p className="text-matt mb-6">{neuerRekord ? 'Neuer Rekord!' : `Rekord: ${rekord}`}</p>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-2">Spitz die Ohren!</h2>
              <p className="text-matt text-sm mb-6 max-w-sm mx-auto">
                {RUNDEN} Wörter werden <b>vorgelesen</b> – wähle jeweils das richtige Zeichen.
                Mit 🐢 hörst du das Wort langsam. Die Stimme kommt kostenlos aus deinem
                Browser. Rekord: <span className="text-akzent font-bold">{rekord}</span>
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
      <BackBar
        titel="🎧 听力 Hörjagd"
        onZurueck={() => geheZu('home')}
        rechts={<span className="text-sm font-bold text-akzent whitespace-nowrap">{punkte} P.</span>}
      />
      <Fortschritt wert={runde} max={RUNDEN} className="mb-4" />
      {combo >= 2 && <p className="text-center text-gold text-sm font-bold mb-2">🔥 Combo ×{combo}</p>}

      <Panel className={`relative text-center py-8 mb-4 ${wackelKlasse(fb)}`}>
        <FeedbackOverlay fb={fb} />
        {aufgedeckt ? (
          <div className="anim-pop">
            <div className="zeichen text-5xl font-bold">{frage.karte.hanzi}</div>
            <div className="text-akzent mt-2">{frage.karte.pinyin}</div>
            <div className="text-sm text-matt mt-1">{frage.karte.bedeutung}</div>
          </div>
        ) : (
          <>
            <div className="text-5xl mb-4">🎧</div>
            <div className="flex justify-center gap-3">
              <Knopf variante="sekundaer" onClick={() => sprich(frage.karte.hanzi)}>🔊 Nochmal</Knopf>
              <Knopf variante="sekundaer" onClick={() => sprich(frage.karte.hanzi, 0.55)}>🐢 Langsam</Knopf>
            </div>
            <p className="text-xs text-matt mt-4">Welches Wort hast du gehört?</p>
          </>
        )}
      </Panel>

      <div className="grid grid-cols-2 gap-2">
        {frage.optionen.map((k) => (
          <button
            key={k.id}
            onClick={() => antworten(k)}
            className={`zeichen rounded-2xl border py-5 px-3 text-center text-2xl font-bold transition active:scale-[0.98] min-h-[64px] ${
              aufgedeckt && k.id === frage.karte.id
                ? 'border-ok bg-ok/15 text-ok'
                : 'border-linie bg-panel hover:border-akzent/60'
            }`}
          >
            {k.hanzi}
          </button>
        ))}
      </div>
    </div>
  )
}
