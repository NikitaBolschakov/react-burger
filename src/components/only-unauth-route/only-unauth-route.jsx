import { useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router-dom";
import { getIsAuth } from "../../utils/constants";

const OnlyUnAuthRoute = ({ children, ...rest }) => {
  const location = useLocation();
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
