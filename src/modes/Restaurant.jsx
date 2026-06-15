// 🍜 饭馆 Restaurant-Simulator: Gäste bestellen auf Chinesisch (mit echten
// Zählwörtern!), du servierst das richtige Gericht. Richtig = Gericht wird
// bezahlt (¥ = Punkte), falsch = der Gast geht wütend. Nach jedem Servieren
// gibt es die Bestellung als Pinyin + Übersetzung – so lernst du aktiv.

import React, { useState } from 'react'
import { useStore } from '../store.jsx'
import { GERICHTE, BESTELLUNGEN, ANZAHLEN, GAESTE } from '../data/restaurant.js'
import { mischen, zufall, stichprobe } from '../lib/utils.js'
import { Panel, Knopf, BackBar, Fortschritt } from '../components/UI.jsx'
import { Konfetti } from '../components/Feedback.jsx'

const GAESTE_PRO_TAG = 10

// Eine zufällige Bestellung zusammenbauen
function neueBestellung(rundenNr) {
  const gericht = zufall(GERICHTE)
  const anzahl = zufall(ANZAHLEN)
  const vorlage = zufall(BESTELLUNGEN)
  const fuellen = (s, g) => s.replace('{a}', anzahl.zh).replace('{zw}', gericht.zw).replace('{g}', g)
  const fuellenPy = (s) => s.replace('{a}', anzahl.py).replace('{zw}', gericht.zw).replace('{g}', gericht.pinyin)
  const fuellenDe = (s) => s.replace('{a}', String(anzahl.zahl)).replace('{zw}', `× ${gericht.zw}`).replace('{g}', gericht.de)
  return {
    gast: GAESTE[rundenNr % GAESTE.length],
    gericht,
    anzahl,
    satz: fuellen(vorlage.zh, gericht.hanzi),
    py: fuellenPy(vorlage.py),
    de: fuellenDe(vorlage.de),
    optionen: mischen([gericht, ...stichprobe(GERICHTE.filter((g) => g.id !== gericht.id), 3)]),
  }
}

