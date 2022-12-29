import styles from "./order-page.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { useParams, useRouteMatch } from "react-router-dom";
import { useMemo } from "react";
import { useEffect } from "react";
import {
  wsConnectionAuthStart,
  wsConnectionClosed,
  wsConnectionStart,
} from "../../../services/actions/ws-actions";
import { formatDate } from "../../../utils/format-date";
import OrderIngredient from "./order-ingredient/order-ingredient";


const OrderPage = () => {
  
  const dispatch = useDispatch();
  const { id } = useParams();
  const { path } = useRouteMatch();
  
  const ingredients = useSelector((store) => store.burgerIngredients.ingredientItems);
  const orders = useSelector((store) => store.wsOrders.orders);
  const isConnected = useSelector((store) => store.wsOrders.wsConnected);

  const urlProfile = '/profile/orders/:id';
	const urlFeed = '/feed/:id';

  const order = orders?.find((order) => order._id === id);
  
  useEffect(() => {
    if (!isConnected) {
      if (path === urlFeed) {
        dispatch(wsConnectionStart());
      }
      if (path === urlProfile) {
        dispatch(wsConnectionAuthStart());
      }
      return () => {
        dispatch(wsConnectionClosed());
      };
    }
  }, [dispatch]);

  // [id: count, id: count, id: count] подсчитываем дублирующиеся элементы
  const countedIngredients = order?.ingredients?.reduce(
    (sum, item) => {
      if (!sum[item]) {
        sum[item] = 1;
      } else {
        sum[item] += 1;
      }
      return sum;
    }, {}
  );
  
  //массив из уникальных id
  const uniqueIngredients = countedIngredients ? Object.keys(countedIngredients) : null;

  //массив с полноценными ингредиентами
  const orderIngredients = useMemo(() => {
    return uniqueIngredients?.map((id) => {      //перебрать id в заказе
      return ingredients?.find((ingredient) => { //найти ингредиент с таким id в ingredients
        if (id === ingredient._id) {            //если они совпадают
          const nanoId = nanoid();
          ingredient.nanoId = nanoId;
          ingredient.quantity = countedIngredients[id];

          return ingredient;                    //вернуть этот ингредиент в массив orderIngredients
        }
      });
    });
  }, [uniqueIngredients]);

  const orderPrice = useMemo(() => {
    return orderIngredients?.reduce((sum, item) => {
      if (item?.type === 'bun') {
				return sum += item.price * 2
			}
      sum += item?.price
      return sum;
    }, 0);
  }, [orderIngredients]); 

  return (
    <div>
      {order && (
        <div className={styles.container}>
          <p className={`${styles.number} text text_type_digits-default`}>#{order.number}</p>
          <h2 className={`${styles.header} text text_type_main-medium`}>{order.name}</h2>
          <p
            className={`${styles.status} text text_type_main-default`}
          >
            {order.status === "pending" ? "Готовится" : order.status === "done"
              ? "Выполнен" : order.status === "created"
              ? "Создан" : ""
              }
          </p>
          <p className={`${styles.header} text text_type_main-medium`}>Состав:</p>
          <ul className={styles.list}>
            {orderIngredients.map((ingredient, index) => (
              <li key={index}>
                <OrderIngredient ingredient={ingredient} />
              </li>
            ))}
          </ul>
          <div className={styles.bottomBox}>
            <p className={`text text_type_main-default text_color_inactive`}>
              {`${formatDate(order.createdAt)}`}
            </p>
            <div className={`${styles.priceBox}`}>
              <p className={`${styles.price} text text_type_digits-default`}>
                {orderPrice}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
