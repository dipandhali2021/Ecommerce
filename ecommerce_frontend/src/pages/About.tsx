import { BsShop } from "react-icons/bs";
import { FaShoppingBag } from "react-icons/fa";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { TbMoneybag } from "react-icons/tb";
import { Services } from "./Home";

import { ReactNode } from "react";
import {
    FaInstagram,
    FaLinkedinIn,
    FaTwitter
} from "react-icons/fa";
const About = () => {
  return (
    <div className="about">
      <section>
        <div className="intro">
          <h1>Our Story</h1>
          <p>
            Launced in 2023, ByteBazaar is Asia's premier online shopping
            makterplace with an active presense in India. Supported by wide
            range of electronic's marketing, data and service solutions. ByteBazaar
            has 10,500 sellers and 300 brands and serves 3 millions customers
            across the region.{" "}
          </p>
          <p>
            ByteBazaar has more than 1 Million products to offer, growing at a
            very fast. ByteBazaar offers a diverse allotment in categories
            ranging from consumer.
          </p>
        </div>
        <div className="intro-image">
          <section></section>
        </div>
      </section>
      <div className="features ">
        <div className="delivery about-features">
          <div className="feature-icons">
            <BsShop />
          </div>
          <div className="details ">
            <h2>10.5k</h2>
            <p>Sellers active our site</p>
          </div>
        </div>
        <div className="delivery about-features">
          <div className="feature-icons">
            <HiOutlineCurrencyRupee />
          </div>
          <div className="details">
            <h2>33k</h2>
            <p>Monthly Product Sale</p>
          </div>
        </div>
        <div className="delivery about-features">
          <div className="feature-icons">
            <FaShoppingBag />
          </div>
          <div className="details">
            <h2>45.5k</h2>
            <p>Customer active in our site</p>
          </div>
        </div>
        <div className="delivery about-features">
          <div className="feature-icons">
            <TbMoneybag />
          </div>
          <div className="details">
            <h2>25k</h2>
            <p>Annual gross sale in our site</p>
          </div>
        </div>
      </div>
      <div className="person">
      <Profile
        name="Jose P. Vigil"
        role="Founder & Chairman"
        img="/ecommerce-assets/i9nv5xl6zfu1ilivbgxy"
        social={{
          instagram: <FaInstagram />,
          linkedin: <FaLinkedinIn />,
          twitter: <FaTwitter />,
        }}
      />
      <Profile
        name="Juanita J. Warren"
        role="Managing Director"
        img="/ecommerce-assets/tyb7wlg2tavgdkjwbqrk"
        social={{
          instagram: <FaInstagram />,
          linkedin: <FaLinkedinIn />,
          twitter: <FaTwitter />,
        }}
      />
      <Profile
        name="Will Smith"
        role="Product Designer"
        img="/ecommerce-assets/yxeftwqmmctrp9ugspqj"
        social={{
          instagram: <FaInstagram />,
          linkedin: <FaLinkedinIn />,
          twitter: <FaTwitter />,
        }}
      />

      </div>
      <Services />
    </div>
  );
};

export default About;

interface ProfileProps {
  name: string;
  role: string;
  img: string;
  social: {
    facebook?: ReactNode;
    instagram?: ReactNode;
    linkedin?: ReactNode;
    twitter?: ReactNode;
  };
}

export const Profile = ({ name, role, img, social }: ProfileProps) => {
  return (
    <div className="people">
      <div className="profile-photo">
        <img src={img} alt={name} />
      </div>
      <div className="profile-details">
        <h2>{name}</h2>
        <p>{role}</p>
        <div className="profile-social">
          {social.facebook}
          {social.instagram}
          {social.linkedin}
          {social.twitter}
        </div>
      </div>
    </div>
  );
};
