// Wiederverwendbare UI-Bausteine: Buttons, Panels, Chips, Fortschrittsbalken.
// Große Tap-Flächen (min. 48 px) für die mobile Nutzung.

import React from 'react'

// Pinyin klassisch einfarbig im Akzentton darstellen (keine Tonfarben).
// Zentrale Komponente: überall einsetzbar, wo Pinyin erscheint.
export function Pinyin({ text, className = '' }) {
  return <span className={`text-akzent ${className}`}>{text}</span>
}

export function Knopf({ children, variante = 'primaer', className = '', ...p }) {
  const stile = {
    primaer: 'bg-akzent text-white glow hover:brightness-110',
    sekundaer: 'bg-panel2 border border-linie text-tinte hover:border-akzent/60',
    geist: 'text-matt hover:text-tinte',
    gefahr: 'bg-err/10 text-err border border-err/40 hover:bg-err/20',
  }
  return (
    <button
      className={`rounded-2xl px-5 py-3 font-semibold transition active:scale-95 min-h-[48px] ${stile[variante]} ${className}`}
      {...p}
    >
      {children}
    </button>
  )
}

export function Panel({ children, className = '', ...p }) {
  return (
    <div className={`verlauf-panel border border-linie rounded-3xl p-5 ${className}`} {...p}>
      {children}
    </div>
  )
}

export function Chip({ children, aktiv = false, className = '', ...p }) {
  return (
    <button
      className={`rounded-full px-4 py-2 text-sm font-medium border transition min-h-[40px] ${
        aktiv ? 'bg-akzent/20 border-akzent text-tinte' : 'bg-panel border-linie text-matt hover:text-tinte'
      } ${className}`}
      {...p}
    >
      {children}
    </button>
  )
}

export function BackBar({ titel, onZurueck, rechts = null }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <button
        onClick={onZurueck}
        aria-label="Zurück"
        className="w-11 h-11 rounded-2xl bg-panel2 border border-linie flex items-center justify-center text-lg hover:border-akzent/60 transition"
      >
        ←
      </button>
      <h1 className="text-xl font-bold flex-1">{titel}</h1>
      {rechts}
    </div>
  )
}

export function Fortschritt({ wert, max, className = '', farbe = 'bg-akzent' }) {
  const p = max > 0 ? Math.min(100, Math.round((wert / max) * 100)) : 0
  return (
    <div className={`h-2.5 rounded-full bg-panel2 border border-linie overflow-hidden ${className}`}>
      <div className={`h-full ${farbe} transition-all duration-500`} style={{ width: `${p}%` }} />
    </div>
  )
}

export function Statistik({ wert, label }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold">{wert}</div>
      <div className="text-xs text-matt mt-0.5">{label}</div>
    </div>
  )
}
