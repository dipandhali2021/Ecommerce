import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { IoCallOutline, IoMailOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNewMessageMutation } from "../redux/api/messageAPI";
import { RootState } from "../redux/store";
import { responseToast } from "../utils/features";

export const databaseServer = import.meta.env.VITE_REALTIME_DATABASE;

const Contact = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [userData, setUserata] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [newMessage] = useNewMessageMutation();

  const submitMessageHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !userData.email ||
      !userData.message ||
      !userData.phone ||
      !userData.name
    )
      return toast.error("Please Fill All The Fields");
    const formData = new FormData();
    formData.set("name", userData.name);
    formData.set("email", userData.email);
    formData.set("phone", userData.phone);
    formData.set("message", userData.message);

    const res = await newMessage({ id: user?._id!, formData });
    responseToast(res, null, "");
    setUserata({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
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
            <span>Emails: customer@bytebazaar.com</span>
            <span>Emails: support@bytebazaar.com</span>
          </div>
        </div>
      </div>
      <div className="right-contact-container">
        <form onSubmit={submitMessageHandler}>
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
              type="string"
              placeholder="Your Phone"
              name="phone"
              value={userData.phone}
              onChange={(e) =>
                setUserata({ ...userData, phone: e.target.value })
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
