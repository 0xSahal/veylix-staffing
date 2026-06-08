import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.join(__dirname, '../public/images/companies')
const TARGET_HEIGHT = 96
const USER_AGENT = 'VeylixStaffing/1.0 (logo asset script)'

/** @type {{ file: string, source: 'simpleicons' | 'wikimedia', id: string }}[]} */
const COMPANIES = [
  { file: 'infosys.webp', source: 'simpleicons', id: 'infosys' },
  { file: 'accenture.webp', source: 'simpleicons', id: 'accenture' },
  { file: 'capgemini.webp', source: 'wikimedia', id: 'Capgemini_201x_logo.svg' },
  { file: 'cvs-health.webp', source: 'wikimedia', id: 'CVS_Health_logo.svg' },
  { file: 'dell.webp', source: 'simpleicons', id: 'dell' },
  { file: 'comcast.webp', source: 'wikimedia', id: 'Comcast_Logo.svg' },
  { file: 'wipro.webp', source: 'simpleicons', id: 'wipro' },
  { file: 'amazon.webp', source: 'simpleicons', id: 'amazon' },
  { file: 'salesforce.webp', source: 'simpleicons', id: 'salesforce' },
  { file: 'meta.webp', source: 'simpleicons', id: 'meta' },
  { file: 'walmart.webp', source: 'simpleicons', id: 'walmart' },
  { file: 'oracle.webp', source: 'wikimedia', id: 'Oracle_logo.svg' },
]

async function fetchSimpleIconsSvg(slug) {
  const url = `https://cdn.jsdelivr.net/npm/simple-icons@14/icons/${slug}.svg`
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } })
  if (!res.ok) throw new Error(`simpleicons ${slug}: HTTP ${res.status}`)
  return Buffer.from(await res.arrayBuffer())
}

async function fetchWikimediaSvg(filename) {
  const api =
    'https://commons.wikimedia.org/w/api.php?action=query&titles=' +
    encodeURIComponent(`File:${filename}`) +
    '&prop=imageinfo&iiprop=url&format=json'
  const res = await fetch(api, { headers: { 'User-Agent': USER_AGENT } })
  if (!res.ok) throw new Error(`wikimedia api ${filename}: HTTP ${res.status}`)
  const json = await res.json()
  const page = Object.values(json.query.pages)[0]
  const imageUrl = page.imageinfo?.[0]?.url
  if (!imageUrl) throw new Error(`wikimedia ${filename}: no url`)
  const imgRes = await fetch(imageUrl, { headers: { 'User-Agent': USER_AGENT } })
  if (!imgRes.ok) throw new Error(`wikimedia file ${filename}: HTTP ${imgRes.status}`)
  return Buffer.from(await imgRes.arrayBuffer())
}

async function toWebp(inputBuffer, outPath) {
  const png = await sharp(inputBuffer, { density: 300 }).png().toBuffer()
  const meta = await sharp(png).metadata()
  const width = Math.max(1, Math.round((meta.width / meta.height) * TARGET_HEIGHT))

  await sharp(png)
    .resize(width, TARGET_HEIGHT, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .webp({ quality: 90 })
    .toFile(outPath)

  return { width, height: TARGET_HEIGHT }
}

await fs.mkdir(OUT_DIR, { recursive: true })

for (const company of COMPANIES) {
  const outPath = path.join(OUT_DIR, company.file)
  try {
    const buf =
      company.source === 'simpleicons'
        ? await fetchSimpleIconsSvg(company.id)
        : await fetchWikimediaSvg(company.id)
    const dims = await toWebp(buf, outPath)
    console.log(`OK ${company.file} (${dims.width}x${dims.height})`)
  } catch (err) {
    console.error(`FAIL ${company.file}:`, err.message)
    process.exitCode = 1
  }
}
