import { Link } from "react-router-dom";
import signInCss from "./signIn.module.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebaseConfig/fireBaseConfig";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "react-spinner-material";
import { useDispatch } from "react-redux";
import { signInAction } from "../../redux/signInReducer/signInReducer";
import { toast } from "react-toastify";

function SignIn() {
  let [isLoading, setIsloading] = useState(true);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let dispatch = useDispatch();

  let navigate = useNavigate();

  //handle SignInlogic
  const handleSignIn = async (e) => {
    e.preventDefault();
    let auth = getAuth(app);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      dispatch(signInAction.signIn());
      setEmail("");
      setPassword("");
      navigate("/");
      toast.success("Sign In successfully");
    } catch (error) {
      toast.error(error.message);
      // console.log(error.message);
    }
  };

  useEffect(() => {
    setIsloading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className={signInCss.spinnerContainer}>
          <Spinner radius={120} color={"#333"} stroke={5} visible={true} />
        </div>
      ) : (
        <div className={signInCss.mainContainer}>
          <div className={signInCss.formContainer}>
            <form className={signInCss.form} onSubmit={handleSignIn}>
              <h2 className={signInCss.text}>Sign In</h2>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your username"
                required
                value={email}
                className={signInCss.input}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
                value={password}
                className={signInCss.input}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className={signInCss.btn}>
                Sign in
              </button>
            </form>
            <Link to="/signUp">
              <p className={signInCss.insted}>Or SignUp instead</p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default SignIn;
