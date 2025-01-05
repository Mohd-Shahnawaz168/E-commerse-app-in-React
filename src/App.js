import HomePage from "./components/Homepage/homepage";
import NavBar from "./components/Navbar/navBar";
import SignIn from "./components/SignIn/signIn";
import SignUp from "./components/SignUp/signUp";
import CartItems from "./components/cartItem/cartItem";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MyOrder from "./components/myOrder/myOrder";
import { useSelector } from "react-redux";
import { signInSelector } from "./redux/signInReducer/signInReducer";

function App() {
  let { signIn } = useSelector(signInSelector);

  let ProtectedRoute = ({ children }) => {
    //protecting route so that only Signin user can access
    //console.log(signIn);
    if (signIn) {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  };

  let router = createBrowserRouter([
    {
      path: "/",
      element: <NavBar />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "signIn",
          element: <SignIn />,
        },
        {
          path: "signUp",
          element: <SignUp />,
        },
        {
          path: "Cart",
          element: (
            <ProtectedRoute>
              <CartItems />
            </ProtectedRoute>
          ),
        },
        {
          path: "MyOrder",
          element: (
            <ProtectedRoute>
              <MyOrder />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider
        router={router}
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      />
    </>
  );
}

export default App;
