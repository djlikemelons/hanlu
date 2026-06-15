// Test-Modus: jederzeit abrufbar, themenspezifisch filterbar und zeitbasiert
// (z. B. „alle in den letzten 30 Tagen gelernten Wörter").
// Gemischte Aufgabentypen: Vokabel (beide Richtungen), Lückentext (Cloze),
// Leseverständnis, Zuordnung (Matching). Am Ende: Report mit Auflösung.

import React, { useState } from 'react'
import { useStore } from '../store.jsx'
import { GEBIETE } from '../data/themen.js'
import { heuteISO, tageAb } from '../lib/srs.js'
import { mischen, stichprobe, prozent } from '../lib/utils.js'
import { Panel, Knopf, BackBar, Chip, Fortschritt } from '../components/UI.jsx'
import { useFeedback, FeedbackOverlay, wackelKlasse, Konfetti } from '../components/Feedback.jsx'

// ---------- Fragen-Generierung ----------

function generiereFragen(karten, anzahl) {
  const fragen = []
  const vorrat = mischen(karten)
  let i = 0
  const naechste = () => vorrat[i++ % vorrat.length]
  const typen = ['zhde', 'dezh', 'pinyin', 'cloze', 'lesen', 'satzbau', 'freisatz', 'match']
  let t = 0

  while (fragen.length < anzahl && karten.length >= 4) {
    const typ = typen[t++ % typen.length]
    const k = naechste()

    if (typ === 'zhde') {
      fragen.push({
        typ, karte: k,
        frage: k.hanzi, hinweis: 'Was bedeutet dieses Wort?',
        optionen: mischen([k.bedeutung, ...stichprobe(karten.filter((x) => x.id !== k.id), 3).map((x) => x.bedeutung)]),
        richtig: k.bedeutung,
      })
    } else if (typ === 'pinyin') {
      // Aussprache: Zeichen → richtiges Pinyin (trainiert Töne/Lesung)
      fragen.push({
        typ, karte: k,
        frage: k.hanzi, hinweis: 'Wie wird das ausgesprochen?',
        optionen: mischen([k.pinyin, ...stichprobe(karten.filter((x) => x.id !== k.id), 3).map((x) => x.pinyin)]),
        richtig: k.pinyin,
      })
    } else if (typ === 'satzbau') {
      // Satzbau: Tokens in die richtige Reihenfolge bringen (Satzbildung)
      if (!k.beispielsatz || k.beispielsatz.length < 4 || k.beispielsatz.length > 9) continue
      fragen.push({ typ, karte: k, frage: 'Satzbau', richtig: k.beispielsatz.join('') })
    } else if (typ === 'freisatz') {
      // Freie Satzbildung: eigenen Satz mit dem Wort schreiben, danach mit
      // dem Modellsatz vergleichen und selbst einschätzen.
      if (!k.beispielsatz || !k.beispiel_uebersetzung) continue
      fragen.push({ typ, karte: k, frage: 'Freier Satz', richtig: k.beispielsatz.join('') })
    } else if (typ === 'dezh') {
      fragen.push({
        typ, karte: k,
        frage: k.bedeutung, hinweis: 'Welches Wort passt?',
        optionen: mischen([k.hanzi, ...stichprobe(karten.filter((x) => x.id !== k.id), 3).map((x) => x.hanzi)]),
        richtig: k.hanzi,
      })
    } else if (typ === 'cloze') {
      // Lückentext nur, wenn das Wort als Token im Beispielsatz vorkommt
      if (!k.beispielsatz?.includes(k.hanzi)) continue
      const satz = k.beispielsatz.map((tok) => (tok === k.hanzi ? '____' : tok)).join('')
      fragen.push({
        typ, karte: k,
        frage: satz, hinweis: `Welches Wort fehlt? (${k.beispiel_uebersetzung})`,
        optionen: mischen([k.hanzi, ...stichprobe(karten.filter((x) => x.id !== k.id), 3).map((x) => x.hanzi)]),
        richtig: k.hanzi,
      })
    } else if (typ === 'lesen') {
      fragen.push({
        typ, karte: k,
        frage: k.beispielsatz.join(''), hinweis: 'Was bedeutet dieser Satz?',
        optionen: mischen([
          k.beispiel_uebersetzung,
          ...stichprobe(karten.filter((x) => x.id !== k.id), 3).map((x) => x.beispiel_uebersetzung),
        ]),
        richtig: k.beispiel_uebersetzung,
      })
    } else if (typ === 'match') {
      const paare = stichprobe(karten, 4)
      if (paare.length < 4) continue
      fragen.push({ typ, paare, frage: 'Zuordnung', richtig: '4 Paare' })
    }
  }
  return fragen
}

