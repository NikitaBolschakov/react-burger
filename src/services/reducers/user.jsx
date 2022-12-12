//actions
const LOGIN_REQUEST = "LOGIN_REQUEST";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILED = "LOGIN_FAILED";

const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";

const LOGOUT_REQUEST = "LOGOUT_REQUEST";
const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
const LOGOUT_FAILED = "LOGOUT_FAILED";

const UPDATE_REQUEST = "UPDATE_REQUEST";
const UPDATE_SUCCESS = "UPDATE_SUCCESS";
const UPDATE_FAILED = "UPDATE_FAILED";

const REGISTER_REQUEST = "REGISTER_REQUEST";
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const REGISTER_FAILED = "REGISTER_FAILED";

const initialState = {
  userData: { email: "", name: "" }, //данные пользователя
  isAuth: false, //авторизован?
  registerUserRequest: false, //запрос на регистрацию
  registerUserError: false, //ошибка регистрации
  logoutUserRequest: false, //запрос на выход
  logoutUserError: false, //ошибка при выходе
  updateUserRequest: false, //изменение данных пользователя
  updateUserError: false, //ошибка при изменении данных
  loginUserRequest: false, //авторизация
  loginUserError: false, //ошибка авторизации
  updatePasswordStatus: false, //статус сброса пароля
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginUserRequest: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isAuth: true,
        userData: action.userData,
        loginUserRequest: false,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loginUserError: true,
        loginUserRequest: false,
      };
    }
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        updatePasswordStatus: action.updatePasswordStatus,
      };
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        updatePasswordStatus: false,
      };
    }
    case UPDATE_REQUEST: {
      return {
        ...state,
        updateUserRequest: true,
        updateUserError: false,
      };
    }
    case UPDATE_SUCCESS: {
      return {
        ...state,
        userData: action.userData,
        updateUserRequest: false,
      };
    }
    case UPDATE_FAILED: {
      return {
        ...state,
        updateUserError: true,
        updateUserRequest: false,
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutUserRequest: true,
        logoutUserError: false,
      };
    }
    case LOGOUT_SUCCESS: {
      if (action.success) {
        return {
          ...state,
          isAuth: false,
          userData: { email: "", name: "" },
          logoutUserRequest: false,
        };
      }
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        logoutUserError: true,
        logoutUserRequest: false,
        isAuth: true,
      };
    }

    default:
      return state;
  }
};
