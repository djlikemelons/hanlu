// Vorbefüllte Themenblöcke. Eigene Themen werden über die App angelegt
// und im Lernstand (localStorage) gespeichert.
//
// `gebiet` ordnet jedes Thema einem der beiden Lern-Gebiete zu:
//   'persoenlich' = deine Interessen (Foto, Trade, Business, Essen, Reisen)
//   'hsk5'        = Training Richtung HSK 5 / Zeitunglesen
// Wird u. a. im Test-Modus genutzt, um schnell „Persönliches" oder
// „HSK-5-Training" auszuwählen. Pro Thema in der Verwaltung umstellbar.
export const STANDARD_THEMEN = [
  { id: 'hsk', name: 'HSK-Grundwortschatz', emoji: '📘', aktiv: true, eigenes: false, gebiet: 'hsk5' },
  { id: 'foto', name: 'Fotografie & Video', emoji: '📷', aktiv: true, eigenes: false, gebiet: 'persoenlich' },
  { id: 'steuern', name: 'Steuern & Global Trade', emoji: '🧾', aktiv: true, eigenes: false, gebiet: 'persoenlich' },
  { id: 'business', name: 'Business & Verhandlung', emoji: '🤝', aktiv: true, eigenes: false, gebiet: 'persoenlich' },
  { id: 'essen', name: 'Essen & Restaurant', emoji: '🍜', aktiv: true, eigenes: false, gebiet: 'persoenlich' },
  { id: 'reisen', name: 'Reisen in China', emoji: '🚄', aktiv: true, eigenes: false, gebiet: 'persoenlich' },
  { id: 'alltag', name: 'Alltag & Smalltalk', emoji: '💬', aktiv: true, eigenes: false, gebiet: 'hsk5' },
  { id: 'nachrichten', name: 'Wirtschaft & Nachrichten', emoji: '📰', aktiv: true, eigenes: false, gebiet: 'hsk5' },
  { id: 'wohnen', name: 'Wohnen & Behörden', emoji: '🏠', aktiv: true, eigenes: false, gebiet: 'hsk5' },
  { id: 'technik', name: 'Technik & Digitales', emoji: '💻', aktiv: true, eigenes: false, gebiet: 'hsk5' },
  { id: 'kultur', name: 'Kultur & Chengyu', emoji: '🏮', aktiv: true, eigenes: false, gebiet: 'hsk5' },
]

// Anzeige-Metadaten der beiden Gebiete (Reihenfolge = Anzeige-Reihenfolge).
export const GEBIETE = [
  { id: 'persoenlich', name: 'Persönliches', emoji: '⭐', beschreibung: 'Deine Interessen: Foto, Trade, Business, Essen, Reisen' },
  { id: 'hsk5', name: 'HSK-5-Training', emoji: '🎓', beschreibung: 'Grundwortschatz & Zeitungssprache Richtung HSK 5' },
]

// Standard-Pool fürs tägliche Lernen: bewusst breit, nicht zu stark
// auf Spezialthemen personalisiert (in den Einstellungen änderbar).
export const STANDARD_POOL = ['hsk', 'alltag', 'essen', 'reisen', 'nachrichten', 'wohnen', 'kultur']
