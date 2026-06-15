// Tägliche Lern-Session (SRS): fällige Wiederholungen + neue Karten.
// Karten-Anzeige: Zeichen groß → „Pinyin zeigen" → „Antwort zeigen" → Bewertung
// im Anki-Stil (nochmal / schwer / gut / leicht).

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useStore, kartenFuerPool, faelligeKarten, neueKartenVon, neueErlaubtHeute } from '../store.jsx'
import { intervallVorschau } from '../lib/srs.js'
import { mischen } from '../lib/utils.js'
import { Knopf, Panel, BackBar, Fortschritt } from '../components/UI.jsx'

export default function Lernen() {
  const store = useStore()
  const { state, ansicht, geheZu, bewerteKarte, mehrKartenHeute, sessionFertig, einstellungenSetzen } = store
  const themaId = ansicht.params.thema || null
  const thema = themaId ? state.themen.find((t) => t.id === themaId) : null
  // 'normal' = fällige + neue Karten (SRS);
  // 'wiederholen' = freie Wiederholung aller schon gelernten Karten on demand.
  const modus = ansicht.params.modus || 'normal'

  // Session-Warteschlange einmalig beim Start aufbauen (nur Karten-IDs).
  const [queue, setQueue] = useState(() => {
    const pool = kartenFuerPool(state, themaId)
    if (modus === 'wiederholen') {
      // Alle bereits gelernten Karten, unabhängig vom Fälligkeitsdatum.
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
  const gemeldet = useRef(false)

  const karte = state.karten.find((k) => k.id === queue[0])
  const richtungZhDe = state.einstellungen.richtung === 'zh-de'
  const titel =
    modus === 'wiederholen'
      ? `🔁 ${thema ? thema.name : 'Gelernte wiederholen'}`
      : thema
        ? `${thema.emoji} ${thema.name}`
        : 'Tägliches Lernen'

  // Session-Ende einmalig melden (zählt für die China-Reisekarte) – als
  // Effekt, nicht während des Renderns.
  useEffect(() => {
    if (!karte && bewertet > 0 && !gemeldet.current) {
      gemeldet.current = true
      sessionFertig()
    }
  }, [karte, bewertet])

  const bewerten = (wertung) => {
    bewerteKarte(karte.id, wertung)
    setBewertet((n) => n + 1)
    setZeigeAntwort(false)
    setZeigePinyin(false)
    setQueue((q) => {
      const [aktuelle, ...rest] = q
      if (wertung === 'nochmal') {
        // „nochmal" → Karte rückt ein paar Positionen nach hinten
        const pos = Math.min(3, rest.length)
        return [...rest.slice(0, pos), aktuelle, ...rest.slice(pos)]
      }
      return rest
    })
  }

  // „Mehr Karten heute": Tageslimit on demand erhöhen (kein hartes Limit)
  const nachschub = (n = 5) => {
    mehrKartenHeute(n)
    const imQueue = new Set(queue)
    const pool = kartenFuerPool(state, themaId)
    const extra = neueKartenVon(pool)
      .filter((k) => !imQueue.has(k.id))
      .slice(0, n)
      .map((k) => k.id)
    setQueue((q) => [...q, ...extra])
    return extra.length
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
          <button
            onClick={() => setOptionenOffen((o) => !o)}
            className="w-11 h-11 rounded-2xl bg-panel2 border border-linie hover:border-akzent/60 transition"
            aria-label="Karten-Optionen"
          >
            ⋯
          </button>
        }
      />

      {/* Karten-Optionen: Mischen, Lernrichtung, Stapel neu mischen */}
      {optionenOffen && (
        <Panel className="mb-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Lernrichtung</span>
            <Knopf
              variante="sekundaer"
              className="!py-2 text-sm"
              onClick={() => einstellungenSetzen({ richtung: richtungZhDe ? 'de-zh' : 'zh-de' })}
            >
              {richtungZhDe ? '汉 → Deutsch' : 'Deutsch → 汉'}
            </Knopf>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Mischen</span>
            <Knopf
              variante="sekundaer"
              className="!py-2 text-sm"
              onClick={() => einstellungenSetzen({ mischen: !state.einstellungen.mischen })}
            >
              {state.einstellungen.mischen ? 'An' : 'Aus'}
            </Knopf>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Stapel neu mischen</span>
            <Knopf variante="sekundaer" className="!py-2 text-sm" onClick={() => setQueue((q) => mischen(q))}>
              🔀 Jetzt
            </Knopf>
          </div>
          {modus !== 'wiederholen' && (
            <div className="flex items-center justify-between">
              <span className="text-sm">Mehr Karten heute</span>
              <Knopf variante="sekundaer" className="!py-2 text-sm" onClick={() => nachschub(5)}>
                +5 neue
              </Knopf>
            </div>
          )}
        </Panel>
      )}

      <Fortschritt wert={bewertet} max={bewertet + queue.length} className="mb-4" />
      <div className="text-xs text-matt mb-3 text-center">
        Noch {queue.length} Karten {karte.wiederholungen === 0 && <span className="text-akzent font-semibold">· NEU</span>}
      </div>

      {/* Die Karte */}
      <Panel className="min-h-[340px] flex flex-col items-center justify-center text-center relative">
        <div className="absolute top-4 left-4 text-xs text-matt">
          {kartenThema?.emoji} HSK {karte.hsk_level}
        </div>

        {richtungZhDe ? (
          <div className="zeichen text-6xl sm:text-7xl font-bold mb-4 select-none">{karte.hanzi}</div>
        ) : (
          <div className="text-3xl font-bold mb-4">{karte.bedeutung}</div>
        )}

        {/* Pinyin nur auf Klick */}
        {richtungZhDe && !zeigeAntwort && (
          zeigePinyin ? (
            <div className="text-xl text-akzent mb-4">{karte.pinyin}</div>
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
                <div className="text-xl text-akzent">{karte.pinyin}</div>
                <div className="text-lg font-semibold">{karte.bedeutung}</div>
              </>
            ) : (
              <>
                <div className="zeichen text-5xl font-bold">{karte.hanzi}</div>
                <div className="text-xl text-akzent">{karte.pinyin}</div>
              </>
            )}
            <div className="border-t border-linie pt-4 text-left bg-panel rounded-2xl p-4">
              <div className="zeichen text-lg leading-relaxed">{karte.beispielsatz.join('')}</div>
              <div className="text-sm text-akzent/90 mt-1">{karte.beispiel_pinyin}</div>
              <div className="text-sm text-matt mt-1">{karte.beispiel_uebersetzung}</div>
              {/* ERWEITERUNG: Sprachausgabe – hier einen 🔊-Button einhängen,
                  der hanzi/beispielsatz über die Web Speech API (speechSynthesis,
                  lang 'zh-CN') oder eine TTS-API vorliest. */}
            </div>
          </div>
        )}
      </Panel>

      {/* Aktionen */}
      <div className="mt-4">
        {!zeigeAntwort ? (
          <Knopf className="w-full text-lg" onClick={() => setZeigeAntwort(true)}>
            Antwort zeigen
          </Knopf>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {[
              ['nochmal', 'Nochmal', 'border-err/50 text-err', vorschau.nochmal],
              ['schwer', 'Schwer', 'border-gold/50 text-gold', vorschau.schwer],
              ['gut', 'Gut', 'border-ok/50 text-ok', vorschau.gut],
              ['leicht', 'Leicht', 'border-akzent/50 text-akzent', vorschau.leicht],
            ].map(([w, label, farbe, zeit]) => (
              <button
                key={w}
                onClick={() => bewerten(w)}
                className={`rounded-2xl border bg-panel py-3 px-1 min-h-[64px] font-semibold text-sm transition active:scale-95 hover:bg-panel2 ${farbe}`}
              >
                {label}
                <div className="text-[10px] opacity-70 font-normal mt-0.5">{zeit}</div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
