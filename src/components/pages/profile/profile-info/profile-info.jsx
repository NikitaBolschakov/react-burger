import styles from "./profile-info.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserData } from "../../../../services/actions/user";
import { Redirect } from "react-router-dom";
import { getIsAuth, getUserData } from "../../../../utils/constants";

const ProfileInfo = () => {

  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuth); 

  //достаем имя из стора
  const { name: storeName, email: storeEmail } = useSelector(getUserData);

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

  const cancelUpdate = () => {
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
        name={"name"}
        icon={"EditIcon"}
        placeholder={userData.holderName}
        value={userData.name}
        onChange={(e) =>
          setUserData({ ...userData, name: e.target.value })
        }
      />

      <Input
        type={"email"}
        icon={"EditIcon"}
        name={"email"}
        placeholder={userData.holderEmail}
        value={userData.email}
        onChange={(e) =>
          setUserData({ ...userData, email: e.target.value })
        }
      />

      <Input
        type={"password"}
        placeholder={"Пароль"}
        icon={"EditIcon"}
        name={"password"}
        value={userData.password}
        onChange={(e) =>
          setUserData({ ...userData, password: e.target.value })
        }
      />
      {userData.email.length > 0 &&
        userData.name.length > 0 &&
        userData.password.length > 0 && (
          <div className={styles.b__container}>
            <Button
              type="secondary"
              size="medium"
              onClick={() => cancelUpdate()}
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
