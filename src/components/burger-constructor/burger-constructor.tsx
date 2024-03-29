import { FC } from "react"; 
import { useMemo } from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorItems from "./constructor-items/constructor-items";
import styles from "./burger-constructor.module.css";
import { addIngredient, addBun } from "../../services/actions/burger-constructor";
import { setOrderModalActive } from "../../services/actions/burger-ingredients";
import { getOrderNumber } from "../../services/actions/order-details";
import { useDrop } from "react-dnd";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/types/hooks";
import { TIngredient } from "../../utils/types";
import { getIsAuth, getStateCurrentBun, getStateCurrentIngredients } from "../../utils/constants";

const BurgerConstructor: FC = () => {

  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);
  const history = useHistory();

  //выбранные ингредиенты 
  const currentIngredients = useSelector(getStateCurrentIngredients);

  //выбранная булка в бургере
  const currentBun = useSelector(getStateCurrentBun);

  const currentBuns = [...currentBun, ...currentBun]; //удваиваем булку

  //все выбранные ингредиенты 
  const currentIngredientsAndBuns = currentIngredients.concat(currentBuns);
  
  //массив id выбранных ингредиентов
  const ingredientsId = useMemo(
    () => currentIngredientsAndBuns.map(ingredient => ingredient._id),
    [currentIngredientsAndBuns]
  );

  //открывает окно заказа при клике
  const handleOpenOrderDetails = () => {
    dispatch(setOrderModalActive());
  };

  //отправить заказ, получить номер
  const postOrder = (ingredientsId: string[]) => {
    dispatch(getOrderNumber(ingredientsId));
  };

  //цена заказа
  const price = useMemo(() => {
    return (
      (currentBun ? currentBun[0]?.price * 2 : 0) + currentIngredients.reduce((sum, acc) => sum + acc.price, 0)
    );
  }, [currentIngredients, currentBun]);

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item: TIngredient) {
      if (item.type === "bun") {
        dispatch(addBun({ ...item, id: Date.now() }));
      } else {
        dispatch(addIngredient({ ...item, id: Date.now() }));
      }
    },
  });

  return (
    <section className={`${styles.section} pl-10 pt-25`}>
      <div className={`${styles.container} pr-2`} ref={dropTarget}>
        {/* --------- верхняя булка ---------- */}
        {currentBun.length === 0 ? (
          <p></p>
        ) : (
          <div>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={currentBun[0].name + "(верх)"}
              price={currentBun[0].price}
              thumbnail={currentBun[0].image}
            />
          </div>
        )}
        {/* --------- список начинок ---------- */}
        {(currentBun.length === 0 && currentIngredients.length === 0) &&
          <p className={`pr-2 text text_type_main-medium`}>
            &#128073; Притащите сюда булочку &#128072;
          </p>
        }

        {(currentIngredients.length !== 0 && currentBun.length === 0) &&
          <p className={`pr-2 text text_type_main-medium`}>
            Начните все-таки с булочки &#129320;
          </p>}
        
        {(currentIngredients.length === 0 && currentBun.length !== 0) &&
          <p className={`pr-2 text text_type_main-medium`}>
            А теперь выбирайте начинку &#128076;
          </p>}
        
        {(currentIngredients.length !== 0 && currentBun.length !== 0) &&
          <ul className={`${styles.list} pr-2`}>
            {currentIngredients.map((element, index) => {
              if (element.type === "main" || element.type === "sauce") {
                return (
                  <ConstructorItems
                    key={element.id}
                    element={element}
                    index={index}
                  />
                );
              }
            })}
          </ul>
        }
        {/* --------- нижняя булка ---------- */}
        {currentBun.length === 0 ? (
          <p className={`${styles.text} pr-2 text text_type_main-large`}></p>
        ) : (
          <div className={styles.bun}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={currentBun[0].name + "(низ)"}
              price={currentBun[0].price}
              thumbnail={currentBun[0].image}
            />
          </div>
        )}
      </div>
      {/* --------- оформление заказа ---------- */}
      <div className={`${styles.order} pt-10 pr-5 pb-10`}>
        <div className={`${styles.count_result} pr-10`}>
          <p className="text text_type_digits-medium pr-2">
            {price > 0 ? price : 0}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType='submit'
          disabled={(currentBun.length === 0 || currentIngredients.length === 0) && true}
          type="primary"
          size="large"
          onClick={() => {
            if (!isAuth) {
              history.push("/login");
            } else {
              handleOpenOrderDetails();
              postOrder(ingredientsId);
            }
          }}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;