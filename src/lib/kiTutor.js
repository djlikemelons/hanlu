// KI-Tutor: prüft einen selbst geschriebenen chinesischen Satz.
// Online über die Anthropic-API (Modell claude-sonnet-4-6) mit dem EIGENEN,
// nur lokal gespeicherten API-Key. Das ist die einzige Funktion der App, die
// einen Schlüssel/Internet braucht.
//
// Ohne Key: einfache Heuristik-Checks + Musterbeispiel zum Selbstvergleich
// (klar als „ohne KI nur eingeschränkt" gekennzeichnet – siehe Schreiben.jsx).

const MODELL = 'claude-sonnet-4-6'

function jsonAusText(text) {
  // robustes Herauslösen des JSON-Objekts aus der Modellantwort
  const start = text.indexOf('{')
  const ende = text.lastIndexOf('}')
  if (start < 0 || ende < 0) throw new Error('Keine JSON-Antwort erhalten')
  return JSON.parse(text.slice(start, ende + 1))
}

// Prüft den Satz online. Wirft bei Netzwerk-/Key-Fehlern (Aufrufer fängt ab).
export async function pruefeSatzKI({ satz, zielwort, aufgabe, apiKey }) {
  const prompt = `Du bist ein geduldiger Chinesisch-Tutor für eine Lernende auf dem Weg von HSK 4 zu HSK 5/6.
Bewerte den folgenden selbst geschriebenen Satz.

Zielwort, das vorkommen soll: 「${zielwort}」
${aufgabe ? `Aufgabe: ${aufgabe}` : ''}
Satz der Lernenden: 「${satz}」

Antworte AUSSCHLIESSLICH mit einem JSON-Objekt (kein weiterer Text) in genau diesem Format:
{
  "korrekt": true/false,            // grammatisch korrekt UND natürlich/idiomatisch?
  "zielwortRichtig": true/false,    // wurde 「${zielwort}」 sinnvoll und korrekt verwendet?
  "feedback": "kurzes, konkretes Feedback auf Deutsch (1-2 Sätze)",
  "korrektur": "verbesserte/korrigierte Fassung in chinesischen Zeichen (oder der Originalsatz, wenn schon gut)",
  "korrektur_pinyin": "Pinyin der korrigierten Fassung mit Tonzeichen",
  "ermutigung": "ein kurzer, motivierender Satz auf Deutsch"
}`

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: MODELL,
      max_tokens: 700,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!res.ok) {
    const txt = await res.text().catch(() => '')
    throw new Error(`API-Fehler ${res.status}${txt ? ': ' + txt.slice(0, 200) : ''}`)
  }
  const data = await res.json()
  const text = data?.content?.[0]?.text || ''
  return jsonAusText(text)
}

// Fallback ohne Key: einfache, ehrliche Checks + Musterbeispiel.
export function pruefeSatzEinfach({ satz, zielwort, musterSatz }) {
  const text = (satz || '').trim()
  const hanziAnzahl = [...text].filter((c) => /[一-鿿]/.test(c)).length
  return {
    kiGenutzt: false,
    checks: {
      zielwort: text.includes(zielwort),
      laenge: hanziAnzahl >= Math.max(5, zielwort.length + 3),
      satzzeichen: /[。！？.!?]$/.test(text),
    },
    musterSatz: musterSatz || null,
  }
}
