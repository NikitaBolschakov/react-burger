import { FC, ReactNode } from "react";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

//Сюда будет отрендерен Modal
const modalRoot = document.querySelector('#modals') as HTMLElement;

interface IModalProps {
  title: string;
  isOpened: boolean;
  onClose: () => void;
  children: ReactNode;
} 

const Modal : FC<IModalProps> = ({ title, isOpened, onClose, children }) => {
  
  //При открытом окне, вешаем слушатель с функцией закрытия, return() удалит слушатель при закрытии
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
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
          <CloseIcon type='primary' onClick={onClose} />
        </button>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    modalRoot
  );
};

export default Modal;