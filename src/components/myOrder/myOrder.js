import { useEffect, useState } from "react";
import MyOrderCss from "./myOrder.module.css";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig/fireBaseConfig";
import Spinner from "react-spinner-material";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrder,
  orderAction,
  orderSelector,
} from "../../redux/orderReducer/orderReducer";

function MyOrder() {
  let dispatch = useDispatch();
  let { orders } = useSelector(orderSelector);
  let [total, setTotal] = useState(0);
  let [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    // let ordered = [];
    // let unsub = onSnapshot(collection(db, "Orders"), (onsnap) => {
    //   onsnap.forEach((doc) => ordered.push(doc.data()));
    //   dispatch(orderAction.getAllOrder(ordered));
    // });
    // setIsloading(false);
    // return unsub;
    dispatch(getAllOrder());
    setIsloading(false);
  }, []);

  useEffect(() => {
    let initialPrice = 0;
    orders.forEach((ord) => {
      initialPrice = initialPrice + ord.qty * ord.price;
    });
    setTotal(initialPrice.toFixed(2));
  }, [orders]);

  return (
    <>
      {isLoading ? (
        <div className={MyOrderCss.spinnerContainer}>
          <Spinner radius={120} color={"#333"} stroke={5} visible={true} />
        </div>
      ) : (
        <div className={MyOrderCss.orderContainer}>
          <h1>Your Orders</h1>
          <div className={MyOrderCss.tablediv}>
            <table className={MyOrderCss.table}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Date</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((prod, index) => (
                  <tr key={index}>
                    <td>{prod.name}</td>
                    <td>₹ {prod.price}</td>
                    <td>{prod.time}</td>
                    <td> {prod.qty}</td>
                    <td>₹ {prod.qty * prod.price}</td>
                  </tr>
                ))}

                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>₹{total}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default MyOrder;
