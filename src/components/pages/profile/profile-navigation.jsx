import styles from "./profile-navigation.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../services/actions/user";
import { deleteCookie } from "../../../utils/cookie";

const ProfileNavigation = () => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(logout());
    deleteCookie("refreshToken");
    deleteCookie("accessToken");
  };

  return (
    <div className={styles.content}>
      <NavLink
        to="/profile"
        className={`${styles.link} text text_type_main-medium`}
        activeClassName={styles.link__active}
        exact
      >
        Профиль
      </NavLink>
      <NavLink
        to="/orders"
        className={`${styles.link} text text_type_main-medium`}
        activeClassName={styles.link__active}
        exact
      >
        История заказов
      </NavLink>
      <button
        className={`${styles.logout__btn} text text_type_main-medium`}
        onClick={() => {
          signOut();
        }}
      >
        Выход
      </button>
      <p className={`${styles.text} text text_type_main-small`}>
        В этом разделе вы можете <br /> изменить свои персональные данные
      </p>
    </div>
  );
}

export default ProfileNavigation;