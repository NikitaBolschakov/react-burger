import FeedInfo from "./feed-info/feed-info";
import FeedOrders from "./feed-orders/feed-orders";
import styles from "./feed.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { wsConnectionClosed, wsConnectionStart } from "../../../services/actions/ws-actions";



const Feed = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnectionStart());
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]); 

  return (
    <div className={styles.page}>
      <main className={styles.content}>
        <FeedOrders display = {'block'} status={'none'}/>
        <FeedInfo />
      </main>
    </div>
  );
}

export default Feed;