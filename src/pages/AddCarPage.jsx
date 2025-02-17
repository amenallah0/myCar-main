import React, { useEffect, useState } from "react";
import Header from "../components/HeaderFive";
import FooterAreaOne from "../components/FooterAreaFour";
import Preloader from "../helper/Preloader";
import AddCar from "../components/AddCar";



const AddCarPage = () => {
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
  
        <AddCar />
     
        {/* Footer Area One */}
        <FooterAreaOne />
      </>
    );
  };
  
  export default AddCarPage;
  