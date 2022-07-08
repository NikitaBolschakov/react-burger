import React from 'react';
import styles from './ingridients-category.module.css'
import IngridientsItem from '../ingridients-item/ingridients-item';
import data from '../../../utils/data';

const IngredientsCategory = (props) => {
	const category = data.filter((elem) => elem.type === props.type)
	return (
		<li className={`${styles.item} `} id={props.type}>
			<h2 className={`${styles.text} text text_type_main-medium pb-6 pt-2`}>{props.text}</h2>
			<ul className={styles.list}>
				{category.map((elem) => (
					<IngridientsItem key={elem._id} ingredient={elem} />
				))}
			</ul>
		</li>
	)
}

export default IngredientsCategory;