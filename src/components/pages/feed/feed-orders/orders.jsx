import OrderItem from "./order-item/order-item";
import styles from "./orders.module.css";
import { useSelector } from "react-redux";

const Orders = () => {
  const orders = useSelector((store) => store.wsOrders.orders);

  return (
    <div className={`${styles.column} mt-10`}>
      <ul className={`${styles.list}`}>
        {orders && orders.map((order, index) => (<li key={index}><OrderItem order={order} /></li>))}
      </ul>
    </div>
  );
}

export default Orders;