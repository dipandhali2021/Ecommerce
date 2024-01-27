import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import { Skeleton } from "../components/Loader";
import TableHOC from "../components/admin/TableHOC";
import {
  useDeleteMyOrderMutation,
  useMyOrdersQuery,
} from "../redux/api/orderAPI";
import { RootState } from "../redux/store";
import { CustomError } from "../types/api-types";
import { responseToast } from "../utils/features";
type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  details: ReactElement;
  action: ReactElement;
};

const column: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Details",
    accessor: "details",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Orders = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { isLoading, data, isError, error } = useMyOrdersQuery(user?._id!);
  if (isError) toast.error((error as CustomError).data.message);

  const userId = user?._id!;
  const [myOrderDelete] = useDeleteMyOrderMutation();
  const deleteHandler = async (orderId: string) => {
    const res = await myOrderDelete({
      userId,
      orderId,
    });
    responseToast(res, null, "");
  };
  const [rows, setRows] = useState<DataType[]>([]);
  useEffect(() => {
    if (data)
      setRows(
        data.orders.map((i) => ({
          _id: i._id,
          amount: i.total,
          discount: i.discount,
          quantity: i.orderItems.length,
          status: (
            <span
              className={
                i.status === "Processing"
                  ? "red"
                  : i.status === "Shipped"
                  ? "green"
                  : "purple"
              }
            >
              {i.status}
            </span>
          ),
          details: (
            <Link to={`/order/${i._id}`}>
              <span>Details</span>
            </Link>
          ),
          action:
            user.role === "admin" ? (
              <Link to={`/admin/transaction/${i._id}`}>Manage</Link>
            ) : (
              <Link onClick={() => deleteHandler(i._id)} to={"/orders"}>
                Cancel
              </Link>
            ),
        }))
      );
  }, [data]);
  const Table = TableHOC<DataType>(
    column,
    rows,
    "dashboard-product-box",
    "Orders",
    rows.length > 6 ? true : false
  )();
  return (
    <div className="container">
      <div className="my-orders">
        <h1>My Orders</h1>
        <main>{isLoading ? <Skeleton length={20} /> : Table}</main>
      </div>
    </div>
  );
};

export default Orders;
