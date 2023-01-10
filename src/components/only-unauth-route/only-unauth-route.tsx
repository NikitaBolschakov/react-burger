import { FC, ReactNode } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { useSelector } from "../../services/types/hooks";
import { getIsAuth } from "../../utils/constants";
import { ILocationState } from "../../utils/types";

interface RouteProps {
  children: ReactNode;
  pathname: string;
	exact?: boolean;
}

const OnlyUnAuthRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const location = useLocation<ILocationState>();
  const isAuth = useSelector(getIsAuth);

  return (
    <Route
      {...rest}
      render={() =>
        !isAuth ? (
          children
        ) : (
          <Redirect to={{ pathname: "/", state: { from: location } }} />
        )
      }
    />
  );
};

export default OnlyUnAuthRoute;
