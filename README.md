# 汉路 · HànLù

Personalisierbare Chinesisch-Lern-Web-App (vereinfachte Zeichen) für den Weg von **HSK 4 zu HSK 5** – mit Schwerpunkt auf **Lesen, Satzbildung und Vokabeln**. Läuft komplett im Browser, ohne Backend und ohne API-Key. Der gesamte Lernstand liegt lokal im `localStorage` und kann als JSON exportiert/importiert werden.

## Features

- **Tägliches Lernen (SRS)**: SM-2-ähnliche Spaced Repetition mit flexiblem Tageslimit und „Mehr Karten heute"-Button. **Bewertungsmodus umschaltbar**: 3 Knöpfe (Standard) · 4 Knöpfe (Anki) · Wischen. Plus **Rückgängig**, **Tastatur** (Leertaste = aufdecken, Ziffern = bewerten), **Wisch-Gesten**, **Audio 🔊** auf Karte & Beispielsatz (zh-CN, kostenlos), **Sound-Effekte** (abschaltbar).
- **词典 Wörterbuch (Pleco-Stil)**: Offline-Wörterbuch auf Basis von **HanDeDict** (~148k Stichwörter, lazy geladen). Suche nach Zeichen oder Pinyin, Audio, **antippbares Nachschlagen** in Beispielsätzen & eigenen Texten (Pop-up), **„als Karteikarte speichern"** mit Themenwahl (Sentence Mining). Build-Skript: `scripts/handedict-bauen.mjs`.
- **✍️ Anwenden & Schreiben (KI-Tutor)**: eigenes Zielwort + Aufgabe, eigenen Satz schreiben → mit eigenem **Anthropic-API-Key** (nur lokal, Modell `claude-sonnet-4-6`) echtes Feedback (korrekt? natürlich? Zielwort richtig?), korrigierte Fassung mit Pinyin & Ermutigung. **Ohne Key**: einfache Checks + Musterbeispiel.
- **📄 Eigener Text**: beliebigen chinesischen Text einfügen → Lese-Lektion mit antippbarem Wörterbuch und „als Karte speichern".
- **Wiederholen-Modus**: bereits gelernte Karten jederzeit on demand frei wiederholen – global (Startbildschirm) oder pro Thema.
- **Zwei Lernwege**: allgemeiner Themen-Pool fürs tägliche Lernen (konfigurierbar) + gezielte **Lernblöcke** pro Thema auf dem Startbildschirm.
- **11 vorbefüllte Themenblöcke** (~300 Vokabeln gesamt, überwiegend HSK 4 mit HSK 5) – plus eigene Themen & Karten. Editierbar in `src/data/starterDeck.js`, `src/data/starterDeckExtra.js` und `src/data/reservoir.js`.
- **Selbstfüllendes Vokabelsystem**: Geht der Vorrat an neuen Karten zur Neige, füllt die App automatisch aus dem eingebauten Reservoir nach (abschaltbar in den Einstellungen).
- **Gebiete**: jedes Thema gehört zu *Persönliches* oder *HSK-5-Training* – im Test als Schnellfilter nutzbar.
- **Adaptiver Einstufungstest** beim ersten Start (HSK 3→6), markiert sichere Wörter als bekannt; jederzeit wiederholbar.
- **Fortschritts-Dashboard**: Streak mit **Streak-Schutz (Freeze)**, Tageszahlen, Mastery-Verteilung, **Lern-Heatmap** (GitHub-Raster), 30-Tage-Verlaufskurve, HSK-Schätzung und **Meilenstein-Siegel 印章** (rote Stempel mit Animation bei 100/500/1000 Wörtern & Streak-Marken, plus Sammlung).
- **Wort des Tages** auf dem Startbildschirm: täglich wechselndes Chengyu/Kulturwort mit Hintergrundnotiz, Audio und „als Karte".
- **12 Spielmodi als Plugins**: 拼句 Satzbauer · 词语冲刺 Sprint · 🎵 声调 Ton-Detektiv · 🎧 听力 Hörjagd (Wort hören → Zeichen wählen, kostenlose Browser-Sprachausgabe) · 🃏 配对 Memory (3D-Flip) · ⏱️ 速读 Speed-Reading (Zeitungstexte im Lesetempo + Verständnisfragen) · 📖 阅读 Lesen (lange Fließtexte ≈300+ Zeichen als **Monatslektüre**: schwere Wörter antippbar für Pinyin + Bedeutung, Verständnisfragen unter dem Text) · 🍜 饭馆 Restaurant-Simulator (Gäste bestellen auf Chinesisch, richtig servieren – trainiert Zählwörter) · 闯关 Boss-Battle in der **3D-Arena** mit **animierter SVG-Boss-Figur** (reagiert auf Treffer/Angriff) · 互动小说 Story mit Szenen-Bannern · 🧭 中国探索 Entdecken (interaktive Kulturkarte mit antippbarem Pinyin **+ Geschichten zum aktiven Erarbeiten**: nur Hanzi, Pinyin/Übersetzung über die Hilfe-Fläche, danach Verständnisfragen) · 中国地图 Reisekarte.
- **学习猫 Mochi** lebt dauerhaft auf dem Startbildschirm und kommentiert deinen Fortschritt (Streak, fällige Karten, Tagespensum).
- **Test-Modus** (auch als **Wochen-/Monatstest** über den Zeitraum-Filter): themen-, gebiets- und zeitraumfilterbar, 8 Aufgabentypen (Zeichen→Bedeutung, Bedeutung→Zeichen, **Aussprache/Pinyin**, **Lückentext mit gelernten Wörtern**, Leseverständnis, **Satzbau**, **freie Satzbildung** – eigenen Satz schreiben mit Auto-Checks, Modellsatz-Vergleich & Selbsteinschätzung, Matching) mit Ergebnis-Report.
- **PWA**: installierbar über „Zum Home-Bildschirm hinzufügen", offlinefähig, Vollbild-Button.
- **Design**: Dark Mode als Standard, **heller White-Mode umschaltbar** (Einstellungen), dunkelblauer Akzent, mobile-first.

