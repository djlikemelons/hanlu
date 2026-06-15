// 中国探索 Entdecken: interaktive Kulturkarte. Region antippen → Spezialitäten,
// Rituale, Geschichte und Sehenswürdigkeiten lesen. Chinesische Begriffe im
// Text sind antippbar und zeigen Pinyin + Bedeutung. Erste Besuche geben XP.
// Dazu pro Region eine 📚 Geschichte zum AKTIVEN Erarbeiten: nur Hanzi,
// Hilfe (Pinyin/Übersetzung) holst du dir Satz für Satz selbst – danach
// prüfen Verständnisfragen, ob du den Text wirklich verstanden hast.

import React, { useState } from 'react'
import { useStore } from '../store.jsx'
import { REGIONEN, KATEGORIEN } from '../data/entdecken.js'
import { GESCHICHTEN } from '../data/geschichten.js'
import { CHINA_PFAD } from '../data/reise.js'
import { mischen } from '../lib/utils.js'
import { Panel, Knopf, BackBar, Chip } from '../components/UI.jsx'
import { Konfetti } from '../components/Feedback.jsx'

// Text mit {schluessel}-Platzhaltern rendern: chinesische Begriffe werden
// antippbar (gepunktete Unterstreichung) und klappen Pinyin + Deutsch auf.
function BegriffsText({ eintrag }) {
  const [offen, setOffen] = useState(null)
  const teile = eintrag.text.split(/(\{[a-z0-9_]+\})/g)
  const aktiv = offen ? eintrag.begriffe[offen] : null
  return (
    <div>
      <p className="text-sm leading-relaxed">
        {teile.map((t, i) => {
          const m = t.match(/^\{([a-z0-9_]+)\}$/)
          if (!m) return <span key={i}>{t}</span>
          const b = eintrag.begriffe[m[1]]
          if (!b) return null
          return (
            <button
              key={i}
              onClick={() => setOffen(offen === m[1] ? null : m[1])}
              className={`zeichen text-base mx-0.5 px-1 rounded-md transition ${
                offen === m[1]
                  ? 'bg-akzent/25 text-akzent'
                  : 'text-tinte underline decoration-dotted decoration-akzent/60 underline-offset-4 hover:bg-akzent/10'
              }`}
            >
              {b[0]}
            </button>
          )
        })}
      </p>
      {aktiv && (
        <div className="mt-2 bg-panel border border-akzent/40 rounded-2xl px-3 py-2 text-sm flex items-baseline gap-3 flex-wrap">
          <span className="zeichen text-lg font-bold">{aktiv[0]}</span>
          <span className="text-akzent">{aktiv[1]}</span>
          <span className="text-matt">· {aktiv[2]}</span>
        </div>
      )}
    </div>
  )
}

