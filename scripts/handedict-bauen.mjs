// HanDeDict (CC-lizenziert, Chinesisch↔Deutsch) in ein kompaktes JSON fürs
// Wörterbuch umwandeln. Einmalig/bei Updates ausführen:
//
//   node scripts/handedict-bauen.mjs <pfad/zu/handedict_nb.u8>
//
// Erzeugt public/handedict.json:  { "简体": [["pīnyīn","Bedeutung; …"], …], … }
//
// Quelle: https://github.com/zydeo/HanDeDict  (handedict_nb.u8)
// Lizenz: CC-BY-SA 2.0 DE – Namensnennung „HanDeDict" + Weitergabe unter gleicher Lizenz.

import { readFileSync, writeFileSync } from 'node:fs'

const VOKAL_TON = {
  a: ['ā', 'á', 'ǎ', 'à', 'a'],
  e: ['ē', 'é', 'ě', 'è', 'e'],
  i: ['ī', 'í', 'ǐ', 'ì', 'i'],
  o: ['ō', 'ó', 'ǒ', 'ò', 'o'],
  u: ['ū', 'ú', 'ǔ', 'ù', 'u'],
  ü: ['ǖ', 'ǘ', 'ǚ', 'ǜ', 'ü'],
}

// Eine nummerische Silbe (z. B. "bing3", "lu:4", "er") → Tonzeichen
function silbeMitTon(silbe) {
  const m = silbe.match(/^([a-zA-ZüÜ:]+?)([1-5])?$/)
  if (!m) return silbe
  let [, kern, ton] = m
  kern = kern.replace(/u:/g, 'ü').replace(/U:/g, 'Ü').replace(/v/g, 'ü')
  const t = ton ? +ton : 5
  if (t === 5) return kern // neutraler Ton: keine Markierung
  // Tonträger bestimmen: a/e zuerst; sonst o in „ou"; sonst letzter Vokal
  const lower = kern.toLowerCase()
  let pos = -1
  if (lower.includes('a')) pos = lower.indexOf('a')
  else if (lower.includes('e')) pos = lower.indexOf('e')
  else if (lower.includes('ou')) pos = lower.indexOf('o')
  else {
    for (let i = lower.length - 1; i >= 0; i--) if ('aeiouü'.includes(lower[i])) { pos = i; break }
  }
  if (pos < 0) return kern
  const v = lower[pos]
  const ersetzt = VOKAL_TON[v]?.[t - 1]
  if (!ersetzt) return kern
  return kern.slice(0, pos) + ersetzt + kern.slice(pos + 1)
}

function pinyinSchoen(roh) {
  return roh.trim().split(/\s+/).map(silbeMitTon).join('')
}

function bedeutungSaeubern(roh) {
  return roh
    .replace(/\(u\.E\.\)/g, '') // „unbestätigter Eintrag" – für Lernende Rauschen
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([,;)])/g, '$1')
    .trim()
}

const quelle = process.argv[2] || '/tmp/handedict_nb.u8'
const text = readFileSync(quelle, 'utf8')
const woerterbuch = {}
let zeilen = 0

for (const zeile of text.split('\n')) {
  if (!zeile || zeile.startsWith('#')) continue
  const m = zeile.match(/^(\S+)\s+(\S+)\s+\[([^\]]*)\]\s+\/(.+)\/\s*$/)
  if (!m) continue
  const [, , simp, py, rest] = m
  const bedeutungen = rest.split('/').map(bedeutungSaeubern).filter(Boolean)
  if (!bedeutungen.length) continue
  // höchstens 4 Sinne je Eintrag, jeder gekürzt – hält die Datei kompakt
  const text2 = bedeutungen.slice(0, 4).join('; ').slice(0, 180)
  const eintrag = [pinyinSchoen(py), text2]
  ;(woerterbuch[simp] ||= []).push(eintrag)
  zeilen++
}

// Pro Stichwort höchstens 3 Lesarten behalten
for (const k of Object.keys(woerterbuch)) {
  if (woerterbuch[k].length > 3) woerterbuch[k] = woerterbuch[k].slice(0, 3)
}

const ziel = new URL('../public/handedict.json', import.meta.url)
const json = JSON.stringify(woerterbuch)
writeFileSync(ziel, json)
console.log(`HanDeDict: ${zeilen} Einträge → ${Object.keys(woerterbuch).length} Stichwörter, ${(json.length / 1e6).toFixed(1)} MB JSON`)
