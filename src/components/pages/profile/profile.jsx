import styles from "./profile.module.css";
import { Switch, Route } from "react-router-dom";
import ProfileNavigation from "./profile-navigation";
import ProfileInfo from "./profile-info";

const Profile = () => {
  
  return (
    <div className={styles.page}>
      <main className={styles.content}>
        <Route path="/">
          <ProfileNavigation />
          <Switch>
            <Route path='/profile'>
              <ProfileInfo />
            </Route>
          </Switch>
        </Route>
      </main>
    </div>
  );
}

export default Profile;