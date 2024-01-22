import { signOut } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { User } from "../types/types";

interface PropsType {
  user: User | null;
}

const Header = ({ user }: PropsType) => {
  const [isOpen, setIsOpen] = useState(false);
  const logoutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign out successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("Sign Out Failed");
    }
  };

  return (
    <div className="top-bar">
      <nav className="offer">
        <div className="offer-deatils">
          <p>
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          </p>
          <Link to={"/"}>ShopNow</Link>
        </div>

        <div className="language">
          <select>
            <option value="">English</option>
            <option value="">Hindi</option>
            <option value="asc">Japanese</option>
            <option value="dsc">Spanish</option>
          </select>
        </div>
      </nav>
      <nav className="header">
        <Link className="logo" to={"/"}>
          Ecommerce
        </Link>

        <div className="navigation">
          <Link to={"/"}>Home</Link>
          <Link to={"/contact"}>Contact</Link>
          <Link to={"/about"}>About</Link>
        </div>

        <Link to={"/search"}>
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="What are you looking for?"
            />

            <FaSearch />
          </div>
        </Link>

        <div className="account">
          <Link to={"/wishlist"}>
            <MdOutlineFavoriteBorder />
          </Link>
          <Link to={"/cart"}>
            <FaShoppingBag />
          </Link>
          {user?._id ? (
            <>
              <button onClick={() => setIsOpen((prev) => !prev)}>
                <FaUser />
              </button>
              <dialog open={isOpen}>
                <div>
                  {user.role === "admin" && (
                    <Link
                      onClick={() => setIsOpen(false)}
                      to={"/admin/dashboard"}
                    >
                      Admin
                    </Link>
                  )}

                  <Link onClick={() => setIsOpen(false)} to={"/orders"}>
                    Orders
                  </Link>
                  <button onClick={logoutHandler}>
                    <FaSignOutAlt />
                  </button>
                </div>
              </dialog>
            </>
          ) : (
            <Link onClick={() => setIsOpen(false)} to={"/register"}>
              <FaSignInAlt />
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
