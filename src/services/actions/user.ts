import {
  forgotPasswordRequest,
  getUserInfo,
  loginRequest,
  logoutRequest,
  refreshTokenRequest,
  resetPasswordRequest,
  updateUserInfo,
  userRegistrationRequest,
} from "../../utils/api";
import { getCookie, setCookie } from "../../utils/cookie";
import { TEmailData, TLoginData, TLoginResponse, TPasswordData, TRegisterData, TUser } from "../../utils/types";
import { AppDispatch, AppThunk } from "../types";


//типизируем литеральными типами
export const LOGIN_REQUEST: "LOGIN_REQUEST" = "LOGIN_REQUEST";
export const LOGIN_SUCCESS: "LOGIN_SUCCESS" = "LOGIN_SUCCESS";
export const LOGIN_FAILED: "LOGIN_FAILED" = "LOGIN_FAILED";

export const FORGOT_PASSWORD_REQUEST: "FORGOT_PASSWORD_REQUEST" =
  "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_FAILED: "FORGOT_PASSWORD_FAILED" =
  "FORGOT_PASSWORD_FAILED";
export const UPDATE_PASSWORD_SUCCESS: "UPDATE_PASSWORD_SUCCESS" =
  "UPDATE_PASSWORD_SUCCESS";

export const LOGOUT_REQUEST: "LOGOUT_REQUEST" = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS: "LOGOUT_SUCCESS" = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED: "LOGOUT_FAILED" = "LOGOUT_FAILED";

export const UPDATE_REQUEST: "UPDATE_REQUEST" = "UPDATE_REQUEST";
export const UPDATE_SUCCESS: "UPDATE_SUCCESS" = "UPDATE_SUCCESS";
export const UPDATE_FAILED: "UPDATE_FAILED" = "UPDATE_FAILED";

export const GET_USER_REQUEST: "GET_USER_REQUEST" = "GET_USER_REQUEST";
export const GET_USER_SUCCESS: "GET_USER_SUCCESS" = "GET_USER_SUCCESS";
export const GET_USER_FAILED: "GET_USER_FAILED" = "GET_USER_FAILED";

export const UPDATE_TOKEN_REQUEST: "UPDATE_TOKEN_REQUEST" =
  "UPDATE_TOKEN_REQUEST";
export const UPDATE_TOKEN_SUCCESS: "UPDATE_TOKEN_SUCCESS" =
  "UPDATE_TOKEN_SUCCESS";
export const UPDATE_TOKEN_FAILED: "UPDATE_TOKEN_FAILED" = "UPDATE_TOKEN_FAILED";

