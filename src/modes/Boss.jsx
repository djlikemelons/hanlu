// 闯关 Boss-Battle-Lesen: Jeder Lesetext ist ein Gegner. Richtige Antworten
// auf Verständnisfragen machen Schaden, der Text ist besiegt bei 0 HP.
// Welten = HSK-Level → zielt direkt aufs Zeitungslese-Ziel.

import React, { useState } from 'react'
import { useStore } from '../store.jsx'
import { WELTEN } from '../data/boss.js'
import { mischen } from '../lib/utils.js'
import { Panel, Knopf, BackBar, Fortschritt } from '../components/UI.jsx'
import { useFeedback, FeedbackOverlay, wackelKlasse, Konfetti } from '../components/Feedback.jsx'
import BossFigur from '../components/BossFigur.jsx'

export default function Boss() {
  const { state, geheZu, bossBesiegt, xpHinzu } = useStore()
  const [welt, setWelt] = useState(null)
  const [kampf, setKampf] = useState(null) // {text, frageNr, hp, herzen, optionen}
  const [fb, zeigeFb] = useFeedback()
  const [gesperrt, setGesperrt] = useState(false)
  // 3D-Effekt-Zustand: 'treffer' (Boss nimmt Schaden), 'angriff' (Boss stürmt
  // bei falscher Antwort auf die Kamera zu), 'tod' (finaler Sturz)
  const [fx, setFx] = useState(null)
  const [fxKey, setFxKey] = useState(0)

  const starteKampf = (text) => {
    setFx(null)
    setKampf({
      text,
      frageNr: 0,
      hp: text.fragen.length,
      herzen: 3,
      optionen: mischen(text.fragen[0].optionen.map((o, i) => ({ o, i }))),
      status: 'lauf',
    })
  }

  const antworten = ({ i }) => {
    if (gesperrt || kampf.status !== 'lauf') return
    const frage = kampf.text.fragen[kampf.frageNr]
    const ok = i === frage.richtig
    const istTodesstoss = ok && kampf.hp - 1 <= 0
    zeigeFb(ok)
    setGesperrt(true)
    setFx(istTodesstoss ? 'tod' : ok ? 'treffer' : 'angriff')
    setFxKey((k) => k + 1)

    setTimeout(() => {
      setGesperrt(false)
      if (!istTodesstoss) setFx(null) // zurück zur Idle-Schwebe-Animation
      setKampf((k) => {
        const hp = ok ? k.hp - 1 : k.hp
        const herzen = ok ? k.herzen : k.herzen - 1
        if (hp <= 0) {
          bossBesiegt(k.text.id)
          xpHinzu(20)
          return { ...k, hp: 0, status: 'sieg' }
        }
        if (herzen <= 0) return { ...k, herzen: 0, status: 'niederlage' }
        const frageNr = ok ? k.frageNr + 1 : k.frageNr
        return {
          ...k, hp, herzen, frageNr,
          optionen: mischen(k.text.fragen[frageNr].optionen.map((o, idx) => ({ o, i: idx }))),
        }
      })
    }, istTodesstoss ? 1150 : ok ? 750 : 800)
  }

  // ---------- Weltenauswahl ----------
  if (!welt) {
    return (
      <div className="space-y-4">
        <BackBar titel="⚔️ Boss-Battle-Lesen" onZurueck={() => geheZu('home')} />
        {WELTEN.map((w) => {
          const besiegt = w.texte.filter((t) => state.boss.besiegt.includes(t.id)).length
          return (
            <Panel key={w.hsk} className="flex items-center gap-4 cursor-pointer hover:border-akzent/60 transition" onClick={() => setWelt(w)}>
              <BossFigur variante={w.figur} className="w-16 h-16 shrink-0" />
              <div className="flex-1">
                <div className="font-bold">{w.name}</div>
                <div className="text-xs text-matt mt-1">{besiegt} / {w.texte.length} Bosse besiegt</div>
                <Fortschritt wert={besiegt} max={w.texte.length} className="mt-2" farbe="bg-gold" />
              </div>
              <div className="text-matt">→</div>
            </Panel>
          )
        })}
        <p className="text-xs text-matt text-center">Neue Texte lassen sich einfach in src/data/boss.js ergänzen.</p>
      </div>
    )
  }

  // ---------- Textauswahl in der Welt ----------
  if (!kampf) {
    return (
      <div className="space-y-4">
        <BackBar titel={welt.name} onZurueck={() => setWelt(null)} />
        {welt.texte.map((t) => {
          const fertig = state.boss.besiegt.includes(t.id)
          return (
            <Panel key={t.id} className="flex items-center gap-4 cursor-pointer hover:border-akzent/60 transition" onClick={() => starteKampf(t)}>
              {fertig ? <div className="w-12 h-12 flex items-center justify-center text-3xl shrink-0">✅</div> : <BossFigur variante={welt.figur} className="w-12 h-12 shrink-0" />}
              <div className="flex-1">
                <div className="zeichen font-bold">{t.titel}</div>
                <div className="text-xs text-matt">{t.fragen.length} Fragen{fertig ? ' · besiegt' : ''}</div>
              </div>
              <div className="text-matt">⚔️</div>
            </Panel>
          )
        })}
      </div>
    )
  }

  // ---------- Sieg / Niederlage ----------
  if (kampf.status !== 'lauf') {
    const sieg = kampf.status === 'sieg'
    return (
      <div>
        <BackBar titel={welt.name} onZurueck={() => setKampf(null)} />
        <Panel className="text-center py-10 relative overflow-hidden">
          {sieg && <Konfetti />}
          <div className={`text-6xl mb-3 relative ${sieg ? 'anim-sieg-pop' : ''}`}>{sieg ? '🏆' : '💔'}</div>
          <h2 className="text-xl font-bold mb-2">{sieg ? 'Boss besiegt!' : 'Knapp verloren …'}</h2>
          <p className="text-matt text-sm mb-6">
            {sieg ? `„${kampf.text.titel}" gemeistert · +20 XP` : 'Lies den Text noch einmal in Ruhe und versuch es erneut.'}
          </p>
          <div className="flex flex-col gap-2 max-w-xs mx-auto">
            {!sieg && <Knopf onClick={() => starteKampf(kampf.text)}>Nochmal versuchen</Knopf>}
            <Knopf variante={sieg ? 'primaer' : 'sekundaer'} onClick={() => setKampf(null)}>Zur Textauswahl</Knopf>
          </div>
        </Panel>
      </div>
    )
  }

  // ---------- Kampf ----------
  const frage = kampf.text.fragen[kampf.frageNr]
  const bossAnim =
    fx === 'treffer' ? 'anim-boss3d-hit' : fx === 'angriff' ? 'anim-boss3d-lunge' : fx === 'tod' ? 'anim-boss3d-tod' : 'anim-boss3d-idle'
  return (
    <div>
      <BackBar titel={`${welt.boss} ${kampf.text.titel}`} onZurueck={() => setKampf(null)} />

      {/* 3D-Arena: Perspektive + Bodengitter, Boss schwebt und rotiert im Raum.
          Treffer werfen ihn nach hinten, falsche Antworten lassen ihn auf die
          Kamera zustürmen (inkl. Kamera-Wackeln). */}
      <div className="arena-3d relative h-52 mb-4 rounded-3xl border border-linie verlauf-panel overflow-hidden">
        <div className="arena-boden absolute left-1/2 -translate-x-1/2 bottom-[-30%] w-[170%] h-[85%]" />
        {/* rotes Warnlicht beim Angriff, grüner Blitz beim Treffer */}
        {fx === 'angriff' && <div key={fxKey} className="absolute inset-0 anim-erfolg-blitz" style={{ background: 'radial-gradient(circle at center, rgba(248,113,113,0.35), transparent 70%)' }} />}
        {fx === 'treffer' && <div key={fxKey} className="absolute inset-0 anim-erfolg-blitz" style={{ background: 'radial-gradient(circle at center, rgba(52,211,153,0.22), transparent 70%)' }} />}

        <div className={`absolute inset-0 ${fx === 'angriff' ? 'anim-arena-shake' : ''}`} style={{ transformStyle: 'preserve-3d' }}>
          {/* Schatten unter dem Boss */}
          <div className="anim-schatten absolute left-1/2 bottom-7 w-28 h-5 rounded-[50%] bg-black/45 blur-[3px]" />
          {/* der Boss selbst: animierte SVG-Figur mit Mimik je nach Zustand */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[64%]" style={{ transformStyle: 'preserve-3d' }}>
            <div key={`boss-${fxKey}-${fx || 'idle'}`} className={`select-none drop-shadow-[0_14px_18px_rgba(0,0,0,0.45)] ${bossAnim}`}>
              <BossFigur variante={welt.figur} zustand={fx || 'idle'} className="w-32 h-32" />
            </div>
            {fx === 'treffer' && (
              <span key={`dmg-${fxKey}`} className="anim-schaden absolute -top-3 -right-6 text-err font-extrabold text-2xl drop-shadow">💥−1</span>
            )}
            {fx === 'treffer' && (
              <>
                <span className="anim-funkeln absolute -top-4 -left-5 text-gold text-2xl">✦</span>
                <span className="anim-funkeln absolute bottom-0 -right-8 text-akzent text-xl" style={{ animationDelay: '0.1s' }}>✦</span>
              </>
            )}
          </div>
        </div>

        {/* HUD: Boss-HP + Spieler-Herzen */}
        <div className="absolute top-3 left-3 right-3 flex items-center gap-2">
          <span className="text-[10px] font-bold text-matt uppercase">Boss</span>
          <div className={`flex-1 rounded-full ${fx === 'treffer' ? 'anim-richtig-glow' : ''}`}>
            <Fortschritt wert={kampf.hp} max={kampf.text.fragen.length} farbe="bg-err" />
          </div>
          <span className={`text-sm tracking-wider ${fx === 'angriff' ? 'anim-wackeln' : ''}`}>
            {'❤️'.repeat(kampf.herzen)}{'🖤'.repeat(3 - kampf.herzen)}
          </span>
        </div>
      </div>

      <Panel className="mb-4 max-h-48 overflow-y-auto">
        <div className="zeichen text-lg leading-loose">{kampf.text.text}</div>
        {/* ERWEITERUNG: Sprachausgabe – Text per speechSynthesis (zh-CN) vorlesen lassen */}
      </Panel>

      <Panel className={`relative mb-3 !py-4 ${wackelKlasse(fb)}`}>
        <FeedbackOverlay fb={fb} />
        <div className="zeichen font-semibold text-center">
          {kampf.frageNr + 1}/{kampf.text.fragen.length} · {frage.f}
        </div>
      </Panel>

      <div className="grid gap-2">
        {kampf.optionen.map((x) => (
          <button
            key={x.i}
            onClick={() => antworten(x)}
            className="zeichen rounded-2xl border border-linie bg-panel py-3 px-4 text-left hover:border-akzent/60 transition active:scale-[0.98] min-h-[52px]"
          >
            {x.o}
          </button>
        ))}
      </div>
    </div>
  )
}
