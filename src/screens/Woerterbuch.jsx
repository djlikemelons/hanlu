// 词典 Wörterbuch (Pleco-Stil): Suche nach Zeichen oder Pinyin → Treffer mit
// Zeichen, farbigem Pinyin, Bedeutung, Audio und „als Karte speichern".
// Datenquelle: HanDeDict (offline, lazy geladen – siehe lib/woerterbuch.js).

import React, { useEffect, useRef, useState } from 'react'
import { useStore } from '../store.jsx'
import { sprich, ttsVerfuegbar } from '../lib/sprache.js'
import { ladeWoerterbuch, woerterbuchGeladen, suche } from '../lib/woerterbuch.js'
import { Panel, Knopf, BackBar, Pinyin } from '../components/UI.jsx'
import { WortPopup } from '../components/TippText.jsx'

export default function Woerterbuch() {
  const { state, geheZu } = useStore()
  const [geladen, setGeladen] = useState(woerterbuchGeladen())
  const [fehler, setFehler] = useState(false)
  const [query, setQuery] = useState('')
  const [treffer, setTreffer] = useState([])
  const [offenesWort, setOffenesWort] = useState(null)
  const debounce = useRef(null)
  const tempo = state.einstellungen.ttsTempo ?? 0.8

  useEffect(() => {
    if (woerterbuchGeladen()) return
    ladeWoerterbuch().then(() => setGeladen(true)).catch(() => setFehler(true))
  }, [])

  useEffect(() => {
    if (!geladen) return
    clearTimeout(debounce.current)
    debounce.current = setTimeout(() => setTreffer(suche(query, 50)), 220)
    return () => clearTimeout(debounce.current)
  }, [query, geladen])

  return (
    <div className="space-y-4">
      <BackBar titel="📖 词典 Wörterbuch" onZurueck={() => geheZu('home')} />

      <Panel className="!py-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Zeichen oder Pinyin suchen … (z. B. 学习 oder xuexi)"
          className="zeichen w-full rounded-2xl border border-linie bg-panel2 px-4 py-3 text-lg focus:border-akzent focus:outline-none min-h-[52px]"
          autoFocus
        />
        <p className="text-[11px] text-matt mt-2">
          HanDeDict · Deutsch↔Chinesisch (CC-BY-SA). Tippe ein Wort an für Details & „als Karte speichern".
        </p>
      </Panel>

      {!geladen && !fehler && (
        <Panel className="text-center py-8 text-matt text-sm">📖 Wörterbuch wird geladen … (einmalig, danach offline)</Panel>
      )}
      {fehler && (
        <Panel className="text-center py-8 text-err text-sm">
          Wörterbuch konnte nicht geladen werden. Prüfe die Internetverbindung beim ersten Laden.
        </Panel>
      )}

      {geladen && query && treffer.length === 0 && (
        <Panel className="text-center py-8 text-matt text-sm">Keine Treffer für „{query}".</Panel>
      )}

      <div className="space-y-2">
        {treffer.map(({ hanzi, eintraege }) => (
          <Panel key={hanzi} className="!p-4 flex items-start gap-3">
            <button onClick={() => setOffenesWort(hanzi)} className="text-left flex-1">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="zeichen text-2xl font-bold">{hanzi}</span>
                <span className="text-sm"><Pinyin text={eintraege[0][0]} /></span>
              </div>
              <div className="text-sm text-matt mt-1">{eintraege[0][1]}</div>
              {eintraege.length > 1 && <div className="text-[11px] text-matt mt-0.5">+{eintraege.length - 1} weitere Lesart(en)</div>}
            </button>
            {ttsVerfuegbar() && (
              <button
                onClick={() => sprich(hanzi, tempo)}
                aria-label="Aussprache abspielen"
                className="w-10 h-10 shrink-0 rounded-full border border-linie bg-panel2 hover:border-akzent/60 transition active:scale-90"
              >
                🔊
              </button>
            )}
          </Panel>
        ))}
      </div>

      {offenesWort && <WortPopup wort={offenesWort} onClose={() => setOffenesWort(null)} />}
    </div>
  )
}
