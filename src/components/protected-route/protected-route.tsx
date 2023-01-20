import { FC, ReactNode } from "react";
import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";
import { useSelector } from "../../services/types/hooks";
import { getIsAuth } from "../../utils/constants";
import { getCookie } from "../../utils/cookie";
import { ILocationState } from "../../utils/types";

  export const ProtectedRoute: FC<RouteProps & { children?: ReactNode; onlyForAuth: boolean }> = (
  { onlyForAuth, children, ...rest }) => {
  
  const location = useLocation<ILocationState>();
  const isToken = getCookie("accessToken");
  const isAuth = useSelector(getIsAuth);
  

  //если пользователь авторизован, а роут только для неавторизованных
  //вернуть на страницу откуда он перешел (location.state.from: "..."), если ее нет, то на главную
  if (!onlyForAuth && isAuth) {
    const { from } = location.state || { from: { pathname: "/" } } ;
    return (
      <Route {...rest}>
        <Redirect to={from} />
      </Route>
    );
  }   

  //если пользователь неавторизован, а роут только для авторизованных - вернуть его на "/login"
  //и записать в location.state.from текущее местоположение
  if (onlyForAuth && !isToken) {
    return (
      <Route {...rest}>
         <Redirect to={{ pathname: "/login", state: { from: location } }} />
      </Route>
    );
  } 

  //isAuth && onlyForAuth
  return <Route {...rest}>{children}</Route>; 
};  
