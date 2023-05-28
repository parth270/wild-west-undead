import React, { useState } from "react";
import gsap, { Power4 } from "gsap";
import { Tween } from "react-gsap";

const Button = ({ pageX, pageY, ...props }) => {
  const [rect, setRect] = React.useState({ x: 0, y: 0 });
  const [enter, setEnter] = React.useState(false);

  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  React.useEffect(() => {
    const onMove = (e) => {
      setMouse({
        x: e.pageX,
        y: e.pageY,
      });
    };
    window.addEventListener("mousemove", onMove);
  });

  React.useEffect(() => {
    const btn = document.querySelector("#more-btn");
    const { x, y } = btn.getBoundingClientRect();
    setRect({ x: x, y: y });
  }, []);

  React.useEffect(() => {
    const btn = document.querySelector("#more-btn");
    const height = btn.offsetHeight;
    const width = btn.offsetWidth;
    const x = enter ? (mouse.x - rect.x - width / 2) * 0.4 : 0;
    const y = enter ? (mouse.y - rect.y - height / 2) * 0.4 : 0;
    gsap.to("#more-btn", {
      x: enter ? x : 0,
      y: enter ? y : 0,
      duration: 0.1,
      ease: Power4.easeInOut,
    });
  }, [mouse.y, mouse.x]);

  return (
    <div
      className={props.container}
      onMouseMove={() => {
        setEnter(true);
      }}
      onMouseLeave={() => {
        setEnter(false);
      }}
      id="more-btn"
    >
      <button className={props.btn}>
        <span>More</span>
      </button>
    </div>
  );
};

export default Button;
