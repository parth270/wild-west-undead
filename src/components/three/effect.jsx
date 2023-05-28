import { EffectComposer, SSR, Bloom, LUT } from '@react-three/postprocessing'

export default function Effects() {
  return (
    enabled && (
      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={0.5} mipmapBlur luminanceSmoothing={0} intensity={1.5} />
        {/* <LUT lut={texture} /> */}
      </EffectComposer>
    )
  )
}
