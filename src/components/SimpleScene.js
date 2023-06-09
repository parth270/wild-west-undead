import React, {
  useState,
  useEffect,
  Suspense,
  useRef,
  useMemo,
  useCallback,
  useTransition,
} from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  OrbitControls,
  ScrollControls,
  Sky,
  Stars,
  useScroll,
  Gltf,
  useGLTF,
  useProgress,
  Environment,
  Text,
  MeshDistortMaterial,
  useFont,
} from '@react-three/drei'
import { EffectComposer, Noise } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

import { gsap } from 'gsap'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import WildWestTown from './animations/Environment/WildWestTown'
import { useDispatch } from 'react-redux'
import { setLoading, setProgress } from '../services/three'
import { setAppear } from '../services/modeling'
import * as THREE from 'three'
import { getProject, val } from '@theatre/core'
import flyThroughState from './animations/fly-2.json'

import {
  editable as e,
  SheetProvider,
  PerspectiveCamera,
  useCurrentSheet,
} from '@theatre/r3f'

import {
  AniDivScene1,
  AniDivScene2,
  AniDivScene3,
} from './animations/AnimatedUI/AniDiv'
import TargetModel from './animations/AnimatedUI/TargetModel'
import Night from './three/night'
import { useControls } from 'leva'

import { Perf } from 'r3f-perf'

const Loader = () => {
  const { progress } = useProgress()
  const dispatch = useDispatch()
  useEffect(() => {
    console.log(progress, 'please checl jere')
    if (Number(progress) === 100) {
      dispatch(setProgress(progress))
      dispatch(setLoading(false))
      setTimeout(() => {
        dispatch(setAppear(false))
      }, 2200)
    } else {
      dispatch(setProgress(progress))
    }
  }, [progress])

  return <></>
}

// function SceneContainer1() {
//   const [isLoading, setIsLoading] = useState(true)
//   const [darkMode, setDarkMode] = useState(true)
//   const dispatch = useDispatch()

//   useEffect(() => {
//     dispatch(setLoading(true))
//     const loader = new GLTFLoader()
//     // loader.load('/assets/wildwest.glb', () => on{
//     loader.load(
//       '/assets/west2.glb',
//       () => {
//         setIsLoading(false)
//         dispatch(setLoading(false))
//         console.log('loading done')
//       },
//       (xhr) => {
//         // Handle loading progress
//         if (xhr.total !== undefined && !isNaN(xhr.total)) {
//           const percent = (xhr.loaded / 58955924) * 100
//           if (percent > 91) {
//             dispatch(setAppear(false))
//           }
//           dispatch(setProgress(percent))
//         }
//       }
//     )
//   }, [])

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode)
//   }

//   const sunPosition = darkMode ? [-10, -5, -10] : [0, 5, 10]
//   const ambientIntensity = darkMode ? 0.2 : 0.5
//   const pointIntensity = darkMode ? 0.5 : 1

