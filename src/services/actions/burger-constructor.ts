import { TIngredient } from './../../utils/types';

//типизируем экшены литеральными типами
export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';
export const DELETE_INGREDIENT: 'DELETE_INGREDIENT' = 'DELETE_INGREDIENT';
export const MOVE_ELEMENT: 'MOVE_ELEMENT' = 'MOVE_ELEMENT';
export const CLEAR_CONSTRUCTOR: 'CLEAR_CONSTRUCTOR' = 'CLEAR_CONSTRUCTOR';

//типизация экшенов
export interface IAddIngredient {
    readonly type: typeof ADD_INGREDIENT;
    readonly payload: TIngredient & {id: number} ;
}

export interface IAddBun {
    readonly type: typeof ADD_BUN;
    readonly payload: TIngredient & {id: number};
}

export interface IDeleteIngredient {
    readonly type: typeof DELETE_INGREDIENT;
    readonly id: number;
}

export interface IMoveElement {
    readonly type: typeof MOVE_ELEMENT;
    readonly payload: {dragIndex: number, hoverIndex: number};
}

export interface IClearConstructor {
    readonly type: typeof CLEAR_CONSTRUCTOR;
}

//объединяем интерфейсы в Union
export type TBurgerConstructorActions = 
  | IAddIngredient
  | IAddBun
  | IDeleteIngredient
  | IMoveElement
  | IClearConstructor;

//генераторы экшенов
export const addIngredient = (payload: TIngredient & {id: number} ): IAddIngredient => ({
    type: ADD_INGREDIENT,
    payload
});

export const addBun = (payload: TIngredient & {id: number} ): IAddBun => ({
    type: ADD_BUN,
    payload
});  

export const deleteIngredient = (id: number): IDeleteIngredient => ({
    type: DELETE_INGREDIENT,
    id
});

export const moveElement = (payload: {dragIndex: number, hoverIndex: number}): IMoveElement => ({
    type: MOVE_ELEMENT,
    payload
});

export const clearConstructor = (): IClearConstructor => ({
    type: CLEAR_CONSTRUCTOR,
});