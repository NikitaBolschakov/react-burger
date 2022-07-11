import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-ingredients.module.css'
import IngredientsCategory from './ingridients-category/ingridients-category'
import categories from '../../utils/categories'

const BurgerIngredients = () => {
	const [current, setCurrent] = React.useState('bun')
	return (
		<section className={styles.section}>
			<h1 className={`${styles.title} text text_type_main-large`}>Соберите бургер</h1>
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
			<ul className={`${styles.list} pt-8`}>
				{categories.map((elem) => (
					<IngredientsCategory key={elem.type} type={elem.type} text={elem.text} />
				))}
			</ul>
		</section >
	)
}

export default BurgerIngredients;