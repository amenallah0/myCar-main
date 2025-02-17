import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Thumbs, EffectFade } from "swiper";
const TestimonialOne = () => {
  return (
    <div
      className="testimonial-area-0 overflow-hidden"
      style={{ backgroundImage: "url(assets/img/testimonial/testimonial.jpg)" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="testimonial-thumb1">
              <img src="assets/img/testimonial/testimonial.jpg" alt="MyCar" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="space">
              <div className="title-area">
                <span className="sub-title">Why Choose Us</span>

                <h2 className="sec-title text-white">
                  We Give You The Best <br /> Services
                </h2>
              </div>
              <div className="row global-carousel testi-slider-1">
                <Swiper
                  loop={true}
                  navigation={{
                    nextEl: ".testimonialOne-button-next",
                    prevEl: ".testimonialOne-button-prev",
                  }}
                  spaceBetween={20}
                  slidesPerGroup={1}
                  speed={1000}
                  autoplay={{ delay: 3000 }}
                  pagination={true}
                  className="mySwiper"
                  modules={[FreeMode, Navigation, Thumbs, EffectFade]}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                    },
                    500: {
                      slidesPerView: 1,
                    },
                    768: {
                      slidesPerView: 1,
                    },
                    992: {
                      slidesPerView: 1,
                    },
                    1200: {
                      slidesPerView: 1,
                    },
                    1400: {
                      slidesPerView: 1,
                    },
                  }}
                >
                  <SwiperSlide>
                    <div>
                      <div className="testi-card">
                        <div className="testi-card_content">
                          <div className="testi-card-profile">
                            <div className="testi-card-profile-details">
                              <h4 className="testi-profile-title">
                              User-Friendly Interface
                              </h4>
                              
                            </div>
                            <div className="quote-icon">
                              <img
                                src="assets/img/icon/quote1-1.svg"
                                alt="Fixturbo"
                              />
                            </div>
                          </div>
                          <p className="testi-card_text">
                          Our website is designed with you in mind, 
                          offering easy navigation and intuitive search features to help 
                          you find what you’re looking for without hassle.
                          </p>
                          
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div>
                      <div className="testi-card">
                        <div className="testi-card_content">
                          <div className="testi-card-profile">
                            <div className="testi-card-profile-details">
                              <h4 className="testi-profile-title">
                              Comprehensive Information
                              </h4>
                            </div>
                            <div className="quote-icon">
                              <img
                                src="assets/img/icon/quote1-1.svg"
                                alt="Fixturbo"
                              />
                            </div>
                          </div>
                          <p className="testi-card_text">
                          We believe in transparency. 
                          Our listings come with detailed information 
                          and high-resolution images, 
                          allowing you to make well-informed decisions.
                          </p>
                          
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div>
                      <div className="testi-card">
                        <div className="testi-card_content">
                          <div className="testi-card-profile">
                            <div className="testi-card-profile-details">
                              <h4 className="testi-profile-title">
                              Expert Support
                              </h4>
                              
                            </div>
                            <div className="quote-icon">
                              <img
                                src="assets/img/icon/quote1-1.svg"
                                alt="Fixturbo"
                              />
                            </div>
                          </div>
                          <p className="testi-card_text">
                          Our dedicated support team is always ready to assist you. 
                          Whether you have questions about a listing or need help with the buying process, 
                          we’re here for you.
                          </p>
                          
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>

                <div className="testimonialOne arrow">
                  <div className=" testimonialOne-button-next testimonialOne-button">
                    <i className="fas fa-arrow-left"></i>
                  </div>
                  <div className=" testimonialOne-button-prev testimonialOne-button">
                    <i className="fas fa-arrow-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialOne;
