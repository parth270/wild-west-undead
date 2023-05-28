import React, { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import MainLoader from "../layouts/Main";
const HomePage = React.lazy(() => import("../views/index"));

const Home = () => {
  const state = useSelector((state) => state.model);

  return (
    <>
      <MainLoader>
        <Suspense fallback={<></>}>{state.first && <HomePage />}</Suspense>
      </MainLoader>
    </>
  );
};

export default Home;
