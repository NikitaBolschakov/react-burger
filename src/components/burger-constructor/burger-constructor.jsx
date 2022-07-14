import React from 'react';
import PropTypes from 'prop-types';
import ingredientType from '../../utils/types'
import { ConstructorElement, CurrencyIcon, Button } 
	from '@ya.praktikum/react-developer-burger-ui-components'
import ConstructorItems from './constructor-items/constructor-items'
import styles from './burger-constructor.module.css';

const BurgerConstructor = ({ ingredients, onClick }) => {
	return (
		<section className={`${styles.section} pl-10 pt-25`}>
			<div className={`${styles.container} pr-2`}>
                {/* --------- верхняя булка ---------- */}
				<ConstructorElement
					type="top"
					isLocked={true}
					text="Краторная булка N-200i (верх)"
					price={20}
					thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                />
                {/* --------- список покупок ---------- */}
				<ul className={`${styles.list} pr-2`}>
					{ingredients.map((element) => {
						if (element.type === 'main' || element.type === 'sauce') {
							return <ConstructorItems key={element._id} items={element} />
						}
					})}
				</ul>
                {/* --------- нижняя булка ---------- */}
				<ConstructorElement
					type="bottom"
					isLocked={true}
					text="Краторная булка N-200i (низ)"
					price={20}
					thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
				/>
			</div>
            {/* --------- оформление заказа ---------- */}
			<div className={`${styles.order} pt-10 pr-5 pb-10`}>
				<div className={`${styles.count_result} pr-10`}>
					<p className='text text_type_digits-medium pr-2'>610</p>
					<CurrencyIcon type="primary" />
				</div>
				<Button type="primary" size="large" onClick={onClick}>Оформить заказ</Button>
			</div>
		</section>
	)
}

BurgerConstructor.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
	onClick: PropTypes.func.isRequired
}

export default BurgerConstructor;