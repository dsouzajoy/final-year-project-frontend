import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "./components/Loader";

const AuthorizedRoute = props => {
  const isLoggedIn = useSelector(state => state.common.isLoggedIn);
  const [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
      setShowLoader(true);
    if (!isLoggedIn) {
      props.history.push("/login");
    }
    setShowLoader(false);
  }, []); //eslint-disable-line

  return(
      <>
      {showLoader && <Loader /> }
      </>
  )
};

export default AuthorizedRoute;
