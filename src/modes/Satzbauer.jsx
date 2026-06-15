// 拼句 Satzbauer: Wort-Tokens in die richtige Reihenfolge tippen.
// Punkte für Tempo + Korrektheit. Trainiert die Satzbildung.

import React, { useMemo, useState } from 'react'
import { useStore } from '../store.jsx'
import { mischen, stichprobe } from '../lib/utils.js'
import { Panel, Knopf, BackBar } from '../components/UI.jsx'
import { useFeedback, FeedbackOverlay, wackelKlasse, Konfetti } from '../components/Feedback.jsx'

const RUNDEN = 5

function gemischteTokens(tokens) {
  // mischen, bis die Reihenfolge nicht der Lösung entspricht
  for (let i = 0; i < 6; i++) {
    const m = mischen(tokens.map((t, idx) => ({ t, idx })))
    if (m.some((x, i2) => x.idx !== i2)) return m
  }
  return tokens.map((t, idx) => ({ t, idx }))
}

export default function Satzbauer() {
  const { state, geheZu, highscoreSetzen, xpHinzu } = useStore()

  // Karten mit brauchbaren Sätzen (≥ 4 Tokens) aus aktiven Themen
  const karten = useMemo(() => {
    const aktiv = new Set(state.themen.filter((t) => t.aktiv).map((t) => t.id))
    return stichprobe(state.karten.filter((k) => aktiv.has(k.thema) && k.beispielsatz?.length >= 4), RUNDEN)
  }, [])

  const [runde, setRunde] = useState(0)
  const [verfuegbar, setVerfuegbar] = useState(() => (karten[0] ? gemischteTokens(karten[0].beispielsatz) : []))
  const [gelegt, setGelegt] = useState([])
  const [geloest, setGeloest] = useState(false)
  const [fehlversuche, setFehlversuche] = useState(0)
  const [punkte, setPunkte] = useState(0)
  const [rundenStart, setRundenStart] = useState(Date.now())
  const [fb, zeigeFb] = useFeedback()

  const karte = karten[runde]

  if (!karte) {
    return (
      <div>
        <BackBar titel="🧩 Satzbauer" onZurueck={() => geheZu('home')} />
        <Panel className="text-center py-10 text-matt">Zu wenige Karten mit Beispielsätzen in den aktiven Themen.</Panel>
      </div>
    )
  }

  const lege = (eintrag, i) => {
    if (geloest) return
    const neuGelegt = [...gelegt, eintrag]
    const neuVerfuegbar = verfuegbar.filter((_, idx) => idx !== i)
    setGelegt(neuGelegt)
    setVerfuegbar(neuVerfuegbar)
    // automatisch prüfen, sobald alle Tokens gelegt sind
    if (neuVerfuegbar.length === 0) pruefe(neuGelegt)
  }

  const zurueck = (eintrag, i) => {
    if (geloest) return
    setGelegt((g) => g.filter((_, idx) => idx !== i))
    setVerfuegbar((v) => [...v, eintrag])
  }

  const pruefe = (gelegteTokens) => {
    const richtig = gelegteTokens.map((x) => x.t).join('') === karte.beispielsatz.join('')
    if (richtig) {
      const sekunden = (Date.now() - rundenStart) / 1000
      const bonus = Math.max(0, Math.round(20 - sekunden)) // Tempo-Bonus
      const rundenPunkte = Math.max(2, 10 + bonus - fehlversuche * 3)
      setPunkte((p) => p + rundenPunkte)
      setGeloest(true)
      zeigeFb(true, rundenPunkte)
    } else {
      setFehlversuche((f) => f + 1)
      zeigeFb(false)
    }
  }

  const naechsteRunde = () => {
    const n = runde + 1
    if (n >= karten.length) {
      highscoreSetzen('satzbauer', punkte)
      xpHinzu(Math.round(punkte / 5))
      setRunde(n) // → Endbildschirm
      return
    }
    setRunde(n)
    setVerfuegbar(gemischteTokens(karten[n].beispielsatz))
    setGelegt([])
    setGeloest(false)
    setFehlversuche(0)
    setRundenStart(Date.now())
  }

  if (runde >= karten.length) {
    const rekord = state.highscores.satzbauer || 0
    return (
      <div>
        <BackBar titel="🧩 Satzbauer" onZurueck={() => geheZu('home')} />
        <Panel className="text-center py-10 relative overflow-hidden">
          {punkte >= rekord && punkte > 0 && <Konfetti />}
          <div className={`text-5xl mb-3 relative ${punkte >= rekord && punkte > 0 ? 'anim-sieg-pop' : ''}`}>{punkte >= rekord ? '🏆' : '🎉'}</div>
          <div className="text-3xl font-bold text-akzent mb-1">{punkte} Punkte</div>
          <p className="text-matt mb-6">{punkte >= rekord && punkte > 0 ? 'Neuer Rekord!' : `Rekord: ${rekord}`}</p>
          <div className="flex flex-col gap-2 max-w-xs mx-auto">
            <Knopf onClick={() => geheZu('spiel', { id: 'satzbauer' })}>Noch eine Runde</Knopf>
            <Knopf variante="sekundaer" onClick={() => geheZu('home')}>Zurück</Knopf>
          </div>
        </Panel>
      </div>
    )
  }

  return (
    <div>
      <BackBar
        titel="🧩 Satzbauer"
        onZurueck={() => geheZu('home')}
        rechts={<span className="text-sm font-bold text-akzent">{punkte} P.</span>}
      />
      <div className="text-xs text-matt mb-3 text-center">
        Satz {runde + 1} / {karten.length} · Tippe die Wörter in der richtigen Reihenfolge
      </div>

      <Panel className={`relative mb-4 ${wackelKlasse(fb)}`}>
        <FeedbackOverlay fb={fb} />
        <div className="text-sm text-matt mb-3 text-center">„{karte.beispiel_uebersetzung}"</div>

        {/* Ablagefläche */}
        <div className="min-h-[72px] bg-panel rounded-2xl border border-dashed border-linie p-3 flex flex-wrap gap-2 justify-center items-center">
          {gelegt.length === 0 && <span className="text-xs text-matt">Hier entsteht dein Satz …</span>}
          {gelegt.map((x, i) => (
            <button
              key={`${x.idx}-${i}`}
              onClick={() => zurueck(x, i)}
              className={`zeichen text-xl font-semibold rounded-xl px-3 py-2 border transition active:scale-95 ${
                geloest ? 'border-ok/60 bg-ok/10 text-ok' : 'border-akzent/60 bg-akzent/10'
              }`}
            >
              {x.t}
            </button>
          ))}
        </div>

        {geloest && (
          <div className="mt-4 text-center space-y-1">
            <div className="text-akzent text-sm">{karte.beispiel_pinyin}</div>
            <div className="text-xs text-matt">
              Vokabel: <span className="zeichen text-tinte">{karte.hanzi}</span> ({karte.pinyin}) = {karte.bedeutung}
            </div>
          </div>
        )}
      </Panel>

      {/* verfügbare Tokens */}
      {!geloest ? (
        <div className="flex flex-wrap gap-2 justify-center">
          {verfuegbar.map((x, i) => (
            <button
              key={`${x.idx}-${i}`}
              onClick={() => lege(x, i)}
              className="zeichen text-xl font-semibold rounded-xl px-3 py-2.5 border border-linie bg-panel2 hover:border-akzent/60 transition active:scale-95 min-h-[48px]"
            >
              {x.t}
            </button>
          ))}
        </div>
      ) : (
        <Knopf className="w-full" onClick={naechsteRunde}>
          {runde + 1 >= karten.length ? 'Ergebnis ansehen' : 'Nächster Satz →'}
        </Knopf>
      )}
    </div>
  )
}
