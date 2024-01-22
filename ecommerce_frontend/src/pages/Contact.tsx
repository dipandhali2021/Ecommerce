import { FormEvent} from "react";
import { IoMailOutline, IoCallOutline } from "react-icons/io5";

const Contact = () => {

  const submitHandler = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  }
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
            <input required type="text " placeholder="Your Name" name="name" />
            <input
              required
              type="text "
              placeholder="Your Email"
              name="email"
            />
            <input
              required
              type="text "
              placeholder="Your Phone"
              name="phone"
            />
          </div>
          <textarea
            required
            placeholder="Message"
            name="message"
            rows={5}
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
