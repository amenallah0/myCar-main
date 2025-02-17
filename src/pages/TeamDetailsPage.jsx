import React, { useEffect, useState } from "react";
import HeaderOne from "../components/HeaderFive";

import FooterAreaOne from "../components/FooterAreaFour";
import Breadcrumb from "../components/Breadcrumb";
import SubscribeOne from "../components/SubscribeTwo";
import TeamDetails from "../components/TeamDetails";
import Preloader from "../helper/Preloader";

const TeamDetailsPage = () => {
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
      <Breadcrumb title={"Team Details"} />

      {/* Team Details */}
      <TeamDetails />

      {/* Subscribe One */}
      <SubscribeOne />

      {/* Footer Area One */}
      <FooterAreaOne />
    </>
  );
};

export default TeamDetailsPage;
