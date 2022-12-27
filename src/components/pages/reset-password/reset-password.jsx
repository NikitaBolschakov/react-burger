import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { resetPasswordRequest } from "../../../utils/api";

const ResetPassword = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const isEmailForUpdatePassword = useSelector(
    (state) => state.user.updatePasswordStatus
  );
 
  const [passwordData, setPasswordData] = useState({
    password: "",
    verCode: "",
    result: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPasswordRequest(passwordData).then((res) => {
      setPasswordData({ ...passwordData, result: res.success });
    });

    setPasswordData({ ...passwordData, password: "", verCode: "" });
  };

  //обработчики изменения полей
  const handleChangeCodeInput = (e) =>
    setPasswordData({ ...passwordData, verCode: e.target.value });
  const handleChangePasswordInput = (e) =>
    setPasswordData({ ...passwordData, password: e.target.value });

  //если авторизация есть - редирект на профиль
  if (isAuth) {
    return <Redirect to="/profile" />;
  }

  //если емаил не был получен - редирект на восстановление пароля
  if (!isEmailForUpdatePassword) {
    return <Redirect to="/forgot-password" />;
  }

  //если пароль восстановлен - редирект на вход
  if (passwordData.result) {
    return <Redirect to="/login" />;
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <form className={styles.form} method="post" onSubmit={handleSubmit}>
          <p className="text text_type_main-medium pb-6">
            Восстановление пароля
          </p>
          <PasswordInput
            onChange={handleChangePasswordInput}
            name={"password"}
            value={passwordData.password}
          />
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={handleChangeCodeInput}
            value={passwordData.verCode}
            name={"code"}
            extraClass="ml-1"
          />
          <Button>Сохранить</Button>
        </form>
        <p className="text text_color_inactive text_type_main-default pb-10">
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

export default ResetPassword;
