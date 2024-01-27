import { FormEvent, ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Column } from "react-table";
import { Skeleton } from "../../../components/Loader";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import TableHOC from "../../../components/admin/TableHOC";
import {
  useAllCouponQuery,
  useDeleteCouponMutation,
  useNewCouponMutation,
} from "../../../redux/api/couponAPI";
import { RootState } from "../../../redux/store";
import { CustomError } from "../../../types/api-types";
import { responseToast } from "../../../utils/features";

const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const allNumbers = "1234567890";
const allSymbols = "!@#$%^&*()_+";

interface DataType {
  code: string;
  amount: number;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Code",
    accessor: "code",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Coupon = () => {
  const [size, setSize] = useState<number>(8);
  const [prefix, setPrefix] = useState<string>("");
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeCharacters, setIncludeCharacters] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const { user } = useSelector((state: RootState) => state.userReducer);
  const { isLoading, data, isError, error } = useAllCouponQuery(user?._id!);
  const [deleteCoupon] = useDeleteCouponMutation();
  const deleteHandler = async (id: string) => {
    const res = await deleteCoupon({ couponId:id, adminId: user?._id! });
    responseToast(res, null, "");
  };
  const [rows, setRows] = useState<DataType[]>([]);
  if (isError) toast.error((error as CustomError).data.message);
  useEffect(() => {
    if (data)
      setRows(
        data.coupons.map((i) => ({
          code: i.coupon,
          amount: i.amount,
          action:(<button onClick={() => deleteHandler(i._id)}>Delete</button>)
        }))
      );
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "All Coupons",
    rows.length > 6
  )();

  const copyText = async (coupon: string) => {
    await window.navigator.clipboard.writeText(coupon);
    setIsCopied(true);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!includeNumbers && !includeCharacters && !includeSymbols)
      return toast.error("Please Select One At Least");

    let result: string = prefix || "";
    const loopLength: number = size - result.length;

    for (let i = 0; i < loopLength; i++) {
      let entireString: string = "";
      if (includeCharacters) entireString += allLetters;
      if (includeNumbers) entireString += allNumbers;
      if (includeSymbols) entireString += allSymbols;

      const randomNum: number = ~~(Math.random() * entireString.length);
      result += entireString[randomNum];
    }

    setCoupon(result);
    return toast.success("Coupon Generated");
  };

  const [newCoupon] = useNewCouponMutation();

  const submitCouponHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!coupon || !amount) return toast.error("Please Fill All The Fields");
    const formData = new FormData();
    formData.set("amount", String(amount));
    formData.set("coupon", coupon);
    const res = await newCoupon({ id: user?._id!, formData });
    responseToast(res, null, "");
  };

  useEffect(() => {
    setIsCopied(false);
  }, [coupon]);

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="dashboard-app-container">
        <div>
          <section>
            <h1>New Coupon</h1>
            <form className="coupon-form" onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="Text to include"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                maxLength={size}
              />

              <input
                type="number"
                placeholder="Coupon Length"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                min={8}
                max={25}
              />

              <fieldset>
                <legend>Include</legend>

                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={() => setIncludeNumbers((prev) => !prev)}
                />
                <span>Numbers</span>

                <input
                  type="checkbox"
                  checked={includeCharacters}
                  onChange={() => setIncludeCharacters((prev) => !prev)}
                />
                <span>Characters</span>

                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={() => setIncludeSymbols((prev) => !prev)}
                />
                <span>Symbols</span>
              </fieldset>
              <button type="submit">Generate</button>
            </form>

            {coupon && (
              <code>
                {coupon}{" "}
                <span onClick={() => copyText(coupon)}>
                  {isCopied ? "Copied" : "Copy"}
                </span>{" "}
              </code>
            )}
            <aside>
              <form onSubmit={submitCouponHandler}>
                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
                <button type="submit">Create</button>
              </form>
            </aside>
          </section>

          <main>{isLoading ? <Skeleton length={20} /> : Table}</main>
        </div>
      </main>
    </div>
  );
};

export default Coupon;
