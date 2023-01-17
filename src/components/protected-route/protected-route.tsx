import { FC, ReactNode } from "react";
import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";
import { useSelector } from "../../services/types/hooks";
import { getIsAuth } from "../../utils/constants";
import { ILocationState } from "../../utils/types";

export const ProtectedRoute: FC<RouteProps & { children?: ReactNode; onlyForAuth: boolean }> = (
  { onlyForAuth, children, ...rest }) => {
  const location = useLocation<ILocationState>();
  const isAuth = useSelector(getIsAuth);

  //если пользователь авторизован, а роут только для НЕавторизованных
  if (!onlyForAuth && isAuth) {
    return (
      <Route {...rest}>
        <Redirect to={{ pathname: "/", state: { from: location } }} />
      </Route>
    );
  }

  //если пользователь неавторизован, а роут только для авторизованных - вернуть его на "/login"
  if (onlyForAuth && !isAuth) {
    return (
      <Route {...rest}>
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      </Route>
    );
  }

  return <Route {...rest}>{children}</Route>;
};
