import Stats from "./stats/stats";
import Orders from "./feed-orders/orders";
import styles from "./feed.module.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  wsConnectionClosed,
  wsConnectionStart,
} from "../../../services/actions/ws-actions";

const Feed = () => {
  const dispatch = useDispatch();
  
  //открываем соединение, при выходе закрываем
  useEffect(() => {
    dispatch(wsConnectionStart());
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <main className={styles.content}>
        <div className={styles.orders}>
          <h2 className={`${styles.title} text text_type_main-large`}>Лента заказов</h2>
          <Orders />
        </div>
        <Stats />
      </main>
    </div>
  );
};

export default Feed;