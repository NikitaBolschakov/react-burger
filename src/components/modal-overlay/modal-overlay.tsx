import { FC } from "react";
import styles from "./modal-overlay.module.css";

interface IModalOverlayProps {
	onClose: () => void;
  } 

const ModalOverlay: FC<IModalOverlayProps> = ({ onClose }) => (
	<div className={styles.overlay} onClick={onClose}></div>
)

export default ModalOverlay;