export default function Restaurant() {
  const { state, geheZu, highscoreSetzen, xpHinzu } = useStore()
  const [phase, setPhase] = useState('start') // start | lauf | ende
  const [runde, setRunde] = useState(0)
  const [kasse, setKasse] = useState(0)
  const [bestellung, setBestellung] = useState(null)
  const [serviert, setServiert] = useState(null) // { ok, verdient } nach dem Servieren

  const starten = () => {
    setRunde(0)
    setKasse(0)
    setServiert(null)
    setBestellung(neueBestellung(0))
    setPhase('lauf')
  }

  const servieren = (gericht) => {
    if (serviert) return
    const ok = gericht.id === bestellung.gericht.id
    const verdient = ok ? bestellung.gericht.preis * bestellung.anzahl.zahl : 0
    if (ok) setKasse((k) => k + verdient)
    setServiert({ ok, verdient })
  }

  const weiter = () => {
    const naechste = runde + 1
    if (naechste >= GAESTE_PRO_TAG) {
      highscoreSetzen('restaurant', kasse)
      xpHinzu(Math.max(1, Math.round(kasse / 20)))
      setPhase('ende')
    } else {
      setRunde(naechste)
      setServiert(null)
      setBestellung(neueBestellung(naechste))
    }
  }

  if (phase === 'start' || phase === 'ende') {
    const rekord = state.highscores.restaurant || 0
    const neuerRekord = phase === 'ende' && kasse >= rekord && kasse > 0
    return (
      <div>
        <BackBar titel="🍜 饭馆 Restaurant" onZurueck={() => geheZu('home')} />
        <Panel className="text-center py-10 relative overflow-hidden">
          {neuerRekord && <Konfetti />}
          <div className={`text-5xl mb-3 relative ${neuerRekord ? 'anim-sieg-pop' : ''}`}>{phase === 'ende' ? (neuerRekord ? '🏆' : '🧑‍🍳') : '🍜'}</div>
          {phase === 'ende' ? (
            <>
              <div className="text-3xl font-bold text-akzent mb-1">¥ {kasse}</div>
              <p className="text-matt mb-6">
                Tageseinnahmen · {neuerRekord ? 'Neuer Rekord!' : `Rekord: ¥ ${rekord}`}
              </p>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-2">Dein Restaurant öffnet!</h2>
              <p className="text-matt text-sm mb-6 max-w-sm mx-auto">
                {GAESTE_PRO_TAG} Gäste bestellen auf Chinesisch – serviere das richtige Gericht.
                Achte auf die <b>Zählwörter</b> (一碗, 两串, 三笼 …)!
                Richtig serviert = Gericht wird bezahlt. Rekord: <span className="text-akzent font-bold">¥ {rekord}</span>
              </p>
            </>
          )}
          <div className="flex flex-col gap-2 max-w-xs mx-auto">
            <Knopf onClick={starten}>{phase === 'ende' ? 'Neuer Arbeitstag!' : 'Restaurant öffnen!'}</Knopf>
            <Knopf variante="sekundaer" onClick={() => geheZu('home')}>Zurück</Knopf>
          </div>
        </Panel>
      </div>
    )
  }

  return (
    <div>
      <BackBar
        titel="🍜 饭馆 Restaurant"
        onZurueck={() => geheZu('home')}
        rechts={<span className="text-sm font-bold text-gold whitespace-nowrap">¥ {kasse}</span>}
      />
      <Fortschritt wert={runde} max={GAESTE_PRO_TAG} className="mb-4" />

      {/* Der Gast mit Sprechblase */}
      <Panel className="mb-4 !py-6">
        <div className="flex items-start gap-4">
          <div key={runde} className={`text-6xl anim-pop ${serviert && !serviert.ok ? 'anim-wackeln' : ''}`}>
            {serviert ? (serviert.ok ? '😋' : '😠') : bestellung.gast}
          </div>
          <div className="flex-1 relative rounded-2xl border border-linie bg-panel px-4 py-3">
            <div className="absolute -left-2 top-5 w-4 h-4 rotate-45 bg-panel border-l border-b border-linie" />
            {serviert ? (
              <div className="space-y-1">
                <div className={`font-bold ${serviert.ok ? 'text-ok' : 'text-err'}`}>
                  {serviert.ok ? `好吃！这是你的钱：¥ ${serviert.verdient}` : '这不是我点的！'}
                </div>
                <div className="text-xs text-matt">
                  {serviert.ok ? 'Lecker! Hier ist dein Geld.' : 'Das habe ich nicht bestellt! (Der Gast geht ohne zu zahlen …)'}
                </div>
              </div>
            ) : (
              <div className="zeichen text-lg leading-relaxed">{bestellung.satz}</div>
            )}
          </div>
        </div>

        {/* Hilfe nach dem Servieren: Bestellung als Pinyin + Deutsch */}
        {serviert && (
          <div className="mt-4 rounded-2xl border border-akzent/40 bg-panel px-4 py-3 text-sm space-y-1">
            <div className="zeichen font-semibold">{bestellung.satz}</div>
            <div className="text-akzent">{bestellung.py}</div>
            <div className="text-matt">{bestellung.de}</div>
          </div>
        )}
      </Panel>

      {serviert ? (
        <Knopf className="w-full" onClick={weiter}>
          {runde + 1 >= GAESTE_PRO_TAG ? 'Kasse zählen 🧮' : 'Nächster Gast →'}
        </Knopf>
      ) : (
        <div className="grid grid-cols-2 gap-2.5">
          {bestellung.optionen.map((g) => (
            <button
              key={g.id}
              onClick={() => servieren(g)}
              className="rounded-2xl border border-linie bg-panel p-4 text-center hover:border-akzent/60 transition active:scale-[0.98]"
            >
              <div className="text-4xl mb-1.5">{g.emoji}</div>
              <div className="zeichen font-semibold">{g.hanzi}</div>
              <div className="text-[11px] text-matt mt-0.5">¥ {g.preis} / {g.zw}</div>
            </button>
          ))}
        </div>
      )}

      <p className="text-xs text-matt text-center mt-3">Gast {runde + 1} / {GAESTE_PRO_TAG}</p>
    </div>
  )
}
