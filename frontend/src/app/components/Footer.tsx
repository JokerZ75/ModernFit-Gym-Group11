import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-100 p-5 py-8 pb-7  flex flex-col md:grid md:grid-cols-3 md:items-start md:justify-items-center  md:px-48 md:py-10 w-full items-center mt-auto">
      <div id="contact-us" className="">
        <div
          className="text-2xl md:text-4xl text-white font-extrabold my-auto"
          id="logo"
        >
          <h1>ModernFit</h1>
        </div>
        <div className="text-white text-center">
          <p className="text-lg font-bold">Contact Us</p>
          <p className="text-sm">+44 1234567890</p>
          <p className="text-lg flex ">
            <a href="mailto:" className="mx-auto hover:text-blue-200">
              <FontAwesomeIcon icon={faEnvelope} />
            </a>
          </p>
        </div>
      </div>
      <div id="social-media">
        <div className="text-white text-center">
          <p className="text-lg font-bold">Social Media</p>
          <p className="text-sm">Follow us on social media</p>
          <div className="flex gap-2 mt-2 justify-center">
            <a href="https://www.facebook.com/">
              <FontAwesomeIcon
                icon={faFacebook}
                className="text-2xl hover:text-blue-200"
              />
            </a>
            <a href="https://www.instagram.com/">
              <FontAwesomeIcon
                icon={faInstagram}
                className="text-2xl hover:text-blue-200"
              />
            </a>
            <a href="https://twitter.com/">
              <FontAwesomeIcon
                icon={faTwitter}
                className="text-2xl hover:text-blue-200"
              />
            </a>
          </div>
        </div>
      </div>
      <div id="about-us-footer">
        <div className="text-white text-center">
          <p className="text-lg font-bold">About Us</p>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
            voluptate, quod, quas, doloribus quia voluptatum voluptatibus
            officia, quos fugit accusantium doloremque. Voluptatum, asperiores
            quia. Quaerat, voluptatum. Quaerat, voluptatum. Quaerat, voluptatum.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
