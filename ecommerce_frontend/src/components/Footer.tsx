import { LuSendHorizonal } from "react-icons/lu";

import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaTwitter,
} from "react-icons/fa";



const Footer = () => {
  

  return (
    <footer className="footer">
      <div className="subscribe">
        <h1>Ecommerce</h1>
        <h3>Subscribe</h3>
        <p>Get 10% off your first order</p>
        <div className="input">
          <input
            type="text"
            className="send-email"
            placeholder="Enter your email"
          />
          <LuSendHorizonal />
        </div>
      </div>
      <div className="subscribe">
        <h2>Support</h2>
        <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
        <p>exclusive@gmail.com</p>
        <p>+88015-88888-9999</p>
      </div>
      <div className="subscribe">
        <h2>Account</h2>
        <p>My Account</p>
        <p>Login/Register</p>
        <p>Cart</p>
        <p>Whislist</p>
        <p>Shop</p>
      </div>
      <div className="subscribe">
        <h2>Quick Link</h2>
        <p>Privacy Policy</p>
        <p>Terms Of Use</p>
        <p>FAQ</p>
        <p>Contact</p>
      </div>
      <div className="subscribe">
        <h2>Download App</h2>
        <p>Save $3 with App New User Only</p>
        <div className="download-app">
          <div className="qr">
            <img src="../src/assets/qr.png" alt="qr" />
          </div>
          <div className="link">
            <div className="play-store">
              <img src="../src/assets/play.png" alt="qr" />
            </div>
            <div className="app-store">
              <img src="../src/assets/app.png" alt="qr" />
            </div>
          </div>
        </div>
        <div className="social-icons">
          <FaTwitter />
          <FaInstagram />
          <FaLinkedinIn />
          <FaFacebookF />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
