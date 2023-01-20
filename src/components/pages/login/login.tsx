import { FC, FormEvent } from "react";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { Link, Redirect } from "react-router-dom";
import { signIn } from "../../../services/actions/user";
import { useDispatch, useSelector } from "../../../services/types/hooks";
import { useForm } from "../../../services/types/useForm";

const Login: FC = () => {

  const dispatch = useDispatch();
  const {values, handleChange, setValues} = useForm({});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    dispatch(signIn(values))
    setValues({...values, email: "", password: ""})
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <form className={styles.form} method="post" onSubmit={handleSubmit}>
          <p className="text text_type_main-medium pb-6">Вход</p>
          <Input
            type={"email"}
            placeholder={"E-mail"}
            name={"email"}
            value={values.email || ""}
            onChange={handleChange}
          />
          <PasswordInput
            name={"password"}
            value={values.password || ""}
            onChange={handleChange}
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
