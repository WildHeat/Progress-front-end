import React from "react";
import "./IndexPage.css";

function IndexPage() {
  return (
    <div className="index-page-container">
      <div className="top-content">
        <div className="image-container">
          <img
            className="index-meditate"
            src={require("../../img/meditate.png")}
            // src\img\Miyamoto-musashi-ink.png
            alt="Character Icon"
          />
        </div>
        <div className="top-text">
          <h3>
            There is much to learn in this world and Feedback and tracking your
            progress is one KEY step to your journey.
          </h3>
          <h3>Will you take this path or not? </h3>
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
