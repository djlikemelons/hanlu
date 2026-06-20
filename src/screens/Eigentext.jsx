// 📄 Eigener Text: beliebigen chinesischen Text (Artikel, Speisekarte, Mail)
// einfügen → wird zur Lese-Lektion mit antippbarem Wörterbuch (Pinyin/Bedeutung/
// Audio + „als Karte speichern" über das WortPopup von TippText).

import React, { useState } from 'react'
import { useStore } from '../store.jsx'
import { sprich, ttsVerfuegbar } from '../lib/sprache.js'
import { Panel, Knopf, BackBar } from '../components/UI.jsx'
import { TippText } from '../components/TippText.jsx'
import { ladeWoerterbuch } from '../lib/woerterbuch.js'

export default function Eigentext() {
  const { state, geheZu } = useStore()
  const [text, setText] = useState('')
  const [lektion, setLektion] = useState(null)
  const [laedt, setLaedt] = useState(false)
  const tempo = state.einstellungen.ttsTempo ?? 0.8

  // Vor dem Öffnen das Wörterbuch laden → echte Wortgrenzen beim Antippen.
  const oeffnen = () => {
    setLaedt(true)
    ladeWoerterbuch().finally(() => { setLektion(text.trim()); setLaedt(false) })
  }

  if (lektion) {
    // in Absätze teilen, jeden Absatz antippbar machen
    const absaetze = lektion.split(/\n+/).filter((z) => z.trim())
    return (
      <div className="space-y-4">
        <BackBar
          titel="📄 Lese-Lektion"
          onZurueck={() => setLektion(null)}
          rechts={ttsVerfuegbar() ? (
            <button onClick={() => sprich(lektion.slice(0, 400), tempo)} aria-label="Vorlesen" className="w-11 h-11 rounded-2xl bg-panel2 border border-linie text-lg">🔊</button>
          ) : null}
        />
        <Panel>
          <p className="text-xs text-matt mb-3">Tippe ein beliebiges Wort an → Pinyin, Bedeutung, Audio und „als Karte speichern".</p>
          <div className="space-y-3">
            {absaetze.map((abs, i) => (
              <p key={i} className="text-xl leading-loose">
                <TippText text={abs} />
              </p>
            ))}
          </div>
        </Panel>
        <Knopf variante="sekundaer" className="w-full" onClick={() => { setLektion(null); setText('') }}>Neuen Text einfügen</Knopf>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <BackBar titel="📄 Eigener Text" onZurueck={() => geheZu('home')} />
      <Panel>
        <h3 className="font-bold text-sm mb-1">Eigenen chinesischen Text lesen</h3>
        <p className="text-xs text-matt mb-3">
          Füge einen Artikel, eine Speisekarte, eine Mail o. Ä. auf Chinesisch ein. Daraus wird eine
          Lese-Lektion mit antippbarem Wörterbuch.
        </p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          placeholder="把中文文章粘贴到这里…"
          className="zeichen w-full rounded-2xl border border-linie bg-panel p-3 text-base leading-relaxed focus:border-akzent focus:outline-none"
        />
        <Knopf className="w-full mt-3" disabled={!text.trim() || laedt} onClick={oeffnen}>
          {laedt ? 'Wörterbuch wird geladen …' : 'Als Lese-Lektion öffnen'}
        </Knopf>
      </Panel>
    </div>
  )
}
