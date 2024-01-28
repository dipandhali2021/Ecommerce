import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useLoginMutation } from "../redux/api/userAPI";
import { MessageResponse } from "../types/api-types";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name] = useState("");
  const [gender] = useState("");
  const [date] = useState("");
  const [login] = useLoginMutation();
  const [processing, setProcessing] = useState(false);

  const navigate = useNavigate();

  const registerHandler = async () => {
    try {
      setProcessing(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const res = await login({
        name: name!,
        email: user.email!,
        photo: "../src/assets/profile.png",
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
        photo: user.user.photoURL || "../src/assets/profile.png",
        gender,
        role: "user",
        dob: date,
        _id: user.user.uid!,
      });

      if ("data" in res) {
        toast.success(res.data.message);
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
        <h1>Log in to ByteBazaar</h1>
        <p>Enter your details below</p>

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
          <button onClick={registerHandler}>
            {!processing ? "Log In" : "Processing"}
          </button>
        </div>
        <aside>
          <button onClick={loginHandler}>
            <FcGoogle />
            <span>Log In with Google</span>
          </button>
        </aside>
        <div>
          <p>Create new Account </p>
          <Link to={"/register"}>Register</Link>
        </div>
      </main>
    </div>
  );
};

export default Login;
