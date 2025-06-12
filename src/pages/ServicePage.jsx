import React, { useEffect, useState } from "react";
import Header from "../components/HeaderFive";

import FooterAreaOne from "../components/FooterAreaFour";
import Breadcrumb from "../components/Breadcrumb";
import SubscribeOne from "../components/SubscribeTwo";
import ServiceAreaOneMultiImg from "../components/ServiceAreaOneMultiImg";
import Preloader from "../helper/Preloader";

const ServicePage = () => {
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
      <Header />

      {/* Breadcrumb */}
      {/* <Breadcrumb title={"Service"} /> */}

      {/* Service Area One */}
      <ServiceAreaOneMultiImg />

      {/* Subscribe One */}
      <SubscribeOne />

      {/* Footer Area One */}
      <FooterAreaOne />
    </>
  );
};

export default ServicePage;
