export interface ILocationState {
  background: {
		pathname: string;
		search: string;
		hash: string;
		state: null;
		key: string;
	}
	from: string;
	state?: object;
}

export type TIngredient = {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  __v: number;
  _id: string;
  id: number;
  nanoId: string;
  index: number;
  quantity?: number;
}

export type TWsOrder = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
 _id: string;
}

export type TUser = {
	email: string;
  name: string;
  createdAt?: string;
	updatedAt?: string;
} 

export type TLoginData = {
  email: string;
  password: string;
}

export type TEmailData = {
  email: string;
  result: boolean;
}

export type TPasswordData = {
  password: string;
  verCode: string;
}

export type TRegisterData = {
  email: string;
  password: string;
  name: string;
}

//ответы сервера
export type TRegistrationResponse = {
	success: boolean;
	user: TUser
  accessToken: string;
	refreshToken: string;
	message: string;
} 

export type TIngredientsResponse = {
  data: TIngredient[];
  success: boolean;
}

 export type TOrderResponse = {
  order: TWsOrder;
  success: boolean;
} 

export type TLoginResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    name: string;
  }
}

export type TUpdateUserResponse = Omit<TLoginResponse, 'accessToken'|'refreshToken'>

export type TLogoutResponse = {
  success: boolean;
  message: string;
}

export type TGetUserResponse = {
  success: boolean;
  user: TUser;
}

export type TRefreshTokenResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export type TForgotPasswordResponse = {
  success: boolean;
  message: string;
}

export type TWsMessageResponce = {
  orders: Array<TWsOrder>;
	success: boolean;
	total: number;
	totalToday: number;
} 


