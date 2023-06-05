import useWindowWidth from '../../hooks/useWidth'
import { setFirst } from '../../services/modeling'
import { Power4, gsap } from 'gsap'
import React, { useEffect, useRef, useState } from 'react'
import { Tween } from 'react-gsap'
import { useDispatch, useSelector } from 'react-redux'

const url1 = 'https://wallpaperaccess.com/full/2129417.jpg'
const url2 =
  'https://c4.wallpaperflare.com/wallpaper/389/856/997/zombie-wallpaper-preview.jpg'
const url3 =
  'https://w0.peakpx.com/wallpaper/88/1024/HD-wallpaper-dark-zombie-cowboy-western.jpg'
const url4 = 'https://images.alphacoders.com/976/thumb-1920-976234.png'
const url5 = 'https://images7.alphacoders.com/942/942464.jpg'

const Title = ({ children, right }) => {
  const [hover, setHover] = useState(false)

  return (
    <div
      style={{
        right: right,
      }}
      onMouseOver={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
      className='cowboy uppercase absolute top-[10px] text-[#fff] text-[24px]  cursor-pointer  tracking-[1px]'>
      {children}
      <div
        style={{
          width: !hover ? '0px' : '100%',
        }}
        className='absolute duration-200 h-[3px]  bg-[#fff]'></div>
    </div>
  )
}

const Text = ({ children }) => {
  const [hover, setHover] = useState(false)

  return (
    <div
      onMouseOver={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
      className='cowboy text-[#000] uppercase mb-[15px] text-[45px]  cursor-pointer hover:underline underline-offset-6  tracking-[2px]'>
      {children}
    </div>
  )
}

const MenuItems = ({ trans }) => {
  const ref = useRef()
  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0 },
      {
        opacity: trans ? 1 : 0,
        delay: 0.3,
      }
    )
  }, [trans])
  return (
    <div className='w-[100%] h-[100%] px-[40px] py-[40px]  ' ref={ref}>
      <Text>Section-1</Text>
      <Text>Section-2</Text>
      <Text>Section-3</Text>
    </div>
  )
}

const Menu = () => {
  const [clicked, setClicked] = useState(false)
  const [trans, setTrans] = useState(false)
  return (
    <div
      style={{
        width: clicked ? '300px' : '40px',
        height: clicked ? 'calc(100% - 80px)' : '40px',
        borderRadius: clicked ? '20px' : '10px',
        zIndex: 999999999,
      }}
      className='bg-[#fff] cursor-pointer duration-300 absolute bottom-[40px] left-[40px] '>
      {' '}
      {clicked && <MenuItems trans={clicked} />}
      <div
        className='w-[40px] h-[40px] absolute bottom-0 left-0 flex items-center justify-center'
        onClick={() => {
          if (clicked) {
            setClicked(false)
          } else {
            setClicked(true)
            setTrans(true)
          }
        }}>
        {clicked ? (
          <img src='/close.svg' className='w-[24px] h-[24px]' alt='' />
        ) : (
          <img src='/menu.svg' className='w-[16px] h-[16px]' alt='' />
        )}
      </div>
    </div>
  )
}

const Intro = () => {
  const [hover, setHover] = useState(false)
  const [click, setClick] = useState(false)
  const dispatch = useDispatch()
  const state = useSelector((state) => state.model)
  const width = useWindowWidth()
  const isMobile = width <= 450
  const isTablet = width <= 1020 // Adjust the threshold value as needed
  console.log(width)

  const [isLandscape, setIsLandscape] = useState(
    window.matchMedia('(orientation: landscape)').matches
  )

  useEffect(() => {
    const handleOrientationChange = (event) => {
      setIsLandscape(event.matches)
    }

    const mediaQuery = window.matchMedia('(orientation: landscape)')
    mediaQuery.addEventListener('change', handleOrientationChange)

    return () => {
      mediaQuery.removeEventListener('change', handleOrientationChange)
    }
  }, [])

  const splashImageSrc = isMobile
    ? '/MobileSplashImage.jpg' // Mobile image source
    : isTablet
    ? '/SplashImage.jpg' // Tablet image source
    : '/SplashImage.jpg' // Default image source

  return (
    <>
      <div className='w-[100%] h-[100vh] relative bg-[#17191c]'>
        {width !== 0 && (
          <>
            {isLandscape ? (
              <img
                src={splashImageSrc}
                className='w-[100%] h-[100vh] absolute z-10 object-top '
                alt=''
              />
            ) : (
              <img
                src={splashImageSrc}
                className='w-[100%] h-[100vh] absolute z-10 object-cover '
                alt=''
              />
            )}

            {click && (
              <Tween
                from={{
                  clipPath: 'inset(0px 0vw 100vh 0px)',
                }}
                to={{
                  clipPath: 'inset(0px 0vw 0vh 0px)',
                  // clipPath: !showed ? "inset(0px 100% 0px 1px)" : "inset(0px 0px 0% 1px)",
                }}
                duration={1.7}
                ease={Power4.easeInOut}>
                <div className=' fixed w-[100%] h-[100vh] bg-[#17191c] z-50'></div>
              </Tween>
            )}
            <div className='w-[100%] h-[100vh] top-0 absolute z-20 flex '>
              <Title right={isMobile ? '20px' : '80px'}>Blackjack</Title>
              <Title right={isMobile ? '140px' : '220px'}>About Us</Title>
              <Menu />
            </div>
            <div className='w-[100vw] h-[100vh] absolute  z-20 flex flex-col items-center justify-around '>
              <div className='w-[2rem] h-[8rem] sm:h-[14rem] xl:h-[30rem]  bg-transparent '></div>

              {isLandscape ? (
                <img src={'/logo.png'} className='w-[40vw]' />
              ) : (
                <img
                  src={'/logo.png'}
                  className='w-[80vw] md:w-[50vw] lg:w-[30vw]'
                />
              )}

              <h1 className='cursor-pointer mb-10 border-2 border-white flex  items-center justify-center  text-center  bg-[#00000030] backdrop-blur-[5px] rounded-[5px] px-[3rem] pt-[1rem]  cowboy uppercase text-[70px] select-none tracking-[2px]'>
                <div
                  className='text-[#fff]'
                  onClick={() => {
                    setClick(true)
                    setTimeout(() => {
                      dispatch(setFirst())
                    }, 1700)
                  }}
                  onMouseOver={() => {
                    setHover(true)
                  }}
                  onMouseLeave={() => {
                    setHover(false)
                  }}>
                  Enter
                </div>
              </h1>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Intro
