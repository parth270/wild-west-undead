import { setAAppear, setLoadingSecond } from "../../services/modeling";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Home } from "./home";

const BlackJack = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoadingSecond(false));
    setTimeout(() => {
      dispatch(setAAppear(false));
    });
  });

  return (
    <div className="w-[100%] h-[100vh] bg-[#ccc]">
      <img
        src="/saloon.png"
        className="w-[100%] h-[100vh] object-cover absolute"
        style={{
          zIndex: 1,
        }}
        alt=""
      />
      <div
        className="w-[100%] h-[100vh] absolute"
        style={{
          zIndex: 3,
        }}
      >
        <Home />
      </div>
    </div>
  );
};

export default BlackJack;
