// 互动小说 Story-Mode: interaktive Kurzgeschichte mit Entscheidungen.
// Jedes Wort ist antippbar → Pinyin/Übersetzung (sofern Gloss vorhanden).

import React, { useEffect, useState } from 'react'
import { useStore } from '../store.jsx'
import { STORIES } from '../data/story.js'
import { Panel, Knopf, BackBar } from '../components/UI.jsx'

const istInterpunktion = (t) => /^[，。！？、：「」«»——…・\s]+$/.test(t)

// Visuelles Szenen-Banner pro Kapitel: Stimmung (Farbverlauf), Ort/Zeit
// und schwebende Szenen-Emojis – macht die Geschichte weniger „trocken".
function SzenenBanner({ szene }) {
  if (!szene) return null
  return (
    <div
      className="relative h-28 rounded-2xl overflow-hidden mb-4 border border-linie"
      style={{ background: `linear-gradient(140deg, ${szene.farbe1}, ${szene.farbe2})` }}
    >
      {/* Lichtschein */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(70% 90% at 72% 15%, rgba(255,255,255,0.18), transparent 60%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.35), transparent 55%)' }} />
      {/* Haupt-Emoji schwebt */}
      <div className="anim-szene-schwebt absolute right-5 bottom-2 text-6xl drop-shadow-[0_8px_10px_rgba(0,0,0,0.4)]">
        {szene.emoji}
      </div>
      <div className="absolute left-4 top-3 text-2xl opacity-90 drop-shadow">{szene.deko}</div>
      {/* Orts-/Zeit-Chip */}
      <div className="zeichen absolute left-4 bottom-3 text-xs text-white bg-black/35 backdrop-blur-sm px-2.5 py-1 rounded-full">
        📍 {szene.ort}
      </div>
    </div>
  )
}

function TokenText({ tokens, gloss, onWort, gewaehlt }) {
  return (
    <p className="zeichen text-xl leading-loose">
      {tokens.map((t, i) =>
        istInterpunktion(t) ? (
          <span key={i}>{t}</span>
        ) : (
          <button
            key={i}
            onClick={() => onWort(t)}
            className={`rounded-md px-0.5 transition ${
              gewaehlt === t ? 'bg-akzent/30 text-akzent' : gloss?.[t] ? 'underline decoration-dotted decoration-akzent/50 underline-offset-4' : ''
            } hover:bg-akzent/15`}
          >
            {t}
          </button>
        )
      )}
    </p>
  )
}

export default function Story() {
  const { state, geheZu, storyFertig, xpHinzu } = useStore()
  const [story, setStory] = useState(null)
  const [knotenId, setKnotenId] = useState(null)
  const [wort, setWort] = useState(null)
  const [zeigePinyin, setZeigePinyin] = useState(false)
  const [belohnt, setBelohnt] = useState(false)

  // Ende erreicht → einmalig XP gutschreiben (Effekt, vor jedem early return,
  // damit die Hook-Reihenfolge stabil bleibt).
  const aktuellerKnoten = story ? story.knoten[knotenId] : null
  useEffect(() => {
    if (aktuellerKnoten?.ende && !belohnt) {
      setBelohnt(true)
      if (!state.story.fertig.includes(story.id)) {
        storyFertig(story.id)
        xpHinzu(aktuellerKnoten.xp)
      }
    }
  }, [aktuellerKnoten, belohnt])

  // ---------- Auswahl ----------
  if (!story) {
    return (
      <div className="space-y-4">
        <BackBar titel="📖 Story-Mode" onZurueck={() => geheZu('home')} />
        {STORIES.map((s) => (
          <Panel
            key={s.id}
            className="flex items-center gap-4 cursor-pointer hover:border-akzent/60 transition"
            onClick={() => { setStory(s); setKnotenId(s.start); setWort(null); setBelohnt(false) }}
          >
            <div className="text-4xl">{s.emoji}</div>
            <div className="flex-1">
              <div className="zeichen font-bold">{s.titel}</div>
              <div className="text-xs text-matt">{s.untertitel}{state.story.fertig.includes(s.id) ? ' · ✅ abgeschlossen' : ''}</div>
            </div>
            <div className="text-matt">→</div>
          </Panel>
        ))}
        <p className="text-xs text-matt text-center">
          Tipp: Tippe in der Geschichte auf einzelne Wörter für Pinyin & Übersetzung.
          <br />Neue Geschichten lassen sich in src/data/story.js ergänzen.
        </p>
      </div>
    )
  }

  const knoten = aktuellerKnoten
  const glossEintrag = wort && knoten.gloss?.[wort]

  return (
    <div>
      <BackBar titel={`${story.emoji} ${story.titel}`} onZurueck={() => setStory(null)} />

      <SzenenBanner szene={knoten.szene} />

      <Panel className="mb-4">
        {knoten.ende && <div className="text-center text-lg font-bold mb-3">{knoten.bewertung}</div>}
        <TokenText tokens={knoten.text} gloss={knoten.gloss} gewaehlt={wort} onWort={(w) => setWort(wort === w ? null : w)} />

        {/* Vokabel-Hilfe zum angetippten Wort */}
        {wort && (
          <div className="mt-4 bg-panel rounded-2xl border border-akzent/40 p-3 text-sm flex items-baseline gap-3">
            <span className="zeichen text-lg font-bold">{wort}</span>
            {glossEintrag ? (
              <span><span className="text-akzent">{glossEintrag[0]}</span> · {glossEintrag[1]}</span>
            ) : (
              <span className="text-matt">Für dieses Wort gibt es keinen Hinweis – du kennst es bestimmt schon! 😉</span>
            )}
          </div>
        )}

        <button onClick={() => setZeigePinyin((z) => !z)} className="text-xs text-matt underline underline-offset-4 mt-4 min-h-[40px]">
          {zeigePinyin ? 'Pinyin verbergen' : 'Pinyin des Absatzes zeigen'}
        </button>
        {zeigePinyin && <p className="text-sm text-akzent/90 mt-1 leading-relaxed">{knoten.pinyin}</p>}
      </Panel>

      {knoten.ende ? (
        <div className="space-y-2">
          <Panel className="text-center !py-4 text-sm text-matt">+{knoten.xp} XP {state.story.fertig.includes(story.id) ? '· Geschichte abgeschlossen' : ''}</Panel>
          <div className="grid grid-cols-2 gap-2">
            <Knopf variante="sekundaer" onClick={() => { setKnotenId(story.start); setWort(null); setBelohnt(false) }}>
              ↻ Anders entscheiden
            </Knopf>
            <Knopf onClick={() => setStory(null)}>Fertig</Knopf>
          </div>
        </div>
      ) : (
        <div className="grid gap-2">
          {knoten.auswahl.map((a) => (
            <Knopf key={a.ziel + a.label} variante="sekundaer" className="w-full text-left" onClick={() => { setKnotenId(a.ziel); setWort(null) }}>
              {a.label}
            </Knopf>
          ))}
        </div>
      )}
    </div>
  )
}
