import styles from './Button.module.scss'

function Button(props) {
	return (
		<button
			type={props.type}
			onClick={props.onClick}
			className={`${styles.btn} + ${props.className}`}
			disabled={props.disabled}
		>
			{props.children}
		</button>
	)
}

export default Button
