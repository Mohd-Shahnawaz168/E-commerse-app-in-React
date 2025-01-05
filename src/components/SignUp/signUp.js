import { Link } from "react-router-dom";
import signUpCss from "./signUp.module.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { app } from "../../firebaseConfig/fireBaseConfig";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  getAuth,
} from "firebase/auth";

function SignUp() {
  let [email, setEmail] = useState("");
  let [name, setName] = useState("");
  let [password, setPassword] = useState("");

  const hangleSignUp = async (e) => {
    e.preventDefault();

    //getauth acccess from fireBase
    let auth = getAuth(app);
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      //after signUp change display name to Name provided
      let user = userCredentials.user;
      await updateProfile(user, {
        displayName: name,
      });

      toast.success("Sign Up successfully");
    } catch (error) {
      console.log(error.message);
      toast.error("Something Went wrong ");
    }
    //clear inputs
    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <div className={signUpCss.mainContainer}>
      <div className={signUpCss.formContainer}>
        <form className={signUpCss.form} onSubmit={hangleSignUp}>
          <h2 className={signUpCss.text}>Sign Up</h2>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            required
            className={signUpCss.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Enter your Email"
            required
            className={signUpCss.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            className={signUpCss.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className={signUpCss.btn}>
            Sign up
          </button>
        </form>
        <Link to="/signIn">
          <p className={signUpCss.insted}>
            If you hve already registered please Sign in
          </p>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
