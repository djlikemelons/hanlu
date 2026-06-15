// Themen- & Kartenverwaltung: Themen an-/abschalten, eigene Themen und
// eigene Karten anlegen, Karten bearbeiten/löschen.
//
// ERWEITERUNG: Automatische Kartengenerierung über die Anthropic-API.
// Idee: Ein „✨ Karten generieren"-Button pro Thema schickt Themenname +
// gewünschtes HSK-Level an die Messages-API (https://docs.claude.com,
// Modell z. B. 'claude-sonnet-4-6') und lässt sich Karten im Format des
// Starter-Decks (hanzi, pinyin, bedeutung, beispielsatz-Tokens, …) als JSON
// zurückgeben → karteAnlegen() pro Ergebnis. Achtung: API-Key niemals in
// einer rein statischen Seite einbetten, sondern z. B. über eine kleine
// Serverless-Function (Netlify Functions) proxyen.

import React, { useState } from 'react'
import { useStore } from '../store.jsx'
import { GEBIETE } from '../data/themen.js'
import { Panel, Knopf, BackBar, Chip } from '../components/UI.jsx'

const LEERE_KARTE = {
  hanzi: '', pinyin: '', bedeutung: '',
  satz: '', beispiel_pinyin: '', beispiel_uebersetzung: '', hsk_level: 4,
}

function KartenFormular({ initial, onSpeichern, onAbbruch }) {
  const [f, setF] = useState(initial)
  const setze = (feld) => (ev) => setF({ ...f, [feld]: ev.target.value })
  const ok = f.hanzi.trim() && f.pinyin.trim() && f.bedeutung.trim()

  return (
    <div className="space-y-2 bg-panel rounded-2xl p-4 border border-linie">
      <div className="grid grid-cols-2 gap-2">
        <input className="eingabe" placeholder="汉字 (z. B. 摄影)" value={f.hanzi} onChange={setze('hanzi')} />
        <input className="eingabe" placeholder="Pinyin (shèyǐng)" value={f.pinyin} onChange={setze('pinyin')} />
      </div>
      <input className="eingabe w-full" placeholder="Bedeutung (Deutsch)" value={f.bedeutung} onChange={setze('bedeutung')} />
      <input
        className="eingabe w-full"
        placeholder="Beispielsatz – Wörter mit Leerzeichen trennen (我 喜欢 摄影)"
        value={f.satz}
        onChange={setze('satz')}
      />
      <input className="eingabe w-full" placeholder="Pinyin des Satzes" value={f.beispiel_pinyin} onChange={setze('beispiel_pinyin')} />
      <input className="eingabe w-full" placeholder="Deutsche Übersetzung des Satzes" value={f.beispiel_uebersetzung} onChange={setze('beispiel_uebersetzung')} />
      <div className="flex items-center gap-2">
        <span className="text-xs text-matt">HSK:</span>
        {[3, 4, 5, 6].map((n) => (
          <Chip key={n} aktiv={+f.hsk_level === n} onClick={() => setF({ ...f, hsk_level: n })}>{n}</Chip>
        ))}
      </div>
      <div className="flex gap-2 pt-1">
        <Knopf className="flex-1 !py-2" disabled={!ok} onClick={() => ok && onSpeichern(f)}>Speichern</Knopf>
        <Knopf variante="geist" className="!py-2" onClick={onAbbruch}>Abbrechen</Knopf>
      </div>
    </div>
  )
}

