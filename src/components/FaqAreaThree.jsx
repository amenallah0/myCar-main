import React from "react";

const FaqAreaThree = () => {
  return (
    <div className="faq-area-1 space">
      <div className="container">
        <div
          className="faq-wrap space"
          style={{
            backgroundImage: "url(/assets/img/ask.jpg)",
            backgroundColor: "#F4F4F4",
            backgroundSize: "cover",
          }}
        >
          <div className="row justify-content-center">
            <div className="col-xl-5 col-lg-6 col-11">
              <div className="title-area text-center">
                <span className="sub-title">ask anything</span>
                <h2 className="sec-title">
                  MyCar Is Your Best Solution
                </h2>
              </div>
            </div>
            <div className="col-xl-8 col-md-10 col-11">
              <div className="accordion-area accordion" id="faqAccordion">
                <div className="accordion-card style3 active">
                  <div className="accordion-header" id="collapse-item-1">
                    <button
                      className="accordion-button "
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-1"
                      aria-expanded="true"
                      aria-controls="collapse-1"
                    >
                      {" "}
                      What Is The Purpose Of Our Business ?
                    </button>
                  </div>
                  <div
                    id="collapse-1"
                    className="accordion-collapse collapse show"
                    aria-labelledby="collapse-item-1"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      <p className="faq-text">
                      We aim to connect buyers with a wide range of car options, allowing them to explore various models, compare prices, and make informed decisions with ease. 
                      By leveraging advanced search features, detailed car listings, and reliable customer support,
                       our platform strives to enhance the overall car-buying experience and ensure that customers find the perfect vehicle to meet their needs.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-card style3">
                  <div className="accordion-header" id="collapse-item-2">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-2"
                      aria-expanded="false"
                      aria-controls="collapse-2"
                    >
                      {" "}
                      What Should I Do ?
                    </button>
                  </div>
                  <div
                    id="collapse-2"
                    className="accordion-collapse collapse "
                    aria-labelledby="collapse-item-2"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      <p className="faq-text">
                      To get started, first create an account on our platform to access all our features and services. 
                      Once registered, you can search for your ideal car using our advanced search tools, 
                      filtering by make, model, price, and more to find options that match your preferences.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-card style3">
                  <div className="accordion-header" id="collapse-item-3">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse-3"
                      aria-expanded="false"
                      aria-controls="collapse-3"
                    >
                      {" "}
                      What Makes This Platform The Best Solution ?
                    </button>
                  </div>
                  <div
                    id="collapse-3"
                    className="accordion-collapse collapse "
                    aria-labelledby="collapse-item-3"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      <p className="faq-text">
                      What sets us apart is our dedicated team of experts who are readily available to provide personalized assistance and answer any specific questions you may have. 
                      This ensures that you receive valuable insights and support throughout your car-buying journey, making the process smoother and more informed.
                      </p>
                    </div>
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

export default FaqAreaThree;
