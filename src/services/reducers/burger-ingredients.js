export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCES";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const SET_INGREDIENTS_MODAL_ACTIVE = "SET_INGREDIENTS_MODAL_ACTIVE";
export const SET_INGREDIENTS_MODAL_INACTIVE = "SET_INGREDIENTS_MODAL_INACTIVE";

export const SET_ORDER_MODAL_ACTIVE = "SET_ORDER_MODAL_ACTIVE";
export const SET_ORDER_MODAL_INACTIVE = "SET_ORDER_MODAL_INACTIVE";

export const initialState = {
  ingredientItems: [],
  isLoading: false,
  error: false,
  currentIngredients: "Булки",
  openOrderDetails: false,
  openIngredientDetails: false,
};

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        ingredientItems: action.ingredientItems,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    }
    case SET_INGREDIENTS_MODAL_ACTIVE: {
      return {
        ...state,
        openIngredientDetails: true,
      };
    }
    case SET_INGREDIENTS_MODAL_INACTIVE: {
      return {
        ...state,
        openIngredientDetails: false,
      };
    }
    case SET_ORDER_MODAL_ACTIVE: {
      return {
        ...state,
        openOrderDetails: true,
      };
    }
    case SET_ORDER_MODAL_INACTIVE: {
      return {
        ...state,
        openOrderDetails: false,
      };
    }

    default:
      return state;
  }
};