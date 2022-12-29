import styles from "./profile.module.css";
import { Switch, Route, useRouteMatch, useLocation } from "react-router-dom";
import ProfileNavigation from "./profile-navigation/profile-navigation";
import ProfileInfo from "./profile-info/profile-info";
import Orders from "../feed/feed-orders/orders";
import OrderPage from "../order-page/order-page";

const Profile = () => {

  const match = useRouteMatch("/profile");
  const location = useLocation();
  const background = location.state && location.state.background;
  
  return (
    <div className={styles.page}>
      <Switch location={background || location}>
        <Route path={`${match.path}/orders/:id`} exact>
          <OrderPage textAlign={"center"} />
        </Route>
        <Route path={match.path}>
          <main className={styles.content}>
            <ProfileNavigation match={match} /> 
            <Switch location={background || location}>
              <Route path={match.path} exact>
                <ProfileInfo />
              </Route>
              <Route path={`${match.path}/orders`} exact>
                <Orders />
              </Route>
            </Switch>
          </main>
        </Route>
      </Switch>
    </div>
  );
}

export default Profile;