## Lokal starten

Voraussetzung: [Node.js](https://nodejs.org) (≥ 18).

```bash
npm install
npm run dev        # → http://localhost:5173
```

Produktions-Build und lokale Vorschau:

```bash
npm run build      # erzeugt dist/
npm run preview    # dient dist/ lokal aus
```

> Hinweis: Auf diesem Rechner wurde Node portabel nach `~/.local/node` installiert. Falls `npm` nicht gefunden wird: `export PATH="$HOME/.local/node/bin:$PATH"`.

## Auf Netlify veröffentlichen

**Variante A – Drag & Drop (am einfachsten):**

1. `npm run build` ausführen.
2. Auf [app.netlify.com/drop](https://app.netlify.com/drop) den Ordner `dist/` ins Browserfenster ziehen.
3. Fertig – Netlify zeigt sofort die öffentliche URL.

**Variante B – über Git:**

1. Projekt in ein GitHub-Repo pushen.
2. In Netlify „Add new site → Import an existing project" wählen.
3. Build command: `npm run build` · Publish directory: `dist`.

Danach auf dem Handy die URL öffnen und über das Browser-Menü **„Zum Home-Bildschirm hinzufügen"** – die App startet dann wie eine native App im Vollbild.

## Backup & Gerätewechsel

Einstellungen → **Export (JSON)** lädt den kompletten Lernstand als Datei herunter. Auf dem neuen Gerät: **Import** und die Datei auswählen. (Der Lernstand ist pro Browser/Gerät lokal – es gibt bewusst keinen Server.)

## Eigene Inhalte

- **Karten & Themen** direkt in der App unter „Themen & Karten verwalten".
- **Starter-Deck** editieren: [src/data/starterDeck.js](src/data/starterDeck.js) (Format ist dort dokumentiert).
- **Boss-Lesetexte** ergänzen: [src/data/boss.js](src/data/boss.js) (Boss-Figur-Variante über `figur`, siehe [src/components/BossFigur.jsx](src/components/BossFigur.jsx))
- **Stories** ergänzen: [src/data/story.js](src/data/story.js)
- **Entdecken-Geschichten** (zum aktiven Erarbeiten): [src/data/geschichten.js](src/data/geschichten.js)
- **Lese-Langtexte** (Monatslektüre, ≈300+ Zeichen, Glossar + Fragen): [src/data/lesetexte.js](src/data/lesetexte.js)
- **Restaurant-Gerichte & Bestellsätze**: [src/data/restaurant.js](src/data/restaurant.js)
- **Speed-Reading-Texte**: [src/data/speedread.js](src/data/speedread.js)
- **Reisekarte/Städte**: [src/data/reise.js](src/data/reise.js)
- **Einstufungstest-Pool**: [src/data/placement.js](src/data/placement.js)
- **Neuer Spielmodus**: Komponente in `src/modes/` anlegen und in [src/modes/index.js](src/modes/index.js) registrieren – fertig.

## Geplante Erweiterungen (im Code markiert mit „ERWEITERUNG")

| Erweiterung | Einstiegspunkt |
| --- | --- |
| 🔊 Sprachausgabe – bereits genutzt in der Hörjagd ([src/lib/sprache.js](src/lib/sprache.js), `speechSynthesis` mit `lang: 'zh-CN'`, kostenlos & offline). Naheliegend: auch beim täglichen Lernen & Boss vorlesen | `src/screens/Lernen.jsx`, `src/modes/Boss.jsx` |
| 🧊 „Echtes" 3D der Boss-Figur über Three.js (aktuell animiertes SVG) | `src/components/BossFigur.jsx` |
| ✨ Automatische Kartengenerierung über die Anthropic-API (JSON im Starter-Deck-Format; API-Key nie im Frontend, sondern z. B. via Netlify Function) | `src/screens/Themen.jsx`, `src/data/starterDeck.js` |
| ☁️ Geräte-Sync (Lernstand statt nur localStorage zusätzlich in einen Sync-Dienst schreiben) | `src/lib/storage.js` |

## Technik

React 18 · Vite 6 · Tailwind CSS 3 · keine weiteren Laufzeit-Abhängigkeiten. Zustand: ein zentraler Store ([src/store.jsx](src/store.jsx)) mit automatischer Persistenz; SRS-Logik in [src/lib/srs.js](src/lib/srs.js).
