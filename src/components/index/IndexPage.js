import React, { useEffect } from "react";
import "./IndexPage.css";
import ImageSlider from "../ImageSlider/ImageSlider";
import InfoDeck from "./InfoDeck";
import { Link } from "react-router-dom";

function IndexPage() {
  const slides = [
    {
      title: "Create your unique character and start your journey today",
      url: require("../../img/slide1.jpg"),
    },
    {
      title: "You decide what skills your character should have",
      url: require("../../img/slide2.jpg"),
    },
    {
      title: "In-depth dashboard to give you a deeper insight in your skills",
      url: require("../../img/slide3.jpg"),
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
          SO...ARE YOU READY TO START YOUR JOURNEY? REGISTER AND BEGIN!
        </h3>
        <Link to="/register">
          <button className="register-button">Register</button>
        </Link>
      </div>
    </div>
  );
}

export default IndexPage;
