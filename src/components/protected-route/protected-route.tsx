import { FC, ReactNode } from "react";
import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";
import { getCookie } from "../../utils/cookie";
import { ILocationState } from "../../utils/types";

export const ProtectedRoute: FC<RouteProps & {children?: ReactNode}>  = ({ children, ...rest }) => {

  const location = useLocation<ILocationState>();
  const accessToken = getCookie("accessToken"); 

  return (
    <Route
      {...rest}
      render={() =>
        (accessToken || accessToken !== undefined) ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location }  }} />
        )
      }
    />
  );
}
