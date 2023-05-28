import React from "react";
import "./title.css";
import { Linear, gsap } from "gsap";
import { Power1 } from "gsap";

const Title = ({ str }) => {
  React.useEffect(() => {
    var slideDelay = 1.5;
    var slideDuration = 1;
    var slides = document.querySelectorAll(".slide");
    var numSlides = slides.length;

    gsap.set(slides, {
      xPercent: function (i, target) {
        return i * 100;
      },
    });

    var wrap = wrapPartial(-100, (numSlides - 1) * 100);
    var timer = gsap.delayedCall(slideDelay, autoPlay).pause();
    var proxy = document.createElement("div");
    gsap.set(proxy, { x: "+=0" });
    var transform = proxy._gsTransform;
    var slideWidth = 0;
    var wrapWidth = 0;
    var animation = gsap.timeline({ repeat: -1 });
    resize();

    window.addEventListener("resize", resize);

    function autoPlay() {
      animation.play();
      gsap.fromTo(
        animation,
        { timeScale: 0 },
        { timeScale: 1, ease: Power1.easeIn },
        1
      );
    }

    function updateProgress() {
      animation.progress(transform.x / wrapWidth);
    }

    function resize() {
      var progress = animation.progress();
      slideWidth = slides[0].offsetWidth;
      wrapWidth = slideWidth * numSlides;

      animation
        .progress(0)
        .clear()
        .to(slides, 100, {
          xPercent: "+=" + numSlides * 100,
          ease: Linear.easeNone,
          modifiers: {
            xPercent: wrap,
          },
        })
        .to(proxy, 100, { x: wrapWidth, ease: Linear.easeNone }, 0)
        .progress(progress);
    }

    function wrapPartial(min, max) {
      var r = max - min;
      return function (value) {
        var v = value - min;
        return ((r + (v % r)) % r) + min;
      };
    }

    // Hamster($('.slides-container')[0]).wheel(function(event, delta, deltaX, deltaY) {
    //   event.preventDefault();
    //   animateSlides(delta/30);
    // });
  });

  return (
    <main>
      <div className="slides-container">
        <div className="slides-inner">
          <div className="slide a text-[40px] font-medium uppercase tracking-wide overflow-hidden whitespace-nowrap">
            {str}
          </div>
          <div className="slide b text-[40px] font-medium uppercase tracking-wide overflow-hidden whitespace-nowrap">
            {str}
          </div>
          <div className="slide a text-[40px] font-medium uppercase tracking-wide overflow-hidden whitespace-nowrap">
            {str}
          </div>
          <div className="slide b text-[40px] font-medium uppercase tracking-wide overflow-hidden whitespace-nowrap">
            {str}
          </div>
          <div className="slide a text-[40px] font-medium uppercase tracking-wide overflow-hidden whitespace-nowrap ">
            {str}
          </div>
          <div className="slide b text-[40px] font-medium uppercase tracking-wide overflow-hidden whitespace-nowrap">
            {str}
          </div>
          <div className="slide a text-[40px] font-medium uppercase tracking-wide overflow-hidden whitespace-nowrap">
            {str}
          </div>
          <div className="slide b text-[40px] font-medium uppercase tracking-wide overflow-hidden whitespace-nowrap">
            {str}
          </div>
          <div className="slide a text-[40px] font-medium uppercase tracking-wide overflow-hidden whitespace-nowrap ">
            {str}
          </div>
          <div className="slide b text-[40px] font-medium uppercase tracking-wide overflow-hidden whitespace-nowrap">
            {str}
          </div>
        </div>
      </div>
    </main>
  );
};

export default React.memo(Title);