export default function Themen() {
  const { state, geheZu, themaUmschalten, themaAnlegen, themaLoeschen, themaGebietSetzen, karteAnlegen, karteAktualisieren, karteLoeschen } = useStore()
  const [offen, setOffen] = useState(null) // Themen-ID mit ausgeklappter Kartenliste
  const [neuesThema, setNeuesThema] = useState('')
  const [neuesEmoji, setNeuesEmoji] = useState('')
  const [neuesGebiet, setNeuesGebiet] = useState('persoenlich')
  const [kartenFormular, setKartenFormular] = useState(null) // {themaId, karte|null}

  const speichereKarte = (f) => {
    const daten = {
      thema: kartenFormular.themaId,
      hanzi: f.hanzi.trim(),
      pinyin: f.pinyin.trim(),
      bedeutung: f.bedeutung.trim(),
      hsk_level: +f.hsk_level,
      beispielsatz: f.satz.trim() ? f.satz.trim().split(/\s+/) : [f.hanzi.trim()],
      beispiel_pinyin: f.beispiel_pinyin.trim(),
      beispiel_uebersetzung: f.beispiel_uebersetzung.trim(),
    }
    if (kartenFormular.karte) karteAktualisieren(kartenFormular.karte.id, daten)
    else karteAnlegen(daten)
    setKartenFormular(null)
  }

  return (
    <div className="space-y-4">
      <style>{`.eingabe{background:var(--panel2);border:1px solid var(--line);border-radius:1rem;padding:0.6rem 0.9rem;font-size:0.9rem;min-height:44px}`}</style>
      <BackBar titel="Themen & Karten" onZurueck={() => geheZu('home')} />

      {state.themen.map((t) => {
        const karten = state.karten.filter((k) => k.thema === t.id)
        const istOffen = offen === t.id
        return (
          <Panel key={t.id} className="!p-4">
            <div className="flex items-center gap-3">
              <button onClick={() => setOffen(istOffen ? null : t.id)} className="flex items-center gap-3 flex-1 text-left min-h-[44px]">
                <span className="text-2xl">{t.emoji}</span>
                <span>
                  <span className="font-semibold text-sm">{t.name}</span>
                  <span className="block text-xs text-matt">{karten.length} Karten {istOffen ? '▲' : '▼'}</span>
                </span>
              </button>
              {/* Thema aktiv/inaktiv: inaktive Themen tauchen weder im Pool noch als Lernblock auf */}
              <Chip aktiv={t.aktiv} onClick={() => themaUmschalten(t.id)}>
                {t.aktiv ? 'aktiv' : 'aus'}
              </Chip>
              {t.eigenes && (
                <button
                  className="text-err text-sm px-2 min-h-[44px]"
                  onClick={() => confirm(`Thema „${t.name}" samt ${karten.length} Karten löschen?`) && themaLoeschen(t.id)}
                >
                  🗑️
                </button>
              )}
            </div>

            {istOffen && (
              <div className="mt-4 space-y-2">
                {/* Gebiet des Themas (steuert „Persönliches" vs. „HSK-5-Training" im Test) */}
                <div className="flex items-center gap-2 flex-wrap bg-panel rounded-2xl p-3 border border-linie">
                  <span className="text-xs text-matt mr-1">Gebiet:</span>
                  {GEBIETE.map((g) => (
                    <Chip key={g.id} aktiv={(t.gebiet || 'persoenlich') === g.id} onClick={() => themaGebietSetzen(t.id, g.id)}>
                      {g.emoji} {g.name}
                    </Chip>
                  ))}
                </div>
                {kartenFormular?.themaId === t.id ? (
                  <KartenFormular
                    initial={
                      kartenFormular.karte
                        ? { ...kartenFormular.karte, satz: kartenFormular.karte.beispielsatz.join(' ') }
                        : LEERE_KARTE
                    }
                    onSpeichern={speichereKarte}
                    onAbbruch={() => setKartenFormular(null)}
                  />
                ) : (
                  <Knopf variante="sekundaer" className="w-full !py-2 text-sm" onClick={() => setKartenFormular({ themaId: t.id, karte: null })}>
                    ＋ Karte hinzufügen
                  </Knopf>
                )}
                <div className="max-h-72 overflow-y-auto space-y-1.5 pr-1">
                  {karten.map((k) => (
                    <div key={k.id} className="flex items-center gap-2 bg-panel rounded-xl px-3 py-2 border border-linie">
                      <span className="zeichen font-semibold">{k.hanzi}</span>
                      <span className="text-xs text-akzent">{k.pinyin}</span>
                      <span className="text-xs text-matt flex-1 truncate">{k.bedeutung}</span>
                      <button className="text-xs px-1.5 min-h-[36px]" onClick={() => setKartenFormular({ themaId: t.id, karte: k })}>✏️</button>
                      <button
                        className="text-xs px-1.5 min-h-[36px]"
                        onClick={() => confirm(`Karte „${k.hanzi}" löschen?`) && karteLoeschen(k.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Panel>
        )
      })}

      {/* Eigenes Thema anlegen → die App passt sich so jedem Interessenprofil an */}
      <Panel className="!p-4">
        <h3 className="font-bold text-sm mb-3">Eigenes Thema anlegen</h3>
        <div className="flex gap-2">
          <input className="eingabe w-16 text-center" placeholder="🎸" maxLength={4} value={neuesEmoji} onChange={(e) => setNeuesEmoji(e.target.value)} />
          <input className="eingabe flex-1" placeholder="Name, z. B. Musik" value={neuesThema} onChange={(e) => setNeuesThema(e.target.value)} />
          <Knopf
            className="!py-2"
            disabled={!neuesThema.trim()}
            onClick={() => {
              if (!neuesThema.trim()) return
              themaAnlegen(neuesThema.trim(), neuesEmoji.trim(), neuesGebiet)
              setNeuesThema(''); setNeuesEmoji(''); setNeuesGebiet('persoenlich')
            }}
          >
            ＋
          </Knopf>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-xs text-matt mr-1">Gebiet:</span>
          {GEBIETE.map((g) => (
            <Chip key={g.id} aktiv={neuesGebiet === g.id} onClick={() => setNeuesGebiet(g.id)}>
              {g.emoji} {g.name}
            </Chip>
          ))}
        </div>
      </Panel>
    </div>
  )
}
