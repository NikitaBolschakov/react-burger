import React from 'react';
import styles from './ingredient-details.module.css'
import ingredientType from '../../utils/types'

const IngredientDetails = (props) => {
  return (
    <div className={`${styles.container} pr-25 pl-25 pb-15`}>
      <img className={`${styles.pic}`} src={props.item.image_large} alt={props.item.name} />
      <h3 className={`${styles.title} text text_type_main-medium pt-4`}>{props.item.name}</h3>
      <ul className={`${styles.list} pt-8`}>
        <li className={`${styles.item}`}>
          <p className={`${styles.text} text text_type_main-default text_color_inactive pb-2`}>Калории,ккал</p>
          <p className={`${styles.text} text text_type_main-default text_color_inactive`}>{props.item.calories}</p>
        </li>
        <li className={`${styles.item}`}>
      	  <p className={`${styles.text} text text_type_main-default text_color_inactive pb-2`}>Белки, г</p>
      	  <p className={`${styles.text} text text_type_main-default text_color_inactive`}>{props.item.proteins}</p>
        </li>
        <li className={`${styles.item}`}>
      	  <p className={`${styles.text} text text_type_main-default text_color_inactive pb-2`}>Жиры, г</p>
      	  <p className={`${styles.text} text text_type_main-default text_color_inactive`}>{props.item.fat}</p>
        </li>
        <li className={`${styles.item}`}>
      	  <p className={`${styles.text} text text_type_main-default text_color_inactive pb-2`}>Углеводы, г</p>
      	  <p className={`${styles.text} text text_type_main-default text_color_inactive`}>{props.item.carbohydrates}</p>
        </li>
      </ul>
  	</div>
  )
}

IngredientDetails.propTypes = {
	item: ingredientType.isRequired
}

export default IngredientDetails;