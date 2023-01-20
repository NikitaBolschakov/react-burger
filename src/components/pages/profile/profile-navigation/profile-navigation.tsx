import { FC } from "react";
import styles from "./profile-navigation.module.css";
import { match, NavLink } from "react-router-dom";
import { logout } from "../../../../services/actions/user";
import { deleteCookie } from "../../../../utils/cookie";
import { useDispatch } from "../../../../services/types/hooks";

interface IProfileNavigationProps {
  match: match;
}

const ProfileNavigation: FC<IProfileNavigationProps> = ({match}) => {
  
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(logout());
    deleteCookie("refreshToken");
    deleteCookie("accessToken");
  };

  return (
    <div className={styles.content}>
      <NavLink
        to={match.url}
        className={`${styles.link} text text_type_main-medium`}
        activeClassName={styles.link__active}
        exact
      >
        Профиль
      </NavLink>
      <NavLink
        to={`${match.url}/orders`}
        className={`${styles.link} text text_type_main-medium`}
        activeClassName={styles.link__active}
        exact
      >
        История заказов
      </NavLink>
      <button
        className={`${styles.logout__button} text text_type_main-medium`}
        onClick={() => {signOut()}}
      >
        Выход
      </button>
      <p className={`${styles.text} text text_type_main-small`}>
        В этом разделе вы можете <br /> изменить свои персональные данные
      </p>
    </div>
  );
};

export default ProfileNavigation;
