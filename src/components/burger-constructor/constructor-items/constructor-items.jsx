import React from 'react';
import ingredientType from '../../../utils/types'
import styles from './constructor-items.module.css'
import {
	DragIcon,
	ConstructorElement
}
	from '@ya.praktikum/react-developer-burger-ui-components';

const ConstructorItems = (props) => {
	return (
		<li className={`${styles.item} pt-4 mr-2`}>
			<DragIcon type="primary" />
			<ConstructorElement
				text={props.items.name}
				price={props.items.price}
				thumbnail={props.items.image}
			/>
		</li>
	)
}

ConstructorItems.propTypes = {
	items: ingredientType.isRequired
}

export default ConstructorItems;