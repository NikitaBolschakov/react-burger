import React from "react";
import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components"; 

const AppHeader = () => {
  return ( 
    <header className={styles.header}> 
      <nav className={styles.container}>
        <ul className={styles.list}>
          <li className={`${styles.item} ${styles.item_left}`}>
            <a
              className={`${styles.link} pl-5 pr-5 pb-4 pt-4`}
              href="#constructor">
              <BurgerIcon type="primary" />
              <p className="text text_type_main-default pl-2">Конструктор</p>
            </a>
          </li>
          <li className={`${styles.item} ${styles.item_left} ml-2`}>
            <a
              className={`${styles.link} pl-5 pr-5 pb-4 pt-4`}
              href="#orderFeed">
              <ListIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive pl-2">
                Лента заказов
              </p>
            </a>
          </li>
          <li className={`${styles.item} ${styles.logo}`}>
            <Logo />
          </li>
          <li className={`${styles.item} ${styles.item_right}`}>
            <a
              className={`${styles.link} pl-5 pr-5 pb-4 pt-4`}
              href="#userAccount">
              <ProfileIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive pl-2">
                Личный кабинет
              </p>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
