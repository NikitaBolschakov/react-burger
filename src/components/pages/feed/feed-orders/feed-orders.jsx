import FeedOrdersItem from "./feed-orders-item/feed-orders-item";
import styles from "./feed-orders.module.css";
import { useSelector } from "react-redux";


const FeedOrders = ({display, status}) => {

  const orders = useSelector((store) => store.wsOrders.orders);

  if (!orders) {
    return null;
  } 

  return (
    <section className={`${styles.section} mt-10`}>
      <h1 className="text text_type_main-large" style={{display: `${display}`}}>Лента заказов</h1>
      <ul className={`${styles.feeditems__container}`}>
        {orders.map((order) => (
          <li key={order._id}>
            <FeedOrdersItem order={order} display={status} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FeedOrders;