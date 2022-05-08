import React from 'react'
import styles from './Select.module.scss'

function Select(props) {
	const changeHandler = event => {
		props.onChange(event.target.value)
	}

	return (
		<select
			disabled={props.disabled}
			onChange={changeHandler}
			className={`${styles.select} ${props.className}`}
		>
			{props.bankList.map((e, i) => (
				<option key={i} value={e.id}>
					{e.bankName}
				</option>
			))}
		</select>
	)
}

export default Select
