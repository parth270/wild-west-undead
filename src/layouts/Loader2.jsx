import { Power4 } from "gsap";
import { gsap } from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { Tween } from "react-gsap";
import { useSelector } from "react-redux";
import Vids from "./vids";

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

  const state = useSelector((state) => state.model);
  // console.log(state.progress);
  return (
    <>
      {state.Appear && (
        <Tween
          from={{
            clipPath: "inset(0px 0vw 100vh 0px)",
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
              overflow: "hidden",
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
              <Vids />
            </div>
            <div
              style={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center  ",
              }}
            >
              <img
                className="w-[300px]"
                style={{
                  // backgroundColor: "#000",
                  backgroundColor: "transparent",
                  width: "",
                }}
                ref={ref1}
                src="/wwu.png"
              />
              {/* <p
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
              Loading... {Math.floor(state.progress)}
            </p> */}
              {/* <div
              style={{
                width: "350px",
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
          </div>
        </Tween>
      )}
      {children}
    </>
  );
};

export default Loader;
