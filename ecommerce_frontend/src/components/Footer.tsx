import { useState } from "react";
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { LuSendHorizonal } from "react-icons/lu";

import {
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaFacebookF,
} from "react-icons/fa";

interface PropsType {
  user: User | null;
}

const Footer = ({ user }: PropsType) => {
  const [isOpen, setIsOpen] = useState(false);
  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign out successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("Sign Out Failed");
    }
  };

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
