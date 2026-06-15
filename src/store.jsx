// Zentraler Zustand der App (React Context) + Persistenz in localStorage.
// Alle Aktionen, die den Lernstand verändern, leben hier an einer Stelle.

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { STARTER_DECK } from './data/starterDeck.js'
import { RESERVOIR } from './data/reservoir.js'
import { STANDARD_THEMEN, STANDARD_POOL } from './data/themen.js'
import { heuteISO, gesternISO, tageAb, bewerte } from './lib/srs.js'
import { laden, speichern, leeren, alsDateiExportieren } from './lib/storage.js'
import { eindeutigeId } from './lib/utils.js'

const Ctx = createContext(null)
export const useStore = () => useContext(Ctx)

function mitSrsFeldern(k) {
  return {
    intervall: 0,
    ease: 2.5,
    faelligAm: heuteISO(),
    wiederholungen: 0,
    mastery_level: 0,
    eigene_karte: false,
    ...k,
  }
}

export function frischerZustand() {
  return {
    version: 1,
    erstellt: heuteISO(),
    karten: STARTER_DECK.map(mitSrsFeldern),
    themen: STANDARD_THEMEN.map((t) => ({ ...t })),
    einstellungen: {
      neueProTag: 8,
      poolThemen: [...STANDARD_POOL],
      hell: false,
      richtung: 'zh-de', // 'zh-de' = 汉→Deutsch, 'de-zh' = Deutsch→汉
      mischen: true,
      autoNachschub: true, // Vokabel-Reservoir füllt das Deck automatisch auf
    },
    stats: {
      streak: 0,
      letzterLerntag: null,
      xp: 0,
      verlauf: {}, // datum → { wdh, neu }
      heute: { datum: heuteISO(), neu: 0, wdh: 0, richtig: 0, falsch: 0, extraNeue: 0 },
      hskSchaetzung: null,
    },
    einstufungFertig: false,
    highscores: { sprint: 0, satzbauer: 0, memory: 0, ton: 0, restaurant: 0, hoerjagd: 0, speedread: 0 },
    reise: { sessions: 0 },
    boss: { besiegt: [] },
    story: { fertig: [] },
    entdeckt: [], // besuchte Regionen der Entdecken-Karte
    geschichten: { fertig: [] }, // erarbeitete Entdecken-Geschichten
    lesen: { fertig: [] }, // durchgearbeitete Langtexte: [{ id, datum }]
    nachschub: null, // { datum, anzahl } – letzter Auto-Nachschub (für Hinweis)
    katze: { name: 'Mochi' },
  }
}

// Auto-Nachschub: Wenn der Vorrat an ungelernten Karten unter ~3 Tage
// Lernstoff fällt, zieht die App selbstständig Karten aus dem Reservoir.
// So füllt sich das System eigenständig mit neuen Vokabeln.
function reservoirAuffuellen(s) {
  if (s.einstellungen.autoNachschub === false) return s
  const schwelle = Math.max(20, s.einstellungen.neueProTag * 3)
  const offen = s.karten.filter((k) => k.wiederholungen === 0).length
  if (offen >= schwelle) return s
  const vorhanden = new Set(s.karten.map((k) => k.id))
  const themenIds = new Set(s.themen.map((t) => t.id))
  const nachschub = RESERVOIR.filter((k) => !vorhanden.has(k.id) && themenIds.has(k.thema)).slice(0, schwelle - offen)
  if (!nachschub.length) return s
  const heute = heuteISO()
  return {
    ...s,
    karten: [
      ...s.karten,
      ...nachschub.map((k) => ({
        intervall: 0, ease: 2.5, faelligAm: heute, wiederholungen: 0, mastery_level: 0, eigene_karte: false, ...k,
      })),
    ],
    nachschub: { datum: heute, anzahl: nachschub.length + (s.nachschub?.datum === heute ? s.nachschub.anzahl : 0) },
  }
}

