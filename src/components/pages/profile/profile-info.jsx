import styles from "./profile-info.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserData } from "../../../services/actions/user";
import { Redirect } from "react-router-dom";

const ProfileInfo = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth); 

  //достаем имя из стора
  const { name: storeName, email: storeEmail } = useSelector(
    (state) => state.user.userData
  );

  const [userData, setUserData] = useState({
    holderEmail: "Логин",
    password: "",
    holderName: "Имя",
    email: "",
    name: "",
  });

  useEffect(() => {
    setUserData({
      ...userData,
      holderEmail: storeEmail,
      holderName: storeName,
    });
  }, [storeName, storeEmail]);

   useEffect(() => {
    if (!isAuth) {
      setUserData({
        holderEmail: "Логин",
        password: "",
        holderName: "Имя",
        email: "",
        name: "",
      });
    }
  }, [isAuth]); 

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserData(userData));
    setUserData({
      holderEmail: storeEmail,
      password: "",
      holderName: storeName,
      email: "",
      name: "",
    });
  };

  const declineUpdate = () => {
    setUserData({
      holderEmail: storeEmail,
      password: "",
      holderName: storeName,
      email: "",
      name: "",
    });
  };

  //при нажатии на кнопку "выход" перенаправить на вход
  if (!isAuth) {
    return <Redirect to="/login" /> 
  }   

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        type={"text"}
        placeholder={userData.holderName}
        icon={"EditIcon"}
        value={userData.name}
        name={"name"}
        onChange={(event) =>
          setUserData({ ...userData, name: event.target.value })
        }
      />

      <Input
        type={"email"}
        placeholder={userData.holderEmail}
        icon={"EditIcon"}
        value={userData.email}
        name={"email"}
        onChange={(event) =>
          setUserData({ ...userData, email: event.target.value })
        }
      />

      <Input
        type={"password"}
        placeholder={"Пароль"}
        icon={"EditIcon"}
        value={userData.password}
        name={"password"}
        onChange={(event) =>
          setUserData({ ...userData, password: event.target.value })
        }
      />
      {userData.email.length > 0 &&
        userData.name.length > 0 &&
        userData.password.length > 0 && (
          <div className={styles.btns__container}>
            <Button
              type="secondary"
              size="medium"
              onClick={() => declineUpdate()}
            >
              Отмена
            </Button>
            <Button type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        )}
    </form>
  );
};

export default ProfileInfo;
