import cartItemCss from "./cartitem.module.css";
import { db } from "../../firebaseConfig/fireBaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { cartAction, cartSelector } from "../../redux/cartReducer/cartReducer";

function CartItems() {
  let [total, setTotal] = useState(0);
  let dispatch = useDispatch();
  let { cart } = useSelector(cartSelector);

  useEffect(() => {
    let unsub = onSnapshot(collection(db, "Cart"), (querySnap) => {
      let order = [];
      querySnap.forEach((docSnap) => {
        //order.push({ id: docSnap.id, ...docSnap.data() }); by using this data id overRight the firebase id
        order.push({ ...docSnap.data(), id: docSnap.id });
      });
      dispatch(cartAction.getAllOrdera(order));
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    async function rem(ord) {
      deleteDoc(doc(db, "Cart", ord.id));
    }

    let initialPrice = 0;
    cart.forEach((ord) => {
      initialPrice = initialPrice + ord.qty * ord.price;
      if (ord.qty === 0) {
        rem(ord);
      }
    });
    setTotal(initialPrice.toFixed(2));
  }, [cart]);

  async function manageQty(id, qty) {
    let availableOrder = cart.find((item) => item.id === id);

    if (availableOrder) {
      try {
        if (availableOrder.qty === 0) {
          return await deleteDoc(doc(db, "Cart", id));
        }
        let newQty = availableOrder.qty + qty;
        await updateDoc(doc(db, "Cart", id), {
          qty: newQty,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      return false;
    }
  }

  async function removeFromCart(id) {
    await deleteDoc(doc(db, "Cart", id));
    toast.success("Item Removed From Cart");
  }

  function purchase() {
    if (total === 0.0) {
      return;
    }
    try {
      cart.map(async (order) => {
        let updateOrder = { ...order, time: new Date().toDateString() };

        await addDoc(collection(db, "Orders"), updateOrder);
        await deleteDoc(doc(db, "Cart", updateOrder.id));
      });
      toast.success("Item Purchased");
    } catch (error) {
      toast.error("something is wrong");
    }
  }

  return (
    <div className={cartItemCss.masterContainer}>
      {cart.length === 0 ? (
        <div className={cartItemCss.emptyCart}>
          {" "}
          <h1>No item Available!</h1>
        </div>
      ) : (
        ""
      )}

      <aside className={cartItemCss.asideContainer}>
        <p> Total Price:- ₹{total} /-</p>
        <button className={cartItemCss.purchaseBtn} onClick={() => purchase()}>
          Purchase
        </button>
      </aside>

      <div className={cartItemCss.mainContainer}>
        {cart.map((order, index) => (
          <div key={index} className={cartItemCss.productContainer}>
            <div className={cartItemCss.imageContainer}>
              <img
                className={cartItemCss.productImage}
                alt="product"
                src={order.image}
              />
            </div>
            <div className={cartItemCss.productDetail}>
              <div className={cartItemCss.productName}>
                <p> {order.name}</p>
              </div>
              <div className={cartItemCss.productPrice}>
                <p>₹ {order.price}</p>
                <img
                  className={cartItemCss.icon}
                  alt="minus"
                  src="./images/minus.png"
                  onClick={() => manageQty(order.id, -1)}
                />
                <p>{order.qty}</p>
                <img
                  className={cartItemCss.icon}
                  alt="minus"
                  src="./images/plus.png"
                  onClick={() => manageQty(order.id, 1)}
                />
              </div>
              <button
                className={cartItemCss.removeCartButton}
                onClick={() => removeFromCart(order.id)}
              >
                Remove From Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartItems;
