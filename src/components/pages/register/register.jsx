import {React, useState} from "react";
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegistration } from "../../../services/actions/user";

const Register = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.user.isAuth); 
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

  if (isAuth) {
    return <Redirect to="/profile" />;
  }  

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

          <EmailInput
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

export default Register;


// "accessToken":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOGYxNzlhOTlhMjVjMDAxY2Q2NDZiZiIsImlhdCI6MTY3MDMyMjA3NCwiZXhwIjoxNjcwMzIzMjc0fQ.3CetrQbBde7eUs5YiFaqmFG0HriE0YD70PF0AndsBeE",
// "refreshToken":"842a87596de9af8285eaa8d269e308837094947f793c76d73bb77df83fb286e2df952dccf08f491f"}