// ---------- Matching-Aufgabe ----------

function MatchFrage({ frage, onFertig }) {
  const [links] = useState(() => mischen(frage.paare))
  const [rechts] = useState(() => mischen(frage.paare))
  const [gewaehlt, setGewaehlt] = useState(null)
  const [geloest, setGeloest] = useState([])
  const [fehler, setFehler] = useState(0)
  const [wackelt, setWackelt] = useState(null)

  const klickRechts = (k) => {
    if (!gewaehlt || geloest.includes(k.id)) return
    if (k.id === gewaehlt.id) {
      const neu = [...geloest, k.id]
      setGeloest(neu)
      setGewaehlt(null)
      if (neu.length === 4) setTimeout(() => onFertig(fehler), 450)
    } else {
      setFehler((f) => f + 1)
      setWackelt(k.id)
      setTimeout(() => setWackelt(null), 450)
      setGewaehlt(null)
    }
  }

  return (
    <div>
      <p className="text-sm text-matt mb-3 text-center">Tippe ein Wort, dann die passende Bedeutung.</p>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-2">
          {links.map((k) => (
            <button
              key={k.id}
              disabled={geloest.includes(k.id)}
              onClick={() => setGewaehlt(k)}
              className={`w-full rounded-2xl border py-3 px-2 zeichen text-lg font-semibold transition min-h-[56px] ${
                geloest.includes(k.id)
                  ? 'border-ok/50 text-ok bg-ok/10'
                  : gewaehlt?.id === k.id
                    ? 'border-akzent bg-akzent/15'
                    : 'border-linie bg-panel hover:border-akzent/60'
              }`}
            >
              {k.hanzi}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {rechts.map((k) => (
            <button
              key={k.id}
              disabled={geloest.includes(k.id)}
              onClick={() => klickRechts(k)}
              className={`w-full rounded-2xl border py-3 px-2 text-xs font-medium transition min-h-[56px] ${
                geloest.includes(k.id) ? 'border-ok/50 text-ok bg-ok/10' : 'border-linie bg-panel hover:border-akzent/60'
              } ${wackelt === k.id ? 'anim-wackeln' : ''}`}
            >
              {k.bedeutung}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ---------- Satzbau-Aufgabe (Tokens ordnen) ----------

function SatzbauFrage({ frage, onFertig }) {
  const karte = frage.karte
  const [verfuegbar, setVerfuegbar] = useState(() => mischen(karte.beispielsatz.map((t, i) => ({ t, i }))))
  const [gelegt, setGelegt] = useState([])
  const [status, setStatus] = useState(null) // null | 'ok' | 'falsch'

  const lege = (eintrag, idx) => {
    if (status) return
    const ng = [...gelegt, eintrag]
    const nv = verfuegbar.filter((_, i) => i !== idx)
    setGelegt(ng)
    setVerfuegbar(nv)
    if (nv.length === 0) {
      const satz = ng.map((x) => x.t).join('')
      const ok = satz === karte.beispielsatz.join('')
      setStatus(ok ? 'ok' : 'falsch')
      setTimeout(() => onFertig(ok, satz), 750)
    }
  }
  const zurueck = (idx) => {
    if (status) return
    const e = gelegt[idx]
    setGelegt((g) => g.filter((_, i) => i !== idx))
    setVerfuegbar((v) => [...v, e])
  }

  return (
    <div className={status === 'falsch' ? 'anim-wackeln' : ''}>
      <p className="text-sm text-matt mb-3 text-center">Bring die Wörter in die richtige Reihenfolge:<br />„{karte.beispiel_uebersetzung}"</p>
      <div className="min-h-[64px] bg-panel rounded-2xl border border-dashed border-linie p-3 flex flex-wrap gap-2 justify-center items-center mb-3">
        {gelegt.length === 0 && <span className="text-xs text-matt">Hier entsteht dein Satz …</span>}
        {gelegt.map((x, i) => (
          <button
            key={`${x.i}-${i}`}
            onClick={() => zurueck(i)}
            className={`zeichen text-lg font-semibold rounded-xl px-3 py-2 border transition active:scale-95 ${
              status === 'ok' ? 'border-ok/60 bg-ok/10 text-ok' : 'border-akzent/60 bg-akzent/10'
            }`}
          >
            {x.t}
          </button>
        ))}
      </div>
      {!status && (
        <div className="flex flex-wrap gap-2 justify-center">
          {verfuegbar.map((x, i) => (
            <button
              key={`${x.i}-${i}`}
              onClick={() => lege(x, i)}
              className="zeichen text-lg font-semibold rounded-xl px-3 py-2.5 border border-linie bg-panel2 hover:border-akzent/60 transition active:scale-95 min-h-[48px]"
            >
              {x.t}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ---------- Freie Satzbildung (eigenen Satz schreiben) ----------
// Echte Grammatikprüfung bräuchte ein Sprachmodell (offline nicht möglich,
// siehe ERWEITERUNG: Anthropic-API). Stattdessen: automatische Grund-Checks
// (Wort verwendet? lang genug? Satzzeichen?) + Modellsatz zum Vergleich +
// ehrliche Selbsteinschätzung. Das trainiert das aktive Bilden von Sätzen.
function FreiSatzFrage({ frage, onFertig }) {
  const karte = frage.karte
  const [eingabe, setEingabe] = useState('')
  const [geprueft, setGeprueft] = useState(false)

  const text = eingabe.trim()
  const hanziAnzahl = [...text].filter((c) => /[一-鿿]/.test(c)).length
  const checks = {
    wort: text.includes(karte.hanzi),
    laenge: hanziAnzahl >= Math.max(5, karte.hanzi.length + 3),
    satzzeichen: /[。！？.!?]$/.test(text),
  }
  const modellsatz = karte.beispielsatz.join('')

  if (!geprueft) {
    return (
      <div>
        <p className="text-sm text-matt mb-2 text-center">
          Bilde einen eigenen Satz mit:
        </p>
        <div className="text-center mb-4">
          <span className="zeichen text-3xl font-bold">{karte.hanzi}</span>
          <span className="text-akzent text-sm ml-2">{karte.pinyin}</span>
          <div className="text-xs text-matt mt-1">{karte.bedeutung}</div>
        </div>
        <textarea
          value={eingabe}
          onChange={(e) => setEingabe(e.target.value)}
          rows={3}
          placeholder="你的句子…（用中文输入法）"
          className="zeichen w-full rounded-2xl border border-linie bg-panel p-3 text-lg leading-relaxed focus:border-akzent focus:outline-none"
          autoFocus
        />
        <Knopf className="w-full mt-3" onClick={() => setGeprueft(true)} disabled={hanziAnzahl === 0}>
          Prüfen & vergleichen
        </Knopf>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div>
        <div className="text-xs text-matt mb-1">Dein Satz:</div>
        <div className="zeichen text-lg rounded-2xl border border-linie bg-panel p-3">{text || '—'}</div>
      </div>

      {/* Automatische Grund-Checks */}
      <div className="space-y-1 text-sm">
        <div className={checks.wort ? 'text-ok' : 'text-err'}>
          {checks.wort ? '✓' : '✗'} Das Wort „{karte.hanzi}" {checks.wort ? 'kommt vor' : 'fehlt noch'}
        </div>
        <div className={checks.laenge ? 'text-ok' : 'text-matt'}>
          {checks.laenge ? '✓' : '•'} Länge {checks.laenge ? 'in Ordnung' : '(etwas mehr ausführen)'}
        </div>
        <div className={checks.satzzeichen ? 'text-ok' : 'text-matt'}>
          {checks.satzzeichen ? '✓' : '•'} Satzzeichen am Ende {checks.satzzeichen ? 'gesetzt' : '(z. B. 。)'}
        </div>
      </div>

      {/* Modellsatz zum Vergleich */}
      <div className="rounded-2xl border border-akzent/40 bg-panel p-3">
        <div className="text-xs text-matt mb-1">Beispielsatz zum Vergleich:</div>
        <div className="zeichen text-base font-semibold">{modellsatz}</div>
        <div className="text-akzent text-sm mt-1">{karte.beispiel_pinyin}</div>
        <div className="text-matt text-sm">{karte.beispiel_uebersetzung}</div>
      </div>

      <p className="text-xs text-matt text-center">
        Vergleiche selbst: Ist dein Satz grammatisch richtig und ergibt er Sinn?
      </p>
      <div className="grid grid-cols-2 gap-2">
        <Knopf variante="sekundaer" onClick={() => onFertig(false, text)}>✗ War nicht ganz richtig</Knopf>
        <Knopf onClick={() => onFertig(true, text)}>✓ Mein Satz war korrekt</Knopf>
      </div>
    </div>
  )
}

// ---------- Hauptkomponente ----------

export default function TestModus() {
  const { state, geheZu } = useStore()
  const [phase, setPhase] = useState('konfig') // konfig | lauf | report
  const [themen, setThemen] = useState(() => state.themen.filter((t) => t.aktiv).map((t) => t.id))
  const [zeitraum, setZeitraum] = useState(0) // 0 = alle, sonst Tage
  const [anzahl, setAnzahl] = useState(15)
  const [fragen, setFragen] = useState([])
  const [nr, setNr] = useState(0)
  const [antworten, setAntworten] = useState([])
  const [fb, zeigeFb] = useFeedback()
  const [gesperrt, setGesperrt] = useState(false)
  const [hinweisPool, setHinweisPool] = useState(false)

  // Gebiet-Schnellwahl: setzt die Themenauswahl auf alle aktiven Themen
  // des Gebiets (bzw. auf alle). Manuelles Antippen einzelner Themen danach
  // bleibt möglich und hebt die Gebiet-Markierung auf.
  const setzeGebiet = (gebiet) =>
    setThemen(state.themen.filter((t) => t.aktiv && (gebiet === 'alle' || t.gebiet === gebiet)).map((t) => t.id))

  // Welches Gebiet ist aktuell exakt ausgewählt? (für die Hervorhebung)
  const aktivesGebiet = (() => {
    const ausgewaehlt = new Set(themen)
    for (const g of ['alle', ...GEBIETE.map((g) => g.id)]) {
      const ids = state.themen.filter((t) => t.aktiv && (g === 'alle' || t.gebiet === g)).map((t) => t.id)
      if (ids.length === ausgewaehlt.size && ids.every((id) => ausgewaehlt.has(id))) return g
    }
    return null
  })()

  const themaUmschalten = (id) =>
    setThemen((ts) => (ts.includes(id) ? (ts.length > 1 ? ts.filter((t) => t !== id) : ts) : [...ts, id]))

  const starten = () => {
    let pool = state.karten.filter((k) => themen.includes(k.thema))
    if (zeitraum > 0) {
      const grenze = tageAb(heuteISO(), -zeitraum)
      pool = pool.filter((k) => (k.erstGelernt && k.erstGelernt >= grenze) || (k.zuletztGeuebt && k.zuletztGeuebt >= grenze))
    } else {
      // Standard: nur bereits gelernte Wörter testen …
      const gelernt = pool.filter((k) => k.wiederholungen > 0)
      if (gelernt.length >= 8) pool = gelernt
      else setHinweisPool(true) // … außer es gibt noch zu wenige
    }
    if (pool.length < 4) {
      alert('Zu wenige Karten für diesen Filter – wähle mehr Themen oder einen größeren Zeitraum.')
      return
    }
    setFragen(generiereFragen(pool, anzahl))
    setNr(0)
    setAntworten([])
    setPhase('lauf')
  }

  const antworteMC = (option) => {
    if (gesperrt) return
    const f = fragen[nr]
    const ok = option === f.richtig
    zeigeFb(ok)
    setGesperrt(true)
    setTimeout(() => {
      setGesperrt(false)
      setAntworten((a) => [...a, { frage: f.frage, hinweis: f.hinweis, deine: option, richtige: f.richtig, ok }])
      weiter()
    }, ok ? 700 : 900)
  }

  const antworteMatch = (fehler) => {
    const f = fragen[nr]
    const ok = fehler === 0
    setAntworten((a) => [
      ...a,
      {
        frage: 'Zuordnung: ' + f.paare.map((p) => p.hanzi).join(' · '),
        deine: fehler === 0 ? 'alle richtig' : `${fehler} Fehlversuch(e)`,
        richtige: f.paare.map((p) => `${p.hanzi} = ${p.bedeutung}`).join(' · '),
        ok,
      },
    ])
    weiter()
  }

  const antworteSatzbau = (ok, satz) => {
    const f = fragen[nr]
    setAntworten((a) => [
      ...a,
      { frage: `Satz bilden: „${f.karte.beispiel_uebersetzung}"`, deine: satz, richtige: f.richtig, ok },
    ])
    weiter()
  }

  const antworteFreisatz = (ok, satz) => {
    const f = fragen[nr]
    setAntworten((a) => [
      ...a,
      {
        frage: `Eigener Satz mit „${f.karte.hanzi}" (${f.karte.bedeutung})`,
        hinweis: 'Selbst eingeschätzt',
        deine: satz || '(leer)',
        richtige: `Beispiel: ${f.richtig}`,
        ok,
      },
    ])
    weiter()
  }

  const weiter = () => {
    if (nr + 1 >= fragen.length) setPhase('report')
    else setNr(nr + 1)
  }

  // ---------- Konfiguration ----------
  if (phase === 'konfig') {
    return (
      <div className="space-y-5">
        <BackBar titel="Test-Modus" onZurueck={() => geheZu('home')} />
        <Panel>
          <h3 className="font-bold text-sm mb-3">Gebiet</h3>
          <div className="grid grid-cols-2 gap-2 mb-2">
            {GEBIETE.map((g) => (
              <button
                key={g.id}
                onClick={() => setzeGebiet(g.id)}
                className={`rounded-2xl border p-3 text-left transition active:scale-[0.98] ${
                  aktivesGebiet === g.id ? 'bg-akzent/20 border-akzent' : 'bg-panel border-linie hover:border-akzent/60'
                }`}
              >
                <div className="font-semibold text-sm">{g.emoji} {g.name}</div>
                <div className="text-[11px] text-matt mt-0.5 leading-snug">{g.beschreibung}</div>
              </button>
            ))}
          </div>
          <Chip aktiv={aktivesGebiet === 'alle'} onClick={() => setzeGebiet('alle')}>Alle Themen</Chip>
        </Panel>
        <Panel>
          <h3 className="font-bold text-sm mb-1">Themen{aktivesGebiet === null && <span className="text-matt font-normal"> · eigene Auswahl</span>}</h3>
          <p className="text-xs text-matt mb-3">Feineinstellung – einzelne Themen an-/abwählen.</p>
          <div className="flex flex-wrap gap-2">
            {state.themen.filter((t) => t.aktiv).map((t) => (
              <Chip key={t.id} aktiv={themen.includes(t.id)} onClick={() => themaUmschalten(t.id)}>
                {t.emoji} {t.name}
              </Chip>
            ))}
          </div>
        </Panel>
        <Panel>
          <h3 className="font-bold text-sm mb-3">Zeitraum</h3>
          <div className="flex flex-wrap gap-2">
            {[[0, 'Alle gelernten Wörter'], [7, 'Letzte 7 Tage'], [30, 'Letzte 30 Tage (Monatstest)'], [90, 'Letzte 90 Tage']].map(([t, label]) => (
              <Chip key={t} aktiv={zeitraum === t} onClick={() => setZeitraum(t)}>{label}</Chip>
            ))}
          </div>
        </Panel>
        <Panel>
          <h3 className="font-bold text-sm mb-3">Anzahl Aufgaben</h3>
          <div className="flex gap-2">
            {[10, 15, 20, 30].map((n) => (
              <Chip key={n} aktiv={anzahl === n} onClick={() => setAnzahl(n)}>{n}</Chip>
            ))}
          </div>
        </Panel>
        <Knopf className="w-full text-lg" onClick={starten}>Test starten</Knopf>
      </div>
    )
  }

  // ---------- Report ----------
  if (phase === 'report') {
    const richtige = antworten.filter((a) => a.ok).length
    const p = prozent(richtige, antworten.length)
    return (
      <div className="space-y-5">
        <BackBar titel="Ergebnis" onZurueck={() => geheZu('home')} />
        <Panel className="text-center py-8 relative overflow-hidden">
          {p >= 90 && <Konfetti />}
          <div className={`text-5xl mb-2 relative ${p >= 90 ? 'anim-sieg-pop' : ''}`}>{p >= 90 ? '🏆' : p >= 70 ? '🎉' : p >= 50 ? '💪' : '📚'}</div>
          <div className="text-4xl font-bold text-akzent">{p} %</div>
          <p className="text-matt mt-2">{richtige} von {antworten.length} Aufgaben richtig</p>
        </Panel>
        <h3 className="font-bold text-sm text-matt uppercase tracking-wider text-xs">Auflösung</h3>
        <div className="space-y-2">
          {antworten.map((a, i) => (
            <Panel key={i} className={`!p-4 border-l-4 ${a.ok ? '!border-l-ok' : '!border-l-err'}`}>
              <div className="zeichen text-sm font-semibold mb-1">{a.frage}</div>
              {a.hinweis && <div className="text-xs text-matt mb-1">{a.hinweis}</div>}
              <div className="text-xs">
                <span className={a.ok ? 'text-ok' : 'text-err'}>Deine Antwort: {a.deine}</span>
                {!a.ok && <span className="block text-ok mt-0.5">Richtig: {a.richtige}</span>}
              </div>
            </Panel>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Knopf variante="sekundaer" onClick={() => setPhase('konfig')}>Neuer Test</Knopf>
          <Knopf onClick={() => geheZu('home')}>Fertig</Knopf>
        </div>
      </div>
    )
  }

  // ---------- Testlauf ----------
  const f = fragen[nr]
  return (
    <div>
      <BackBar titel={`Aufgabe ${nr + 1} / ${fragen.length}`} onZurueck={() => geheZu('home')} />
      {hinweisPool && nr === 0 && (
        <p className="text-xs text-gold mb-3">Hinweis: Noch wenige gelernte Wörter – der Test nutzt alle Karten der gewählten Themen.</p>
      )}
      <Fortschritt wert={nr} max={fragen.length} className="mb-5" />

      <Panel className={`relative mb-4 ${wackelKlasse(fb)}`}>
        <FeedbackOverlay fb={fb} />
        {f.typ === 'match' ? (
          <MatchFrage key={nr} frage={f} onFertig={antworteMatch} />
        ) : f.typ === 'satzbau' ? (
          <SatzbauFrage key={nr} frage={f} onFertig={antworteSatzbau} />
        ) : f.typ === 'freisatz' ? (
          <FreiSatzFrage key={nr} frage={f} onFertig={antworteFreisatz} />
        ) : (
          <div className="text-center py-6">
            <div className={`zeichen font-bold ${f.frage.length > 12 ? 'text-2xl leading-relaxed' : 'text-5xl'}`}>{f.frage}</div>
            <div className="text-sm text-matt mt-3">{f.hinweis}</div>
          </div>
        )}
      </Panel>

      {f.typ !== 'match' && f.typ !== 'satzbau' && f.typ !== 'freisatz' && (
        <div className="grid gap-2">
          {f.optionen.map((o) => (
            <button
              key={o}
              onClick={() => antworteMC(o)}
              className={`rounded-2xl border border-linie bg-panel py-3.5 px-4 text-left font-medium hover:border-akzent/60 transition active:scale-[0.98] min-h-[52px] ${
                /[一-鿿]/.test(o) ? 'zeichen text-lg' : 'text-sm'
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
