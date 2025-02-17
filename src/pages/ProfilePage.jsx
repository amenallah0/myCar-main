import React, { useEffect, useState } from "react";
import HeaderOne from "../components/HeaderFive";
import FooterAreaOne from "../components/FooterAreaFour";
import Preloader from "../helper/Preloader";
import Profile from "../components/Profile";

const ProfilePage = () => {
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
  
        {/* Header one */}
        <HeaderOne />
  
        <Profile />
  
        {/* Footer Area One */}
        <FooterAreaOne />
      </>
    );
  };
  
  export default ProfilePage;
  