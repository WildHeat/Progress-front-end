import React from "react";
import "./About.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about-page-container">
      <div className="motivation-container section">
        <h2 className="page-title title">Motivations</h2>

        <div className="top-motivation-section">
          <div className="level-up-image-container">
            <img
              className="level-up-image"
              src={require("../../img/level up splash.png")}
              alt="Level up arrow"
            />
          </div>
          <div className="story-right-container">
            <div className="story-right-text">
              <h4>The Story</h4>
              <p>
                At AB Tracker, we believe that life is an endless journey of
                growth and self-improvement. Whether you're learning a new
                skill, mastering a hobby, or simply striving to become the best
                version of yourself, my app is here to support and empower you
                every step of the way.
              </p>
            </div>
          </div>
        </div>
        <div className="bottom-motivation-section">
          <div className="motivation-section">
            <h4>The Mission</h4>
            <p>
              My mission is to provide a fun and interactive platform that
              allows you to track your progress and level up your character
              while pursuing your passions and honing your skills. We believe
              that the journey of self-improvement should be an exciting
              adventure, and AB Tracker is designed to make that journey both
              rewarding and enjoyable.
            </p>
          </div>

          <div className="motivation-section">
            <h4>How It Works</h4>
            <p>
              AB Tracker is simple to use. Just create your character and start
              inputting the amount of time you have placed into your skill.
              Whether you're a fitness enthusiast, a language learner, a
              musician, a chef, or anything in between, the app adapts to your
              unique journey. As you level up your character, you'll see your
              progress in a whole new light.
            </p>
          </div>
        </div>
      </div>
      <div className="about-me-container section">
        <h2 className="title">About Me</h2>
        <div className="about-me">
          <div className="about-me-image-container">
            <img
              className="about-me-image"
              src={require("../../img/about-me-edit.jpg")}
              alt="portrait of creator"
            />
          </div>
          <div className="about-me-description">
            <p>
              Born in Germany and raised in England. Studied Computer Science at
              the University of Surrey. Addicted to art, bouldering and
              computers.
            </p>
            <div className="about-me-links">
              <Link
                className="nav-link linkedin"
                target="_blank"
                to="https://www.linkedin.com/in/aron-berhane-0485b820b/"
              >
                LinkedIn
              </Link>
              <Link
                className="nav-link github"
                target="_blank"
                to="https://github.com/WildHeat"
              >
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="nerd-stuff-container section">
        <h2 className="nerd-title title">Nerd Stuff</h2>
        <h4 className="tech-used-title">Technologies Used</h4>
        <div className="nerd-technology-container">
          <div className="tech-container">
            <h4>Frontend</h4>
            <p>JavaScript</p>
            <p>HTML</p>
            <p>CSS</p>
            <p>React</p>
          </div>
          <div className="tech-container">
            <h4>Backend</h4>
            <p>Java</p>
            <p>Spring Boot</p>
            <p>Spring Boot Security</p>
          </div>
          <div className="tech-container">
            <h4>Other</h4>
            <p>MYSQL</p>
            <p>JWT</p>
            <p>GitHub</p>
            <p>Docker</p>
          </div>
        </div>
      </div>
      <div className="thank-you-container">
        <h6>
          Thank you for choosing AB Traker as your companion on the path to
          personal growth and skill mastery. Let's level up together!
        </h6>
      </div>
    </div>
  );
};

export default About;
