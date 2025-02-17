import React, { useEffect, useState } from "react";
import HeaderOne from "../components/HeaderFive";

import FooterAreaOne from "../components/FooterAreaFour";
import Breadcrumb from "../components/Breadcrumb";
import SubscribeOne from "../components/SubscribeTwo";
import TeamAreaTwoGrid from "../components/TeamAreaTwoGrid";
import Preloader from "../helper/Preloader";

const TeamPage = () => {
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

      {/* Breadcrumb */}
      <Breadcrumb title={"Team"} />

      {/* TeamArea Two Grid */}
      <TeamAreaTwoGrid />

      {/* Subscribe One */}
      <SubscribeOne />

      {/* Footer Area One */}
      <FooterAreaOne />
    </>
  );
};

export default TeamPage;
