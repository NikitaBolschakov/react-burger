import styles from "./order-item-image.module.css";
import PropTypes from "prop-types";

const OrderItemImage = ({ ingredient }) => {

  return (
    <div className={styles.border}>
      <div className={styles.container}>
        <img className={styles.image}  alt={ingredient?.name}  src={ingredient?.image} /> 
      </div>
    </div>
  );
}

export default OrderItemImage;

/* OrderItemImage.propTypes = {
	ingredient: PropTypes.object.isRequired
};   */