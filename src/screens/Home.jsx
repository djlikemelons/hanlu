// Startbildschirm: Tägliches Lernen (allgemeiner Pool), Lernblöcke (gezielt
// pro Thema), Spielmodi, Test & Dashboard.

import React from 'react'
import { useStore, kartenFuerPool, faelligeKarten, neueKartenVon, neueErlaubtHeute } from '../store.jsx'
import { Panel, Knopf } from '../components/UI.jsx'
import { MochiWidget } from '../components/Mochi.jsx'
import { WortDesTages } from '../components/WortDesTages.jsx'
import { heuteISO } from '../lib/srs.js'
import { SPIELMODI } from '../modes/index.js'

export default function Home() {
  const { state, geheZu } = useStore()

  const pool = kartenFuerPool(state)
  const faellig = faelligeKarten(pool).length
  const neuErlaubt = neueErlaubtHeute(state)
  const neuVerfuegbar = Math.min(neueKartenVon(pool).length, neuErlaubt)
  const gelernt = pool.filter((k) => k.wiederholungen > 0).length
  const aktiveThemen = state.themen.filter((t) => t.aktiv)

  return (
    <div className="space-y-7">
      {/* Mochi begleitet dich dauerhaft und kommentiert deinen Fortschritt */}
      <MochiWidget />

      {/* Hinweis, wenn das Reservoir heute automatisch nachgefüllt hat */}
      {state.nachschub?.datum === heuteISO() && (
        <p className="text-xs text-akzent -mt-4 px-2">
          📦 Auto-Nachschub: {state.nachschub.anzahl} neue Vokabeln aus dem Reservoir ergänzt.
        </p>
      )}

      {/* Tägliches Lernen */}
      <Panel className="relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-akzent/10 blur-2xl" />
        <h2 className="text-lg font-bold mb-1">Tägliches Lernen</h2>
        <p className="text-sm text-matt mb-4">
          {faellig} fällig · {neuVerfuegbar} neue Karten · heute schon {state.stats.heute.wdh} gelernt
        </p>
        <Knopf onClick={() => geheZu('lernen')} className="w-full text-lg">
          {faellig + neuVerfuegbar > 0 ? '学习 · Jetzt lernen' : 'Freies Wiederholen'}
        </Knopf>
        {/* Wiederholen-Modus: jederzeit alle schon gelernten Karten durchgehen */}
        {gelernt > 0 && (
          <button
            onClick={() => geheZu('lernen', { modus: 'wiederholen' })}
            className="w-full mt-2 text-sm text-matt hover:text-tinte transition py-2 min-h-[44px]"
          >
            🔁 Gelernte Karten frei wiederholen ({gelernt})
          </button>
        )}
      </Panel>

      {/* Wort des Tages mit Kultur-/Chengyu-Notiz */}
      <WortDesTages />

      {/* Lernblöcke: gezielt nur ein Thema lernen */}
      <section>
        <h2 className="text-base font-bold mb-3 text-matt uppercase tracking-wider text-xs">Lernblöcke</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {aktiveThemen.map((t) => {
            const karten = state.karten.filter((k) => k.thema === t.id)
            const f = faelligeKarten(karten).length
            return (
              <button
                key={t.id}
                onClick={() => geheZu('lernen', { thema: t.id })}
                className="verlauf-panel border border-linie rounded-3xl p-4 text-left hover:border-akzent/60 transition active:scale-95"
              >
                <div className="text-2xl mb-1">{t.emoji}</div>
                <div className="font-semibold text-sm leading-tight">{t.name}</div>
                <div className="text-xs text-matt mt-1">
                  {karten.length} Karten{f > 0 ? ` · ${f} fällig` : ''}
                </div>
              </button>
            )
          })}
          <button
            onClick={() => geheZu('themen')}
            className="border border-dashed border-linie rounded-3xl p-4 text-left text-matt hover:text-tinte hover:border-akzent/60 transition"
          >
            <div className="text-2xl mb-1">＋</div>
            <div className="font-semibold text-sm">Themen & Karten verwalten</div>
          </button>
        </div>
      </section>

      {/* Spielmodi (modulare Plugins, siehe src/modes/) */}
      <section>
        <h2 className="text-base font-bold mb-3 text-matt uppercase tracking-wider text-xs">Spielmodi</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {SPIELMODI.filter((m) => !m.verstecktImMenue).map((m) => (
            <button
              key={m.id}
              onClick={() => geheZu('spiel', { id: m.id })}
              className="verlauf-panel border border-linie rounded-3xl p-4 text-left hover:border-akzent/60 transition active:scale-95"
            >
              <div className="text-2xl mb-1">{m.emoji}</div>
              <div className="font-semibold text-sm leading-tight">{m.titel}</div>
              <div className="text-xs text-matt mt-1">{m.untertitel}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Werkzeuge: Wörterbuch, Schreiben, eigener Text, Test, Fortschritt */}
      <div className="space-y-3">
        <Knopf variante="sekundaer" onClick={() => geheZu('woerterbuch')} className="w-full">
          📖 词典 Wörterbuch
        </Knopf>
        <div className="grid grid-cols-2 gap-3">
          <Knopf variante="sekundaer" onClick={() => geheZu('schreiben')} className="w-full">
            ✍️ Schreiben
          </Knopf>
          <Knopf variante="sekundaer" onClick={() => geheZu('eigentext')} className="w-full">
            📄 Eigener Text
          </Knopf>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Knopf variante="sekundaer" onClick={() => geheZu('test')} className="w-full">
            📝 Test-Modus
          </Knopf>
          <Knopf variante="sekundaer" onClick={() => geheZu('dashboard')} className="w-full">
            📊 Fortschritt
          </Knopf>
        </div>
      </div>
    </div>
  )
}