// Eine Geschichte aktiv erarbeiten: Sätze nur auf Chinesisch, Hilfe
// (Pinyin/Übersetzung) pro angetipptem Satz über die Hilfe-Fläche.
// Zum Abschluss Verständnisfragen – volle Punktzahl = erarbeitet (+15 XP).
function GeschichteAnsicht({ geschichte, istFertig, onFertig, onZurueck }) {
  const [satzIdx, setSatzIdx] = useState(null)
  const [zeigPinyin, setZeigPinyin] = useState(false)
  const [zeigDe, setZeigDe] = useState(false)
  const [quiz, setQuiz] = useState(null) // { frageNr, richtigGezaehlt, optionen, gewaehlt }

  const satz = satzIdx !== null ? geschichte.saetze[satzIdx] : null

  const quizStarten = () =>
    setQuiz({
      frageNr: 0,
      richtigGezaehlt: 0,
      optionen: mischen(geschichte.fragen[0].optionen.map((o, i) => ({ o, i }))),
      gewaehlt: null,
    })

  const quizAntwort = (x) => {
    if (quiz.gewaehlt !== null) return
    setQuiz({ ...quiz, gewaehlt: x.i })
    const ok = x.i === geschichte.fragen[quiz.frageNr].richtig
    setTimeout(() => {
      const richtigGezaehlt = quiz.richtigGezaehlt + (ok ? 1 : 0)
      const naechste = quiz.frageNr + 1
      if (naechste >= geschichte.fragen.length) {
        if (richtigGezaehlt === geschichte.fragen.length) onFertig()
        setQuiz({ frageNr: naechste, richtigGezaehlt, optionen: [], gewaehlt: null })
      } else {
        setQuiz({
          frageNr: naechste,
          richtigGezaehlt,
          optionen: mischen(geschichte.fragen[naechste].optionen.map((o, i) => ({ o, i }))),
          gewaehlt: null,
        })
      }
    }, 900)
  }

  const quizFertig = quiz && quiz.frageNr >= geschichte.fragen.length
  const alleRichtig = quizFertig && quiz.richtigGezaehlt === geschichte.fragen.length

  return (
    <div className="space-y-4">
      <BackBar
        titel={`📚 ${geschichte.titel}`}
        onZurueck={onZurueck}
        rechts={<span className="text-xs text-akzent font-bold whitespace-nowrap">{geschichte.niveau}</span>}
      />

      <Panel className="!py-4">
        <div className="text-xs text-matt">
          {geschichte.titelDe} {istFertig && <span className="text-ok font-bold">· ✅ erarbeitet</span>}
        </div>
        <p className="text-xs text-matt mt-2">
          Lies die Sätze <b>selbst</b> – ohne Hilfen. Hängst du fest, tippe den Satz an und hole dir
          unten Pinyin oder Übersetzung. Zum Schluss zeigen die Fragen, ob du alles verstanden hast.
        </p>
      </Panel>

      {/* Der Text: Satz antippen = für die Hilfe-Fläche auswählen */}
      <Panel>
        <div className="zeichen text-xl leading-loose">
          {geschichte.saetze.map((s, i) => (
            <button
              key={i}
              onClick={() => setSatzIdx(satzIdx === i ? null : i)}
              className={`text-left rounded-xl px-1.5 py-0.5 transition ${
                satzIdx === i ? 'bg-akzent/25 text-tinte' : 'hover:bg-akzent/10'
              }`}
            >
              {s.zh}
            </button>
          ))}
        </div>
      </Panel>

      {/* Hilfe-Fläche: Pinyin und/oder deutsche Übersetzung für den gewählten Satz */}
      <Panel className="!py-4 border-akzent/40">
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="font-bold text-sm">🛟 Hilfe-Fläche</h3>
          <div className="flex gap-2">
            <Chip aktiv={zeigPinyin} onClick={() => setZeigPinyin(!zeigPinyin)} className="!min-h-[34px] !py-1">
              拼音 Pinyin
            </Chip>
            <Chip aktiv={zeigDe} onClick={() => setZeigDe(!zeigDe)} className="!min-h-[34px] !py-1">
              🇩🇪 Deutsch
            </Chip>
          </div>
        </div>
        {!satz ? (
          <p className="text-xs text-matt">Tippe oben einen Satz an, zu dem du Hilfe brauchst.</p>
        ) : !zeigPinyin && !zeigDe ? (
          <p className="text-xs text-matt">Satz {satzIdx + 1} gewählt – blende Pinyin oder Deutsch ein.</p>
        ) : (
          <div className="space-y-1.5">
            <div className="zeichen text-base font-semibold">{satz.zh}</div>
            {zeigPinyin && <div className="text-akzent text-sm">{satz.py}</div>}
            {zeigDe && <div className="text-matt text-sm">{satz.de}</div>}
          </div>
        )}
      </Panel>

      {/* Verständnisfragen */}
      {!quiz ? (
        <Knopf className="w-full" onClick={quizStarten}>
          {istFertig ? 'Fragen nochmal beantworten' : '✅ Verstanden? Teste dich!'}
        </Knopf>
      ) : quizFertig ? (
        <Panel className="text-center py-8 relative overflow-hidden">
          {alleRichtig && <Konfetti />}
          <div className={`text-5xl mb-2 relative ${alleRichtig ? 'anim-sieg-pop' : ''}`}>{alleRichtig ? '🏆' : '📖'}</div>
          <div className="font-bold mb-1">
            {quiz.richtigGezaehlt} / {geschichte.fragen.length} richtig
          </div>
          <p className="text-matt text-sm mb-5">
            {alleRichtig
              ? istFertig ? 'Sitzt immer noch – stark!' : 'Geschichte erarbeitet · +15 XP'
              : 'Lies die Stellen mit der Hilfe-Fläche nochmal und versuch es erneut.'}
          </p>
          <div className="flex flex-col gap-2 max-w-xs mx-auto">
            {!alleRichtig && <Knopf onClick={quizStarten}>Nochmal versuchen</Knopf>}
            <Knopf variante={alleRichtig ? 'primaer' : 'sekundaer'} onClick={onZurueck}>Zurück zur Region</Knopf>
          </div>
        </Panel>
      ) : (
        <>
          <Panel className="!py-4">
            <div className="text-xs text-matt mb-1">
              Frage {quiz.frageNr + 1} / {geschichte.fragen.length}
            </div>
            <div className="zeichen font-semibold">{geschichte.fragen[quiz.frageNr].f}</div>
          </Panel>
          <div className="grid gap-2">
            {quiz.optionen.map((x) => {
              const richtig = geschichte.fragen[quiz.frageNr].richtig
              const stil =
                quiz.gewaehlt === null
                  ? 'border-linie bg-panel hover:border-akzent/60'
                  : x.i === richtig
                    ? 'border-ok bg-ok/15 text-ok'
                    : x.i === quiz.gewaehlt
                      ? 'border-err bg-err/15 text-err anim-wackeln'
                      : 'border-linie bg-panel opacity-50'
              return (
                <button
                  key={x.i}
                  onClick={() => quizAntwort(x)}
                  className={`zeichen rounded-2xl border py-3 px-4 text-left transition active:scale-[0.98] min-h-[52px] ${stil}`}
                >
                  {x.o}
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

export default function Entdecken() {
  const { state, geheZu, regionEntdeckt, geschichteFertig } = useStore()
  const [regionId, setRegionId] = useState(null)
  const [kategorie, setKategorie] = useState('essen')
  const [geschichteId, setGeschichteId] = useState(null)
  const region = REGIONEN.find((r) => r.id === regionId)

  const oeffneRegion = (r) => {
    setRegionId(r.id)
    setKategorie('essen')
    regionEntdeckt(r.id) // +5 XP beim ersten Besuch
  }

  // Geschichte zum aktiven Erarbeiten geöffnet → eigene Ansicht
  const geschichte = GESCHICHTEN.find((g) => g.id === geschichteId)
  if (geschichte) {
    return (
      <GeschichteAnsicht
        geschichte={geschichte}
        istFertig={state.geschichten.fertig.includes(geschichte.id)}
        onFertig={() => geschichteFertig(geschichte.id)}
        onZurueck={() => setGeschichteId(null)}
      />
    )
  }

  return (
    <div className="space-y-4">
      <BackBar
        titel="🧭 中国探索 Entdecken"
        onZurueck={() => (region ? setRegionId(null) : geheZu('home'))}
        rechts={<span className="text-xs text-matt whitespace-nowrap">{state.entdeckt.length}/{REGIONEN.length} entdeckt</span>}
      />

      {/* Karte */}
      <Panel className="!p-3">
        <svg viewBox="0 0 420 340" className="w-full">
          <path d={CHINA_PFAD} fill="var(--panel2)" stroke="var(--line)" strokeWidth="2" />
          {REGIONEN.map((r) => {
            const besucht = state.entdeckt.includes(r.id)
            const aktiv = regionId === r.id
            return (
              <g key={r.id} onClick={() => oeffneRegion(r)} className="cursor-pointer">
                {aktiv && (
                  <circle cx={r.x} cy={r.y} r="14" fill="var(--akzent)" opacity="0.35" className="anim-puls-ring" style={{ transformOrigin: `${r.x}px ${r.y}px` }} />
                )}
                <circle
                  cx={r.x} cy={r.y} r={aktiv ? 11 : 9}
                  fill={besucht ? 'var(--akzent)' : 'var(--panel)'}
                  stroke={aktiv ? 'var(--text)' : besucht ? 'var(--akzent2)' : 'var(--muted)'}
                  strokeWidth="2"
                />
                <text x={r.x} y={r.y + 4} textAnchor="middle" fontSize="10">{r.emoji}</text>
                <text
                  x={r.x} y={r.y - 14} textAnchor="middle" fontSize="13" fontWeight="600"
                  fill={besucht || aktiv ? 'var(--text)' : 'var(--muted)'}
                >
                  {r.name}
                </text>
              </g>
            )
          })}
        </svg>
        {!region && (
          <p className="text-xs text-matt text-center pb-1">
            Tippe eine Region an – jede erste Entdeckung gibt +5 XP für {state.katze.name}. 🐾
          </p>
        )}
      </Panel>

      {/* Regionsdetails */}
      {region && (
        <>
          <Panel className="!py-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{region.emoji}</span>
              <div>
                <div className="zeichen text-xl font-bold">
                  {region.name} <span className="text-akzent text-sm font-medium">{region.pinyin}</span>
                </div>
                <div className="text-xs text-matt">{region.deName}</div>
              </div>
            </div>
          </Panel>

          <div className="flex flex-wrap gap-2">
            {KATEGORIEN.map((k) => (
              <Chip key={k.id} aktiv={kategorie === k.id} onClick={() => setKategorie(k.id)}>
                {k.emoji} {k.titel}
              </Chip>
            ))}
          </div>

          {(region.inhalte[kategorie] || []).map((eintrag, i) => (
            <Panel key={`${region.id}-${kategorie}-${i}`}>
              <BegriffsText eintrag={eintrag} />
            </Panel>
          ))}

          {/* Geschichten zum aktiven Erarbeiten (höherer Schwierigkeitsgrad) */}
          {GESCHICHTEN.filter((g) => g.region === region.id).map((g) => {
            const fertig = state.geschichten.fertig.includes(g.id)
            return (
              <Panel
                key={g.id}
                className="flex items-center gap-4 cursor-pointer hover:border-akzent/60 transition border-akzent/30"
                onClick={() => setGeschichteId(g.id)}
              >
                <div className="text-3xl">{fertig ? '✅' : '📚'}</div>
                <div className="flex-1">
                  <div className="text-[10px] font-bold text-akzent uppercase tracking-wide">Geschichte zum Erarbeiten</div>
                  <div className="zeichen font-bold mt-0.5">{g.titel}</div>
                  <div className="text-xs text-matt">{g.titelDe} · {g.niveau}{fertig ? ' · erarbeitet' : ''}</div>
                </div>
                <div className="text-matt">→</div>
              </Panel>
            )
          })}

          <p className="text-xs text-matt text-center">
            Gepunktet unterstrichene Wörter antippen → Pinyin & Bedeutung.
            <br />Neue Regionen lassen sich in src/data/entdecken.js ergänzen.
          </p>
        </>
      )}
    </div>
  )
}
