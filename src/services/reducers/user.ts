import { TUser } from "../../utils/types";
import {
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_REQUEST,
  GET_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  TUserActions,
  UPDATE_FAILED,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_TOKEN_FAILED,
  UPDATE_TOKEN_REQUEST,
  UPDATE_TOKEN_SUCCESS,
} from "../actions/user";

//описание типа для initialState редьюсера
type TUserState = {
  userData: TUser;
  getUserDataRequest: boolean; 
  getUserDataError: boolean;
  isAuth: boolean;                    
  logoutUserRequest: boolean;        
  logoutUserError: boolean;
  updateUserRequest: boolean;        
  updateUserError: boolean;
  loginUserRequest: boolean;         
  loginUserError: boolean;
  updatePasswordStatus: boolean;
  updatedPassword: boolean;            
  tokenRequest: boolean;                 
  tokenFailed: boolean;
  tokenUpdated: boolean;
}

const initialState: TUserState = {
  userData: { email: "", name: "" },    //данные пользователя
  getUserDataRequest: false,            //получить данные пользователя
  getUserDataError: false,
  isAuth: false,                        //авторизован?
  logoutUserRequest: false,             //запрос на выход
  logoutUserError: false,
  updateUserRequest: false,             //изменение данных пользователя
  updateUserError: false,
  loginUserRequest: false,              //авторизация
  loginUserError: false,
  updatePasswordStatus: false,          //статус сброса пароля отправки подтв. письма
  updatedPassword: false,               //пароль обновлен
  tokenRequest: false,                  //получение токена
  tokenFailed: false,
  tokenUpdated: false
};

export const userReducer = (state = initialState, action: TUserActions): TUserState => {
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
    case UPDATE_PASSWORD_SUCCESS: {
      return {
        ...state,
        updatePasswordStatus: false,
        updatedPassword: true,
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
          logoutUserRequest: false
        };
      }
      else {
        return {
          ...state,
          logoutUserError: true,
          logoutUserRequest: false,
          isAuth: true,
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
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserDataRequest: true,
        getUserDataError: false,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        userData: action.userData,
        getUserDataRequest: false,
        isAuth: true,
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        getUserDataError: true,
        getUserDataRequest: false,
      };
    }
    case UPDATE_TOKEN_REQUEST: {
      return {
        ...state,
        tokenRequest: true,
        tokenFailed: false,
        tokenUpdated: false
      };
    }
    case UPDATE_TOKEN_SUCCESS: {
      return {
        ...state,
        tokenRequest: false,
        tokenFailed: false,
        tokenUpdated: true
      };
    }
    case UPDATE_TOKEN_FAILED: {
      return {
        ...state,
        tokenRequest: false,
        tokenFailed: true,
        tokenUpdated: false
      };
    }

    default:
      return state;
  }
};