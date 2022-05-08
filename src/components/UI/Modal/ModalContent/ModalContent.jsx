import styles from './ModalContent.module.scss'
import Button from '../../Button/Button'
import Modal from '../Modal'

function ModalContent(props) {
	return (
		<Modal>
			<div className={styles['modal-content']}>
				<div className={styles['modal-nav']}>
					<p className={styles['nav-title']}>{props.title}</p>
					<Button onClick={props.onClose} className={styles['nav-btn']}>
						&times;
					</Button>
				</div>
				{props.children}
			</div>
		</Modal>
	)
}

export default ModalContent
