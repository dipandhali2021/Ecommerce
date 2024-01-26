import axios from "axios";
import { useEffect, useState } from "react";
import { Column } from "react-table";
import { Skeleton } from "../../components/Loader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { databaseServer } from "../Contact";

interface DataType {
  name: string;
  email: string;
  phone: number;
  message: string;
}

const columns: Column<DataType>[] = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Phone",
    accessor: "phone",
  },
  {
    Header: "Message",
    accessor: "message",
  },
];

const AdminContact = () => {
  const [contactData, setContactData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await axios.get(`${databaseServer}/contact.json`);
      let values = Object.values(data);
      setContactData(values as DataType[]);
      setLoading(false);
    };

    fetchData();
  }, []);

  const [rows, setRows] = useState<DataType[]>([]);
  useEffect(() => {
    if (contactData)
      setRows(
        contactData.map((i) => ({
          name: i.name,
          email: i.email,
          phone: i.phone,
          message: i.message,
        }))
      );
  }, [contactData]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "contact-box",
    "Contact",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-contact">
        <main>{loading ? <Skeleton length={20} /> : Table}</main>
      </div>
    </div>
  );
};

export default AdminContact;