// Bei App-Updates: neue Starter-Karten/-Themen ergänzen, fehlende Felder auffüllen.
function migrieren(s) {
  if (!s || !Array.isArray(s.karten)) return frischerZustand()
  const frisch = frischerZustand()
  const kartenIds = new Set(s.karten.map((k) => k.id))
  const themenIds = new Set((s.themen || []).map((t) => t.id))
  // Gebiet auf älteren Lernständen nachrüsten (Standardthemen aus der Vorlage,
  // sonst 'persoenlich' als Default für eigene Themen).
  const gebietVorlage = Object.fromEntries(STANDARD_THEMEN.map((t) => [t.id, t.gebiet]))
  const mitGebiet = (t) => ({ ...t, gebiet: t.gebiet || gebietVorlage[t.id] || 'persoenlich' })
  return {
    ...frisch,
    ...s,
    karten: [...s.karten, ...frisch.karten.filter((k) => !kartenIds.has(k.id))],
    themen: [...(s.themen || []).map(mitGebiet), ...frisch.themen.filter((t) => !themenIds.has(t.id))],
    einstellungen: { ...frisch.einstellungen, ...s.einstellungen },
    stats: { ...frisch.stats, ...s.stats, heute: { ...frisch.stats.heute, ...(s.stats?.heute || {}) } },
    highscores: { ...frisch.highscores, ...s.highscores },
    reise: { ...frisch.reise, ...s.reise },
    boss: { ...frisch.boss, ...s.boss },
    story: { ...frisch.story, ...s.story },
    geschichten: { ...frisch.geschichten, ...s.geschichten },
    lesen: { ...frisch.lesen, ...s.lesen },
    katze: { ...frisch.katze, ...s.katze },
  }
}

// Tageszähler zurücksetzen, sobald ein neuer Tag beginnt.
function tagesReset(s) {
  const h = heuteISO()
  if (s.stats.heute.datum === h) return s
  return { ...s, stats: { ...s.stats, heute: { datum: h, neu: 0, wdh: 0, richtig: 0, falsch: 0, extraNeue: 0 } } }
}

// ---------- abgeleitete Auswahl-Helfer ----------

export function kartenFuerPool(state, themaId = null) {
  if (themaId) return state.karten.filter((k) => k.thema === themaId)
  const aktiv = new Set(state.themen.filter((t) => t.aktiv).map((t) => t.id))
  return state.karten.filter((k) => aktiv.has(k.thema) && state.einstellungen.poolThemen.includes(k.thema))
}

export function faelligeKarten(karten) {
  const h = heuteISO()
  return karten.filter((k) => k.wiederholungen > 0 && k.faelligAm <= h)
}

export const neueKartenVon = (karten) => karten.filter((k) => k.wiederholungen === 0)

export function neueErlaubtHeute(state) {
  const h = state.stats.heute
  return Math.max(0, state.einstellungen.neueProTag + h.extraNeue - h.neu)
}

// ---------- Provider ----------

