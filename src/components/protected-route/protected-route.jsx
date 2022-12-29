import { useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router-dom";
import { getCookie } from "../../utils/cookie";

export const ProtectedRoute = ({ children, ...rest }) => {

  const location = useLocation();
  const accessToken = getCookie("accessToken"); 

  const { isAuth } = useSelector((store) => store.user);
  console.log(`autorization: ${isAuth}`);

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
