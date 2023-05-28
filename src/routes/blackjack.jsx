import React, { Suspense } from "react";
import Loader from "@/layouts/Loader";

const BlackjackView = React.lazy(() => import("../views/blackjack.jsx"));

const Blackjack = () => {
  return (
    <Suspense fallback={<Loader />}>
        <BlackjackView />
    </Suspense>
  );
};

export default Blackjack;
