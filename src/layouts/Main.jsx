import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import Intro from "../components/Intro/index";

const MainLoader = ({ children }) => {
  const first = useSelector((state) => state.model.first);
  const loading = useSelector((state) => state.three.loading);
  const audioRef = useRef();
  useEffect(() => {
    if (first) {
      if (loading) {
        audioRef.current.loop = true;
        audioRef.current.play();
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [first, loading]);

  return (
    <>
      {!first ? <Intro /> : <Loader />}
      <audio ref={audioRef} src={"/thunder.mp3"} />
      {children}
    </>
  );
};

export default MainLoader;
