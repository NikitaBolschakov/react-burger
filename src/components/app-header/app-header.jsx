import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components"; 
import { NavLink } from "react-router-dom";

const AppHeader = () => {
  return ( 
    <header className={styles.header}> 
      <nav className={styles.container}>
        <ul className={styles.list}>

          <li className={`${styles.item} ${styles.item_l}`}>
            <NavLink
              className={`${styles.link} pl-5 pr-5 pb-4 pt-4`}
              activeClassName={styles.link__active}
              to="/"  exact>
              <BurgerIcon type="primary" />
              <p className={`${styles.text} text text_type_main-default pl-2`}>Конструктор</p>
            </NavLink>
          </li>

          <li className={`${styles.item} ${styles.item_l} ml-2`}>
            <NavLink
              className={`${styles.link} pl-5 pr-5 pb-4 pt-4`}
              activeClassName={styles.link__active}
              to="/feed"
              exact>
              <ListIcon type="secondary" />
              <p className={`${styles.text} text text_type_main-default pl-2`}>
                Лента заказов
              </p>
            </NavLink>
          </li>

          <li className={`${styles.item} ${styles.logo}`}>
            <Logo />
          </li>
          
          <li className={`${styles.item} ${styles.item_r}`}>
            <NavLink
              className={`${styles.link} pl-5 pr-5 pb-4 pt-4`}
              activeClassName={styles.link__active}
              to="/profile"
              exact>
              <ProfileIcon type="secondary" />
              <p className={`${styles.text} text text_type_main-default pl-2`}>
                Личный кабинет
              </p>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
