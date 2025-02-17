import React, { useEffect, useState } from "react";
import HeaderFive from "../components/HeaderFive";
import FooterAreaFour from "../components/FooterAreaFour";
import Preloader from "../helper/Preloader";
import SignIn from "../components/SignIn"

const SignInPage = () => {
    let [active, setActive] = useState(true);
    useEffect(() => {
      setTimeout(function () {
        setActive(false);
      }, 2000);
    }, []);
    return (
      <>
        {/* Preloader */}
        {active === true && <Preloader />}
  
        {/* Header Five */}
        <HeaderFive />
  
        <SignIn />
  
        {/* Footer Area Four */}
        <FooterAreaFour />
      </>
    );
  };
  
  export default SignInPage;
  