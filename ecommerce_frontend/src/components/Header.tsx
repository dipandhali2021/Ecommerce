import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaHeart,
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { getUser } from "../redux/api/userAPI";
import { userExists, userNotExists } from "../redux/reducer/userReducer";
import { RootState } from "../redux/store";

const Header = () => {
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
  const { user } = useSelector((state: RootState) => state.userReducer);
  useEffect(() => {}, [user]);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getUser(user.uid);
        dispatch(userExists(data.user));
      } else {
        dispatch(userNotExists());
      }
    });
  }, []);

  return (
    <div className="top-bar">
      <nav className="offer">
        <div className="offer-deatils">
          <p>
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          </p>
        </div>

        <div className="language">
       
        </div>
      </nav>
      <nav className="header">
        <Link className="logo" to={"/"}>
          <span>B</span>
          <p>yte</p>
          <span>B</span>
          <p>azaar</p>
        </Link>

        <div className="navigation">
          <Link to={"/"}>Home</Link>
          <Link to={"/contact"}>Contact</Link>
          <Link to={"/about"}>About</Link>
        </div>

        <Link to={"/search"}>
          <div className="search-box">
            <span>What are you looking for?</span>

            <FaSearch />
          </div>
        </Link>

        <div className="account">
          <Link to={"/wishlist"}>
            <FaHeart />
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
                <span onClick={()=>setIsOpen(!isOpen)}>
                  <IoCloseCircle />
                </span>
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
                    <span>Logout</span>
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
