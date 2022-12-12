import React from "react";
import {
  Button,
  EmailInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-password.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePassword } from "../../../services/actions/user";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [emailData, setEmailData] = useState({ email: "", result: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePassword(emailData)); //отправляем диспатч с санками в которых значения
    setEmailData({ ...emailData, email: "" });  //устанавливаем значения в локальный стейт
  };

  const handleChangeEmailInput = e => setEmailData({ ...emailData, email: e.target.value })

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <form className={styles.form} method="post" onSubmit={handleSubmit}>
          <p className="text text_type_main-medium pb-6">Восстановление пароля</p>
          <EmailInput
            name={"email"}
            value={emailData.email}
            onChange={handleChangeEmailInput}
          />
          <Button>Восстановить</Button>
        </form>
        <p className="text text_type_main-default text_color_inactive pb-4">
          Вспомнили пароль?
          <span>
            <Link to="/login" className={`${styles.link}`}>
              {" "}
              Войти
            </Link>
          </span>
        </p>
      </main>
    </div>
  );
};

export default ForgotPassword;