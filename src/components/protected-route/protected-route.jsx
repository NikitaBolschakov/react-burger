import { Redirect, Route, useLocation } from "react-router-dom";
import { getCookie } from "../../utils/cookie";

export function ProtectedRoute({ children, ...rest }) {
  const cookie = getCookie("accessToken"); //получаем токен
  console.log(cookie);
  const location = useLocation();

  return (
    <Route
      {...rest}
      render={() =>
        (cookie || cookie !== undefined) ? (
          children
        ) : (
          // Если токен не получен, происходит переадресация на роут /login
          <Redirect to={{ pathname: "/login", state: { from: location }  }} />
        )
      }
    />
  );
}
