import React from 'react';
import styles from "./modal-overlay.module.css";

const ModalOverlay = ({ onClose }) => (
	<div className={styles.overlay} onClick={onClose}></div>
)

export default ModalOverlay;