// Tägliche Lern-Session (SRS): fällige Wiederholungen + neue Karten.
// Karte: Zeichen groß (+ Audio) → „Pinyin zeigen" → „Antwort zeigen" → Bewertung.
// Bewertungsmodus umschaltbar: 3 Knöpfe (Standard) · 4 Knöpfe (Anki) · Wischen.
// Zusätzlich: Tastatur (Leertaste = aufdecken, danach Ziffern), Wisch-Gesten,
// „Rückgängig" für die letzte Bewertung, Pinyin in Tonfarben, Sound-Effekte.

import React, { useEffect, useRef, useState } from 'react'
import { useStore, kartenFuerPool, faelligeKarten, neueKartenVon, neueErlaubtHeute } from '../store.jsx'
import { intervallVorschau } from '../lib/srs.js'
import { mischen } from '../lib/utils.js'
import { sprich, ttsVerfuegbar } from '../lib/sprache.js'
import { klingeRichtig, klingeFalsch } from '../lib/klang.js'
import { Knopf, Panel, BackBar, Fortschritt, Pinyin } from '../components/UI.jsx'
import { TippText } from '../components/TippText.jsx'

const KNOPF_FARBE = {
  nochmal: 'border-err/50 text-err',
  schwer: 'border-gold/50 text-gold',
  gut: 'border-ok/50 text-ok',
  leicht: 'border-akzent/50 text-akzent',
}
const KNOPF_LABEL = { nochmal: 'Nochmal', schwer: 'Schwer', gut: 'Gut', leicht: 'Leicht' }
// Welche Knöpfe je Modus – die Ziffern 1..n auf der Tastatur folgen dieser Reihenfolge.
const MODUS_KNOEPFE = { drei: ['nochmal', 'gut', 'leicht'], anki: ['nochmal', 'schwer', 'gut', 'leicht'], wisch: ['nochmal', 'gut'] }

// 🔊-Knopf für die Aussprache (Web Speech API, zh-CN, kostenlos & offline)
function AudioKnopf({ text, tempo, klein = false }) {
  if (!ttsVerfuegbar()) return null
  return (
    <button
      onClick={(e) => { e.stopPropagation(); sprich(text, tempo) }}
      aria-label="Aussprache abspielen"
      className={`rounded-full border border-linie bg-panel2 hover:border-akzent/60 transition active:scale-90 flex items-center justify-center ${
        klein ? 'w-9 h-9 text-sm' : 'w-12 h-12 text-lg'
      }`}
    >
      🔊
    </button>
  )
}

