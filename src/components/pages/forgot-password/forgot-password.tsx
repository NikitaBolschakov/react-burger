import { FC, FormEvent } from "react";
import {
  Button,
  Input
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./forgot-password.module.css";
import { Link, Redirect } from "react-router-dom";
import { updatePassword } from "../../../services/actions/user";
import { useDispatch, useSelector } from "../../../services/types/hooks";
import { getIsEmailForUpdatePassword } from "../../../utils/constants";
import { useForm } from "../../../services/types/useForm";

const ForgotPassword: FC = () => {

  const dispatch = useDispatch();
  const {values, handleChange, setValues} = useForm({});

  const isEmailForUpdatePassword = useSelector(getIsEmailForUpdatePassword); 

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updatePassword(values));  //отправляем диспатч с action creator
    setValues({...values, email: ""})
  };

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
            value={values.email || ""}
            onChange={handleChange}
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