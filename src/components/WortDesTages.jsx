// „Wort des Tages": täglich wechselndes Chengyu/Kulturwort mit Hintergrundnotiz.
// Auswahl ist deterministisch über das Datum (jeden Tag dasselbe Wort).

import React, { useState } from 'react'
import { useStore } from '../store.jsx'
import { WORT_DES_TAGES } from '../data/wortDesTages.js'
import { sprich, ttsVerfuegbar } from '../lib/sprache.js'
import { Panel, Pinyin } from './UI.jsx'

function tagesIndex(laenge) {
  const d = new Date()
  const start = new Date(d.getFullYear(), 0, 0)
  const tag = Math.floor((d - start) / 86400000)
  return tag % laenge
}

export function WortDesTages() {
  const { state, karteAnlegen } = useStore()
  const [offen, setOffen] = useState(false)
  const [gespeichert, setGespeichert] = useState(false)
  const w = WORT_DES_TAGES[tagesIndex(WORT_DES_TAGES.length)]
  const tempo = state.einstellungen.ttsTempo ?? 0.8

  const speichern = () => {
    const kulturThema = state.themen.find((t) => t.id === 'kultur') ? 'kultur' : state.themen[0]?.id
    karteAnlegen({
      thema: kulturThema,
      hanzi: w.hanzi,
      pinyin: w.pinyin,
      bedeutung: w.bedeutung,
      hsk_level: 5,
      beispielsatz: [w.hanzi],
      beispiel_pinyin: w.pinyin,
      beispiel_uebersetzung: w.bedeutung,
    })
    setGespeichert(true)
  }

  return (
    <Panel className="!py-4">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-xs font-bold text-matt uppercase tracking-wider">📅 Wort des Tages</h3>
        {ttsVerfuegbar() && (
          <button
            onClick={() => sprich(w.hanzi, tempo)}
            aria-label="Aussprache abspielen"
            className="w-9 h-9 rounded-full border border-linie bg-panel2 hover:border-akzent/60 transition active:scale-90 text-sm"
          >
            🔊
          </button>
        )}
      </div>
      <button onClick={() => setOffen((o) => !o)} className="text-left w-full">
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="zeichen text-3xl font-bold">{w.hanzi}</span>
          <span className="text-sm"><Pinyin text={w.pinyin} /></span>
        </div>
        <div className="text-sm font-semibold mt-1">{w.bedeutung}</div>
      </button>
      {offen && <p className="text-xs text-matt mt-2 leading-relaxed">{w.notiz}</p>}
      <div className="flex gap-3 mt-3">
        <button onClick={() => setOffen((o) => !o)} className="text-xs text-akzent">
          {offen ? 'Notiz verbergen' : 'Kultur-Notiz zeigen'}
        </button>
        {!gespeichert ? (
          <button onClick={speichern} className="text-xs text-matt hover:text-tinte ml-auto">＋ als Karte</button>
        ) : (
          <span className="text-xs text-ok ml-auto">✓ gespeichert</span>
        )}
      </div>
    </Panel>
  )
}
