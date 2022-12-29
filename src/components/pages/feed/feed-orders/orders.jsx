import OrderItem from "./order-item/order-item";
import styles from "./orders.module.css";
import { useDispatch, useSelector } from "react-redux";
import { wsConnectionAuthStart, wsConnectionClosed } from "../../../../services/actions/ws-actions";
import { useEffect } from "react";
import { getOrders } from "../../../../utils/constants";

const Orders = () => {

  const dispatch = useDispatch();
  const orders = useSelector(getOrders);

  useEffect(() => {
    dispatch(wsConnectionAuthStart());
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);

  return (
    <div className={`${styles.column} mt-10`}>
      <ul className={`${styles.list}`}>
        {orders && orders.map((order, index) => (<li key={index}><OrderItem order={order} /></li>))}
      </ul>
    </div>
  );
}

export default Orders;