//   return (
//     <>
//       <Canvas
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '100%',
//           visibility: isLoading ? 'hidden' : 'visible',
//         }}
//         camera={{
//           position: [
//             3.9479041635965753, 0.26197944185608685, 0.925540284346887,
//           ],
//           fov: 45,
//           rotation: [
//             -0.18609595831966416, 1.212166096261143, 0.1745029850442543,
//           ],
//         }}>
//         <Sky sunPosition={sunPosition} />
//         <Stars />
//         <ambientLight intensity={ambientIntensity} />
//         <pointLight position={[10, 10, 10]} intensity={pointIntensity} />
//         <Suspense fallback={null}>
//           <WildWestTown />
//           <mesh onClick={toggleDarkMode} position={[0, 1, -5]}>
//             <boxBufferGeometry args={[1, 1, 1]} />
//             <meshStandardMaterial color={darkMode ? 'gray' : 'blue'} />
//           </mesh>
//         </Suspense>
//         <OrbitControls />
//       </Canvas>
//     </>
//   )
// }
function Scene({}) {
  const [isInPositionScene1, setIsInPositionScene1] = useState(false)
  const [showAniDiv, setShowAniDiv] = useState(false)
  const [showAniDivScene1, setShowAniDivScene1] = useState(false)
  const [showAniDivScene2, setShowAniDivScene2] = useState(false)
  const [showAniDivScene3, setShowAniDivScene3] = useState(false)
  const ref = useRef()

  const handleAniDivS1 = useCallback(() => {
    setShowAniDiv(true)
    setShowAniDivScene1(true)
    setShowAniDivScene2(false)
    setShowAniDivScene3(false)
  }, [])

  const handleAniDivS2 = useCallback(() => {
    setShowAniDiv(true)
    setShowAniDivScene1(false)
    setShowAniDivScene2(true)
    setShowAniDivScene3(false)
  }, [])

  const handleAniDivS3 = useCallback(() => {
    setShowAniDiv(true)
    setShowAniDivScene1(false)
    setShowAniDivScene2(false)
    setShowAniDivScene3(true)
  }, [])

  const handleCloseAniDiv = useCallback(() => {
    setShowAniDiv(false)
    setShowAniDivScene1(false)
    setShowAniDivScene2(false)
    setShowAniDivScene3(false)
  }, [])

  const sheet = useMemo(
    () =>
      getProject('Fly Through-1', { state: flyThroughState }).sheet('Scene'),
    []
  )

  return (
    <>
      <Canvas
        ref={ref}
        className='canvas-container'
        id='canvas-222'
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#41100e',
          // visibility: isLoading ? "hidden" : "visible",
        }}>
        <Perf />
        <ScrollControls pages={28}>
          <SheetProvider sheet={sheet}>
            <SceneContainer
              isInPositionScene1={isInPositionScene1}
              setIsInPositionScene1={setIsInPositionScene1}
              showAniDiv={showAniDiv}
              setShowAniDiv={setShowAniDiv}
              handleAniDivS1={handleAniDivS1}
              handleAniDivS2={handleAniDivS2}
              handleAniDivS3={handleAniDivS3}
            />
          </SheetProvider>
        </ScrollControls>
      </Canvas>
      {showAniDiv && showAniDivScene1 && (
        <AniDivScene1 setShowAniDiv={setShowAniDiv} />
      )}
      {showAniDiv && showAniDivScene2 && (
        <AniDivScene2 setShowAniDiv={setShowAniDiv} />
      )}
      {showAniDiv && showAniDivScene3 && (
        <AniDivScene3 setShowAniDiv={setShowAniDiv} />
      )}

      {/* Render AniDiv only when showAniDiv is true */}
    </>
  )
}

// const scroll = useScroll();

// function logCurrentPage() {
//   const currentPage = Math.floor(scroll.offset * scroll.pages) + 1;

//   console.log("Current Page:", currentPage);
// }

//
//
//
//

function Env() {
  return <Environment preset={'night'} blur={0.65} />
}

