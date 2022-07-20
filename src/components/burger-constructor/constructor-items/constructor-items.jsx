import React from 'react';
import PropTypes from 'prop-types';
import ingredientType from '../../../utils/types'
import styles from './constructor-items.module.css'
import { DragIcon, ConstructorElement }
	from '@ya.praktikum/react-developer-burger-ui-components';

const ConstructorItems = ({element}) => {
	return (
		<li className={`${styles.item} pt-4 mr-2`}>
			<DragIcon type="primary" />
			<ConstructorElement
				text={element.name}
				price={element.price}
				thumbnail={element.image}
			/>
		</li>
	)
}

ConstructorItems.propTypes = {
	element: ingredientType.isRequired
}

export default ConstructorItems;