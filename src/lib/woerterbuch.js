// Offline-Wörterbuch auf Basis von HanDeDict (Deutsch↔Chinesisch, CC-BY-SA).
// Das ~10 MB große JSON liegt in /public und wird erst beim ersten Bedarf
// geladen (lazy) – danach im Speicher gehalten. GitHub Pages liefert es gzip
// (~3,5 MB Transfer, einmalig + gecacht).
//
// Format: { "简体": [["pīnyīn","Bedeutung; …"], …], … }

let cache = null
let ladePromise = null

export const woerterbuchGeladen = () => !!cache

export function ladeWoerterbuch() {
  if (cache) return Promise.resolve(cache)
  if (ladePromise) return ladePromise
  ladePromise = fetch(`${import.meta.env.BASE_URL}handedict.json`)
    .then((r) => { if (!r.ok) throw new Error('Wörterbuch nicht gefunden'); return r.json() })
    .then((d) => { cache = d; return d })
    .catch((e) => { ladePromise = null; throw e })
  return ladePromise
}

const HAT_HANZI = /[一-鿿]/

// Pinyin vergleichbar machen: Tonzeichen/-ziffern weg, ü→u, klein, ohne Leerraum
export function pinyinNormal(s) {
  return (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ü/g, 'u')
    .replace(/[1-5]/g, '')
    .replace(/\s+/g, '')
}

// Ein einzelnes Wort nachschlagen (exakt). → [["pīnyīn","Bedeutung"], …] | null
export function nachschlagen(wort) {
  return cache?.[wort] || null
}

// Suche nach Zeichen (exakt + Präfix) oder nach Pinyin. → [{hanzi, eintraege}]
export function suche(query, limit = 40) {
  if (!cache) return []
  const q = (query || '').trim()
  if (!q) return []
  const treffer = []

  if (HAT_HANZI.test(q)) {
    if (cache[q]) treffer.push({ hanzi: q, eintraege: cache[q] })
    for (const k in cache) {
      if (treffer.length >= limit) break
      if (k !== q && k.startsWith(q)) treffer.push({ hanzi: k, eintraege: cache[k] })
    }
  } else {
    const qn = pinyinNormal(q)
    if (!qn) return []
    // exakte Pinyin-Treffer zuerst, dann Präfixe
    const exakt = []
    const praefix = []
    for (const k in cache) {
      const e = cache[k]
      let rang = -1
      for (const [py] of e) {
        const pn = pinyinNormal(py)
        if (pn === qn) { rang = 0; break }
        if (pn.startsWith(qn)) rang = 1
      }
      if (rang === 0) exakt.push({ hanzi: k, eintraege: e })
      else if (rang === 1) praefix.push({ hanzi: k, eintraege: e })
      if (exakt.length >= limit) break
    }
    treffer.push(...exakt, ...praefix)
  }
  return treffer.slice(0, limit)
}

// Chinesischen Text in antippbare Segmente zerlegen (längster Wörterbuch-
// Treffer zuerst). Nicht-Hanzi bleibt als Klartext-Block stehen.
export function segmentiereText(text, maxLen = 4) {
  const seg = []
  let i = 0
  while (i < text.length) {
    if (!HAT_HANZI.test(text[i])) {
      let j = i
      while (j < text.length && !HAT_HANZI.test(text[j])) j++
      seg.push({ t: text.slice(i, j), wort: false })
      i = j
      continue
    }
    let len = cache ? Math.min(maxLen, text.length - i) : 1
    for (; len >= 1; len--) {
      const sub = text.slice(i, i + len)
      if (len === 1 || cache?.[sub]) {
        seg.push({ t: sub, wort: true, treffer: cache?.[sub] || null })
        i += len
        break
      }
    }
  }
  return seg
}
