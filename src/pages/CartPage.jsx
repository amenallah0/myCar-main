import React, { useEffect, useState } from "react";
import HeaderOne from "../components/HeaderFive";

import FooterAreaOne from "../components/FooterAreaFour";
import Breadcrumb from "../components/Breadcrumb";
import SubscribeOne from "../components/SubscribeTwo";
import Cart from "../components/Cart";
import Preloader from "../helper/Preloader";

const CartPage = () => {
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
      <Breadcrumb title={"Cart"} />

      {/* Cart */}
      <Cart />

      {/* Subscribe One */}
      <SubscribeOne />

      {/* Footer Area One */}
      <FooterAreaOne />
    </>
  );
};

export default CartPage;
