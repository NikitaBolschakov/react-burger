import React from "react";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./login.module.css";
import { Link, Redirect } from "react-router-dom";
import { signIn } from "../../../services/actions/user";

const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(
    (state) => state.user.isAuth  //устанавливаем состояние в стейт
  );   
  const [loginData, setLoginData] = useState({email: "", password: ""}); //локальный стейт для этого компонента

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn(loginData)); //отправляем диспатч с санками в которых значения
    setLoginData({ email: "", password: "" });  //устанавливаем значения в локальный стейт
  };

  //обработчики изменения полей
  const handleChangeEmailInput = e => setLoginData({ ...loginData, email: e.target.value })
  const handleChangePasswordInput = e => setLoginData({ ...loginData, password: e.target.value })

  if (isAuth) {
    return <Redirect to="/" />;
  }  

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <form className={styles.form} method="post" onSubmit={handleSubmit}>
          <p className="text text_type_main-medium pb-6">Вход</p>
          <EmailInput
            name={"email"}
            value={loginData.email || ""}
            onChange={handleChangeEmailInput}
          />
          <PasswordInput
            name={"password"}
            value={loginData.password}
            onChange={handleChangePasswordInput}
          />
          <Button>Войти</Button>
        </form>
        <p className="text text_type_main-default text_color_inactive pb-4">
          Вы — новый пользователь?
          <span>
            <Link to="/register" className={`${styles.link}`}>
              {" "}
              Зарегистрироваться
            </Link>
          </span>
        </p>
        <p className="text text_type_main-default text_color_inactive pb-10">
          Забыли пароль?
          <span>
            <Link to="/forgot-password" className={`${styles.link}`}>
              {" "}
              Восстановить пароль
            </Link>
          </span>
        </p>
      </main>
    </div>
  );
};

export default Login;
