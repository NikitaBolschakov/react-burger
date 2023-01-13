import { FC } from "react";
import styles from "./profile.module.css";
import { Switch, Route, useRouteMatch, useLocation } from "react-router-dom";
import ProfileNavigation from "./profile-navigation/profile-navigation";
import ProfileInfo from "./profile-info/profile-info";
import Orders from "../feed/feed-orders/orders";
import OrderPage from "../order-page/order-page";
import { ILocationState } from "../../../utils/types";

const Profile: FC = () => {
  
  const location = useLocation<ILocationState>();
  const match = useRouteMatch();

  const background = location.state && location.state.background;
  
  return (
    <div className={styles.page}>
      <Switch location={background || location}>
        <Route path={`${match.path}/orders/:id`} exact>
          <OrderPage />
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