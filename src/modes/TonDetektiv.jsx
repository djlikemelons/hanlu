// 声调 Ton-Detektiv: Welches Pinyin (= welche Töne) gehört zum Zeichen?
// Die falschen Optionen sind echte „Ton-Fallen": gleiches Pinyin,
// aber mit vertauschten Tonzeichen. Trainiert gezielt die Töne.

import React, { useMemo, useState } from 'react'
import { useStore } from '../store.jsx'
import { mischen } from '../lib/utils.js'
import { Panel, Knopf, BackBar, Fortschritt } from '../components/UI.jsx'
import { useFeedback, FeedbackOverlay, wackelKlasse, Konfetti } from '../components/Feedback.jsx'

const RUNDEN = 10

// Tonzeichen-Gruppen: [neutral, 1., 2., 3., 4. Ton] je Vokal
const TON_GRUPPEN = [
  ['a', 'ā', 'á', 'ǎ', 'à'],
  ['e', 'ē', 'é', 'ě', 'è'],
  ['i', 'ī', 'í', 'ǐ', 'ì'],
  ['o', 'ō', 'ó', 'ǒ', 'ò'],
  ['u', 'ū', 'ú', 'ǔ', 'ù'],
  ['ü', 'ǖ', 'ǘ', 'ǚ', 'ǜ'],
]
const ZEICHEN_ZU_GRUPPE = {}
TON_GRUPPEN.forEach((gruppe) =>
  gruppe.forEach((zeichen, ton) => { if (ton > 0) ZEICHEN_ZU_GRUPPE[zeichen] = { gruppe, ton } })
)
const hatTonzeichen = (pinyin) => [...pinyin].some((c) => ZEICHEN_ZU_GRUPPE[c])

// Erzeugt eine „Ton-Falle": gleiche Silben, ein Tonzeichen vertauscht.
function tonVariante(pinyin) {
  const zeichen = [...pinyin]
  const indizes = zeichen.map((c, i) => (ZEICHEN_ZU_GRUPPE[c] ? i : -1)).filter((i) => i >= 0)
  if (!indizes.length) return null
  const i = indizes[Math.floor(Math.random() * indizes.length)]
  const { gruppe, ton } = ZEICHEN_ZU_GRUPPE[zeichen[i]]
  const neueToene = [1, 2, 3, 4].filter((t) => t !== ton)
  zeichen[i] = gruppe[neueToene[Math.floor(Math.random() * neueToene.length)]]
  return zeichen.join('')
}

function tonOptionen(pinyin) {
  const varianten = new Set()
  for (let i = 0; i < 30 && varianten.size < 3; i++) {
    const v = tonVariante(pinyin)
    if (v && v !== pinyin) varianten.add(v)
  }
  return varianten.size === 3 ? mischen([pinyin, ...varianten]) : null
}