function SceneContainer({
  isInPositionScene1,
  setIsInPositionScene1,
  isInPositionScene2,
  setIsInPositionScene2,
  showAniDiv,

  handleAniDivS1,
  handleAniDivS2,
  handleAniDivS3,
}) {
  const sheet = useCurrentSheet()
  const scroll = useScroll()

  //  State to track whether AniDiv should be shown

  // const handleTargetClick = () => {
  //   setShowAniDiv(true)
  // }

  const [played, setPlayed] = useState(true)

  //
  //
  // ****************************
  // *****************AUDIO
  // ****************************
  // useEffect(() => {
  //   const audio = new Audio('/terror.mp3')

  //   const handleScroll = () => {
  //     console.log('playing')
  //     audio.loop = true // Enable looping
  //     audio.play().catch((error) => {
  //       // Handle playback error if necessary
  //       console.error('Error playing audio:', error)
  //     })
  //   }

  //   const adding = () => {
  //     if (played) {
  //       handleScroll()
  //       setPlayed(false)
  //     }
  //   }

  //   document.addEventListener('wheel', adding, false)

  //   return () => {
  //     document.removeEventListener('wheel', adding, false)
  //     if (audio) {
  //       audio.pause()
  //       audio.currentTime = 0
  //     }
  //   }
  // }, [])
  //
  //
  //
  //
  //

  const sequenceLength = val(sheet.sequence.pointer.length)

  useFrame(() => {
    if (scroll) {
      logCurrentPage(scroll)

      sheet.sequence.position = scroll.offset * sequenceLength
    }
  })

  function logCurrentPage(scroll) {
    const currentPage = Math.floor(scroll.offset * scroll.pages) + 1
    console.log('Current Page:', currentPage)

    // if (currentPage === 0 || currentPage === 1) {
    //   setIsInPositionScene1(true)
    // } else {
    //   setIsInPositionScene1(false)
    // }

    setIsInPositionScene1(currentPage <= 1)
  }

  const bgColor = '#84a4f4'

  const [isLoading, setIsLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const dispatch = useDispatch()

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const sunPosition = darkMode ? [-10, -5, -10] : [0, 5, 10]
  const ambientIntensity = darkMode ? 0.2 : 0.5
  const pointIntensity = darkMode ? 0.5 : 1

  //
  // ********************
  // *** 3D UI ANIMATION LOGIC
  // ********************
  //
  const groupRef = useRef(null)

  useEffect(() => {
    // Animate the group scale based on the state value
    gsap.to(groupRef.current.scale, {
      x: isInPositionScene1 ? 1 : 0,
      y: isInPositionScene1 ? 1 : 0,
      z: isInPositionScene1 ? 1 : 0,
      duration: 0.75, // Set the duration of the animation
    })

    gsap.to(groupRef.current.position, {
      y: isInPositionScene1 ? 0 : +0.9, // Set the Y position to move up or down
      duration: 0.5, // Set the duration of the position animation
    })
  }, [isInPositionScene1])
  //

  //
  //

  return (
    <>
      <EffectComposer>
        <Noise premultiply blendFunction={BlendFunction.ADD} />
      </EffectComposer>
      <Stars />
      <Night />
      <Night />
      <ambientLight intensity={ambientIntensity} />
      <pointLight position={[10, 10, 10]} intensity={pointIntensity} />
      <Suspense fallback={<Loader />}>
        <WildWestTown />
        <mesh onClick={toggleDarkMode} position={[0, 1, -5]}>
          <boxBufferGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={darkMode ? 'gray' : 'blue'} />
        </mesh>
      </Suspense>
      {/* <Environment files="/f1.hdr"  /> */}
      {/* <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/industrial_workshop_foundry_1k.hdr" near={100} /> */}
      <PerspectiveCamera
        theatreKey='Camera'
        makeDefault
        position={[0, 0, 0]}
        fov={90}
        near={0.1}
        far={70}
      />

      <group ref={groupRef}>
        <mesh>
          <TargetModel
            position={[2.99, 0.18, 1]}
            rotation={[0, 0, 0]}
            onClick={handleAniDivS1}
          />

          <group>
            <Text
              // font='../Cowboy_Movie.woff'   DOESN'T MAP THE MESH
              font='./Merriweather-Regular.ttf'
              position={[3, 0.2, 0.85]}
              rotation={[0, 1.18, 0]}
              scale={0.04}>
              Upper Text
            </Text>
            <Text
              position={[2.8, 0.21, 0.73]}
              rotation={[0, 1.18, 0]}
              scale={0.02}>
              Lower Text, there will be more text {'\n'}and the amount of text
              will determine {'\n'}our xyz coordinates
            </Text>
          </group>
        </mesh>
      </group>

      {/* <TargetModel
        position={[2.96, 0.2, 0.81]}
        rotation={[0, 0, 0]}
        onClick={handleAniDivS2}
      /> */}
      {/* <TargetModel
        position={[3.1, 0.15, 0.71]}
        rotation={[0, 0, 0]}
        onClick={handleAniDivS3}
      /> */}
    </>
  )
}

export default Scene
