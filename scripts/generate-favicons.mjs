import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'
import toIco from 'to-ico'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const source = path.join(root, 'public/icon/favicon-source.png')

const SIZES = {
  icon: 96,
  apple: 180,
  ico: [16, 32, 48],
}

async function squarePng(size) {
  return sharp(source)
    .resize(size, size, {
      fit: 'cover',
      position: 'centre',
    })
    .png({ compressionLevel: 9 })
    .toBuffer()
}

async function main() {
  const appDir = path.join(root, 'src/app')

  await mkdir(appDir, { recursive: true })

  const iconPng = await squarePng(SIZES.icon)
  const applePng = await squarePng(SIZES.apple)
  const icoPngs = await Promise.all(SIZES.ico.map((size) => squarePng(size)))

  const ico = await toIco(icoPngs)

  await writeFile(path.join(appDir, 'icon.png'), iconPng)
  await writeFile(path.join(appDir, 'apple-icon.png'), applePng)
  await writeFile(path.join(appDir, 'favicon.ico'), ico)

  console.log('Generated favicons:')
  console.log(`  src/app/icon.png (${SIZES.icon}x${SIZES.icon})`)
  console.log(`  src/app/apple-icon.png (${SIZES.apple}x${SIZES.apple})`)
  console.log('  src/app/favicon.ico')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
