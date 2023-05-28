import { gsap } from "gsap";
import React, { useEffect, useRef, useState } from "react";
import Game from "./game";

export function Home() {
  const [game, setGame] = useState(false);
  const [transition, setTransition] = useState(false);
  const intro = useRef();
  const gamecontainer = useRef();

  //   <Tween
  //   from={{
  //     clipPath: "inset(0px 0vw 100vh 1px)",
  //     x: "20px",
  //     opacity: 0,
  //   }}
  //   to={{
  //     clipPath: "inset(0px 0px 0% 1px)",
  //     x: 0,
  //     opacity: 1,
  //   }}
  //   delay={0.5}
  //   stagger={0.2}
  //   duration={1}
  //   ease={Power2.easeInOut}
  // >
  //   useEffect(() => {
  //     if (game) {
  //       gsap.fromTo(
  //         gamecontainer.current,
  //         {
  //           clipPath: "inset(0px 0vw 100vh 0px)",
  //           opacity: 0,
  //           duration: 1.7,
  //           delay: 1,
  //         },
  //         {
  //           clipPath: "inset(0px 0vw 0vh 0px)",
  //           opacity: 0,
  //           duration: 1.7,
  //           delay: 1,
  //         }
  //       );
  //     }
  //   }, [game]);

  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center flex-col bg-[#000000a6]">
        {game ? (
          <div
            ref={gamecontainer}
            className="w-[100%] h-[100vh] absolute flex justify-center"
            style={{
              zIndex: 1,
              backdropFilter:"blur(10px)"
            }}
          >
            <Game />
          </div>
        ) : (
          <div
            className="w-[100%] h-[100vh] flex items-center justify-center  absolute"
            style={{
              zIndex: 2,
            }}
            ref={intro}
          >
            <div className="flex items-center">
              <p
                className="w-auto flex cursor-pointer items-center animate-bounce mt-[20px] text-[50px] tracking-wider text-[#ff0000] cowboy uppercase "
                onClick={() => {
                  //   gsap.to(intro.current, {
                  //     clipPath: "inset(0px 0vw 100vh 1px)",
                  //     opacity: 0,
                  //     duration: 1,
                  //   });
                  setGame(true);
                }}
              >
                Play now
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
