import React from "react";
import "./IndexPage.css";
import ImageSlider from "../ImageSlider/ImageSlider";

function IndexPage() {
  const slides = [
    {
      title: "target hit",
      url: "https://www.incimages.com/uploaded_files/image/1920x1080/shutterstock_318915104_360067.jpg",
    },
    {
      title: "stats",
      url: "https://poetsandquants.com/wp-content/uploads/sites/5/2018/05/benefits-of-a-business-analytics-course-and-degree-img.jpg",
    },
    {
      title: "profile",
      url: "https://fairwaysolitaire.zendesk.com/hc/article_attachments/115003749914/Profile.jpg",
    },
  ];
  return (
    <div className="index-page-container">
      <div className="top-content">
        <div className="image-container">
          <img
            className="index-meditate"
            src={require("../../img/samurai.png")}
            // src\img\Miyamoto-musashi-ink.png
            alt="Character Icon"
          />
        </div>
        <div className="top-text-container">
          <h3>AB Tracker</h3>
          <p>
            There is much to LEARN in this world and Feedback and tracking your
            progress is one KEY step to your journey.
          </p>
        </div>
      </div>
      <div className="show-container">
        <ImageSlider slides={slides} />
      </div>
      <div className="info-deck">
        <div className="card-in-deck">
          You can do some analytics on the different skills that you develop
        </div>
        <div className="card-in-deck">
          Be able to use charts to analysis sessions
        </div>
        <div className="card-in-deck">
          Increase the level of your character to emthasis the progress that you
          have made
        </div>
        <div className="card-in-deck">
          Share this information with your friends and family
        </div>
        <div className="card-in-deck">
          You can do some analytics on the different skills that you develop
        </div>
        <div className="card-in-deck">
          Be able to use charts to analysis sessions
        </div>
        <div className="card-in-deck">
          Increase the level of your character to emthasis the progress that you
          have made
        </div>
        <div className="card-in-deck">
          Share this information with your friends and family
        </div>
      </div>
      <div className="begin-your-journey-container">Begin your journey</div>
    </div>
  );
}

export default IndexPage;
