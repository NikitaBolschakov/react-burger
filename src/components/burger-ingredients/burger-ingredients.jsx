import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css'
import IngredientsCategory from './ingridients-category/ingridients-category'

const BurgerIngredients = () => {
	
	//при нажатии на табы будут появляться соответствующий тип ингредиентов
	const [current, setCurrent] = React.useState('bun');

	return (
		<section className={styles.section}>
			<h1 className={`${styles.title} text text_type_main-large`}>Соберите бургер</h1>
	        {/*--------------------------------- Табы -----------------------------------*/}
			<div className={`${styles.tab} pt-5`}>
				<a href='#bun' className={styles.link}>
					<Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
						Булки
					</Tab>
				</a>
				<a href='#sauce' className={styles.link}>
					<Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
						Соусы
					</Tab>
				</a>
				<a href='#main' className={styles.link}>
					<Tab value="main" active={current === 'main'} onClick={setCurrent}>
						Начинки
					</Tab>
				</a>
			</div>
			{/*-------------------------- Список ингредиентов по категориям ---------------------------*/}
			<ul className={`${styles.list} pt-8`}>
			    <IngredientsCategory type='bun' />
				<IngredientsCategory type='sauce' />
				<IngredientsCategory type='main' />
			</ul>
		</section >
	)
}

export default BurgerIngredients;