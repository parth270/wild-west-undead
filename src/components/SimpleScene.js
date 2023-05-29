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
} from '@react-three/drei'
import LoadingScreen from './Layout/LoadingScreen'
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
  const [isInPosition, setIsInPosition] = useState(false)
  const [showAniDiv, setShowAniDiv] = useState(false)
  const [showAniDivScene1, setShowAniDivScene1] = useState(false)
  const [showAniDivScene2, setShowAniDivScene2] = useState(false)
  const [showAniDivScene3, setShowAniDivScene3] = useState(false)
  const ref = useRef()

  const handleAniDivS1 = () => {
    setShowAniDiv(true)
    setShowAniDivScene1(true)
    setShowAniDivScene2(false)
    setShowAniDivScene3(false)
  }

  const handleAniDivS2 = () => {
    setShowAniDiv(true)
    setShowAniDivScene1(false)
    setShowAniDivScene2(true)
    setShowAniDivScene3(false)
  }

  const handleAniDivS3 = () => {
    setShowAniDiv(true)
    setShowAniDivScene1(false)
    setShowAniDivScene2(false)
    setShowAniDivScene3(true)
  }

  const handleCloseAniDiv = () => {
    setShowAniDiv(false)
    setShowAniDivScene1(false)
    setShowAniDivScene2(false)
    setShowAniDivScene3(false)
  }

  // useEffect(() => {
  //   const canvas = document.getElementById("canvas-222");
  //   // canvas.children[0].children[1].children[1].style.height="15000px"
  //   setTimeout(() => {
  //     if (canvas) {
  //       canvas.children[0].children[1].children[1].style.height = "15000px";
  //       console.log(canvas.children[0].children[1].children[1], "check here!");
  //     }
  //   }, 10000);
  // });
  const sheet = getProject('Fly Through-1', { state: flyThroughState }).sheet(
    'Scene'
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
        <ScrollControls pages={28}>
          <SheetProvider sheet={sheet}>
            <SceneContainer
              isInPosition={isInPosition}
              setIsInPosition={setIsInPosition}
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
  isInPosition,
  setIsInPosition,
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

  useEffect(() => {
    const audio = new Audio('/terror.mp3')

    const handleScroll = () => {
      console.log('playing')
      audio.loop = true // Enable looping
      audio.play().catch((error) => {
        // Handle playback error if necessary
        console.error('Error playing audio:', error)
      })
    }

    const adding = () => {
      if (played) {
        handleScroll()
        setPlayed(false)
      }
    }

    document.addEventListener('wheel', adding, false)

    return () => {
      document.removeEventListener('wheel', adding, false)
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }
    }
  }, [])

  // our callback will run on every animation frame
  useFrame(() => {
    if (scroll) {
      logCurrentPage(scroll)
      const sequenceLength = val(sheet.sequence.pointer.length)
      sheet.sequence.position = scroll.offset * sequenceLength
    }
  })

  function logCurrentPage(scroll) {
    const currentPage = Math.floor(scroll.offset * scroll.pages) + 1
    console.log('Current Page:', currentPage)

    if (currentPage === 5) {
      setIsInPosition(true)
    } else {
      setIsInPosition(false)
    }
  }

  const bgColor = '#84a4f4'

  const [isLoading, setIsLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(setLoading(true))
  //   const loader = new GLTFLoader()
  //   loader.load(
  //     '/assets/wwu3d.glb',
  //     () => {
  //       setIsLoading(false)
  //       dispatch(setLoading(false))
  //       setTimeout(() => {
  //         dispatch(setAppear(false))
  //       }, 2200)
  //     },
  //     (xhr) => {
  //       // Handle loading progress
  //       if (xhr.total !== undefined && !isNaN(xhr.total)) {
  //         const percent = (xhr.loaded / 100234164) * 100
  //         dispatch(setProgress(percent))
  //         // console.log(xhr.loaded, xhr.total);
  //       }
  //     }
  //   )
  // }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const sunPosition = darkMode ? [-10, -5, -10] : [0, 5, 10]
  const ambientIntensity = darkMode ? 0.2 : 0.5
  const pointIntensity = darkMode ? 0.5 : 1

  return (
    <>
      {/* <Sky sunPosition={sunPosition} /> */}
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

      <TargetModel
        position={[2.99, 0.18, 1]}
        rotation={[0, 0, 0]}
        onClick={handleAniDivS1}
      />
      <TargetModel
        position={[2.96, 0.2, 0.81]}
        rotation={[0, 0, 0]}
        onClick={handleAniDivS2}
      />
      <TargetModel
        position={[3.1, 0.15, 0.71]}
        rotation={[0, 0, 0]}
        onClick={handleAniDivS3}
      />
    </>
  )
}

export default Scene
