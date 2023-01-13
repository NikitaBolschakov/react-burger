import {  FC, useEffect } from "react";
import OrderItem from "./order-item/order-item";
import styles from "./orders.module.css";
import { wsConnectionAuthStart, wsConnectionClosed } from "../../../../services/actions/ws-actions";
import { getOrders } from "../../../../utils/constants";
import { useDispatch, useSelector } from "../../../../services/types/hooks";

const Orders: FC = () => {

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