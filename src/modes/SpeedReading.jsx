// ⏱️ 速读 Speed-Reading: Der Text läuft Satz für Satz im gewählten Tempo
// durch – kein Zurückblättern, wie beim echten Zeitunglesen. Danach
// Verständnisfragen; höheres Tempo = höherer Punkte-Multiplikator.
// Direktes Training fürs Ziel „chinesische Zeitungen lesen".

import React, { useEffect, useState } from 'react'
import { useStore } from '../store.jsx'
import { SPEED_TEXTE, TEMPI } from '../data/speedread.js'
import { mischen } from '../lib/utils.js'
import { Panel, Knopf, BackBar, Chip, Fortschritt } from '../components/UI.jsx'
import { Konfetti } from '../components/Feedback.jsx'

// Text an Satzzeichen in Sätze teilen (Satzzeichen bleiben am Satz)
const inSaetze = (text) => text.match(/[^。！？]+[。！？]?/g) || [text]

export default function SpeedReading() {
  const { state, geheZu, highscoreSetzen, xpHinzu } = useStore()
  const [textId, setTextId] = useState(null)
  const [tempo, setTempo] = useState(TEMPI[1])
  const [phase, setPhase] = useState('wahl') // wahl | lesen | fragen | ende
  const [satzNr, setSatzNr] = useState(0)
  const [quiz, setQuiz] = useState(null) // { frageNr, richtig, optionen, gewaehlt }
  const [punkte, setPunkte] = useState(0)

  const text = SPEED_TEXTE.find((t) => t.id === textId)
  const saetze = text ? inSaetze(text.text) : []

  // Lese-Phase: Satz für Satz automatisch weiterschalten
  useEffect(() => {
    if (phase !== 'lesen' || !text) return
    const satz = saetze[satzNr]
    const dauer = Math.max(1800, (satz.length / tempo.zeichenProSek) * 1000)
    const timer = setTimeout(() => {
      if (satzNr + 1 >= saetze.length) {
        setPhase('fragen')
        setQuiz({
          frageNr: 0,
          richtig: 0,
          optionen: mischen(text.fragen[0].optionen.map((o, i) => ({ o, i }))),
          gewaehlt: null,
        })
      } else {
        setSatzNr(satzNr + 1)
      }
    }, dauer)
    return () => clearTimeout(timer)
  }, [phase, satzNr, textId])

  const lesen = (t) => {
    setTextId(t.id)
    setSatzNr(0)
    setPhase('lesen')
  }

  const antworten = (x) => {
    if (quiz.gewaehlt !== null) return
    setQuiz({ ...quiz, gewaehlt: x.i })
    const ok = x.i === text.fragen[quiz.frageNr].richtig
    setTimeout(() => {
      const richtig = quiz.richtig + (ok ? 1 : 0)
      const naechste = quiz.frageNr + 1
      if (naechste >= text.fragen.length) {
        const ende = Math.round(richtig * 20 * tempo.faktor)
        setPunkte(ende)
        setQuiz({ ...quiz, richtig })
        highscoreSetzen('speedread', ende)
        xpHinzu(Math.max(1, Math.round(ende / 10)))
        setPhase('ende')
      } else {
        setQuiz({
          frageNr: naechste,
          richtig,
          optionen: mischen(text.fragen[naechste].optionen.map((o, i) => ({ o, i }))),
          gewaehlt: null,
        })
      }
    }, 900)
  }

  // ---------- Text- und Tempo-Wahl ----------
  if (phase === 'wahl') {
    return (
      <div className="space-y-4">
        <BackBar
          titel="⏱️ 速读 Speed-Reading"
          onZurueck={() => geheZu('home')}
          rechts={<span className="text-xs text-akzent font-bold whitespace-nowrap">Rekord: {state.highscores.speedread || 0}</span>}
        />
        <Panel className="!py-4">
          <h3 className="font-bold text-sm mb-1">Dein Tempo</h3>
          <p className="text-xs text-matt mb-3">
            Der Text läuft Satz für Satz durch – ohne Zurück. Schneller lesen = mehr Punkte (×{TEMPI[2].faktor} bei 🚀).
          </p>
          <div className="flex flex-wrap gap-2">
            {TEMPI.map((t) => (
              <Chip key={t.id} aktiv={tempo.id === t.id} onClick={() => setTempo(t)}>
                {t.emoji} {t.name} ·×{t.faktor}
              </Chip>
            ))}
          </div>
        </Panel>
        {SPEED_TEXTE.map((t) => (
          <Panel key={t.id} className="flex items-center gap-4 cursor-pointer hover:border-akzent/60 transition" onClick={() => lesen(t)}>
            <div className="text-3xl">📰</div>
            <div className="flex-1">
              <div className="zeichen font-bold">{t.titel}</div>
              <div className="text-xs text-matt">{t.titelDe} · {t.text.length} Zeichen · {t.fragen.length} Fragen</div>
            </div>
            <div className="text-matt">→</div>
          </Panel>
        ))}
        <p className="text-xs text-matt text-center">Neue Texte lassen sich in src/data/speedread.js ergänzen.</p>
      </div>
    )
  }

  // ---------- Lese-Phase ----------
  if (phase === 'lesen') {
    return (
      <div>
        <BackBar titel={`📰 ${text.titel}`} onZurueck={() => setPhase('wahl')} rechts={<span className="text-sm whitespace-nowrap">{tempo.emoji}</span>} />
        <Fortschritt wert={satzNr + 1} max={saetze.length} className="mb-6" />
        <Panel className="text-center py-12 min-h-[220px] flex items-center justify-center">
          <div key={satzNr} className="zeichen text-2xl leading-relaxed anim-pop">{saetze[satzNr]}</div>
        </Panel>
        <p className="text-xs text-matt text-center mt-3">
          Satz {satzNr + 1} / {saetze.length} · gleich kommen die Fragen – kein Zurückblättern!
        </p>
      </div>
    )
  }

  // ---------- Fragen ----------
  if (phase === 'fragen') {
    const frage = text.fragen[quiz.frageNr]
    return (
      <div>
        <BackBar titel={`📰 ${text.titel}`} onZurueck={() => setPhase('wahl')} />
        <Panel className="!py-4 mb-3">
          <div className="text-xs text-matt mb-1">Frage {quiz.frageNr + 1} / {text.fragen.length}</div>
          <div className="zeichen font-semibold">{frage.f}</div>
        </Panel>
        <div className="grid gap-2">
          {quiz.optionen.map((x) => {
            const stil =
              quiz.gewaehlt === null
                ? 'border-linie bg-panel hover:border-akzent/60'
                : x.i === frage.richtig
                  ? 'border-ok bg-ok/15 text-ok'
                  : x.i === quiz.gewaehlt
                    ? 'border-err bg-err/15 text-err anim-wackeln'
                    : 'border-linie bg-panel opacity-50'
            return (
              <button
                key={x.i}
                onClick={() => antworten(x)}
                className={`zeichen rounded-2xl border py-3 px-4 text-left transition active:scale-[0.98] min-h-[52px] ${stil}`}
              >
                {x.o}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // ---------- Ergebnis ----------
  const rekord = state.highscores.speedread || 0
  const neuerRekord = punkte >= rekord && punkte > 0
  return (
    <div>
      <BackBar titel="⏱️ 速读 Speed-Reading" onZurueck={() => setPhase('wahl')} />
      <Panel className="text-center py-10 relative overflow-hidden">
        {neuerRekord && <Konfetti />}
        <div className={`text-5xl mb-3 relative ${neuerRekord ? 'anim-sieg-pop' : ''}`}>{neuerRekord ? '🏆' : '📰'}</div>
        <div className="text-3xl font-bold text-akzent mb-1">{punkte} Punkte</div>
        <p className="text-matt mb-6">
          {quiz.richtig + (quiz.gewaehlt !== null && quiz.gewaehlt === text.fragen[quiz.frageNr]?.richtig ? 1 : 0) || quiz.richtig} richtige Antworten · Tempo {tempo.emoji} ×{tempo.faktor}
          {neuerRekord ? ' · Neuer Rekord!' : ` · Rekord: ${rekord}`}
        </p>
        <div className="flex flex-col gap-2 max-w-xs mx-auto">
          <Knopf onClick={() => setPhase('wahl')}>Nächster Text</Knopf>
          <Knopf variante="sekundaer" onClick={() => geheZu('home')}>Zurück</Knopf>
        </div>
      </Panel>
    </div>
  )
}
