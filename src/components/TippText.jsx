// Antippbarer chinesischer Text + Wort-Popup (Pleco-Stil).
// TippText: zerlegt Text in Wörter; Tippen öffnet WortPopup mit Pinyin (farbig),
// Bedeutung, Audio und „als Karte speichern" (Sentence Mining).

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useStore } from '../store.jsx'
import { sprich, ttsVerfuegbar } from '../lib/sprache.js'
import { ladeWoerterbuch, woerterbuchGeladen, nachschlagen, segmentiereText } from '../lib/woerterbuch.js'
import { Pinyin, Knopf } from './UI.jsx'

// Popup für ein einzelnes Wort. `wort` = chinesische Zeichenfolge.
export function WortPopup({ wort, onClose }) {
  const { state, karteAnlegen } = useStore()
  const [eintraege, setEintraege] = useState(() => nachschlagen(wort))
  const [laedt, setLaedt] = useState(!woerterbuchGeladen())
  const [speichernOffen, setSpeichernOffen] = useState(false)
  const [thema, setThema] = useState(state.themen.find((t) => t.aktiv)?.id || state.themen[0]?.id)
  const [gespeichert, setGespeichert] = useState(false)

  useEffect(() => {
    let weg = false
    if (!woerterbuchGeladen()) {
      ladeWoerterbuch()
        .then(() => { if (!weg) { setEintraege(nachschlagen(wort)); setLaedt(false) } })
        .catch(() => { if (!weg) setLaedt(false) })
    } else {
      setEintraege(nachschlagen(wort))
    }
    return () => { weg = true }
  }, [wort])

  const tempo = state.einstellungen.ttsTempo ?? 0.8
  const ersterPy = eintraege?.[0]?.[0] || ''
  const ersteBed = eintraege?.[0]?.[1] || ''

  const speichern = () => {
    karteAnlegen({
      thema,
      hanzi: wort,
      pinyin: ersterPy,
      bedeutung: ersteBed.slice(0, 80),
      hsk_level: 5,
      beispielsatz: [wort],
      beispiel_pinyin: ersterPy,
      beispiel_uebersetzung: ersteBed.slice(0, 80),
    })
    setGespeichert(true)
    setTimeout(onClose, 850)
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50" />
      <div
        className="relative w-full sm:max-w-md verlauf-panel border border-linie rounded-t-3xl sm:rounded-3xl p-5 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-3 mb-3">
          <div className="zeichen text-4xl font-bold">{wort}</div>
          {ttsVerfuegbar() && eintraege && (
            <button
              onClick={() => sprich(wort, tempo)}
              aria-label="Aussprache abspielen"
              className="w-11 h-11 rounded-full border border-linie bg-panel2 hover:border-akzent/60 transition active:scale-90 text-lg"
            >
              🔊
            </button>
          )}
          <button onClick={onClose} className="ml-auto w-9 h-9 rounded-full border border-linie text-matt hover:text-tinte" aria-label="Schließen">✕</button>
        </div>

        {laedt ? (
          <p className="text-sm text-matt py-4">📖 Wörterbuch wird geladen …</p>
        ) : eintraege ? (
          <div className="space-y-3">
            {eintraege.map(([py, bed], i) => (
              <div key={i} className="border-l-2 border-akzent/40 pl-3">
                <div className="text-base"><Pinyin text={py} /></div>
                <div className="text-sm text-tinte mt-0.5">{bed}</div>
              </div>
            ))}
            {!speichernOffen ? (
              <Knopf variante="sekundaer" className="w-full !py-2 text-sm" onClick={() => setSpeichernOffen(true)}>
                ＋ Als Karteikarte speichern
              </Knopf>
            ) : gespeichert ? (
              <div className="text-center text-ok font-semibold py-2">✓ Karte gespeichert</div>
            ) : (
              <div className="bg-panel rounded-2xl border border-linie p-3 space-y-2">
                <div className="text-xs text-matt">In welches Thema?</div>
                <select
                  value={thema}
                  onChange={(e) => setThema(e.target.value)}
                  className="w-full rounded-xl border border-linie bg-panel2 p-2 text-sm min-h-[44px]"
                >
                  {state.themen.map((t) => (
                    <option key={t.id} value={t.id}>{t.emoji} {t.name}</option>
                  ))}
                </select>
                <Knopf className="w-full !py-2 text-sm" onClick={speichern}>Speichern</Knopf>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-matt py-4">Kein Wörterbuch-Eintrag für „{wort}".</p>
        )}
      </div>
    </div>,
    document.body
  )
}

// Antippbarer Text: chinesische Wörter werden unterstrichen und öffnen das Popup.
export function TippText({ text, className = '' }) {
  const [segmente, setSegmente] = useState(() => segmentiereText(text))
  const [wort, setWort] = useState(null)

  // Segmentieren mit dem, was schon da ist: ist das Wörterbuch noch nicht
  // geladen, wird zeichenweise zerlegt (jedes Hanzi antippbar). Das ~10 MB
  // große Wörterbuch lädt erst beim Antippen eines Worts (im WortPopup) –
  // nicht automatisch bei jeder Karte.
  useEffect(() => { setSegmente(segmentiereText(text)) }, [text])

  return (
    <>
      <span className={`zeichen ${className}`}>
        {segmente.map((s, i) =>
          s.wort ? (
            <button
              key={i}
              onClick={() => setWort(s.t)}
              className="underline decoration-dotted decoration-akzent/40 underline-offset-4 hover:bg-akzent/10 rounded px-px transition"
            >
              {s.t}
            </button>
          ) : (
            <span key={i}>{s.t}</span>
          )
        )}
      </span>
      {wort && <WortPopup wort={wort} onClose={() => setWort(null)} />}
    </>
  )
}
