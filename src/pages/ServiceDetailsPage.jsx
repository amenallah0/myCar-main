import React, { useEffect, useState } from "react";
import HeaderOne from "../components/HeaderFive";

import FooterAreaOne from "../components/FooterAreaFour";
import Breadcrumb from "../components/Breadcrumb";
import SubscribeOne from "../components/SubscribeTwo";
import ServiceDetails from "../components/ServiceDetails";
import Preloader from "../helper/Preloader";

const ServiceDetailsPage = () => {
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
      <Breadcrumb title={"Service Details"} />

      {/* Service Details */}
      <ServiceDetails />

      {/* Subscribe One */}
      <SubscribeOne />

      {/* Footer Area One */}
      <FooterAreaOne />
    </>
  );
};

export default ServiceDetailsPage;
