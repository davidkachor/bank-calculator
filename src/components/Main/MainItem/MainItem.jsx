import React, { useState, useEffect } from 'react'
import styles from './MainItem.module.scss'
import deleteIcon from './Icons/delete-icon.svg'
import confirmIcon from './Icons/confirm-icon.svg'
import cancelIcon from './Icons/cancel-icon.svg'
import editIcon from './Icons/edit-icon.svg'
import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'
import { useDispatch } from 'react-redux'
import { editBank, removeBank } from '../../../store/bank-slice'
import useBankForm from '../../../hooks/use-bank-form'

function MainItem(props) {
	const dispatch = useDispatch()

	const {
		changeHandler,
		setStates,
		bankName,
		interestRate,
		maxLoan,
		minDownPayment,
		loanTerm,
	} = useBankForm(
		props.bankName,
		props.interestRate,
		props.interestRate,
		props.maxLoan,
		props.minPayment,
		props.loanTerm
	)

	const [editFormIsOpen, setEditFormIsOpen] = useState(false)
	const [editFormIsValid, setEditFormIsValid] = useState(true)

	useEffect(() => {
		setEditFormIsValid(
			bankName.length > 0 &&
				interestRate >= 0 &&
				maxLoan > 0 &&
				minDownPayment >= 0 &&
				loanTerm > 1
		)
	}, [bankName, interestRate, maxLoan, minDownPayment, loanTerm])

	function deleteHandler() {
		dispatch(removeBank({ id: props.itemId }))
	}
	function openEditFormHandler() {
		setEditFormIsOpen(true)
		setStates(
			props.bankName,
			props.interestRate,
			props.maxLoan,
			props.loanTerm,
			props.minPayment
		)
	}
	function closeEditFormHandler() {
		setEditFormIsOpen(false)
	}
	function confirmEditHandler() {
		dispatch(
			editBank({
				id: props.itemId,
				body: {
					bankName,
					interestRate,
					maxLoan,
					minPayment: minDownPayment,
					loanTerm,
				},
			})
		)
		setEditFormIsOpen(false)
	}

	return (
		<div className={styles.item}>
			<div className={styles['item-section']}>
				<p className={styles['item-text']}>
					<span className={styles['item-title']}>Bank Name: </span>
					{editFormIsOpen && (
						<Input onChange={changeHandler('BANK_NAME')} value={bankName} />
					)}
					{!editFormIsOpen && props.bankName}
				</p>

				<p className={styles['item-text']}>
					<span className={styles['item-title']}>Interest Rate: </span>
					{editFormIsOpen && (
						<Input
							onChange={changeHandler('INTEREST_RATE')}
							type={'number'}
							step={'0.01'}
							min={'0'}
							max={'100'}
							value={interestRate}
						/>
					)}
					{!editFormIsOpen && props.interestRate}%
				</p>

				<p className={styles['item-text']}>
					<span className={styles['item-title']}>Maximum Loan: </span>$
					{editFormIsOpen && (
						<Input
							onChange={changeHandler('MAX_LOAN')}
							type={'number'}
							min={'0'}
							step={'100'}
							value={maxLoan}
						/>
					)}
					{!editFormIsOpen && props.maxLoan}
				</p>

				<p className={styles['item-text']}>
					<span className={styles['item-title']}>Minimum Down Payment: </span>
					{editFormIsOpen && (
						<Input
							onChange={changeHandler('MIN_DOWN_PAYMENT')}
							type={'number'}
							step={'0.01'}
							min={'0'}
							max={'100'}
							value={minDownPayment}
						/>
					)}
					{!editFormIsOpen && props.minPayment}%
				</p>

				<p className={styles['item-text']}>
					<span className={styles['item-title']}>Loan Term: </span>
					{editFormIsOpen && (
						<Input
							onChange={changeHandler('LOAN_TERM')}
							type={'number'}
							step={'1'}
							min={'1'}
							value={loanTerm}
						/>
					)}
					{!editFormIsOpen && props.loanTerm} months
				</p>
			</div>

			<div className={`${styles['item-section']} ${styles['btn-container']}`}>
				{!editFormIsOpen && (
					<React.Fragment>
						<Button
							onClick={openEditFormHandler}
							className={`${styles['item-btn']} ${styles['green-btn']}`}
						>
							<img src={editIcon} alt="upg" width="30" height="30" />
						</Button>

						<Button
							onClick={deleteHandler}
							className={`${styles['item-btn']} ${styles['red-btn']}`}
						>
							<img src={deleteIcon} alt="del" width="30" height="30" />
						</Button>
					</React.Fragment>
				)}

				{editFormIsOpen && (
					<React.Fragment>
						<Button
							onClick={confirmEditHandler}
							disabled={!editFormIsValid}
							className={`${styles['item-btn']} ${styles['green-btn']}`}
						>
							<img src={confirmIcon} alt="upg" width="30" height="30" />
						</Button>

						<Button
							onClick={closeEditFormHandler}
							className={`${styles['item-btn']} ${styles['red-btn']}`}
						>
							<img src={cancelIcon} alt="del" width="30" height="30" />
						</Button>
					</React.Fragment>
				)}
			</div>
		</div>
	)
}

export default MainItem
