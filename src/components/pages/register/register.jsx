import { useState } from "react";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegistration } from "../../../services/actions/user";
import { getIsAuth } from "../../../utils/constants";

const Register = () => {

  const dispatch = useDispatch();
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userRegistration(registerData)); //отправляем диспатч с санками в которых значения
    setRegisterData({ email: "", password: "", name: "" }); //устанавливаем значения в локальный стейт
  };

  //обработчики изменения полей
  const handleChangeNameInput = e => setRegisterData({ ...registerData, name: e.target.value })
  const handleChangeEmailInput = e => setRegisterData({ ...registerData, email: e.target.value })
  const handleChangePasswordInput = e => setRegisterData({ ...registerData, password: e.target.value })

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <form className={styles.form} method="post" onSubmit={handleSubmit}>
          <p className="text text_type_main-medium pb-6">Регистрация</p>

          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={handleChangeNameInput}
            value={registerData.name}
            name={"name"}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
          />

          <Input
            type={"email"}
            placeholder={"E-mail"}
            name={"email"}
            value={registerData.email}
            onChange={handleChangeEmailInput}
          />

          <PasswordInput
            value={registerData.password}
            onChange={handleChangePasswordInput}
            name={"password"}
          />

          <Button>Зарегистрироваться</Button>
        </form>
        <p className="text text_type_main-default text_color_inactive pb-10">
          Уже зарегистрированы?
          <span>
            <Link to="/login" className={`${styles.link}`}>{" "}Войти</Link>
          </span>
        </p>
      </main>
    </div>
  );
};

export default Register;