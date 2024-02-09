import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { useLoginMutation } from "../redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../types/api-types";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [processing, setProcessing] = useState(false);

  const navigate = useNavigate();

  const [login] = useLoginMutation();
  const registerHandler = async () => {
    try {
      setProcessing(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const res = await login({
        name: name!,
        email: user.email!,
        photo:
          "https://res.cloudinary.com/da9skd1ks/image/upload/v1706444003/ecommerce-assets/n9zo9cdhtcjzwhyrwx1w",
        gender,
        role: "user",
        dob: date,
        _id: user.uid!,
      });

      if ("data" in res) {
        toast.success(res.data.message);
        navigate("/");
      } else {
        const error = res.error as FetchBaseQueryError;
        const messsage = (error.data as MessageResponse).message;
        toast.error(messsage);
      }
      setProcessing(false);
    } catch (error) {
      setProcessing(false);
      toast.error((error as Error).message);
    }
  };

  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const user = await signInWithPopup(auth, provider);
      const res = await login({
        name: user.user.displayName!,
        email: user.user.email!,
        photo:
          user.user.photoURL ||
          "https://res.cloudinary.com/da9skd1ks/image/upload/v1706444003/ecommerce-assets/n9zo9cdhtcjzwhyrwx1w",
        gender,
        role: "user",
        dob: date,
        _id: user.user.uid!,
      });

      if ("data" in res) {
        toast.success(res.data.message);
        navigate("/");
      } else {
        const error = res.error as FetchBaseQueryError;
        const messsage = (error.data as MessageResponse).message;
        toast.error(messsage);
      }
    } catch (error) {
      toast.error("error");
    }
  };

  return (
    <div className="login">
      <section></section>

      <main>
        <h1>Create an account</h1>
        <p>Enter your details below</p>
        <div>
          <input
            required
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
        </div>
        <div>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>

        <div>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <div>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <input
            required
            placeholder="DD/MM/YYYY"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <button onClick={registerHandler}>
            {!processing ? "Register" : "Processing"}
          </button>
        </div>
        <div>
          <p>*Fill Gender and Date of Birth before Sign up with Google</p>
        </div>
        <aside>
          <button onClick={loginHandler}>
            <FcGoogle />
            <span>Sign In with Google</span>
          </button>
        </aside>
        <div>
          <p>Already have account?</p>
          <Link to={"/login"}>Log In</Link>
        </div>
      </main>
    </div>
  );
};

export default Register;
