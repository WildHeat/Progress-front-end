import React from "react";
import "./IndexPage.css";

function IndexPage() {
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
      <div className="slide-show-container">
        this will be the slide show of the page
      </div>
      <div className="begin-your-journey-container">Begin your journey</div>
    </div>
  );
}

export default IndexPage;
