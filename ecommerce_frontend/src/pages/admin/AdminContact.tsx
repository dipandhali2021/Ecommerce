import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Column } from "react-table";
import { Skeleton } from "../../components/Loader";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import {
  useAllMessagesQuery,
  useDeleteMessageMutation,
} from "../../redux/api/messageAPI";
import { RootState } from "../../redux/store";
import { CustomError } from "../../types/api-types";
import { responseToast } from "../../utils/features";

interface DataType {
  name: string;
  email: string;
  phone: string;
  message: string;
  action: ReactElement;
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
  {
    Header: "Action",
    accessor: "action",
  },
];

const AdminContact = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { isError, isLoading, data, error } = useAllMessagesQuery(user._id!);

  const [deleteUser] = useDeleteMessageMutation();

  if (isError) toast.error((error as CustomError).data.message);

  const deleteHandler = async (messageId: string) => {
    const res = await deleteUser({ messageId, adminId: user?._id! });
    responseToast(res, null, "");
  };
  const [rows, setRows] = useState<DataType[]>([]);

  useEffect(() => {
    if (data)
      setRows(
        data?.messages.map((i) => ({
          name: i.name,
          email: i.email,
          phone: i.phone,
          message: i.message,
          action: (
            <button
              onClick={() => deleteHandler(i._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          ),
        }))
      );
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "contact-box",
    "Messages",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-contact">
        <main>{isLoading ? <Skeleton length={20} /> : Table}</main>
      </div>
    </div>
  );
};

export default AdminContact;
