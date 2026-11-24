import {
  ShaderMount,
  imageDitheringFragmentShader,
  DitheringTypes,
  ShaderFitOptions,
  getShaderColorFromString,
} from "@paper-design/shaders"

// Dithered version of a post cover, shown on hover and keyboard focus.
// The shader is only created the first time a cover is hovered or focused.
//
// The shader itself is static, so the motion comes from driving its uniforms:
// the grain resolves from coarse to fine, then the image slowly breathes under
// the fixed pixel grid, which makes the dots crawl.
const GRAIN = 2 // resting pixel size of the dither grid
const GRAIN_START = 12 // pixel size the resolve starts from
const RESOLVE_MS = 400
const BREATHE_MS = 5000
const BREATHE_AMOUNT = 0.06 // extra zoom at the peak of the breath
const FRAME_MS = 1000 / 12 // low frame rate on purpose: stepped, not smooth

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)")

const uniforms = (image) => ({
  u_image: image,
  u_originalColors: true,
  u_type: DitheringTypes["4x4"],
  u_pxSize: GRAIN,
  u_colorSteps: 3,
  u_inverted: false,
  u_colorFront: getShaderColorFromString("#ffffff"),
  u_colorBack: getShaderColorFromString("#0b0b0b"),
  u_colorHighlight: getShaderColorFromString("#fb29fb"),
  u_fit: ShaderFitOptions.cover,
  u_scale: 1,
  u_rotation: 0,
  u_originX: 0.5,
  u_originY: 0.5,
  u_offsetX: 0,
  u_offsetY: 0,
  u_worldWidth: 0,
  u_worldHeight: 0,
})

class CoverDither {
  constructor(cover) {
    this.cover = cover
    this.active = false
  }

  async start() {
    this.active = true
    this.mount ??= await this.createMount()
    if (!this.mount || !this.active || this.rafId) return

    if (reducedMotion.matches) {
      this.mount.setUniforms({ u_pxSize: GRAIN, u_scale: 1 })
      return
    }

    this.startedAt = performance.now()
    this.lastFrameAt = 0
    this.rafId = requestAnimationFrame(this.tick)
  }

  stop() {
    this.active = false
    cancelAnimationFrame(this.rafId)
    this.rafId = null
  }

  tick = (now) => {
    this.rafId = requestAnimationFrame(this.tick)
    if (now - this.lastFrameAt < FRAME_MS) return
    this.lastFrameAt = now

    const elapsed = now - this.startedAt
    const resolve = Math.min(elapsed / RESOLVE_MS, 1)
    const breath = (1 - Math.cos((elapsed / BREATHE_MS) * 2 * Math.PI)) / 2

    this.mount.setUniforms({
      u_pxSize: Math.round(GRAIN_START + (GRAIN - GRAIN_START) * resolve),
      u_scale: 1 + BREATHE_AMOUNT * breath,
    })
  }

  async createMount() {
    const image = new Image()
    image.src = this.cover.dataset.cover
    try {
      await image.decode()
      return new ShaderMount(this.cover, imageDitheringFragmentShader, uniforms(image), undefined, 0)
    } catch {
      // No WebGL or the image failed: the plain cover stays as it is.
      return null
    }
  }
}

for (const link of document.querySelectorAll(".list-item a")) {
  const cover = link.querySelector("[data-cover]")
  if (!cover) continue

  const dither = new CoverDither(cover)
  link.addEventListener("pointerenter", () => dither.start())
  link.addEventListener("focus", () => dither.start())
  link.addEventListener("pointerleave", () => dither.stop())
  link.addEventListener("blur", () => dither.stop())
}
