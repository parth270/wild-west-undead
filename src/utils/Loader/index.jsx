import { setAppear, setLoading } from "../../services/three";
import React from "react";
import { useDispatch } from "react-redux";

const Loader = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setLoading(true));
    return () => {
      dispatch(setLoading(false));
    };
  });

  return <></>;
};

export default Loader;
