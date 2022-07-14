import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay.jsx";

//Сюда будет отрендерен Modal
const modalRoot = document.querySelector('#modals'); 

const Modal = ({ title, isOpened, onClose, children }) => {
  //При открытом окне, вешаем слушатель с функцией закрытия, return() удалит слушатель при закрытии
  React.useEffect(() => {
    function handleEsc(evt) {
      if (evt.key === "Escape") {
        onClose();
      }
    }
    if (isOpened) {
      document.addEventListener("keydown", handleEsc);
      return () => {
        document.removeEventListener("keydown", handleEsc);
      };
    }
  }, [isOpened]);

  return ReactDOM.createPortal(
    <>
      <div className={styles.container}>
        <h3 className={`${styles.title} text text_type_main-large pl-10 pt-15 pb-1`}>
          {title}
        </h3>
        <button className={styles.close_icon}>
          <CloseIcon onClick={onClose} />
        </button>
        {children}
      </div>
      <ModalOverlay isOpened={isOpened} onClose={onClose} />
    </>,
    modalRoot
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;