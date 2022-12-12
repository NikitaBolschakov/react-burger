import {
  forgotPasswordRequest,
  loginRequest,
  logoutRequest,
  refreshTokenRequest,
  resetPasswordRequest,
  updateUserInfo,
  userRegistrationRequest,
} from "../../components/api/api";
import { getCookie, setCookie } from "../../utils/cookie";

const LOGIN_REQUEST = "LOGIN_REQUEST";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILED = "LOGIN_FAILED";

const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";

const LOGOUT_REQUEST = "LOGOUT_REQUEST";
const LOGOUT_SUCCESS = "LOGOUT_LOGOUT_SUCCESS";
const LOGOUT_FAILED = "LOGOUT_FAILED";

const UPDATE_REQUEST = "UPDATE_REQUEST";
const UPDATE_SUCCESS = "UPDATE_SUCCESS";
const UPDATE_FAILED = "UPDATE_FAILED";

//вход пользователя
export function signIn(loginData) {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    loginRequest(loginData)
      .then((res) => {
        if (res) {
          const accessToken = res.accessToken.split("Bearer ")[1];
          const refreshToken = res.refreshToken;
          if (accessToken && refreshToken) {
            setCookie("accessToken", accessToken, { "max-age": 1200 });
            setCookie("refreshToken", refreshToken);
          }

          dispatch({
            type: LOGIN_SUCCESS,
            userData: res.user,
          });
        } else {
          dispatch({
            type: LOGIN_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_FAILED,
        });
      });
  };
}

//восстановление пароля
export function updatePassword(emailData) {
  return function (dispatch) {
    forgotPasswordRequest(emailData)
      .then((res) => {
        dispatch({
          type: FORGOT_PASSWORD_REQUEST,
          updatePasswordStatus: res.success,
        });
      })
      .catch((err) => {
        dispatch({
          type: FORGOT_PASSWORD_FAILED,
        });
      });
  };
}

//сброс пароля
export function resetPassword(passwordData) {
  return function (dispatch) {
    resetPasswordRequest(passwordData)
      .then((res) => {
        dispatch({
          type: FORGOT_PASSWORD_REQUEST,
          updatePasswordStatus: res.success,
        });
      })
      .catch((err) => {
        dispatch({
          type: FORGOT_PASSWORD_FAILED,
        });
      });
  };
}

//регистрация пользователя
export function userRegistration(registerData) {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    userRegistrationRequest(registerData) //API
      .then((res) => {
        if (res) {
          const accessToken = res.accessToken.split("Bearer ")[1];
          const refreshToken = res.refreshToken;
          if (accessToken && refreshToken) {
            setCookie("accessToken", accessToken, { "max-age": 1200 });
            setCookie("refreshToken", refreshToken);
          }
          dispatch({
            type: LOGIN_SUCCESS,
            userData: res.user,
          });
        } else {
          dispatch({
            type: LOGIN_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: LOGIN_FAILED,
        });
      });
  };
}

//выход пользователя
export function logout() {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    const token = getCookie("refreshToken");
    logoutRequest(token)
      .then((res) => {
        if (res) {
          dispatch({
            type: LOGOUT_SUCCESS,
            success: res.success,
          });
        } else {
          dispatch({
            type: LOGOUT_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: LOGOUT_FAILED,
        });
      });
  };
}

//обновление данных пользователя
export function updateUserData(updateData) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_REQUEST,
    });
    if (getCookie("accessToken") !== undefined) {
      updateUserInfo(updateData)
        .then((res) => {
          if (res) {
            dispatch({
              type: UPDATE_SUCCESS,
              userData: res.user,
            });
          }
          if (!res) {
            dispatch({
              type: UPDATE_FAILED,
            });
          }
        })
        .catch((err) => {
          dispatch({
            type: UPDATE_FAILED,
          });
        });
    }
    //иначе, если токен просрочился
    else {
      refreshTokenRequest().then((res) => {
        const accessToken = res.accessToken.split("Bearer ")[1];
        if (accessToken) {
          setCookie("accessToken", accessToken, { "max-age": 1200 });
        }
        //повторить запрос
        updateUserInfo(updateData)
          .then((res) => {
            if (res) {
              dispatch({
                type: UPDATE_SUCCESS,
                userData: res.user,
              });
            }
            if (!res) {
              dispatch({
                type: UPDATE_FAILED,
              });
            }
          })
          .catch((err) => {
            dispatch({
              type: UPDATE_FAILED,
            });
          });
      });
    }
  };
}
