import styles from './Input.module.scss'

function Input(props) {
	return (
		<label className={props.labelClassName}>
			{props.children}
			<input
				ref={props.ref}
				onChange={props.onChange}
				step={props.step}
				min={props.min}
				max={props.max}
				disabled={props.disabled}
				value={props.value}
				className={`${styles['input']} + ${props.inputClassName}`}
				type={props.type}
			/>
		</label>
	)
}

export default Input
