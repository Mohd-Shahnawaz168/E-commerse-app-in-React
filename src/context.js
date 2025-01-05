// import { createContext, useContext, useEffect, useState } from "react";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   updateProfile,
// } from "firebase/auth";
// import itemData from "./data/data";
// import { app } from "./firebaseConfig/fireBaseConfig";
// import { db } from "./firebaseConfig/fireBaseConfig";
// import { collection, addDoc } from "firebase/firestore";
// import { toast } from "react-toastify";

// let CustomContext = createContext();

// let useCustomContext = () => {
//   return useContext(CustomContext);
// };

// let CustomContextProvider = ({ children, setprotectedRoute }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [signIn, setSignIn] = useState(false);
//   const [catFilter, setCatFilter] = useState([]);
//   const [data, setData] = useState([]);
//   const [priceRange, setPriceRange] = useState(0);

//   let addToCart = async (prod) => {
//     if (signIn) {
//       prod.qty = 1;
//       const cartRef = collection(db, "Cart");

//       //Adding data to fireBase database
//       await addDoc(cartRef, prod);
//       toast.success("Item Added ");

//       //let data = await addDoc(cartRef, prod); //to get Id of given data
//       //console.log(data.id);
//     } else {
//       toast.error("Please login First");
//     }
//   };

//   useEffect(() => {
//     setData(itemData);
//   }, []);

//   //handle SignUplogic
//   const hangleSignUp = async (e) => {
//     e.preventDefault();

//     //getauth acccess from fireBase
//     let auth = getAuth(app);
//     try {
//       const userCredentials = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       //after signUp change display name to Name provided
//       let user = userCredentials.user;
//       await updateProfile(user, {
//         displayName: name,
//       });

//       toast.success("Sign Up successfully");
//     } catch (error) {
//       console.log(error.message);
//       toast.error("Something Went wrong ");
//     }
//     //clear inputs
//     clear();
//   };

//   function handleLogout() {
//     setSignIn(false);
//   }

//   function clear() {
//     setEmail("");
//     setPassword("");
//     setName("");
//   }

//   function CategoryFilter(filterExp) {
//     setCatFilter((prevCatFilter) => {
//       const newFilter = prevCatFilter.includes(filterExp)
//         ? prevCatFilter.filter((f) => f !== filterExp)
//         : [...prevCatFilter, filterExp];

//       // Filter data after updating the filter list
//       const filteredData = itemData.filter((item) =>
//         newFilter.includes(item.category)
//       );
//       setData(filteredData); // Update filtered data

//       //if nothing is in newFilter set data to allData available
//       if (newFilter.length === 0) {
//         setData(itemData);
//       }
//       return newFilter; // Return the updated filter
//     });
//   }

//   //Update setData based on search
//   let textSearch = (text) => {
//     //lowerCase all text
//     let searchText = text.toLowerCase();

//     let FilterdArray = [];
//     itemData.forEach((item) => {
//       //lowercase description and split to array of string after whte space
//       let splitDescription = item.description.toLowerCase().split(" ");

//       //filter  searchText from splitDescription
//       let Matches = splitDescription.filter((word) => word === searchText);

//       //if we get data from filter push all item in filteredArray
//       if (Matches.length > 0) {
//         FilterdArray.push({ ...item });
//       }
//     });

//     // set filtered array to setData so that rerendering can be done
//     setData(FilterdArray);

//     //if search is empty set Data to allItems
//     if (text === "") {
//       setData(itemData);
//     }
//   };

//   let priceRangeFilter = (price) => {
//     let rangedProd = itemData.filter((item) => item.price <= price);
//     setPriceRange(price);
//     setData(rangedProd);
//   };

//   return (
//     <CustomContext.Provider
//       value={{
//         email,
//         setEmail,
//         password,
//         setPassword,
//         name,
//         hangleSignUp,
//         setName,
//         signIn,
//         setSignIn,
//         handleLogout,
//         addToCart,
//         CategoryFilter,
//         data,
//         priceRange,
//         setPriceRange,
//         setprotectedRoute,
//         textSearch,
//         priceRangeFilter,
//       }}
//     >
//       {children}
//     </CustomContext.Provider>
//   );
// };

// export default CustomContextProvider;
// export { useCustomContext };
