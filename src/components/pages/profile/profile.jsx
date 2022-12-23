import styles from "./profile.module.css";
import { Switch, Route, useRouteMatch, useLocation } from "react-router-dom";
import ProfileNavigation from "./profile-navigation/profile-navigation";
import ProfileInfo from "./profile-info/profile-info";
import { useDispatch } from "react-redux";
import FeedOrders from "../feed/feed-orders/feed-orders";
import FeedId from "../feed-id/feed-id";
import { useEffect } from "react";
import { wsConnectionAuthStart, wsConnectionClosed } from "../../../services/actions/wsActions";

const Profile = () => {

  const dispatch = useDispatch();
  const match = useRouteMatch();
  const location = useLocation();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(wsConnectionAuthStart());
    return () => {
      dispatch(wsConnectionClosed());
    };
  }, [dispatch]);
  
  return (
    <div className={styles.page}>
      <Switch location={background || location}>
        <Route path={`${match.path}/orders/:id`} exact>
          <FeedId textAlign={"center"} />
        </Route>
        <Route path={match.path}>
          <main className={styles.content}>
            <ProfileNavigation match={match} /> 
            <Switch location={background || location}>
              <Route path={match.path} exact>
                <ProfileInfo />
              </Route>
              <Route path={`${match.path}/orders`} exact>
                <FeedOrders display={"none"} status={"block"} />
              </Route>
            </Switch>
          </main>
        </Route>
      </Switch>
    </div>
  );
}

export default Profile;