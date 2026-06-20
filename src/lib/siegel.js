// Meilenstein-Siegel (印章): rote Stempel für erreichte Lern-Meilensteine.
// Zwei Arten: Anzahl begonnener Wörter und Streak-Länge in Tagen.

export const SIEGEL = [
  { id: 'w100', typ: 'woerter', schwelle: 100, marke: '百', titel: '100 Wörter', hinweis: 'begonnene Vokabeln' },
  { id: 'w500', typ: 'woerter', schwelle: 500, marke: '五百', titel: '500 Wörter', hinweis: 'begonnene Vokabeln' },
  { id: 'w1000', typ: 'woerter', schwelle: 1000, marke: '千', titel: '1000 Wörter', hinweis: 'begonnene Vokabeln' },
  { id: 's7', typ: 'streak', schwelle: 7, marke: '七', titel: '7 Tage', hinweis: 'Streak' },
  { id: 's30', typ: 'streak', schwelle: 30, marke: '卅', titel: '30 Tage', hinweis: 'Streak' },
  { id: 's100', typ: 'streak', schwelle: 100, marke: '百', titel: '100 Tage', hinweis: 'Streak' },
  { id: 's365', typ: 'streak', schwelle: 365, marke: '年', titel: '365 Tage', hinweis: 'Streak' },
]

// IDs aller aktuell verdienten Siegel (anhand begonnener Wörter & Streak).
export function verdienteSiegelIds(woerterBegonnen, streak) {
  return SIEGEL.filter((s) => (s.typ === 'woerter' ? woerterBegonnen : streak) >= s.schwelle).map((s) => s.id)
}

export const siegelInfo = (id) => SIEGEL.find((s) => s.id === id)
