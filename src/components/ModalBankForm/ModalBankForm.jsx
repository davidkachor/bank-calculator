import React, { useEffect, useState } from 'react'
import styles from './ModalBankForm.module.scss'
import ModalContent from '../UI/Modal/ModalContent/ModalContent'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import useBankForm from '../../hooks/use-bank-form'
import { useDispatch } from 'react-redux'
import { addBank } from '../../store/bank-slice'

function ModalBankForm(props) {
	const dispatch = useDispatch()
	const {
		changeHandler,
		resetStates,
		loanTerm,
		maxLoan,
		minDownPayment,
		interestRate,
		bankName,
	} = useBankForm()

	const [formIsValid, setFormIsValid] = useState(false)

	useEffect(() => {
		setFormIsValid(
			bankName.length > 0 &&
				interestRate >= 0 &&
				maxLoan > 0 &&
				minDownPayment >= 0 &&
				loanTerm > 1
		)
	}, [bankName, interestRate, maxLoan, minDownPayment, loanTerm])

	function submitHandler(e) {
		e.preventDefault()

		dispatch(
			addBank({
				body: {
					id: Math.floor(Math.random() * 1000000000000000) + '',
					bankName,
					interestRate,
					maxLoan,
					minPayment: minDownPayment,
					loanTerm,
				},
			})
		)

		resetStates()
		props.onClose()
	}

	return (
		<ModalContent onClose={props.onClose} title={'Adding new Bank'}>
			<form onSubmit={submitHandler} className={styles['bank-form']} action="">
				<Input
					value={bankName}
					onChange={changeHandler('BANK_NAME')}
					labelClassName={styles['bank-form-label']}
					inputClassName={styles['bank-form-input']}
				>
					<span className={styles['label-title']}>Bank Name</span>
				</Input>
				<Input
					value={interestRate}
					onChange={changeHandler('INTEREST_RATE')}
					type={'number'}
					step={'0.01'}
					min={'0'}
					max={'100'}
					labelClassName={styles['bank-form-label']}
					inputClassName={styles['bank-form-input']}
				>
					<span className={styles['label-title']}>
						Interest Rate (in percentage)
					</span>
				</Input>
				<Input
					value={maxLoan}
					onChange={changeHandler('MAX_LOAN')}
					type={'number'}
					min={'0'}
					step={'100'}
					labelClassName={styles['bank-form-label']}
					inputClassName={styles['bank-form-input']}
				>
					<span className={styles['label-title']}>Maximum loan (USD)</span>
				</Input>
				<Input
					value={minDownPayment}
					onChange={changeHandler('MIN_DOWN_PAYMENT')}
					type={'number'}
					step={'0.01'}
					min={'0'}
					max={'100'}
					labelClassName={styles['bank-form-label']}
					inputClassName={styles['bank-form-input']}
				>
					<span className={styles['label-title']}>
						Minimum down payment (in percentage)
					</span>
				</Input>
				<Input
					value={loanTerm}
					onChange={changeHandler('LOAN_TERM')}
					type={'number'}
					step={'1'}
					min={'1'}
					labelClassName={styles['bank-form-label']}
					inputClassName={styles['bank-form-input']}
				>
					<span className={styles['label-title']}>
						Loan term (amount of months)
					</span>
				</Input>
				<Button
					className={styles['submit-btn']}
					type={'submit'}
					disabled={!formIsValid}
				>
					Submit!
				</Button>
			</form>
		</ModalContent>
	)
}

export default ModalBankForm
