import styles from "./stats.module.css";
import { useSelector } from "react-redux";
import { getWsOrders } from "../../../../utils/constants";

const Stats = () => {
  const { total, totalToday, orders } = useSelector(getWsOrders);

  if (!orders) {
    return null;
  } 

  return (
    <div className={styles.page}>
      <div className={styles.orderBoard}>
        <div className={styles.column}>
          <p className={`text text_type_main-medium pb-6`}>Готовы:</p>
          <ul className={`${styles.orderList} text text_type_digits-default`}>
            {orders && orders.map(order =>
                order.status === "done" && (<li className="mb-2" key={order.number}>{`${order.number}`}</li>)
            )}
          </ul>
        </div>
        <div className={styles.column}>
          <p className={`text text_type_main-medium pb-6`}>В работе:</p>
          <ul className={`${styles.orderList} text text_type_digits-default`}>
            {orders.map(order =>
                order.status === "pending" && (<li className="mb-2" key={order.number}>{`${order.number}`}</li>)
            )}
          </ul>
        </div>
      </div>
      <p className="text text_type_main-medium">Выполнено за все время:</p>
      <p className={`${styles.number} text text_type_digits-large`}>{total}</p>
      <p className="text text_type_main-medium">Выполнено за сегодня:</p>
      <p className={`${styles.number} text text_type_digits-large`}>{totalToday}</p>
    </div>
  );
};

export default Stats;