//типизация экшенов
export interface IGetUserRequest {
  readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserSuccess {
  readonly type: typeof GET_USER_SUCCESS;
  readonly userData: TUser;
}

export interface IGetUserFailed {
  readonly type: typeof GET_USER_FAILED;
}

export interface ILoginRequest {
  readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginSuccess {
  readonly type: typeof LOGIN_SUCCESS;
  readonly userData: TUser;
}

export interface ILoginFailed {
  readonly type: typeof LOGIN_FAILED;
}

export interface IForgotPasswordRequest {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
  readonly updatePasswordStatus: boolean;
}

export interface IForgotPasswordFailed {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}

export interface IUpdatePasswordSuccess {
  readonly type: typeof UPDATE_PASSWORD_SUCCESS;
  readonly updatedPassword: boolean;
}

export interface ILogoutRequest {
  readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutSuccess {
  readonly type: typeof LOGOUT_SUCCESS;
  readonly success: boolean;
}

export interface ILogoutFailed {
  readonly type: typeof LOGOUT_FAILED;
}

export interface IUpdateRequest {
  readonly type: typeof UPDATE_REQUEST;
}

export interface IUpdateSuccess {
  readonly type: typeof UPDATE_SUCCESS;
  readonly userData: TUser;
}

export interface IUpdateFailed {
  readonly type: typeof UPDATE_FAILED;
}

export interface IUpdateTokenRequest {
  readonly type: typeof UPDATE_TOKEN_REQUEST;
}

export interface IUpdateTokenSuccess {
  readonly type: typeof UPDATE_TOKEN_SUCCESS;
  /* readonly userData: TUser; */
}

export interface IUpdateTokenFailed {
  readonly type: typeof UPDATE_TOKEN_FAILED;
}

//объединяем интерфейсы в Union
export type TUserActions =
  | IGetUserRequest
  | IGetUserSuccess
  | IGetUserFailed
  | ILoginRequest
  | ILoginSuccess
  | ILoginFailed
  | IForgotPasswordRequest
  | IForgotPasswordFailed
  | IUpdatePasswordSuccess
  | ILogoutRequest
  | ILogoutSuccess
  | ILogoutFailed
  | IUpdateRequest
  | IUpdateSuccess
  | IUpdateFailed
  | IUpdateTokenRequest
  | IUpdateTokenSuccess
  | IUpdateTokenFailed;

//генераторы экшенов
export const getUserRequest = (): IGetUserRequest => ({
  type: GET_USER_REQUEST,
});

export const getUserSuccess = (userData: TUser): IGetUserSuccess => ({
  type: GET_USER_SUCCESS,
  userData,
});

export const getUserFailed = (): IGetUserFailed => ({
  type: GET_USER_FAILED,
});

export const loginRequestAction = (): ILoginRequest => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (userData: TUser): ILoginSuccess => ({
  type: LOGIN_SUCCESS,
  userData,
});

export const loginFailed = (): ILoginFailed => ({
  type: LOGIN_FAILED,
});

export const forgotPasswordRequestAction = (updatePasswordStatus: boolean): IForgotPasswordRequest => ({
  type: FORGOT_PASSWORD_REQUEST,
  updatePasswordStatus,
});

export const forgotPasswordFailed = (): IForgotPasswordFailed => ({
  type: FORGOT_PASSWORD_FAILED,
});

export const updatePasswordSuccess = (updatedPassword: boolean): IUpdatePasswordSuccess => ({
  type: UPDATE_PASSWORD_SUCCESS,
  updatedPassword,
});

export const logoutRequestAction = (): ILogoutRequest => ({
  type: LOGOUT_REQUEST,
});

export const logoutSuccess = (success: boolean): ILogoutSuccess => ({
  type: LOGOUT_SUCCESS,
  success,
});

export const logoutFailed = (): ILogoutFailed => ({
  type: LOGOUT_FAILED,
});

export const updateRequest = (): IUpdateRequest => ({
  type: UPDATE_REQUEST,
});

export const updateSuccess = (userData: TUser): IUpdateSuccess => ({
  type: UPDATE_SUCCESS,
  userData,
});

export const updateFailed = (): IUpdateFailed => ({
  type: UPDATE_FAILED,
});

export const updateTokenRequest = (): IUpdateTokenRequest => ({
  type: UPDATE_TOKEN_REQUEST,
});

export const updateTokenSuccess = (/* userData: TUser */): IUpdateTokenSuccess => ({
  type: UPDATE_TOKEN_SUCCESS,
  /* userData, */
});

export const updateTokenFailed = (): IUpdateTokenFailed => ({
  type: UPDATE_TOKEN_FAILED,
});

//вход
export const signIn: AppThunk = (loginData: TLoginData) => (dispatch: AppDispatch) => {
  dispatch(loginRequestAction());
  loginRequest(loginData)
    .then((res) => {
      if (res) {
        let accessToken = res.accessToken.split("Bearer ")[1];
        let refreshToken = res.refreshToken;
        if (accessToken && refreshToken) {
          setCookie("accessToken", accessToken, { "max-age": 1200 }); //сохраняю токены в куки
          localStorage.setItem("jwt", refreshToken);
        }
        dispatch(loginSuccess(res.user));
      } else {
        dispatch(loginFailed());
      }
    })
    .catch(() => {
      dispatch(loginFailed());
    });
};

//восстановление пароля
export const updatePassword: AppThunk = (emailData: TEmailData) => (dispatch: AppDispatch) => {
  forgotPasswordRequest(emailData)
    .then((res) => {
      dispatch(forgotPasswordRequestAction(res.success));
    })
    .catch(() => {
      dispatch(forgotPasswordFailed());
    });
};

//сброс пароля
export const resetPassword: AppThunk = (passwordData: TPasswordData) => (dispatch: AppDispatch) => {
  resetPasswordRequest(passwordData)
    .then((res) => {
      dispatch(updatePasswordSuccess(res.success));
    })
    .catch(() => {
      dispatch(forgotPasswordFailed());
    });
};

//регистрация
export const userRegistration: AppThunk = (registerData: TRegisterData) => (dispatch: AppDispatch) => {
  dispatch(loginRequestAction());
  userRegistrationRequest(registerData)
    .then((res) => {
      if (res) {
        let accessToken = res.accessToken.split("Bearer ")[1];
        let refreshToken = res.refreshToken;
        if (accessToken && refreshToken) {
          setCookie("accessToken", accessToken, { "max-age": 1200 });
          localStorage.setItem("jwt", refreshToken);
        }
        dispatch(loginSuccess(res.user));
      } else {
        dispatch(loginFailed());
      }
    })
    .catch(() => {
      dispatch(loginFailed());
    });
};

//выход
export const logout: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(logoutRequestAction());
  let refreshToken = localStorage.getItem("jwt");
  logoutRequest(refreshToken)
    .then((res) => {
      if (res) {
        dispatch(logoutSuccess(res.success));
        localStorage.removeItem("jwt"); // удалить refreshToken
      } else {
        dispatch(logoutFailed());
      }
    })
    .catch(() => {
      dispatch(logoutFailed());
    });
};

//обновление данных пользователя
export const updateUserData: AppThunk = (updateData: TUser) => (dispatch: AppDispatch | AppThunk) => {
  dispatch(updateRequest());
  if (getCookie("accessToken") !== undefined) {
    updateUserInfo(updateData)
      .then((res) => {
        dispatch(updateSuccess(res.user));
      })
      .catch(() => {
        dispatch(updateFailed());
      });
  } else if (getCookie("accessToken") === undefined) {
    dispatch(refreshToken()); // Другая типизация - dispatch отправляет AppThunk
    updateUserInfo(updateData) //теперь повторить запрос с актуальным токеном
      .then((res) => {
        dispatch(updateSuccess(res.user));
      })
      .catch(() => {
        dispatch(updateFailed());
      });
  }
};

//получение данных пользователя
export const getUser: AppThunk = () => (dispatch: AppDispatch | AppThunk) => {
  dispatch(getUserRequest());
  if (getCookie("accessToken") === undefined && localStorage.getItem("jwt")) {
    dispatch(refreshToken());  // Другая типизация - dispatch отправляет AppThunk
    getUserInfo().then((res) => {
      dispatch(getUserSuccess(res.user));
    });
  } else {
    getUserInfo()
      .then((res) => {
        dispatch(getUserSuccess(res.user));
      })
      .catch(() => {
        dispatch(getUserFailed());
      });
  }
};

//рефреш токена
export const refreshToken: AppThunk = () => (dispatch: AppDispatch | AppThunk) => {
  dispatch(updateTokenRequest());
  refreshTokenRequest() //запросить новый токен
    .then((res) => {
      if (res.success) {
        let accessToken = res.accessToken.split("Bearer ")[1]; //убираю "Bearer "
        setCookie("accessToken", accessToken, { "max-age": 1200 }); //установить токен в куки
        localStorage.setItem("jwt", res.refreshToken);
        dispatch(getUser()); 
        dispatch(updateTokenSuccess())
        //dispatch(updateTokenSuccess(res.user));
      }
    })
    .catch(() => dispatch(updateTokenFailed()));
};