// ✍️ Anwenden & Schreiben (KI-Tutor): Zielwort wählen, eigenen Satz schreiben,
// prüfen lassen. Mit eigenem Anthropic-API-Key (lokal) gibt es echtes Feedback
// (korrekt? natürlich? Zielwort richtig?), eine korrigierte Fassung mit Pinyin
// und Ermutigung. Ohne Key: einfache Checks + Musterbeispiel zum Selbstvergleich.

import React, { useMemo, useState } from 'react'
import { useStore } from '../store.jsx'
import { sprich, ttsVerfuegbar } from '../lib/sprache.js'
import { pruefeSatzKI, pruefeSatzEinfach } from '../lib/kiTutor.js'
import { Panel, Knopf, BackBar, Pinyin } from '../components/UI.jsx'

const AUFGABEN = [
  (w) => `Bilde einen Satz mit 「${w}」.`,
  (w) => `Schreibe einen Satz mit 「${w}」 über deinen Alltag.`,
  (w) => `Verwende 「${w}」 in einer Frage.`,
  (w) => `Bilde einen Satz mit 「${w}」 in der Vergangenheit.`,
  (w, thema) => thema ? `Bilde einen Satz mit 「${w}」 zum Thema „${thema}".` : `Bilde einen längeren Satz mit 「${w}」.`,
]

