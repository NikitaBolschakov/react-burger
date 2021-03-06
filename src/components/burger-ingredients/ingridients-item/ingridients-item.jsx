import React from 'react';
import PropTypes from 'prop-types';
import ingredientType from '../../../utils/types'
import styles from './ingridients-item.module.css'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

const IngridientsItem = (props) => {
	return (
		<div className={`${styles.item} pl-4`}>
			<img className={`${styles.image}`} src={props.ingredient.image} alt={props.ingredient.name} />
			<div className={`${styles.price} pt-1 pb-2`}>
				<p className='text text_type_digits-default pr-2'>{props.ingredient.price}</p>
				<CurrencyIcon type="primary" />
			</div>
			<p className='text text_type_main-default pb-10'>{props.ingredient.name}</p>
			<Counter count={1} size="default" />
		</div>
	)
}

IngridientsItem.propTypes = {
	ingredient: ingredientType.isRequired
}

export default IngridientsItem;