import { FC, ReactNode } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { getCookie } from "../../utils/cookie";
import { ILocationState } from "../../utils/types";

interface RouteProps {
  children: ReactNode;
  pathname: string;
	exact?: boolean;
}

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {

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
