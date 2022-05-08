import React from 'react'
import ReactDOM from 'react-dom'
import styles from './Modal.module.scss'

function Modal(props) {
	return ReactDOM.createPortal(
		<div className={styles.modal}>{props.children}</div>,
		document.getElementById('modal-root')
	)
}

export default Modal
