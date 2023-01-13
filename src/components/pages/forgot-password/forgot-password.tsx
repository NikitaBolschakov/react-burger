import { useState, FC, FormEvent, ChangeEvent } from "react";
import {
  Button,
  Input
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-password.module.css";
import { Link, Redirect } from "react-router-dom";
import { updatePassword } from "../../../services/actions/user";
import { useDispatch, useSelector } from "../../../services/types/hooks";
import { getIsEmailForUpdatePassword } from "../../../utils/constants";

const ForgotPassword: FC = () => {

  const dispatch = useDispatch();

  const isEmailForUpdatePassword = useSelector(getIsEmailForUpdatePassword); 
  const [emailData, setEmailData] = useState({ email: "", result: false });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updatePassword(emailData));        //отправляем диспатч с action creator
    setEmailData({ ...emailData, email: "" });  //устанавливаем значения в локальный стейт
  };

  const handleChangeEmailInput = (e: ChangeEvent<HTMLInputElement>) => setEmailData({ ...emailData, email: e.target.value })

  //если емаил получен - редирект на сброс пароля
  if (isEmailForUpdatePassword) {
    return <Redirect to="/reset-password" />;
  } 

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <form className={styles.form} method="post" onSubmit={handleSubmit}>
          <p className="text pb-6 text_type_main-medium">Восстановление пароля</p>
          <Input
            type={"email"}
            placeholder={"E-mail"}
            name={"email"}
            value={emailData.email}
            onChange={handleChangeEmailInput}
          />
          <Button htmlType="submit">Восстановить</Button>
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