export function StoreProvider({ children }) {
  const [state, setState] = useState(() => reservoirAuffuellen(tagesReset(migrieren(laden()))))
  const [ansicht, setAnsicht] = useState({ name: 'home', params: {} })

  useEffect(() => {
    speichern(state)
  }, [state])

  // heller / dunkler Modus über CSS-Variablen (siehe index.css)
  useEffect(() => {
    document.documentElement.classList.toggle('hell', !!state.einstellungen.hell)
  }, [state.einstellungen.hell])

  const api = useMemo(() => {
    const patch = (fn) => setState((s) => reservoirAuffuellen(tagesReset(fn(tagesReset(s)))))

    return {
      state,
      ansicht,
      geheZu: (name, params = {}) => {
        setAnsicht({ name, params })
        window.scrollTo(0, 0)
      },

      // --- SRS / Lernen ---
      bewerteKarte: (id, wertung) =>
        patch((s) => {
          const alt = s.karten.find((k) => k.id === id)
          if (!alt) return s
          const heute = heuteISO()
          const warNeu = alt.wiederholungen === 0
          const richtig = wertung !== 'nochmal'

          let { streak, letzterLerntag } = s.stats
          if (letzterLerntag !== heute) {
            streak = letzterLerntag === gesternISO() ? streak + 1 : 1
            letzterLerntag = heute
          }
          const v = s.stats.verlauf[heute] || { wdh: 0, neu: 0 }
          return {
            ...s,
            karten: s.karten.map((k) => (k.id === id ? bewerte(k, wertung) : k)),
            stats: {
              ...s.stats,
              streak,
              letzterLerntag,
              xp: s.stats.xp + (wertung === 'nochmal' ? 0 : wertung === 'schwer' ? 1 : 2),
              verlauf: { ...s.stats.verlauf, [heute]: { wdh: v.wdh + 1, neu: v.neu + (warNeu ? 1 : 0) } },
              heute: {
                ...s.stats.heute,
                neu: s.stats.heute.neu + (warNeu ? 1 : 0),
                wdh: s.stats.heute.wdh + 1,
                richtig: s.stats.heute.richtig + (richtig ? 1 : 0),
                falsch: s.stats.heute.falsch + (richtig ? 0 : 1),
              },
            },
          }
        }),

      mehrKartenHeute: (n = 5) =>
        patch((s) => ({ ...s, stats: { ...s.stats, heute: { ...s.stats.heute, extraNeue: s.stats.heute.extraNeue + n } } })),

      sessionFertig: () => patch((s) => ({ ...s, reise: { ...s.reise, sessions: s.reise.sessions + 1 } })),

      // --- Spiele / Motivation ---
      xpHinzu: (n) => patch((s) => ({ ...s, stats: { ...s.stats, xp: s.stats.xp + n } })),
      highscoreSetzen: (spiel, punkte) =>
        patch((s) => ({ ...s, highscores: { ...s.highscores, [spiel]: Math.max(s.highscores[spiel] || 0, punkte) } })),
      bossBesiegt: (id) =>
        patch((s) => (s.boss.besiegt.includes(id) ? s : { ...s, boss: { besiegt: [...s.boss.besiegt, id] } })),
      storyFertig: (id) =>
        patch((s) => (s.story.fertig.includes(id) ? s : { ...s, story: { fertig: [...s.story.fertig, id] } })),
      geschichteFertig: (id) =>
        patch((s) =>
          s.geschichten.fertig.includes(id)
            ? s
            : { ...s, geschichten: { fertig: [...s.geschichten.fertig, id] }, stats: { ...s.stats, xp: s.stats.xp + 15 } }
        ),
      // Langtext durchgearbeitet: Datum festhalten (für die Monatslektüre-Empfehlung), +20 XP beim ersten Mal
      leseTextFertig: (id) =>
        patch((s) => {
          const heute = heuteISO()
          const ohne = s.lesen.fertig.filter((e) => e.id !== id)
          const schonGemacht = ohne.length !== s.lesen.fertig.length
          return {
            ...s,
            lesen: { fertig: [...ohne, { id, datum: heute }] },
            stats: { ...s.stats, xp: s.stats.xp + (schonGemacht ? 0 : 20) },
          }
        }),
      regionEntdeckt: (id) =>
        patch((s) =>
          s.entdeckt.includes(id)
            ? s
            : { ...s, entdeckt: [...s.entdeckt, id], stats: { ...s.stats, xp: s.stats.xp + 5 } }
        ),
      katzeUmbenennen: (name) => patch((s) => ({ ...s, katze: { ...s.katze, name: name || 'Mochi' } })),

      // --- Themen & Karten ---
      themaUmschalten: (id) =>
        patch((s) => ({ ...s, themen: s.themen.map((t) => (t.id === id ? { ...t, aktiv: !t.aktiv } : t)) })),
      themaAnlegen: (name, emoji, gebiet = 'persoenlich') =>
        patch((s) => {
          const id = `eigen-${eindeutigeId()}`
          return { ...s, themen: [...s.themen, { id, name, emoji: emoji || '⭐', aktiv: true, eigenes: true, gebiet }] }
        }),
      themaGebietSetzen: (id, gebiet) =>
        patch((s) => ({ ...s, themen: s.themen.map((t) => (t.id === id ? { ...t, gebiet } : t)) })),
      themaLoeschen: (id) =>
        patch((s) => ({
          ...s,
          themen: s.themen.filter((t) => t.id !== id),
          karten: s.karten.filter((k) => k.thema !== id),
          einstellungen: { ...s.einstellungen, poolThemen: s.einstellungen.poolThemen.filter((p) => p !== id) },
        })),
      karteAnlegen: (daten) =>
        patch((s) => ({
          ...s,
          karten: [...s.karten, mitSrsFeldern({ id: eindeutigeId(), eigene_karte: true, ...daten })],
        })),
      karteAktualisieren: (id, daten) =>
        patch((s) => ({ ...s, karten: s.karten.map((k) => (k.id === id ? { ...k, ...daten } : k)) })),
      karteLoeschen: (id) => patch((s) => ({ ...s, karten: s.karten.filter((k) => k.id !== id) })),

      // --- Einstellungen / Einstufung / Daten ---
      einstellungenSetzen: (teil) =>
        patch((s) => ({ ...s, einstellungen: { ...s.einstellungen, ...teil } })),
      einstufungAbschliessen: (hskLevel, bekannteIds) =>
        patch((s) => {
          const heute = heuteISO()
          const bekannt = new Set(bekannteIds)
          return {
            ...s,
            einstufungFertig: true,
            stats: { ...s.stats, hskSchaetzung: hskLevel },
            karten: s.karten.map((k) =>
              bekannt.has(k.id)
                ? { ...k, intervall: 21, wiederholungen: 2, faelligAm: tageAb(heute, 21), mastery_level: 3, erstGelernt: heute }
                : k
            ),
          }
        }),
      exportieren: () => alsDateiExportieren(state),
      importieren: (obj) => {
        const neu = migrieren(obj)
        setState(tagesReset(neu))
      },
      zuruecksetzen: () => {
        leeren()
        setState(frischerZustand())
      },
    }
  }, [state, ansicht])

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}
