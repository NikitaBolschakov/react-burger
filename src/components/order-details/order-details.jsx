import React from 'react';
import styles from './order-details.module.css'
import PropTypes from 'prop-types';
import done from '../../images/done.svg'


const OrderDetails = ({orderNumber}) => {
  return (
	  <div className={`${styles.container} pl-25 pr-25`}>
		  <h1 className={`${styles.title} text text_type_digits-large pt-15 pb-8`}>{orderNumber.order.number}</h1>
		  <p className={`text text_type_main-medium pb-15`}>идентификатор заказа</p>
		  <img className={`${styles.icon} pb-15`} src={done} alt={done} />
		  <p className={`text text_type_main-default pb-2`}>Ваш заказ начали готовить</p>
		  <p className={`text text_type_main-default text_color_inactive pb-30`}>Дождитесь готовности на орбитальной станции</p>
	  </div>
  )
}

OrderDetails.propTypes = {
	orderNumber: PropTypes.object.isRequired,
  };

export default OrderDetails;