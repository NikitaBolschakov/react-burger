import { FC, FormEvent } from "react";
import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./register.module.css";
import { Link } from "react-router-dom";
import { userRegistration } from "../../../services/actions/user";
import { useDispatch } from "../../../services/types/hooks";
import { useForm } from "../../../services/types/useForm";

const Register: FC = () => {

  const dispatch = useDispatch();
  const {values, handleChange, setValues} = useForm({});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(userRegistration(values)); //отправляем диспатч с санками в которых значения
    setValues({...values, email: "", password: "", name: ""})
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <form className={styles.form} method="post" onSubmit={handleSubmit}>
          <p className="text text_type_main-medium pb-6">Регистрация</p>

          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={handleChange}
            value={values.name || ""}
            name={"name"}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1"
          />

          <Input
            type={"email"}
            placeholder={"E-mail"}
            name={"email"}
            value={values.email || ""}
            onChange={handleChange}
          />

          <PasswordInput
            value={values.password || ""}
            onChange={handleChange}
            name={"password"}
          />

          <Button htmlType={'submit'}>Зарегистрироваться</Button>
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