export default function TonDetektiv() {
  const { state, geheZu, highscoreSetzen, xpHinzu } = useStore()

  // Karten mit Tonzeichen aus aktiven Themen, gelernte bevorzugt
  const pool = useMemo(() => {
    const aktiv = new Set(state.themen.filter((t) => t.aktiv).map((t) => t.id))
    const alle = state.karten.filter((k) => aktiv.has(k.thema) && hatTonzeichen(k.pinyin))
    const gelernt = alle.filter((k) => k.wiederholungen > 0)
    return gelernt.length >= 8 ? gelernt : alle
  }, [])

  const [phase, setPhase] = useState('start')
  const [runde, setRunde] = useState(0)
  const [punkte, setPunkte] = useState(0)
  const [combo, setCombo] = useState(0)
  const [frage, setFrage] = useState(null)
  const [fb, zeigeFb] = useFeedback()
  const [gesperrt, setGesperrt] = useState(false)

  const neueFrage = () => {
    for (let i = 0; i < 25; i++) {
      const k = pool[Math.floor(Math.random() * pool.length)]
      const optionen = tonOptionen(k.pinyin)
      if (optionen) { setFrage({ karte: k, optionen }); return true }
    }
    return false
  }

  const starten = () => {
    setPunkte(0); setCombo(0); setRunde(0)
    if (neueFrage()) setPhase('lauf')
  }

  const antworten = (option) => {
    if (gesperrt) return
    const ok = option === frage.karte.pinyin
    const gewinn = ok ? 10 + Math.min(5, combo) * 2 : 0
    zeigeFb(ok, gewinn)
    setGesperrt(true)
    setTimeout(() => {
      setGesperrt(false)
      if (ok) { setPunkte((p) => p + gewinn); setCombo((c) => c + 1) }
      else setCombo(0)
      if (runde + 1 >= RUNDEN) {
        const ende = punkte + gewinn
        highscoreSetzen('ton', ende)
        xpHinzu(Math.round(ende / 10))
        setPhase('ende')
      } else {
        setRunde(runde + 1)
        neueFrage()
      }
    }, ok ? 700 : 900)
  }

  if (pool.length < 4) {
    return (
      <div>
        <BackBar titel="🎵 Ton-Detektiv" onZurueck={() => geheZu('home')} />
        <Panel className="text-center py-10 text-matt">Zu wenige Karten in den aktiven Themen.</Panel>
      </div>
    )
  }

  if (phase === 'start' || phase === 'ende') {
    const rekord = state.highscores.ton || 0
    return (
      <div>
        <BackBar titel="🎵 声调 Ton-Detektiv" onZurueck={() => geheZu('home')} />
        <Panel className="text-center py-10 relative overflow-hidden">
          {phase === 'ende' && punkte >= rekord && punkte > 0 && <Konfetti />}
          <div className={`text-5xl mb-3 relative ${phase === 'ende' && punkte >= rekord && punkte > 0 ? 'anim-sieg-pop' : ''}`}>
            {phase === 'ende' ? (punkte >= rekord && punkte > 0 ? '🏆' : '🎵') : '🎵'}
          </div>
          {phase === 'ende' ? (
            <>
              <div className="text-3xl font-bold text-akzent mb-1">{punkte} Punkte</div>
              <p className="text-matt mb-6">{punkte >= rekord && punkte > 0 ? 'Neuer Rekord!' : `Rekord: ${rekord}`}</p>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-2">Hörst du den Ton … im Kopf?</h2>
              <p className="text-matt text-sm mb-6 max-w-sm mx-auto">
                {RUNDEN} Zeichen – wähle jeweils das Pinyin mit den <b>richtigen Tonzeichen</b>.
                Die falschen Optionen unterscheiden sich nur im Ton! Rekord: <span className="text-akzent font-bold">{rekord}</span>
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
        titel="🎵 Ton-Detektiv"
        onZurueck={() => geheZu('home')}
        rechts={<span className="text-sm font-bold text-akzent whitespace-nowrap">{punkte} P.</span>}
      />
      <Fortschritt wert={runde} max={RUNDEN} className="mb-4" />
      {combo >= 2 && <p className="text-center text-gold text-sm font-bold mb-2">🔥 Combo ×{combo}</p>}

      <Panel className={`relative text-center py-10 mb-4 ${wackelKlasse(fb)}`}>
        <FeedbackOverlay fb={fb} />
        <div className="zeichen text-6xl font-bold">{frage.karte.hanzi}</div>
        <div className="text-sm text-matt mt-3">{frage.karte.bedeutung}</div>
        {/* ERWEITERUNG: Sprachausgabe – hier könnte ein 🔊-Button das Wort
            vorlesen (speechSynthesis, lang 'zh-CN'), dann wird daraus ein
            echtes Hörverständnis-Spiel. */}
      </Panel>

      <div className="grid grid-cols-2 gap-2">
        {frage.optionen.map((o, i) => (
          <button
            key={`${o}-${i}`}
            onClick={() => antworten(o)}
            className="rounded-2xl border border-linie bg-panel py-4 px-3 text-center text-lg font-semibold text-akzent hover:border-akzent/60 transition active:scale-[0.98] min-h-[56px]"
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  )
}
