import { Power4 } from "gsap";
import { gsap } from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { Tween } from "react-gsap";
import { useSelector } from "react-redux";
import Vids from "./vids";

const url = "/thunder.mp3";
const AudioPlayer = () => {
  useEffect(() => {
    document.getElementById("none").click();
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    const playAudio = async () => {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      const sourceNode = audioContext.createBufferSource();
      sourceNode.buffer = audioBuffer;
      sourceNode.connect(audioContext.destination);
      sourceNode.start();
    };

    playAudio();

    // Clean up the audio context when the component unmounts
    return () => {
      audioContext.close();
    };
  }, []);

  return (
    <>
      <button
        id="none"
        style={{ width: 0, height: 0, display: "none" }}
      ></button>
    </>
  );
};

const Loader = ({ children }) => {
  const ref1 = useRef();

  const transition = {
    duration: 5,
    from: 0,
    to: 1,
  };

  React.useEffect(() => {
    gsap.to(ref1.current, {
      keyframes: [{ opacity: transition.from }, { opacity: transition.to }],
      duration: transition.duration,
      repeat: -1,
      delay: 5,
      ease: Power4.easeOut,
    });
  }, []);

  const state = useSelector((state) => state.three);
  const { appear } = useSelector((state) => state.model);
  // console.log(state.progress);

  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prevCount) => (prevCount % 3) + 1);
    }, 400);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {appear && (
        <Tween
          from={{
            clipPath: "inset(0px 0vw 0vh 0px)",
          }}
          to={{
            clipPath: state.loading
              ? "inset(0px 0px 0% 0px)"
              : "inset(0px 0vw 100vh 0px)",
            // clipPath: !showed ? "inset(0px 100% 0px 1px)" : "inset(0px 0px 0% 1px)",
          }}
          duration={1.7}
          ease={Power4.easeInOut}
        >
          <div
            className="fixed w-full h-[100vh] top-0 left-0 flex flex-col justify-center items-center"
            style={{
              zIndex: 9999999999999,
              height: "100vh !important",
              width: "100%",
              backgroundColor: "#17191c",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                position: "absolute",
                zIndex: 1,
                width: "100%",
                height: "100vh",
                backgroundColor: "#17191c",
              }}
            >
              {/* <img src="/cowboy-undead.gif" alt="" /> */}
              {/* <Vids /> */}
            </div>
            <Tween
              from={{
                opacity: 0,
              }}
              to={{
                opacity: state.loading ? 1 : 0,
              }}
              duration={1}
              ease={Power4.easeInOut}
            >
              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                  marginTop: "30px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center  ",
                }}
              >
                <img
                  className="logo-width"
                  style={{
                    // backgroundColor: "#000",
                    backgroundColor: "transparent",
                    marginBottom: "30px",
                  }}
                  src="/wwu.png"
                />
                <p
                  className="font-medium capitalize cowboy"
                  style={{
                    transform: "translateY(-80px)",
                    fontSize: "23px",
                    letterSpacing: "1px !important ",
                    fontWeight: "500",
                    color: "#fff !important",
                    textTransform: "uppercase",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    className="dot-animation"
                    style={{
                      width: "98px",
                      display: "flex",
                      justifyContent: "space-between",
                      color: "#fff",
                    }}
                  >
                    <span>
                      Loading
                      <span className="dot">{Array(dotCount).fill(".")}</span>
                    </span>
                    {Math.floor(state.progress)}
                  </span>

                  {/* <span
              style={{
                marginLeft:"3px",
                fontFamily: "sans-serif",
                fontWeight: "800",
              }}
            >
              %
            </span> */}
                </p>
                {/* <div
                className="logo-width"
                style={{
                  height: "2px",
                  borderRadius: "12px",
                  transform: "translateY(-70px)",
                  overflow: "hidden",
                  backgroundColor: "#333",
                }}
              >
                <div
                  className=""
                  style={{
                    backgroundColor: "#fff",
                    height: "100%",
                    transition: "0.9s",
                    width: `${state.progress}%`,
                  }}
                ></div>
              </div> */}
              </div>
            </Tween>
          </div>
        </Tween>
      )}
      {children}
    </>
  );
};

export default Loader;
