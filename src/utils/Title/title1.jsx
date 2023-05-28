import { gsap } from "gsap";
import React, { useRef } from "react";
import { SplitChars } from "react-gsap";

const Title1 = () => {
  React.useLayoutEffect(() => {
    function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    }
    const children = Array.from(ref.current.children);
    const masterTL = gsap.timeline();
    const arr = shuffleArray(children);
    setTimeout(() => {
      for (let i = 0; i < arr.length; i++) {
        const tl = gsap.timeline();
        const elem = arr[i];
        tl.set(elem, { className: "+=state-1" })
          .set(elem, { delay: 0.1, className: "+=state-2" })
          .set(elem, { delay: 0.1, className: "+=state-3" });
        masterTL.add(tl, i * 0.02);
      }
    }, 1000);
  });

  const ref = useRef();

  return (
    <>
      <h1 className="text-[24px]" ref={ref}>
        <SplitChars
          wrapper={
            <div
              className="text-animation"
              style={{ position: "relative", display: "inline-block" }}
            />
          }
        >
          More than 200 career options
        </SplitChars>
      </h1>
    </>
  );
};

export default Title1;
