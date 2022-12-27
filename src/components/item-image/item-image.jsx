import styles from "./item-image.module.css";

const ItemImage = ({ ingredient }) => {

  return (
    <div className={styles.img__border_gradient}>
      <div className={styles.img__container}>
        <img className={styles.img} src={ingredient.image} alt={ingredient.name} />
      </div>
    </div>
  );
}

export default ItemImage;