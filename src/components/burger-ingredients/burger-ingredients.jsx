import { useEffect, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import IngredientsCategory from "./ingridients-category/ingridients-category";
import { useInView } from "react-intersection-observer";

const BurgerIngredients = () => {
  
  //при нажатии на табы будут появляться соответствующий тип ингредиентов
  const [current, setCurrent] = useState("bun");

  //хук useInView, вешаем рефы на соотв. дивы и задаем границу
  const [refBuns, inViewBuns] = useInView({ threshold: 0.1 });
  const [refSauce, inViewSauce] = useInView({ threshold: 0.1 });
  const [refMain, inViewMain] = useInView({ threshold: 0.1 });

  //логика изменения стейта
  const handleActiveTab = () => {
    if (inViewBuns) {
      setCurrent("bun");
    } else if (inViewSauce) {
      setCurrent("sauce");
    } else if (inViewMain) {
      setCurrent("main");
    }
  };

  useEffect(() => {
    handleActiveTab();
  }, [inViewBuns, inViewSauce, inViewMain]); //в этих случаях сработает handleActiveTab()

  return (
    <section className={styles.section}>
      <h1 className={`${styles.title} text text_type_main-large`}>
        Соберите бургер
      </h1>
      {/*--------------------------------- Табы ------------------------------------------------*/}
      <div className={`${styles.tab} pt-5`}>
        <a href="#bun" className={styles.link}>
          <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
            Булки
          </Tab>
        </a>
        <a href="#sauce" className={styles.link}>
          <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
            Соусы
          </Tab>
        </a>
        <a href="#main" className={styles.link}>
          <Tab value="main" active={current === "main"} onClick={setCurrent}>
            Начинки
          </Tab>
        </a>
      </div>
      {/*-------------------------- Список ингредиентов по категориям ---------------------------*/}
      <ul className={`${styles.list} pt-8`}>
        <div ref={refBuns}>
          <IngredientsCategory type="bun" />
        </div>
        <div ref={refSauce}>
          <IngredientsCategory type="sauce" />
        </div>
        <div ref={refMain}>
          <IngredientsCategory type="main" />
        </div>
      </ul>
    </section>
  );
};

export default BurgerIngredients;
