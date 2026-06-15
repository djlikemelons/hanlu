// 阅读 Lesen: längere Fließtexte (≈300+ Zeichen) zum aktiven Durcharbeiten –
// gedacht als „Monatslektüre". Schwere Wörter (Glossar) werden im Text
// automatisch antippbar und zeigen Pinyin + Bedeutung. Unter dem Text
// beantwortest du Verständnisfragen; alles richtig = Text gemeistert (+20 XP).

import React, { useMemo, useState } from 'react'
import { useStore } from '../store.jsx'
import { LESETEXTE } from '../data/lesetexte.js'
import { heuteISO, tageAb } from '../lib/srs.js'
import { mischen } from '../lib/utils.js'
import { Panel, Knopf, BackBar, Fortschritt } from '../components/UI.jsx'
import { Konfetti } from '../components/Feedback.jsx'

// Den Fließtext in Segmente zerlegen: Glossarwörter werden zu klickbaren
// Buttons (längste Treffer zuerst, damit z. B. 电动汽车 vor 电 greift).
function segmentiere(text, glossar) {
  const begriffe = Object.keys(glossar).sort((a, b) => b.length - a.length)
  const segmente = []
  let i = 0
  while (i < text.length) {
    let treffer = null
    for (const b of begriffe) {
      if (text.startsWith(b, i)) { treffer = b; break }
    }
    if (treffer) {
      segmente.push({ wort: treffer, klickbar: true })
      i += treffer.length
    } else {
      // bis zum nächsten möglichen Glossar-Anfang als Klartext zusammenfassen
      const letztes = segmente[segmente.length - 1]
      if (letztes && !letztes.klickbar) letztes.wort += text[i]
      else segmente.push({ wort: text[i], klickbar: false })
      i++
    }
  }
  return segmente
}

