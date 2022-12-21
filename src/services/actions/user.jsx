import {
  forgotPasswordRequest,
  getUserInfo,
  loginRequest,
  logoutRequest,
  refreshTokenRequest,
  resetPasswordRequest,
  updateUserInfo,
  userRegistrationRequest,
} from "../../components/api/api";
import { getCookie, setCookie } from "../../utils/cookie";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";
export const UPDATE_PASSWORD_SUCCESS = "UPDATE_PASSWORD_SUCCESS";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

export const UPDATE_REQUEST = "UPDATE_REQUEST";
export const UPDATE_SUCCESS = "UPDATE_SUCCESS";
export const UPDATE_FAILED = "UPDATE_FAILED";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";

export const UPDATE_TOKEN_REQUEST = "UPDATE_TOKEN_REQUEST";
export const UPDATE_TOKEN_SUCCESS = "UPDATE_TOKEN_SUCCESS";
export const UPDATE_TOKEN_FAILED = "UPDATE_TOKEN_FAILED";

//вход
export const signIn = (loginData) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  loginRequest(loginData)
    .then((res) => {
      if (res) {
        const accessToken = res.accessToken.split("Bearer ")[1];
        const refreshToken = res.refreshToken;
        if (accessToken && refreshToken) {
          setCookie("accessToken", accessToken, { "max-age": 1200 }); //сохраняю токены в куки
          setCookie("refreshToken", refreshToken);
        }
        dispatch({ type: LOGIN_SUCCESS, userData: res.user });
      } else {
        dispatch({ type: LOGIN_FAILED });
      }
    })
    .catch(() => {
      dispatch({ type: LOGIN_FAILED });
    });
};

//восстановление пароля
export const updatePassword = (emailData) => (dispatch) => {
  forgotPasswordRequest(emailData)
    .then((res) => {
      dispatch({
        type: FORGOT_PASSWORD_REQUEST,
        updatePasswordStatus: res.success,
      });
    })
    .catch(() => {
      dispatch({ type: FORGOT_PASSWORD_FAILED });
    });
};

//сброс пароля
export const resetPassword = (passwordData) => (dispatch) => {
  resetPasswordRequest(passwordData)
    .then((res) => {
       dispatch({
        type: UPDATE_PASSWORD_SUCCESS,
        updatedPassword: res.success,
      }); 
    })
    .catch(() => {
      dispatch({ type: FORGOT_PASSWORD_FAILED });
    });
};

//регистрация
export const userRegistration = (registerData) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  userRegistrationRequest(registerData)
    .then((res) => {
      if (res) {
        const accessToken = res.accessToken.split("Bearer ")[1];
        const refreshToken = res.refreshToken;
        if (accessToken && refreshToken) {
          setCookie("accessToken", accessToken, { "max-age": 1200 });
          setCookie("refreshToken", refreshToken);
        }
        dispatch({ type: LOGIN_SUCCESS, userData: res.user });
      } else {
        dispatch({ type: LOGIN_FAILED });
      }
    })
    .catch(() => {
      dispatch({ type: LOGIN_FAILED });
    });
};

//выход
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  const refreshToken = getCookie("refreshToken");
  logoutRequest(refreshToken)
    .then((res) => {
      if (res) {
        dispatch({ type: LOGOUT_SUCCESS, success: res.success });
      } else {
        dispatch({ type: LOGOUT_FAILED });
      }
    })
    .catch(() => {
      dispatch({ type: LOGOUT_FAILED });
    });
};

//обновление данных пользователя
export const updateUserData = (updateData) => (dispatch) => {
  dispatch({ type: UPDATE_REQUEST });
  if (getCookie("accessToken") !== undefined) {
    updateUserInfo(updateData)
      .then((res) => {
        dispatch({
          type: UPDATE_SUCCESS,
          userData: res.user,
        });
      })
      .catch(() => {
        dispatch({ type: UPDATE_FAILED });
      });
  } else if (getCookie("accessToken") === undefined) {
    dispatch(refreshToken());
    updateUserInfo(updateData) //теперь повторить запрос с актуальным токеном
      .then((res) => {
        dispatch({
          type: UPDATE_SUCCESS,
          userData: res.user,
        });
      })
      .catch(() => {
        dispatch({ type: UPDATE_FAILED });
      });
  }
};

//получение данных пользователя
export const getUser = () => (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  if (getCookie("accessToken") === undefined) {
    dispatch(refreshToken());
    getUserInfo().then((res) => {
      dispatch({ type: GET_USER_SUCCESS, userData: res.user });
    }); 
  } else {
    getUserInfo()
      .then((res) => {
        dispatch({ type: GET_USER_SUCCESS, userData: res.user });
      })
      .catch(() => {
        dispatch({ type: GET_USER_FAILED });
      });
  } 
};  

//рефреш токена
export const refreshToken = () => (dispatch) => {
  dispatch({ type: UPDATE_TOKEN_REQUEST });
  refreshTokenRequest() //запросить новый токен
    .then((res) => {
      if (res.success) {
        const accessToken = res.accessToken.split("Bearer ")[1]; //убираю "Bearer "
        setCookie("accessToken", accessToken, { "max-age": 1200 }); //установить токен в куки
        setCookie("refreshToken", res.refreshToken);
        dispatch(getUser());
        dispatch({
          type: UPDATE_TOKEN_SUCCESS,
          userData: res.user,
        });
      }
    })
    .catch(() => dispatch({ type: UPDATE_TOKEN_FAILED }));
};
