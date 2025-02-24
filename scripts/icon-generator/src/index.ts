import { createCanvas } from 'canvas'
import { writeFileSync } from 'fs'
import { resolve } from 'path'

// アイコンのサイズ定義
const SIZES = {
  icon: 1024,
  adaptiveIcon: 108,
  favicon: 192,
  splashIcon: 2048,
} as const

/**
 * 指定されたサイズでアイコンを生成する
 * @param size キャンバスのサイズ
 * @returns 生成された画像のバッファ
 */
async function generateIcon(size: number): Promise<Buffer> {
  const canvas = createCanvas(size, size)
  const ctx = canvas.getContext('2d')
  const padding = size * 0.1 // 10%のパディング
  const width = size - padding * 2
  const height = size * 0.6 // 高さは60%

  // 背景を白で塗りつぶす（角丸）
  ctx.fillStyle = '#FFFFFF'
  ctx.beginPath()
  ctx.roundRect(0, 0, size, size, size * 0.2)
  ctx.fill()

  // 影の設定
  ctx.shadowColor = 'rgba(0, 0, 0, 0.2)'
  ctx.shadowBlur = size * 0.05
  ctx.shadowOffsetY = size * 0.02

  // パンの色
  ctx.fillStyle = '#F5D0A9'

  // 上部のパン
  ctx.beginPath()
  ctx.moveTo(padding, size * 0.3)
  ctx.quadraticCurveTo(size / 2, size * 0.2, size - padding, size * 0.3)
  ctx.lineTo(size - padding, size * 0.35)
  ctx.lineTo(padding, size * 0.35)
  ctx.closePath()
  ctx.fill()

  // 具材を描画（より鮮やかな色に）
  const ingredients = [
    { color: '#A1887F', height: 0.08 }, // 肉
    { color: '#66BB6A', height: 0.06 }, // レタス
    { color: '#EF5350', height: 0.06 }, // トマト
    { color: '#FFEE58', height: 0.06 }, // 玉ねぎ
  ]

  let currentY = size * 0.35
  ingredients.forEach(({ color, height }) => {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.roundRect(padding, currentY, width, size * height, size * 0.02)
    ctx.fill()
    currentY += size * height
  })

  // 下部のパン
  ctx.fillStyle = '#F5D0A9'
  ctx.beginPath()
  ctx.moveTo(padding, currentY)
  ctx.lineTo(size - padding, currentY)
  ctx.lineTo(size - padding, currentY + size * 0.05)
  ctx.quadraticCurveTo(size / 2, currentY + size * 0.15, padding, currentY + size * 0.05)
  ctx.closePath()
  ctx.fill()

  return canvas.toBuffer('image/png')
}

/**
 * 指定されたパスにアイコンを保存する
 * @param buffer 画像バッファ
 * @param filename 保存するファイル名
 */
function saveIcon(buffer: Buffer, filename: string): void {
  const path = resolve(process.cwd(), 'assets', filename)
  writeFileSync(path, buffer)
  console.log(`Generated: ${path}`)
}

async function main() {
  try {
    // 各サイズのアイコンを生成
    const iconBuffer = await generateIcon(SIZES.icon)
    const adaptiveIconBuffer = await generateIcon(SIZES.adaptiveIcon)
    const faviconBuffer = await generateIcon(SIZES.favicon)
    const splashIconBuffer = await generateIcon(SIZES.splashIcon)

    // 生成したアイコンを保存
    saveIcon(iconBuffer, 'icon.png')
    saveIcon(adaptiveIconBuffer, 'adaptive-icon.png')
    saveIcon(faviconBuffer, 'favicon.png')
    saveIcon(splashIconBuffer, 'splash-icon.png')

    console.log('All icons generated successfully! 🎉')
  } catch (error) {
    console.error('Error generating icons:', error)
    process.exit(1)
  }
}

main()
