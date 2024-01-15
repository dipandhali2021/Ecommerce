import { ChangeEvent, useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { cartReducerInitialState } from "../types/reducer-types";
import { useSelector } from "react-redux";

const Shipping = () => {
  const { cartItems } = useSelector(
    (state: { cartReducer: cartReducerInitialState }) => state.cartReducer
  );

  const navigate = useNavigate(); // navigate to the next page
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


 useEffect(()=>{
  if (cartItems.length <= 0) {
    return navigate("/cart");
  }
 },[cartItems])

  return (
    <div className="shipping">
      <button className="back-btn" onClick={() => navigate("/cart")}>
        <BiArrowBack />
      </button>

      <form>
        <h1>Shipping Address</h1>
        <input
          required
          type="text "
          placeholder="Address"
          name="address"
          value={shippingInfo.address}
          onChange={changeHandler}
        />
        <input
          required
          type="text "
          placeholder="City"
          name="city"
          value={shippingInfo.city}
          onChange={changeHandler}
        />
        <input
          required
          type="text "
          placeholder="State"
          name="state"
          value={shippingInfo.state}
          onChange={changeHandler}
        />
        <select
          name="country"
          required
          value={shippingInfo.country}
          onChange={changeHandler}
        >
          <option value="">Select Country</option>
          <option value="india">India</option>
          <option value="usa">USA</option>
        </select>
        <input
          required
          type="number "
          placeholder="Pin Code"
          name="pinCode"
          value={shippingInfo.pinCode}
          onChange={changeHandler}
        />
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default Shipping;
