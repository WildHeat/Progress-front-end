import React, { useEffect } from "react";
import "./IndexPage.css";
import ImageSlider from "../ImageSlider/ImageSlider";
import InfoDeck from "./InfoDeck";
import Tunnel from "../Tunnel/Tunnel";

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
      url: "https://img.freepik.com/free-vector/hand-drawn-profile-icon-collection_52683-71949.jpg?w=2000",
    },
  ];

  const updateHiddenFunction = (event) => {
    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach((ele) => {
      const elementRect = ele.getBoundingClientRect();
      if (
        elementRect.top + elementRect.height / 2 - 100 < window.innerHeight &&
        elementRect.top + elementRect.height / 2 + 100 > 0
      ) {
        ele.classList.add("show");
      } else {
        ele.classList.remove("show");
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", updateHiddenFunction);

    return () => {
      window.removeEventListener("scroll", updateHiddenFunction);
    };
  }, []);

  return (
    <div className="index-page-container">
      <div className="top-content">
        <div className="image-container show hidden">
          <img
            className="index-meditate"
            src={require("../../img/samurai.png")}
            alt="Character Icon"
          />
        </div>
        <div className="top-text-container">
          <h3>AB Tracker</h3>
          <p>
            AB Tracker is a way to track your progress and gain useful insights
            on your skills and hobbies.
          </p>
        </div>
      </div>
      <div className="show-container hidden">
        <ImageSlider slides={slides} />
      </div>
      <InfoDeck />
      <div className="begin-your-journey-container">
        <h3 className="begin-your-journey">
          SO...ARE YOU READY TO START YOUR JOURNEY? HIT THE CENTER OF THE TARGET
          TO REGISTER!
        </h3>
        <a href="/register">
          <button className="register-button">Register</button>
        </a>
      </div>
      <div className="">
        <Tunnel />
        <div className="tunnel-card-deck">
          <div className="tunnel-card">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Feugiat in fermentum posuere urna nec. Enim nec dui nunc mattis
              enim ut tellus elementum sagittis.
            </p>
          </div>
          <div className="tunnel-card">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Feugiat in fermentum posuere urna nec. Enim nec dui nunc mattis
              enim ut tellus elementum sagittis.
            </p>
          </div>
          <div className="tunnel-card">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Feugiat in fermentum posuere urna nec. Enim nec dui nunc mattis
              enim ut tellus elementum sagittis.
            </p>
          </div>
          <div className="tunnel-card">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Feugiat in fermentum posuere urna nec. Enim nec dui nunc mattis
              enim ut tellus elementum sagittis.
            </p>
          </div>
        </div>
      </div>

      {/* <InfoDeck /> */}
    </div>
  );
}

export default IndexPage;
