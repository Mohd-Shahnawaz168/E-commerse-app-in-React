import itemCss from "./items.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addProductInCart,
  cartSelector,
} from "../../redux/cartReducer/cartReducer";
import { onSnapshot, collection } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../firebaseConfig/fireBaseConfig";
import { cartAction } from "../../redux/cartReducer/cartReducer";
import { useSelector } from "react-redux";
import { signInSelector } from "../../redux/signInReducer/signInReducer";
import { toast } from "react-toastify";

function Items(props) {
  let dispatch = useDispatch();
  const { product } = props;
  let { signIn } = useSelector(signInSelector);
  let [isadding, setIsAdding] = useState(false);
  let { cart } = useSelector(cartSelector);

  useEffect(() => {
    let unsub = onSnapshot(collection(db, "Cart"), (querySnap) => {
      let order = [];
      querySnap.forEach((docSnap) => {
        order.push({ ...docSnap.data(), id: docSnap.id });
      });
      dispatch(cartAction.getAllOrdera(order));
    });
    return () => unsub();
  }, [cart, dispatch]);

  let Adding = (product) => {
    if (signIn) {
      let findedItem = cart.find((item) => {
        return item.name === product.name;
      });
      console.log(findedItem);
      if (findedItem) {
        toast.info("Item already available in Cart");
        return;
      } else {
        dispatch(addProductInCart(product));
        setIsAdding(true);

        setTimeout(() => {
          setIsAdding(false);
        }, 1000);
      }
    } else {
      toast.error("Please login to add item in cart");
    }
  };

  return (
    <div className={itemCss.productContainer}>
      <div className={itemCss.imageContainer}>
        <img
          className={itemCss.productImage}
          alt="product"
          src={product.image}
        />
      </div>
      <div className={itemCss.productDetail}>
        <div className={itemCss.productName}>
          <p>{product.name}</p>
        </div>
        <div className={itemCss.productPrice}>
          <p>₹ {product.price}</p>
        </div>
        <button
          className={itemCss.addCartButton}
          onClick={() => Adding(product)}
        >
          {isadding ? "Adding" : "Add To Cart"}
        </button>
      </div>
    </div>
  );
}

export default Items;
