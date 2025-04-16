import React, { useEffect, useState } from "react";
import HeaderFive from "../components/HeaderFive";
import HeroSix from "../components/HeroSix";
import CategoryAreaOne from "../components/CategoryAreaOne";
import FaqAreaThree from "../components/FaqAreaThree";
import BlogAreaTwo from "../components/BlogAreaTwo";
import SubscribeTwo from "../components/SubscribeTwo";
import FooterAreaFour from "../components/FooterAreaFour";
import Preloader from "../helper/Preloader";
import AnnonceCarousel from "../components/AnnonceCarousel";
import ApiAnnonceService from "../services/apiAnnonceServices";

const HomePageSix = () => {
  let [active, setActive] = useState(true);
  const [annonces, setAnnonces] = useState([]);

  useEffect(() => {
    setTimeout(function () {
      setActive(false);
    }, 2000);

    const fetchAnnonces = async () => {
      try {
        const data = await ApiAnnonceService.getAnnonces();
        setAnnonces(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des annonces:", error);
      }
    };

    fetchAnnonces();
  }, []);

  return (
    <>
      {/* Preloader */}
      {active === true && <Preloader />}

      {/* Header Five */}
      <HeaderFive />

      {/* Afficher le carousel d'annonces seulement s'il y a des annonces */}
      {annonces.length > 0 && (
        <AnnonceCarousel 
          annonces={annonces}
          autoplay={true}
          interval={5000}
        />
      )}

      {/* Passer l'information sur la présence d'annonces à HeroSix */}
      <HeroSix hasAnnonces={annonces.length > 0} />

      {/* Category Area One */}
      <CategoryAreaOne />

      {/* Faq Area three */}
      <FaqAreaThree />

      {/* Blog Area Two */}
      <BlogAreaTwo />

      {/* Subscribe Two */}
      <SubscribeTwo />

      {/* Footer Area Four */}
      <FooterAreaFour />
    </>
  );
};

export default HomePageSix;
