import { useState, FC, FormEvent, ChangeEvent } from "react";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { Link } from "react-router-dom";
import { signIn } from "../../../services/actions/user";
import { useDispatch } from "../../../services/types/hooks";

const Login: FC = () => {

  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({email: "", password: ""}); //локальный стейт для этого компонента

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signIn(loginData)); 
    setLoginData({ email: "", password: "" });  //устанавливаем значения в локальный стейт
  };

  //обработчики изменения полей
  const handleChangeEmailInput = (e: ChangeEvent<HTMLInputElement>) => setLoginData(
    { ...loginData, email: e.target.value }
  );
  const handleChangePasswordInput = (e: ChangeEvent<HTMLInputElement>) => setLoginData(
    { ...loginData, password: e.target.value }
  );

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <form className={styles.form} method="post" onSubmit={handleSubmit}>
          <p className="text text_type_main-medium pb-6">Вход</p>
          <Input
            type={"email"}
            placeholder={"E-mail"}
            name={"email"}
            value={loginData.email || ""}
            onChange={handleChangeEmailInput}
          />
          <PasswordInput
            name={"password"}
            value={loginData.password}
            onChange={handleChangePasswordInput}
          />
          <Button htmlType="submit">Войти</Button>
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