export default function Schreiben() {
  const { state, geheZu, karteAktualisieren } = useStore()
  const apiKey = (state.einstellungen.apiKey || '').trim()

  // Zielwort-Auswahl: zuletzt gelernte Wörter zuerst
  const woerter = useMemo(() => {
    const gelernt = state.karten.filter((k) => k.wiederholungen > 0)
    const basis = gelernt.length ? gelernt : state.karten
    return [...basis].sort((a, b) => (b.zuletztGeuebt || '').localeCompare(a.zuletztGeuebt || '')).slice(0, 24)
  }, [state.karten])

  const [karte, setKarte] = useState(woerter[0] || null)
  const [aufgabeIdx, setAufgabeIdx] = useState(0)
  const [satz, setSatz] = useState('')
  const [laedt, setLaedt] = useState(false)
  const [ergebnis, setErgebnis] = useState(null) // KI-Objekt
  const [einfach, setEinfach] = useState(null) // Fallback-Objekt
  const [fehler, setFehler] = useState(null)
  const [gespeichert, setGespeichert] = useState(false)

  const tempo = state.einstellungen.ttsTempo ?? 0.8
  const themaName = karte ? state.themen.find((t) => t.id === karte.thema)?.name : null
  const aufgabe = karte ? AUFGABEN[aufgabeIdx % AUFGABEN.length](karte.hanzi, themaName) : ''

  const zuruecksetzen = () => { setErgebnis(null); setEinfach(null); setFehler(null); setGespeichert(false) }

  const waehle = (k) => { setKarte(k); setSatz(''); zuruecksetzen() }

  const pruefen = async () => {
    if (!karte || !satz.trim()) return
    zuruecksetzen()
    if (apiKey) {
      setLaedt(true)
      try {
        const r = await pruefeSatzKI({ satz: satz.trim(), zielwort: karte.hanzi, aufgabe, apiKey })
        setErgebnis(r)
      } catch (e) {
        setFehler(e.message || 'Unbekannter Fehler')
      } finally {
        setLaedt(false)
      }
    } else {
      setEinfach(pruefeSatzEinfach({ satz: satz.trim(), zielwort: karte.hanzi, musterSatz: karte.beispielsatz.join('') }))
    }
  }

  const alsBeispielSpeichern = (text, pinyin) => {
    karteAktualisieren(karte.id, { beispielsatz: [text], beispiel_pinyin: pinyin || '', beispiel_uebersetzung: '' })
    setGespeichert(true)
  }

  if (!karte) {
    return (
      <div>
        <BackBar titel="✍️ Schreiben" onZurueck={() => geheZu('home')} />
        <Panel className="text-center py-10 text-matt">Lerne erst ein paar Karten – dann kannst du hier eigene Sätze damit bilden.</Panel>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <BackBar titel="✍️ Anwenden & Schreiben" onZurueck={() => geheZu('home')} />

      {/* Zielwort wählen */}
      <Panel className="!py-3">
        <div className="text-xs text-matt mb-2">Zielwort wählen (zuletzt gelernte zuerst):</div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {woerter.map((k) => (
            <button
              key={k.id}
              onClick={() => waehle(k)}
              className={`zeichen shrink-0 rounded-xl border px-3 py-2 text-lg transition min-h-[44px] ${
                karte.id === k.id ? 'bg-akzent/20 border-akzent' : 'bg-panel border-linie hover:border-akzent/60'
              }`}
            >
              {k.hanzi}
            </button>
          ))}
        </div>
      </Panel>

      {/* Aufgabe */}
      <Panel className="!py-4">
        <div className="flex items-start gap-2">
          <div className="flex-1">
            <div className="text-xs text-matt mb-1">Aufgabe</div>
            <div className="zeichen text-base font-semibold">{aufgabe}</div>
            <div className="text-sm text-matt mt-1">
              {karte.hanzi} · <Pinyin text={karte.pinyin} /> · {karte.bedeutung}
            </div>
          </div>
          {ttsVerfuegbar() && (
            <button onClick={() => sprich(karte.hanzi, tempo)} aria-label="Aussprache" className="w-9 h-9 rounded-full border border-linie bg-panel2 text-sm shrink-0">🔊</button>
          )}
        </div>
        <button onClick={() => { setAufgabeIdx((i) => i + 1); zuruecksetzen() }} className="text-xs text-akzent mt-2">↻ Andere Aufgabe</button>
      </Panel>

      {/* Eingabe */}
      <textarea
        value={satz}
        onChange={(e) => setSatz(e.target.value)}
        rows={3}
        placeholder="你的句子…（用中文输入法）"
        className="zeichen w-full rounded-2xl border border-linie bg-panel p-3 text-lg leading-relaxed focus:border-akzent focus:outline-none"
      />

      <Knopf className="w-full" onClick={pruefen} disabled={!satz.trim() || laedt}>
        {laedt ? 'KI-Tutor prüft …' : apiKey ? '🤖 Vom KI-Tutor prüfen lassen' : 'Prüfen (ohne KI)'}
      </Knopf>

      {!apiKey && (
        <p className="text-xs text-matt text-center">
          Für echtes KI-Feedback einen Anthropic-API-Key in den <button onClick={() => geheZu('einstellungen')} className="text-akzent underline">Einstellungen</button> hinterlegen.
        </p>
      )}

      {fehler && <Panel className="!py-3 text-sm text-err">KI-Tutor nicht erreichbar: {fehler}</Panel>}

      {/* KI-Ergebnis */}
      {ergebnis && (
        <Panel className="space-y-3">
          <div className="flex gap-4 text-sm font-semibold">
            <span className={ergebnis.korrekt ? 'text-ok' : 'text-err'}>{ergebnis.korrekt ? '✓ korrekt & natürlich' : '✗ noch nicht ganz'}</span>
            <span className={ergebnis.zielwortRichtig ? 'text-ok' : 'text-err'}>{ergebnis.zielwortRichtig ? '✓ Zielwort passt' : '✗ Zielwort prüfen'}</span>
          </div>
          {ergebnis.feedback && <p className="text-sm">{ergebnis.feedback}</p>}
          {ergebnis.korrektur && (
            <div className="rounded-2xl border border-akzent/40 bg-panel p-3">
              <div className="text-xs text-matt mb-1">Korrigierte Fassung:</div>
              <div className="flex items-center gap-2">
                <div className="zeichen text-lg font-semibold flex-1">{ergebnis.korrektur}</div>
                {ttsVerfuegbar() && <button onClick={() => sprich(ergebnis.korrektur, tempo)} aria-label="Aussprache" className="w-9 h-9 rounded-full border border-linie bg-panel2 text-sm shrink-0">🔊</button>}
              </div>
              {ergebnis.korrektur_pinyin && <div className="text-sm mt-1"><Pinyin text={ergebnis.korrektur_pinyin} /></div>}
            </div>
          )}
          {ergebnis.ermutigung && <p className="text-sm text-akzent">💪 {ergebnis.ermutigung}</p>}
          {!gespeichert ? (
            <div className="grid grid-cols-2 gap-2">
              <Knopf variante="sekundaer" className="!py-2 text-sm" onClick={() => alsBeispielSpeichern(satz.trim(), '')}>Eigenen Satz als Beispiel</Knopf>
              <Knopf className="!py-2 text-sm" onClick={() => alsBeispielSpeichern(ergebnis.korrektur || satz.trim(), ergebnis.korrektur_pinyin)}>Korrektur als Beispiel</Knopf>
            </div>
          ) : (
            <div className="text-center text-ok font-semibold">✓ Als Beispiel zu {karte.hanzi} gespeichert</div>
          )}
        </Panel>
      )}

      {/* Fallback ohne KI */}
      {einfach && (
        <Panel className="space-y-3">
          <div className="text-xs text-gold">Ohne KI nur eingeschränkt – automatische Grund-Checks + Musterbeispiel:</div>
          <div className="space-y-1 text-sm">
            <div className={einfach.checks.zielwort ? 'text-ok' : 'text-err'}>{einfach.checks.zielwort ? '✓' : '✗'} Zielwort 「{karte.hanzi}」 {einfach.checks.zielwort ? 'kommt vor' : 'fehlt'}</div>
            <div className={einfach.checks.laenge ? 'text-ok' : 'text-matt'}>{einfach.checks.laenge ? '✓' : '•'} Länge {einfach.checks.laenge ? 'in Ordnung' : '(etwas mehr ausführen)'}</div>
            <div className={einfach.checks.satzzeichen ? 'text-ok' : 'text-matt'}>{einfach.checks.satzzeichen ? '✓' : '•'} Satzzeichen am Ende {einfach.checks.satzzeichen ? 'gesetzt' : '(z. B. 。)'}</div>
          </div>
          {einfach.musterSatz && (
            <div className="rounded-2xl border border-linie bg-panel p-3">
              <div className="text-xs text-matt mb-1">Musterbeispiel zum Selbstvergleich:</div>
              <div className="zeichen text-base">{einfach.musterSatz}</div>
              <div className="text-sm mt-1"><Pinyin text={karte.beispiel_pinyin} /></div>
              <div className="text-sm text-matt">{karte.beispiel_uebersetzung}</div>
            </div>
          )}
          {!gespeichert ? (
            <Knopf variante="sekundaer" className="w-full !py-2 text-sm" onClick={() => alsBeispielSpeichern(satz.trim(), '')}>Eigenen Satz als Beispiel speichern</Knopf>
          ) : (
            <div className="text-center text-ok font-semibold">✓ Gespeichert</div>
          )}
        </Panel>
      )}
    </div>
  )
}
