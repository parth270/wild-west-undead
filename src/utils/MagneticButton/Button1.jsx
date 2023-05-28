import { Power3, gsap } from "gsap";
import React, { useRef } from "react";
import "./Button1.css";
import { useState } from "react";

const Button1 = ({ onClick }) => {

  const ref = useRef();

  React.useEffect(() => {
    function buttonHoverAnimation() {
      // Get all button elements
      const buttonSelector = document.querySelectorAll(".button");
      let jj = 0;
      // Loop through all button elements
      for (let i = 0; i < buttonSelector.length; i++) {
        // Get text inside of a button wrapped in span
        const buttonTextSelector = buttonSelector[i].querySelector("img");

        function mousemoveFn(event) {
          // Get X-coordinate for the left button edge
          const buttonPos = event.currentTarget.getBoundingClientRect().left;
          const button1 = event.currentTarget.getBoundingClientRect().top;

          // Get position of the mouse inside element from left edge
          // (current mouse X position - button x coordinate)
          const xPosOfMouse = event.clientX - buttonPos;
          const yPosOfMouse = event.clientY - button1;

          // Get position of mouse relative to button center
          // Mouse position inside element - button width / 2
          // To get positive or negative movement
          const xPosOfMouseInsideButton =
            xPosOfMouse - buttonSelector[i].offsetWidth / 2;
          const yPosOfMouseInsideButton =
            yPosOfMouse - buttonSelector[i].offsetHeight / 2;

          // Button text divider to increase or decrease text path
          const animationDivider = 3;


          // Animate button text positive or negative from center
          gsap.to(buttonTextSelector, {
            x: xPosOfMouseInsideButton / animationDivider,
            y: yPosOfMouseInsideButton / animationDivider,
            ease: Power3.easeOut,
            duration: 1,
          });
        }

        // On mouse leave
        function mouseleaveFn() {
          // Animate button text reset to initial position (center)
          gsap.to(buttonTextSelector, {
            x: 0,
            y: 0,
            ease: Power3.easeOut,
            duration: 1,
          });
        }

        buttonSelector[i].addEventListener("mousemove", mousemoveFn);

        buttonSelector[i].addEventListener("mouseleave", mouseleaveFn);
      }
    }

    buttonHoverAnimation();
  });

  return (
    <>
      <button
        className="button  flex items-center justify-center relative"
        onClick={() => {
          onClick();
        }}
      >
        <div
          className="w-[240px] h-[240px] border-dashed border-[5px] border-[#000] absolute rounded-[50%]"
          ref={ref}
        ></div>
        {/* <span>Button text</span> */}
        <img src="/play.svg" className="w-[70px]" />
      </button>
    </>
  );
};
export default Button1;
