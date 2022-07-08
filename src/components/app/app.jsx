import React from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import data from "../../utils/data.js";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.content}>
        <BurgerIngredients text='Соберите бургер' data={data}/>
        <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;