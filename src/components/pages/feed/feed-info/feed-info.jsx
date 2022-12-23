import styles from "./feed-info.module.css";
import { useSelector } from "react-redux"; 

const FeedInfo = () => {
  
  const { total, totalToday, orders } = useSelector((store) => store.wsOrders);

  if (!orders) {
    return null;
  }
 
  return (
    <div className={styles.section}>
      <div className={styles.status__container}>
        <div className={styles.status__container_orders}>
          <p className={`${styles.status__text} text text_type_main-medium`}>
            Готовы:
          </p>
          <ul
            className={`${styles.orders__list} text text_type_digits-default`}
            style={{ color: "#00CCCC" }}
          >
            {orders.map(
              (order) =>
                order.status === "done" && (
                  <li key={order.number} className="mb-2">
                     {`${order.number}`}
                  </li>
                )
            )}
          </ul>
        </div>
        <div className={styles.status__container_orders}>
          <p className={`${styles.status__text} text text_type_main-medium`}>
            В работе:
          </p>
          <ul
            className={`${styles.orders__list} text text_type_digits-default`}
          >
            {orders.map(
              (order) =>
                order.status === "pending" && (
                  <li key={order.number} className="mb-2">
                    {`${order.number}`}
                  </li>
                )
            )}
          </ul>
        </div>
      </div>
      <p className="text text_type_main-medium">Выполнено за все время:</p>
      <p className={`${styles.number} text text_type_digits-large mb-15`}>{total}</p>
      <p className="text text_type_main-medium">Выполнено за сегодня:</p>
      <p className={`${styles.number} text text_type_digits-large`}>{totalToday}</p>
    </div>
  );
}

export default FeedInfo;