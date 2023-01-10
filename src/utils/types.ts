export interface ILocationState {
    from: {
      pathname: string;
    };
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
  id?: number;
}

export type TWsOrder = {
  createdAt: string;
  ingredients: Array<string>
  name: string;
  number: number;
  status: string;
  updatedAt: string;
 _id: string;
}

export type TWsMessageResponce = {
  orders: Array<TWsOrder>;
	success: boolean;
	total: number;
	totalToday: number;
} 

export type TUser = {
	email: string;
  name: string;
  createdAt?: string;
	updatedAt?: string;
} 

export type TUserResponse = {
	success: boolean;
	user: TUser
  accessToken: string;
	refreshToken: string;
	message: string;
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
  token: string;
}

export type TRegisterData = {
  email: string;
  password: string;
  name: string;
}



