import React, { useEffect, useRef, useState } from "react";

const Vids = () => {
  const videoEl = useRef();
  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch((error) => {
        console.error("Error attempting to play", error);
      });
  };

  useEffect(() => {
    attemptPlay();
  }, []);
  return (
    // <video
    //   ref={videoEl}
    //   src="/cow-deed.mp4"
    //   style={{
    //     width: "100%",
    //     height: "100vh",
    //     objectFit: "cover",
    //     // opacity: loaded ? 1 : 0,
    //   }}
    //   muted
    //   autoPlay
    //   controls={false}
    // ></video>
    <img
      src="/cow-ddeed.gif"
      style={{
        width: "100%",
        height: "100vh",
        objectFit: "cover",
        // opacity: loaded ? 1 : 0,
      }}
      alt=""
    />
  );
};

export default React.memo(Vids);
