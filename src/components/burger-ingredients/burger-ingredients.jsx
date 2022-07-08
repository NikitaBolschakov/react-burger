import React from 'react';
import PropTypes from "prop-types";
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

BurgerIngredients.propTypes = {
    //проверка пропсов с текстом
    text: PropTypes.string.isRequired,  
    //проверка пропсов с данными
    data: PropTypes.arrayOf(            
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        __v: PropTypes.number.isRequired,
      }).isRequired
    ).isRequired,
  };

export default BurgerIngredients;