function TextLeser({ leseText, istFertig, onFertig, onZurueck }) {
  const segmente = useMemo(() => segmentiere(leseText.text, leseText.glossar), [leseText.id])
  const [offenesWort, setOffenesWort] = useState(null)
  const [quiz, setQuiz] = useState(null) // { nr, richtig, optionen, gewaehlt }

  const aktiv = offenesWort ? leseText.glossar[offenesWort] : null

  const quizStarten = () =>
    setQuiz({ nr: 0, richtig: 0, optionen: mischen(leseText.fragen[0].optionen.map((o, i) => ({ o, i }))), gewaehlt: null })

  const antwort = (x) => {
    if (quiz.gewaehlt !== null) return
    setQuiz({ ...quiz, gewaehlt: x.i })
    const ok = x.i === leseText.fragen[quiz.nr].richtig
    setTimeout(() => {
      const richtig = quiz.richtig + (ok ? 1 : 0)
      const naechste = quiz.nr + 1
      if (naechste >= leseText.fragen.length) {
        if (richtig === leseText.fragen.length) onFertig()
        setQuiz({ nr: naechste, richtig, optionen: [], gewaehlt: null })
      } else {
        setQuiz({ nr: naechste, richtig, optionen: mischen(leseText.fragen[naechste].optionen.map((o, i) => ({ o, i }))), gewaehlt: null })
      }
    }, 950)
  }

  const quizFertig = quiz && quiz.nr >= leseText.fragen.length
  const alleRichtig = quizFertig && quiz.richtig === leseText.fragen.length

  return (
    <div className="space-y-4">
      <BackBar
        titel={`📖 ${leseText.titel}`}
        onZurueck={onZurueck}
        rechts={<span className="text-xs text-akzent font-bold whitespace-nowrap">{leseText.niveau}</span>}
      />

      <Panel className="!py-3">
        <div className="text-xs text-matt">
          {leseText.thema} · {leseText.titelDe}
          {istFertig && <span className="text-ok font-bold"> · ✅ gelesen</span>}
        </div>
        <p className="text-xs text-matt mt-2">
          Lies den ganzen Text in Ruhe. <b>Tippe unterstrichene Wörter an</b>, wenn du Pinyin und
          Bedeutung brauchst. Unten beantwortest du dann die Fragen zum Inhalt.
        </p>
      </Panel>

      {/* Der Fließtext mit antippbaren Glossarwörtern */}
      <Panel>
        <p className="zeichen text-xl leading-loose">
          {segmente.map((seg, idx) =>
            seg.klickbar ? (
              <button
                key={idx}
                onClick={() => setOffenesWort(offenesWort === seg.wort ? null : seg.wort)}
                className={`rounded-md px-0.5 transition ${
                  offenesWort === seg.wort
                    ? 'bg-akzent/25 text-akzent'
                    : 'underline decoration-dotted decoration-akzent/60 underline-offset-4 hover:bg-akzent/10'
                }`}
              >
                {seg.wort}
              </button>
            ) : (
              <span key={idx}>{seg.wort}</span>
            )
          )}
        </p>
      </Panel>

      {/* Hilfe-Anzeige für das angetippte Wort (klebt unten beim Lesen) */}
      <div className="sticky bottom-3 z-10">
        <Panel className="!py-3 border-akzent/40">
          {aktiv ? (
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="zeichen text-lg font-bold">{offenesWort}</span>
              <span className="text-akzent">{aktiv[0]}</span>
              <span className="text-matt text-sm">· {aktiv[1]}</span>
            </div>
          ) : (
            <p className="text-xs text-matt">🛟 Tippe ein unterstrichenes Wort an → Pinyin & Bedeutung erscheinen hier.</p>
          )}
        </Panel>
      </div>

      {/* Verständnisfragen */}
      {!quiz ? (
        <Knopf className="w-full" onClick={quizStarten}>
          {istFertig ? 'Fragen erneut beantworten' : '✅ Durchgelesen? Fragen beantworten'}
        </Knopf>
      ) : quizFertig ? (
        <Panel className="text-center py-8 relative overflow-hidden">
          {alleRichtig && <Konfetti />}
          <div className={`text-5xl mb-2 relative ${alleRichtig ? 'anim-sieg-pop' : ''}`}>{alleRichtig ? '🏆' : '📖'}</div>
          <div className="font-bold mb-1">{quiz.richtig} / {leseText.fragen.length} richtig</div>
          <p className="text-matt text-sm mb-5">
            {alleRichtig
              ? istFertig ? 'Sitzt – sauberes Textverständnis!' : 'Text gemeistert · +20 XP'
              : 'Lies die unklaren Stellen nochmal (Wörter antippen) und versuch es erneut.'}
          </p>
          <div className="flex flex-col gap-2 max-w-xs mx-auto">
            {!alleRichtig && <Knopf onClick={quizStarten}>Nochmal versuchen</Knopf>}
            <Knopf variante={alleRichtig ? 'primaer' : 'sekundaer'} onClick={onZurueck}>Zur Textauswahl</Knopf>
          </div>
        </Panel>
      ) : (
        <>
          <Panel className="!py-4">
            <div className="text-xs text-matt mb-1">Frage {quiz.nr + 1} / {leseText.fragen.length}</div>
            <div className="zeichen font-semibold">{leseText.fragen[quiz.nr].f}</div>
          </Panel>
          <div className="grid gap-2">
            {quiz.optionen.map((x) => {
              const richtig = leseText.fragen[quiz.nr].richtig
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
                  onClick={() => antwort(x)}
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

export default function Lesen() {
  const { state, geheZu, leseTextFertig } = useStore()
  const [textId, setTextId] = useState(null)
  const leseText = LESETEXTE.find((t) => t.id === textId)

  if (leseText) {
    return (
      <TextLeser
        leseText={leseText}
        istFertig={state.lesen.fertig.some((e) => e.id === leseText.id)}
        onFertig={() => leseTextFertig(leseText.id)}
        onZurueck={() => setTextId(null)}
      />
    )
  }

  // Monatslektüre-Empfehlung: Wie lange ist die letzte gelesene Lektüre her?
  const letztesDatum = state.lesen.fertig.reduce((max, e) => (e.datum > max ? e.datum : max), '')
  const grenze30 = tageAb(heuteISO(), -30)
  const faellig = !letztesDatum || letztesDatum < grenze30
  // Empfohlener Text: erster noch nicht gelesener, sonst der am längsten nicht gelesene
  const fertigIds = new Set(state.lesen.fertig.map((e) => e.id))
  const empfohlen = LESETEXTE.find((t) => !fertigIds.has(t.id)) || LESETEXTE[0]

  return (
    <div className="space-y-4">
      <BackBar
        titel="📖 阅读 Lesen"
        onZurueck={() => geheZu('home')}
        rechts={<span className="text-xs text-matt whitespace-nowrap">{state.lesen.fertig.length}/{LESETEXTE.length} gelesen</span>}
      />

      <Panel className={`!py-4 ${faellig ? 'border-akzent/50' : ''}`}>
        <h3 className="font-bold text-sm mb-1">{faellig ? '📅 Zeit für deine Monatslektüre!' : '📚 Deine Lese-Ecke'}</h3>
        <p className="text-xs text-matt">
          {faellig
            ? letztesDatum
              ? 'Deine letzte längere Lektüre ist über einen Monat her. Arbeite einen Text durch und gib den Inhalt in den Fragen wieder.'
              : 'Hier liest du längere, zusammenhängende Texte (≈300+ Zeichen) und trainierst dein Sachverständnis. Empfohlener Einstieg unten.'
            : 'Du bist im Lese-Rhythmus – gern öfter als einmal im Monat. Such dir einen Text aus.'}
        </p>
      </Panel>

      {LESETEXTE.map((t) => {
        const fertig = fertigIds.has(t.id)
        const istEmpfehlung = faellig && t.id === empfohlen.id
        return (
          <Panel
            key={t.id}
            className={`flex items-center gap-4 cursor-pointer hover:border-akzent/60 transition ${istEmpfehlung ? 'border-akzent/60' : ''}`}
            onClick={() => setTextId(t.id)}
          >
            <div className="text-3xl">{fertig ? '✅' : '📄'}</div>
            <div className="flex-1">
              {istEmpfehlung && <div className="text-[10px] font-bold text-akzent uppercase tracking-wide">Empfohlen</div>}
              <div className="zeichen font-bold">{t.titel}</div>
              <div className="text-xs text-matt">{t.titelDe} · {t.thema} · {t.text.length} Zeichen · {t.fragen.length} Fragen</div>
            </div>
            <div className="text-matt">→</div>
          </Panel>
        )
      })}

      <p className="text-xs text-matt text-center">Neue Texte lassen sich in src/data/lesetexte.js ergänzen.</p>
    </div>
  )
}
