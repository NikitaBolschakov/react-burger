import React from 'react';
import {
	ConstructorElement,
	CurrencyIcon,
	Button,
    }
	from '@ya.praktikum/react-developer-burger-ui-components'
import data from '../../utils/data';
import ConstructorItems from './constructor-items/constructor-items'
import styles from './burger-constructor.module.css';

const BurgerConstructor = () => {
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
					{data.map((elem) => {
						if (elem.type === 'sauce' || elem.type === 'main') {
							return <ConstructorItems key={elem._id} items={elem} />
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
				<Button type="primary" size="large">
					Оформить заказ
				</Button>
			</div>
		</section>
	)
}

export default BurgerConstructor;