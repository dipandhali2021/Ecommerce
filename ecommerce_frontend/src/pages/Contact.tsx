import axios from "axios";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { IoCallOutline, IoMailOutline } from "react-icons/io5";

export const databaseServer = import.meta.env.VITE_REALTIME_DATABASE;

const Contact = () => {
  const [userData, setUserata] = useState({
    name: "",
    email: "",
    phone: +91,
    message: "",
  });
  

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await axios.post(`${databaseServer}/contact.json`, userData);
    if (res.status === 200) {
      toast.success("Message sent successfully");
      setUserata({
        name: "",
        email: "",
        phone: 0,
        message: "",
      });
    }
  };

  

  return (
    <div className="contact">
      <div className="left-contact-container">
        <div className="call">
          <div className="heading">
            <IoCallOutline />
            <h2>Call to Us</h2>
          </div>
          <div className="description">
            <span>We are available 24/7, 7 days a week.</span>
            <span>Phone: +91 1234567890</span>
          </div>
        </div>
        <div className="call">
          <div className="heading">
            <IoMailOutline />
            <h2>Call to Us</h2>
          </div>
          <div className="description">
            <span>
              Fill out our form and we will contact you within 24 hours.
            </span>
            <span>Emails: customer@exclusive.com</span>
            <span>Emails: support@exclusive.com</span>
          </div>
        </div>
      </div>
      <div className="right-contact-container">
        <form onSubmit={submitHandler}>
          <div className="input-box">
            <input
              required
              type="text "
              placeholder="Your Name"
              name="name"
              value={userData.name}
              onChange={(e) =>
                setUserata({ ...userData, name: e.target.value })
              }
            />
            <input
              required
              type="text "
              placeholder="Your Email"
              name="email"
              value={userData.email}
              onChange={(e) =>
                setUserata({ ...userData, email: e.target.value })
              }
            />
            <input
              required
              type="number"
              placeholder="Your Phone"
              name="phone"
              value={userData.phone}
              onChange={(e) =>
                setUserata({ ...userData, phone: Number(e.target.value) })
              }
            />
          </div>
          <textarea
            required
            placeholder="Message"
            name="message"
            rows={5}
            value={userData.message}
            onChange={(e) =>
              setUserata({ ...userData, message: e.target.value })
            }
          ></textarea>

          <button type="submit" className="btn">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
