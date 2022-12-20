import {
  Button,
  EmailInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-password.module.css";
import { Link, Redirect } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../../services/actions/user";

const ForgotPassword = () => {

  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth); 
  const isEmailForUpdatePassword = useSelector((state) => state.user.updatePasswordStatus); 
  const [emailData, setEmailData] = useState({ email: "", result: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePassword(emailData));        //отправляем диспатч с action creator
    setEmailData({ ...emailData, email: "" });  //устанавливаем значения в локальный стейт
  };

  const handleChangeEmailInput = (e) => setEmailData({ ...emailData, email: e.target.value })

  //если авторизация есть - редирект на профиль
  if (isAuth) {
    return <Redirect to="/profile" />;
  } 

  //если емаил получен - редирект на сброс пароля
  if (isEmailForUpdatePassword) {
    return <Redirect to="/reset-password" />;
  } 

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <form className={styles.form} method="post" onSubmit={handleSubmit}>
          <p className="text pb-6 text_type_main-medium">Восстановление пароля</p>
          <EmailInput
            name={"email"}
            value={emailData.email}
            onChange={handleChangeEmailInput}
          />
          <Button>Восстановить</Button>
        </form>
        <p className="text text_color_inactive pb-4 text_type_main-default  ">
          Вспомнили пароль?
          <span>
            <Link to="/login" className={`${styles.link}`}>{" "}Войти</Link>
          </span>
        </p>
      </main>
    </div>
  );
};

export default ForgotPassword;