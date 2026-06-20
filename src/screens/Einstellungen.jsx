// Einstellungen: neue Karten/Tag, Themen-Pool fürs tägliche Lernen,
// Dark/Light, Export/Import (JSON-Backup), Einstufung wiederholen, Reset.

import React, { useRef } from 'react'
import { useStore } from '../store.jsx'
import { RESERVOIR } from '../data/reservoir.js'
import { sprich, ttsVerfuegbar } from '../lib/sprache.js'
import { Panel, Knopf, BackBar, Chip } from '../components/UI.jsx'

export default function Einstellungen() {
  const { state, geheZu, einstellungenSetzen, exportieren, importieren, zuruecksetzen } = useStore()
  const dateiRef = useRef(null)
  const e = state.einstellungen

  const importDatei = (ev) => {
    const datei = ev.target.files?.[0]
    if (!datei) return
    const leser = new FileReader()
    leser.onload = () => {
      try {
        const obj = JSON.parse(leser.result)
        if (!obj || !Array.isArray(obj.karten)) throw new Error('ungültig')
        if (confirm('Aktuellen Lernstand durch das Backup ersetzen?')) {
          importieren(obj)
          alert('Import erfolgreich! ✅')
        }
      } catch {
        alert('Diese Datei ist kein gültiges HànLù-Backup.')
      }
    }
    leser.readAsText(datei)
    ev.target.value = ''
  }

  const poolUmschalten = (id) => {
    const pool = e.poolThemen.includes(id)
      ? e.poolThemen.filter((p) => p !== id)
      : [...e.poolThemen, id]
    if (pool.length === 0) return // mindestens ein Thema im Pool
    einstellungenSetzen({ poolThemen: pool })
  }

  return (
    <div className="space-y-5">
      <BackBar titel="Einstellungen" onZurueck={() => geheZu('home')} />

      <Panel>
        <h3 className="font-bold text-sm mb-3">Neue Karten pro Tag</h3>
        <div className="flex gap-2">
          {[4, 8, 12, 20].map((n) => (
            <Chip key={n} aktiv={e.neueProTag === n} onClick={() => einstellungenSetzen({ neueProTag: n })}>
              {n}
            </Chip>
          ))}
          <input
            type="number"
            min="0"
            max="100"
            value={e.neueProTag}
            onChange={(ev) => einstellungenSetzen({ neueProTag: Math.max(0, +ev.target.value || 0) })}
            className="w-20 rounded-full px-3 bg-panel border border-linie text-center"
            aria-label="Neue Karten pro Tag"
          />
        </div>
        <p className="text-xs text-matt mt-2">Mit „Mehr Karten heute" kannst du das Limit in jeder Session spontan erhöhen.</p>
      </Panel>

      {/* Karteikarten: Bewertungsmodus, Aussprache-Tempo, Sound-Effekte */}
      <Panel className="space-y-4">
        <div>
          <h3 className="font-bold text-sm mb-1">Bewertung auf Karten</h3>
          <p className="text-xs text-matt mb-3">Wie du nach dem Aufdecken bewertest.</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              ['drei', '3 Knöpfe', 'Standard'],
              ['anki', '4 Knöpfe', 'Anki (+ Schwer)'],
              ['wisch', 'Wischen', 'Gewusst / nicht'],
            ].map(([id, label, sub]) => (
              <button
                key={id}
                onClick={() => einstellungenSetzen({ bewertungsModus: id })}
                className={`rounded-2xl border p-3 text-center transition active:scale-[0.98] ${
                  (e.bewertungsModus || 'drei') === id ? 'bg-akzent/20 border-akzent text-tinte' : 'bg-panel border-linie text-matt hover:border-akzent/60'
                }`}
              >
                <div className="font-semibold text-sm">{label}</div>
                <div className="text-[11px] mt-0.5">{sub}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-linie pt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm">Aussprache (Audio 🔊)</h3>
            {ttsVerfuegbar() && (
              <Knopf variante="sekundaer" className="!py-2 text-sm" onClick={() => sprich('你好，欢迎学习中文', e.ttsTempo ?? 0.8)}>
                Test ▶
              </Knopf>
            )}
          </div>
          {ttsVerfuegbar() ? (
            <>
              <p className="text-xs text-matt mb-2">Sprechtempo</p>
              <div className="flex gap-2">
                {[['Langsam', 0.6], ['Normal', 0.8], ['Schnell', 1.0]].map(([label, v]) => (
                  <Chip key={v} aktiv={(e.ttsTempo ?? 0.8) === v} onClick={() => einstellungenSetzen({ ttsTempo: v })}>
                    {label}
                  </Chip>
                ))}
              </div>
            </>
          ) : (
            <p className="text-xs text-gold">
              ⚠️ Dieser Browser hat keine chinesische Stimme installiert – die Aussprache ist hier nicht verfügbar.
              Auf iPhone/Mac & Android sind zh-CN-Stimmen meist vorhanden.
            </p>
          )}
        </div>

        <div className="border-t border-linie pt-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-sm">Sound-Effekte</h3>
            <p className="text-xs text-matt mt-1">Dezente Töne bei richtig/falsch.</p>
          </div>
          <Knopf variante="sekundaer" onClick={() => einstellungenSetzen({ sound: !(e.sound !== false) })}>
            {e.sound !== false ? 'An' : 'Aus'}
          </Knopf>
        </div>
      </Panel>

      {/* Selbstfüllendes Vokabelsystem: zieht automatisch aus dem Reservoir */}
      <Panel className="flex items-center justify-between gap-3">
        <div>
          <h3 className="font-bold text-sm">Auto-Nachschub 📦</h3>
          <p className="text-xs text-matt mt-1">
            Geht dein Vorrat an neuen Karten zur Neige, füllt die App automatisch aus dem eingebauten
            Vokabel-Reservoir nach ({RESERVOIR.filter((r) => !state.karten.some((k) => k.id === r.id)).length} Wörter übrig).
          </p>
        </div>
        <Knopf variante="sekundaer" onClick={() => einstellungenSetzen({ autoNachschub: !e.autoNachschub })}>
          {e.autoNachschub !== false ? 'An' : 'Aus'}
        </Knopf>
      </Panel>

      <Panel>
        <h3 className="font-bold text-sm mb-1">Themen fürs tägliche Lernen</h3>
        <p className="text-xs text-matt mb-3">
          Der allgemeine Pool – Spezialthemen lernst du gezielt über die Lernblöcke auf dem Startbildschirm.
        </p>
        <div className="flex flex-wrap gap-2">
          {state.themen.filter((t) => t.aktiv).map((t) => (
            <Chip key={t.id} aktiv={e.poolThemen.includes(t.id)} onClick={() => poolUmschalten(t.id)}>
              {t.emoji} {t.name}
            </Chip>
          ))}
        </div>
      </Panel>

      <Panel>
        <h3 className="font-bold text-sm mb-1">Erscheinungsbild</h3>
        <p className="text-xs text-matt mb-3">Dark Mode ist Standard – hier auf Hell (White Mode) umschalten.</p>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => einstellungenSetzen({ hell: false })}
            className={`rounded-2xl border p-3 text-center font-semibold transition active:scale-[0.98] min-h-[56px] ${
              !e.hell ? 'bg-akzent/20 border-akzent text-tinte' : 'bg-panel border-linie text-matt hover:border-akzent/60'
            }`}
          >
            🌙 Dunkel
          </button>
          <button
            onClick={() => einstellungenSetzen({ hell: true })}
            className={`rounded-2xl border p-3 text-center font-semibold transition active:scale-[0.98] min-h-[56px] ${
              e.hell ? 'bg-akzent/20 border-akzent text-tinte' : 'bg-panel border-linie text-matt hover:border-akzent/60'
            }`}
          >
            ☀️ Hell
          </button>
        </div>
      </Panel>

      {/* KI-Tutor: eigener Anthropic-API-Key, nur lokal gespeichert */}
      <Panel className="space-y-2">
        <h3 className="font-bold text-sm">KI-Tutor 🤖 (optional)</h3>
        <p className="text-xs text-matt">
          Für echtes Feedback im Schreib-Modus. Dein Anthropic-API-Key wird <b>nur lokal</b> in diesem
          Browser gespeichert und ausschließlich für die Satzprüfung verwendet (Modell claude-sonnet-4-6).
          Ohne Key funktioniert der Schreib-Modus mit einfachen Checks + Musterbeispiel.
        </p>
        <input
          type="password"
          value={e.apiKey || ''}
          onChange={(ev) => einstellungenSetzen({ apiKey: ev.target.value })}
          placeholder="sk-ant-… (optional)"
          className="w-full rounded-2xl border border-linie bg-panel2 px-4 py-3 text-sm min-h-[48px]"
          autoComplete="off"
        />
        <p className="text-[11px] text-matt">
          Key erstellen unter console.anthropic.com. {e.apiKey ? '✓ Key hinterlegt.' : 'Kein Key hinterlegt.'}
        </p>
      </Panel>

      <Panel className="space-y-3">
        <h3 className="font-bold text-sm">Lernstand sichern & übertragen</h3>
        <div className="grid grid-cols-2 gap-2">
          <Knopf variante="sekundaer" onClick={exportieren}>⬇️ Export (JSON)</Knopf>
          <Knopf variante="sekundaer" onClick={() => dateiRef.current?.click()}>⬆️ Import</Knopf>
        </div>
        <input ref={dateiRef} type="file" accept="application/json" className="hidden" onChange={importDatei} />
        <p className="text-xs text-matt">
          Für Backups und Gerätewechsel. Alles wird nur lokal im Browser gespeichert.
        </p>
      </Panel>

      <Panel className="space-y-3">
        <Knopf variante="sekundaer" className="w-full" onClick={() => geheZu('einstufung')}>
          🎯 Einstufungstest wiederholen
        </Knopf>
        <Knopf
          variante="gefahr"
          className="w-full"
          onClick={() => {
            if (confirm('Wirklich ALLES zurücksetzen? Lernstand, Streak und eigene Karten gehen verloren.')) {
              zuruecksetzen()
              geheZu('home')
            }
          }}
        >
          🗑️ Fortschritt zurücksetzen
        </Knopf>
      </Panel>

      <p className="text-center text-xs text-matt pb-4">
        汉路 · HànLù v1.0 · läuft komplett offline in deinem Browser
      </p>
    </div>
  )
}
