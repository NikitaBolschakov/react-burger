import styles from "./not-found.module.css";
import { FC } from "react";

const NotFound: FC = () => {
    return (
        <div className={styles.page}>
            <h1 className="text text_type_digits-large">404</h1>
            <p className="text text_type_main-default text_color_inactive">Похоже страница не найдена...</p>
        </div>
    )
}

export default NotFound;