export default function Lernen() {
  const store = useStore()
  const { state, ansicht, geheZu, bewerteKarte, mehrKartenHeute, sessionFertig, einstellungenSetzen, bewertungZuruecknehmen } = store
  const themaId = ansicht.params.thema || null
  const thema = themaId ? state.themen.find((t) => t.id === themaId) : null
  const modus = ansicht.params.modus || 'normal'

  const modusBewertung = state.einstellungen.bewertungsModus || 'drei'
  const tempo = state.einstellungen.ttsTempo ?? 0.8
  const soundAn = state.einstellungen.sound !== false

  const [queue, setQueue] = useState(() => {
    const pool = kartenFuerPool(state, themaId)
    if (modus === 'wiederholen') {
      return mischen(pool.filter((k) => k.wiederholungen > 0).map((k) => k.id))
    }
    const faellig = faelligeKarten(pool).map((k) => k.id)
    const neue = neueKartenVon(pool).slice(0, neueErlaubtHeute(state)).map((k) => k.id)
    const liste = [...faellig, ...neue]
    return state.einstellungen.mischen ? mischen(liste) : liste
  })
  const [startGroesse] = useState(() => queue.length)
  const [zeigeAntwort, setZeigeAntwort] = useState(false)
  const [zeigePinyin, setZeigePinyin] = useState(false)
  const [optionenOffen, setOptionenOffen] = useState(false)
  const [bewertet, setBewertet] = useState(0)
  const [historie, setHistorie] = useState([]) // Snapshots für „Rückgängig"
  const [wischX, setWischX] = useState(0) // aktuelle Wisch-Verschiebung (px)
  const touch = useRef({ x: 0, aktiv: false })
  const gemeldet = useRef(false)

  const karte = state.karten.find((k) => k.id === queue[0])
  const richtungZhDe = state.einstellungen.richtung === 'zh-de'
  const titel =
    modus === 'wiederholen'
      ? `🔁 ${thema ? thema.name : 'Gelernte wiederholen'}`
      : thema
        ? `${thema.emoji} ${thema.name}`
        : 'Tägliches Lernen'

  useEffect(() => {
    if (!karte && bewertet > 0 && !gemeldet.current) {
      gemeldet.current = true
      sessionFertig()
    }
  }, [karte, bewertet])

  const bewerten = (wertung) => {
    if (!karte) return
    // Snapshot VOR der Bewertung sichern (für Rückgängig)
    setHistorie((h) =>
      [...h, { karte: { ...karte }, stats: JSON.parse(JSON.stringify(state.stats)), queue: [...queue], bewertet }].slice(-20)
    )
    if (soundAn) (wertung === 'nochmal' ? klingeFalsch : klingeRichtig)()
    bewerteKarte(karte.id, wertung)
    setBewertet((n) => n + 1)
    setZeigeAntwort(false)
    setZeigePinyin(false)
    setWischX(0)
    setQueue((q) => {
      const [aktuelle, ...rest] = q
      if (wertung === 'nochmal') {
        const pos = Math.min(3, rest.length)
        return [...rest.slice(0, pos), aktuelle, ...rest.slice(pos)]
      }
      return rest
    })
  }

  const rueckgaengig = () => {
    if (!historie.length) return
    const letzte = historie[historie.length - 1]
    bewertungZuruecknehmen(letzte.karte, letzte.stats)
    setHistorie((h) => h.slice(0, -1))
    setQueue(letzte.queue)
    setBewertet(letzte.bewertet)
    setZeigeAntwort(true)
    setZeigePinyin(false)
    setWischX(0)
    gemeldet.current = false
  }

  const nachschub = (n = 5) => {
    mehrKartenHeute(n)
    const imQueue = new Set(queue)
    const pool = kartenFuerPool(state, themaId)
    const extra = neueKartenVon(pool).filter((k) => !imQueue.has(k.id)).slice(0, n).map((k) => k.id)
    setQueue((q) => [...q, ...extra])
    return extra.length
  }

  // Tastatursteuerung: Leertaste = aufdecken; danach 1..n = bewerten;
  // P = Pinyin zeigen; Z/U = Rückgängig.
  useEffect(() => {
    const onKey = (e) => {
      if (e.target && /^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return
      if (!karte) return
      if (e.code === 'Space') {
        e.preventDefault()
        if (!zeigeAntwort) setZeigeAntwort(true)
        return
      }
      if ((e.key === 'p' || e.key === 'P') && !zeigeAntwort) { setZeigePinyin(true); return }
      if ((e.key === 'z' || e.key === 'u') && historie.length) { rueckgaengig(); return }
      if (zeigeAntwort && /^[1-9]$/.test(e.key)) {
        const knoepfe = MODUS_KNOEPFE[modusBewertung] || MODUS_KNOEPFE.drei
        const idx = +e.key - 1
        if (idx < knoepfe.length) bewerten(knoepfe[idx])
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  // Wisch-Gesten (Handy): nach dem Aufdecken links = nochmal, rechts = gut.
  const onTouchStart = (e) => { if (!zeigeAntwort) return; touch.current = { x: e.touches[0].clientX, aktiv: true } }
  const onTouchMove = (e) => { if (touch.current.aktiv) setWischX(e.touches[0].clientX - touch.current.x) }
  const onTouchEnd = () => {
    if (!touch.current.aktiv) return
    touch.current.aktiv = false
    if (Math.abs(wischX) > 90) bewerten(wischX < 0 ? 'nochmal' : 'gut')
    else setWischX(0)
  }

  // ---------- Session beendet ----------
  if (!karte) {
    const istWdh = modus === 'wiederholen'
    const gelernteImPool = kartenFuerPool(state, themaId).filter((k) => k.wiederholungen > 0).length
    return (
      <div>
        <BackBar titel={titel} onZurueck={() => geheZu('home')} />
        <Panel className="text-center py-10">
          <div className="text-5xl mb-3">{bewertet > 0 ? '🎉' : istWdh ? '📭' : '✨'}</div>
          <h2 className="text-xl font-bold mb-2">
            {bewertet > 0 ? (istWdh ? 'Wiederholung fertig!' : 'Session geschafft!') : istWdh ? 'Noch nichts zum Wiederholen' : 'Nichts fällig'}
          </h2>
          <p className="text-matt mb-6">
            {bewertet > 0
              ? `${bewertet} Karten wiederholt · 🔥 Streak: ${state.stats.streak}`
              : istWdh
                ? 'Lerne erst ein paar neue Karten – danach kannst du sie hier jederzeit frei wiederholen.'
                : 'Alle Karten dieses Stapels sind aktuell gelernt.'}
          </p>
          <div className="flex flex-col gap-3 max-w-xs mx-auto">
            {bewertet > 0 && historie.length > 0 && (
              <Knopf variante="sekundaer" onClick={rueckgaengig}>↩︎ Letzte Bewertung rückgängig</Knopf>
            )}
            {istWdh ? (
              gelernteImPool > 0 && (
                <Knopf onClick={() => geheZu('lernen', { thema: themaId || undefined, modus: 'wiederholen' })}>
                  🔁 Nochmal wiederholen ({gelernteImPool})
                </Knopf>
              )
            ) : (
              <>
                <Knopf onClick={() => { const n = nachschub(5); if (!n) alert('Keine neuen Karten mehr in diesem Stapel.') }}>
                  ＋ Mehr Karten heute (+5 neue)
                </Knopf>
                {gelernteImPool > 0 && (
                  <Knopf variante="sekundaer" onClick={() => geheZu('lernen', { thema: themaId || undefined, modus: 'wiederholen' })}>
                    🔁 Gelernte wiederholen ({gelernteImPool})
                  </Knopf>
                )}
              </>
            )}
            <Knopf variante="sekundaer" onClick={() => geheZu('home')}>Zurück zum Start</Knopf>
          </div>
        </Panel>
      </div>
    )
  }

  const vorschau = intervallVorschau(karte)
  const kartenThema = state.themen.find((t) => t.id === karte.thema)

  return (
    <div>
      <BackBar
        titel={titel}
        onZurueck={() => geheZu('home')}
        rechts={
          <div className="flex items-center gap-2">
            {historie.length > 0 && (
              <button
                onClick={rueckgaengig}
                className="w-11 h-11 rounded-2xl bg-panel2 border border-linie hover:border-akzent/60 transition"
                aria-label="Rückgängig"
                title="Letzte Bewertung rückgängig (Z)"
              >
                ↩︎
              </button>
            )}
            <button
              onClick={() => setOptionenOffen((o) => !o)}
              className="w-11 h-11 rounded-2xl bg-panel2 border border-linie hover:border-akzent/60 transition"
              aria-label="Karten-Optionen"
            >
              ⋯
            </button>
          </div>
        }
      />

      {optionenOffen && (
        <Panel className="mb-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Bewertungsmodus</span>
            <div className="flex gap-1">
              {[['drei', '3'], ['anki', '4'], ['wisch', '↔']].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => einstellungenSetzen({ bewertungsModus: id })}
                  className={`min-w-[40px] rounded-xl border px-2 py-2 text-sm transition ${
                    modusBewertung === id ? 'bg-akzent/20 border-akzent text-tinte' : 'bg-panel border-linie text-matt'
                  }`}
                  title={id === 'drei' ? '3 Knöpfe' : id === 'anki' ? '4 Knöpfe (Anki)' : 'Wischen'}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Lernrichtung</span>
            <Knopf variante="sekundaer" className="!py-2 text-sm" onClick={() => einstellungenSetzen({ richtung: richtungZhDe ? 'de-zh' : 'zh-de' })}>
              {richtungZhDe ? '汉 → Deutsch' : 'Deutsch → 汉'}
            </Knopf>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Mischen</span>
            <Knopf variante="sekundaer" className="!py-2 text-sm" onClick={() => einstellungenSetzen({ mischen: !state.einstellungen.mischen })}>
              {state.einstellungen.mischen ? 'An' : 'Aus'}
            </Knopf>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Stapel neu mischen</span>
            <Knopf variante="sekundaer" className="!py-2 text-sm" onClick={() => setQueue((q) => mischen(q))}>🔀 Jetzt</Knopf>
          </div>
          {modus !== 'wiederholen' && (
            <div className="flex items-center justify-between">
              <span className="text-sm">Mehr Karten heute</span>
              <Knopf variante="sekundaer" className="!py-2 text-sm" onClick={() => nachschub(5)}>+5 neue</Knopf>
            </div>
          )}
        </Panel>
      )}

      <Fortschritt wert={bewertet} max={bewertet + queue.length} className="mb-4" />
      <div className="text-xs text-matt mb-3 text-center">
        Noch {queue.length} Karten {karte.wiederholungen === 0 && <span className="text-akzent font-semibold">· NEU</span>}
      </div>

      {/* Die Karte (mit Wisch-Gesten nach dem Aufdecken) */}
      <div className="relative">
        {/* Wisch-Hinweise links/rechts */}
        {zeigeAntwort && wischX < -30 && (
          <div className="absolute inset-y-0 left-3 z-20 flex items-center text-err font-bold text-lg pointer-events-none">↩︎ Nochmal</div>
        )}
        {zeigeAntwort && wischX > 30 && (
          <div className="absolute inset-y-0 right-3 z-20 flex items-center text-ok font-bold text-lg pointer-events-none">Gewusst ✓</div>
        )}
        <Panel
          className="min-h-[340px] flex flex-col items-center justify-center text-center relative touch-pan-y"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{
            transform: wischX ? `translateX(${wischX}px) rotate(${wischX / 30}deg)` : undefined,
            transition: touch.current.aktiv ? 'none' : 'transform 0.2s ease',
          }}
        >
          <div className="absolute top-4 left-4 text-xs text-matt">
            {kartenThema?.emoji} HSK {karte.hsk_level}
          </div>

          {richtungZhDe ? (
            <div className="flex items-center gap-3 mb-4">
              <div className="zeichen text-6xl sm:text-7xl font-bold select-none">{karte.hanzi}</div>
              <AudioKnopf text={karte.hanzi} tempo={tempo} />
            </div>
          ) : (
            <div className="text-3xl font-bold mb-4">{karte.bedeutung}</div>
          )}

          {/* Pinyin nur auf Klick (vor dem Aufdecken) */}
          {richtungZhDe && !zeigeAntwort && (
            zeigePinyin ? (
              <div className="text-xl mb-4"><Pinyin text={karte.pinyin} /></div>
            ) : (
              <button onClick={() => setZeigePinyin(true)} className="text-sm text-matt underline underline-offset-4 mb-4 min-h-[44px]">
                Pinyin zeigen
              </button>
            )
          )}

          {zeigeAntwort && (
            <div className="space-y-4 w-full">
              {richtungZhDe ? (
                <>
                  <div className="text-xl"><Pinyin text={karte.pinyin} /></div>
                  <div className="text-lg font-semibold">{karte.bedeutung}</div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-3">
                    <div className="zeichen text-5xl font-bold">{karte.hanzi}</div>
                    <AudioKnopf text={karte.hanzi} tempo={tempo} />
                  </div>
                  <div className="text-xl"><Pinyin text={karte.pinyin} /></div>
                </>
              )}
              <div className="border-t border-linie pt-4 text-left bg-panel rounded-2xl p-4">
                <div className="flex items-start gap-2">
                  <TippText text={karte.beispielsatz.join('')} className="text-lg leading-relaxed flex-1" />
                  <AudioKnopf text={karte.beispielsatz.join('')} tempo={tempo} klein />
                </div>
                <div className="text-sm mt-1"><Pinyin text={karte.beispiel_pinyin} /></div>
                <div className="text-sm text-matt mt-1">{karte.beispiel_uebersetzung}</div>
              </div>
            </div>
          )}
        </Panel>
      </div>

      {/* Aktionen */}
      <div className="mt-4">
        {!zeigeAntwort ? (
          <Knopf className="w-full text-lg" onClick={() => setZeigeAntwort(true)}>Antwort zeigen</Knopf>
        ) : modusBewertung === 'wisch' ? (
          <div>
            <div className="text-xs text-matt text-center mb-2">← wischen = Nochmal · wischen → = Gewusst</div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => bewerten('nochmal')} className="rounded-2xl border border-err/50 text-err bg-panel py-4 font-semibold transition active:scale-95 hover:bg-panel2">
                ✗ Nicht gewusst
              </button>
              <button onClick={() => bewerten('gut')} className="rounded-2xl border border-ok/50 text-ok bg-panel py-4 font-semibold transition active:scale-95 hover:bg-panel2">
                ✓ Gewusst
              </button>
            </div>
          </div>
        ) : (
          <div className={`grid gap-2 ${modusBewertung === 'anki' ? 'grid-cols-4' : 'grid-cols-3'}`}>
            {(MODUS_KNOEPFE[modusBewertung] || MODUS_KNOEPFE.drei).map((w) => (
              <button
                key={w}
                onClick={() => bewerten(w)}
                className={`rounded-2xl border bg-panel py-3 px-1 min-h-[64px] font-semibold text-sm transition active:scale-95 hover:bg-panel2 ${KNOPF_FARBE[w]}`}
              >
                {KNOPF_LABEL[w]}
                <div className="text-[10px] opacity-70 font-normal mt-0.5">{vorschau[w]}</div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
