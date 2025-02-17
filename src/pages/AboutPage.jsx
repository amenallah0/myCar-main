import React, { useEffect, useState } from "react";
import Header from "../components/HeaderFive";

import FooterAreaOne from "../components/FooterAreaFour";
import Breadcrumb from "../components/Breadcrumb";
import AboutTwo from "../components/AboutTwo";
import ProcessAreaOne from "../components/ProcessAreaOne";
import CTAAreaOne from "../components/CTAAreaTwo";
import TestimonialOne from "../components/TestimonialOne";
import SubscribeOne from "../components/SubscribeTwo";
import TeamAreaTwo from "../components/TeamAreaTwo";
import Preloader from "../helper/Preloader";

const AboutPage = () => {
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
      {/* <Breadcrumb title={"About Us"} /> */}

      {/* About Area */}
      <AboutTwo />

      {/* Process Area One */}
      <ProcessAreaOne />

      {/* CTA Area One */}
      {/* <CTAAreaOne /> */}

      {/* Testimonial One */}
      <TestimonialOne />

      {/* Team Area Two */}
      <TeamAreaTwo />

      {/* Subscribe One */}
      {/* <SubscribeOne /> */}

      {/* Footer Area One */}
      <FooterAreaOne />
    </>
  );
};

export default AboutPage;
