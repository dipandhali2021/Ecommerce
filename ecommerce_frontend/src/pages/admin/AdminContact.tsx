import { useEffect, useState } from "react";
import { databaseServer } from "../Contact";
import axios from "axios";

const AdminContact = () => {
  const [contactData, setContactData] = useState<ContactPersonProps[]>([
    {
      name: "abc",
      email: "abc@gmail.com",
      phone: +921232345,
      message: "abc",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${databaseServer}/contact.json`);

      let values = Object.values(data);
      setContactData(values as ContactPersonProps[]);
    };

    fetchData();
  }, []);

  return (
    <div className="admin-contact">
      <h1>Contact</h1>

      <div>
        {contactData.map((contact, key) => {
          return (
            <ContactPerson
              key={key}
              name={contact.name}
              email={contact.email}
              phone={contact.phone}
              message={contact.message}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AdminContact;

interface ContactPersonProps {
  name: string;
  email: string;
  phone: number;
  message: string;
}

const ContactPerson = ({ name, email, phone, message }: ContactPersonProps) => {
  return (
    <div className="contact-person">
      <h2>{name}</h2>
      <div className="email">
        <h3>Email :</h3>
        <span>{email}</span>
      </div>
      <div className="phone">
        <h3>Phone :</h3>
        <span>{phone}</span>
      </div>
      <div className="message">
        <h3>Message : </h3>
        <span>{message}</span>
      </div>
    </div>
  );
};
