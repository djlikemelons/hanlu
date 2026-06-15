// Adaptiver Einstufungstest (HSK 3 → 6): beginnt einfach, passt die
// Schwierigkeit live an, schätzt am Ende das HSK-Level und markiert sicher
// beantwortete Starter-Deck-Wörter als „bekannt". Überspringbar.

import React, { useMemo, useState } from 'react'
import { useStore } from '../store.jsx'
import { EINSTUFUNGS_POOL } from '../data/placement.js'
import { mischen, stichprobe } from '../lib/utils.js'
import { Knopf, Panel } from '../components/UI.jsx'
import { useFeedback, FeedbackOverlay, wackelKlasse } from '../components/Feedback.jsx'

const ANZAHL_FRAGEN = 16

export default function Einstufung() {
  const { state, geheZu, einstufungAbschliessen } = useStore()
  const istWiederholung = state.einstufungFertig

  // Pool auflösen: Einträge mit kartenId bekommen Daten aus dem Starter-Deck.
  const pool = useMemo(() => {
    return EINSTUFUNGS_POOL.map((e) => {
      if (e.kartenId) {
        const k = state.karten.find((k) => k.id === e.kartenId)
        return k ? { ...e, hanzi: k.hanzi, pinyin: k.pinyin, bedeutung: k.bedeutung } : null
      }
      return e
    }).filter(Boolean)
  }, []) // bewusst einmalig beim Mount

  const [phase, setPhase] = useState('intro') // intro | lauf | fertig
  const [level, setLevel] = useState(3)
  const [frageNr, setFrageNr] = useState(0)
  const [gestellt, setGestellt] = useState([]) // hanzi der bereits gestellten Wörter
  const [serieRichtig, setSerieRichtig] = useState(0)
  const [serieFalsch, setSerieFalsch] = useState(0)
  const [ergebnisse, setErgebnisse] = useState([]) // {level, richtig, kartenId}
  const [frage, setFrage] = useState(null)
  const [fb, zeigeFb] = useFeedback()
  const [gesperrt, setGesperrt] = useState(false)

  const naechsteFrage = (aktLevel, schonGestellt) => {
    let kandidaten = pool.filter((e) => e.level === aktLevel && !schonGestellt.includes(e.hanzi))
    if (!kandidaten.length) kandidaten = pool.filter((e) => !schonGestellt.includes(e.hanzi))
    if (!kandidaten.length) return null
    const wort = kandidaten[Math.floor(Math.random() * kandidaten.length)]
    const falsche = stichprobe(pool.filter((e) => e.hanzi !== wort.hanzi), 3).map((e) => e.bedeutung)
    return { wort, optionen: mischen([wort.bedeutung, ...falsche]) }
  }

  const starten = () => {
    setPhase('lauf')
    setFrage(naechsteFrage(3, []))
  }

  const antworten = (option) => {
    if (gesperrt) return
    const richtig = option === frage.wort.bedeutung
    zeigeFb(richtig)
    setGesperrt(true)

    setTimeout(() => {
      setGesperrt(false)
      const neueErgebnisse = [...ergebnisse, { level: frage.wort.level, richtig, kartenId: frage.wort.kartenId }]
      const neuGestellt = [...gestellt, frage.wort.hanzi]
      setErgebnisse(neueErgebnisse)
      setGestellt(neuGestellt)

      // adaptiv: 2 richtige in Serie → Level rauf, 2 falsche → runter
      let l = level, sr = richtig ? serieRichtig + 1 : 0, sf = richtig ? 0 : serieFalsch + 1
      if (sr >= 2) { l = Math.min(6, l + 1); sr = 0 }
      if (sf >= 2) { l = Math.max(3, l - 1); sf = 0 }
      setLevel(l); setSerieRichtig(sr); setSerieFalsch(sf)

      if (frageNr + 1 >= ANZAHL_FRAGEN) {
        setPhase('fertig')
      } else {
        setFrageNr(frageNr + 1)
        setFrage(naechsteFrage(l, neuGestellt))
      }
    }, richtig ? 750 : 600)
  }

  // Level-Schätzung: höchstes Niveau mit ≥ 60 % Trefferquote (min. 2 Fragen)
  const schaetzung = () => {
    let best = 3
    for (const lvl of [3, 4, 5, 6]) {
      const aufLevel = ergebnisse.filter((e) => e.level === lvl)
      if (aufLevel.length >= 2 && aufLevel.filter((e) => e.richtig).length / aufLevel.length >= 0.6) best = lvl
    }
    return best
  }

  const abschliessen = (geschaetzt) => {
    const bekannte = ergebnisse.filter((e) => e.richtig && e.kartenId).map((e) => e.kartenId)
    einstufungAbschliessen(geschaetzt, bekannte)
    geheZu('home')
  }

  // ---------- Intro ----------
  if (phase === 'intro') {
    return (
      <div className="min-h-dvh flex items-center justify-center px-2 py-10">
        <Panel className="max-w-md w-full text-center py-10">
          <div className="zeichen text-5xl font-bold text-akzent mb-2">汉路</div>
          <h1 className="text-xl font-bold mb-3">{istWiederholung ? 'Einstufung wiederholen' : 'Willkommen bei HànLù!'}</h1>
          <p className="text-matt text-sm leading-relaxed mb-8">
            Ein kurzer adaptiver Test ({ANZAHL_FRAGEN} Fragen) schätzt dein HSK-Niveau ein. Wörter, die du
            sicher kennst, werden als „bekannt" markiert – so paukst du nichts Unnötiges.
          </p>
          <div className="flex flex-col gap-3">
            <Knopf onClick={starten}>Test starten</Knopf>
            <Knopf variante="geist" onClick={() => abschliessen(null)}>
              Überspringen {istWiederholung ? '· zurück' : '· später in den Einstellungen'}
            </Knopf>
          </div>
        </Panel>
      </div>
    )
  }

  // ---------- Ergebnis ----------
  if (phase === 'fertig') {
    const geschaetzt = schaetzung()
    const richtige = ergebnisse.filter((e) => e.richtig).length
    return (
      <div className="min-h-dvh flex items-center justify-center px-2 py-10">
        <Panel className="max-w-md w-full text-center py-10">
          <div className="text-5xl mb-3">🎯</div>
          <h1 className="text-xl font-bold mb-2">Deine Einschätzung</h1>
          <div className="text-4xl font-bold text-akzent my-4">≈ HSK {geschaetzt}</div>
          <p className="text-matt text-sm mb-8">
            {richtige} von {ergebnisse.length} richtig ·{' '}
            {ergebnisse.filter((e) => e.richtig && e.kartenId).length} Wörter als bekannt markiert
          </p>
          <Knopf className="w-full" onClick={() => abschliessen(geschaetzt)}>Los geht's!</Knopf>
        </Panel>
      </div>
    )
  }

  // ---------- Testlauf ----------
  return (
    <div className="min-h-dvh flex items-center justify-center px-2 py-10">
      <div className="max-w-md w-full">
        <div className="flex justify-between text-xs text-matt mb-3 px-1">
          <span>Frage {frageNr + 1} / {ANZAHL_FRAGEN}</span>
          <span>Schwierigkeit: HSK {level}</span>
        </div>
        <Panel className={`relative text-center py-10 mb-4 ${wackelKlasse(fb)}`}>
          <FeedbackOverlay fb={fb} />
          <div className="zeichen text-6xl font-bold">{frage.wort.hanzi}</div>
          <div className="text-sm text-matt mt-3">Was bedeutet dieses Wort?</div>
        </Panel>
        <div className="grid gap-2">
          {frage.optionen.map((o) => (
            <button
              key={o}
              onClick={() => antworten(o)}
              className="rounded-2xl border border-linie bg-panel py-3.5 px-4 text-left font-medium hover:border-akzent/60 transition active:scale-[0.98] min-h-[52px]"
            >
              {o}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
