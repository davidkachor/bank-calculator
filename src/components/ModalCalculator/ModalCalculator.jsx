import React, { useState, useEffect } from 'react'
import styles from './ModalCalculator.module.scss'
import ModalContent from '../UI/Modal/ModalContent/ModalContent'
import Select from '../UI/Select/Select'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import calculator from '../../calculator/calculator'
import { useSelector } from 'react-redux'

function ModalCalculator(props) {
	const bankList = useSelector(state => state.bankList)

	const [isCalculated, setIsCalculated] = useState(false)
	const [calculatedAnswer, setCalculatedAnswer] = useState(0)
	const [isInputsAvailable, setIsInputsAvailable] = useState(false)

	const [selectedBankId, setSelectedBankId] = useState(bankList[0].id)
	const [selectedBank, setSelectedBank] = useState(bankList[0])
	const [initLoan, setInitLoan] = useState('')
	const [downPayment, setDownPayment] = useState('')
	const [areInputsValid, setAreInputsValid] = useState(false)

	useEffect(() => {
		if (bankList.length === 0) {
			setIsInputsAvailable(false)
		} else {
			setSelectedBank(bankList.find(e => e.id === selectedBankId))
			setIsInputsAvailable(true)
		}
	}, [bankList, selectedBankId])

	useEffect(() => {
		setAreInputsValid(
			+initLoan <= selectedBank.maxLoan &&
				+initLoan > 0 &&
				+downPayment >= (+initLoan * selectedBank.minPayment) / 100 &&
				+downPayment <= +initLoan
		)
	}, [initLoan, downPayment, selectedBank.maxLoan, selectedBank.minPayment])

	function changeSelectedBankHandler(id) {
		setIsCalculated(false)
		setSelectedBankId(id)
	}
	function changeInitLoanHandler(e) {
		setInitLoan(e.target.value)
		setIsCalculated(false)
	}
	function changeDownPaymentHandler(e) {
		setDownPayment(e.target.value)
		setIsCalculated(false)
	}
	function clickHandler() {
		setIsCalculated(true)
		setCalculatedAnswer(
			calculator(
				initLoan,
				downPayment,
				selectedBank.loanTerm,
				selectedBank.interestRate
			)
		)
	}
	function closeHandler() {
		setIsCalculated(false)
		props.onClose()
	}

	return (
		<ModalContent onClose={closeHandler} title={'Calculator'}>
			<div className={styles['calculator-form']}>
				<label className={styles['form-title']}>
					Choose the bank!
					<Select
						className={styles['form-input']}
						disabled={!isInputsAvailable}
						onChange={changeSelectedBankHandler}
						bankList={bankList}
					/>
				</label>
				<Input
					disabled={!isInputsAvailable}
					value={initLoan}
					labelClassName={styles['form-title']}
					inputClassName={styles['form-input']}
					type={'number'}
					min={0}
					onChange={changeInitLoanHandler}
				>
					Initial loan
				</Input>
				<Input
					disabled={!isInputsAvailable}
					value={downPayment}
					labelClassName={styles['form-title']}
					inputClassName={styles['form-input']}
					type={'number'}
					min={'0'}
					onChange={changeDownPaymentHandler}
				>
					Down payment
				</Input>
				{isCalculated && (
					<p className={styles['calculator-answer']}>${calculatedAnswer}</p>
				)}
				<Button
					onClick={clickHandler}
					disabled={!areInputsValid}
					className={styles['submit-btn']}
				>
					Calculate
				</Button>
			</div>
		</ModalContent>
	)
}

export default ModalCalculator
