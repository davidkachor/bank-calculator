import React, { useState, useReducer, useEffect } from 'react'
import styles from './ModalCalculator.module.scss'
import ModalContent from '../UI/Modal/ModalContent'
import Select from '../UI/Select/Select'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import calculator from '../../calculator/calculator'
import { useSelector } from 'react-redux'

function inputDataReducer(state, action) {
	switch (action.type) {
		default:
			return state
		case 'RESET_INPUT_DATA':
			return {
				...state,
				bankObj: {
					id: '0',
					bankName: '',
					interestRate: 0,
					maxLoan: 0,
					minPayment: 0,
					loanTerm: 0,
				},
				initLoanValue: 0,
				isInitLoanValid: false,
				downPaymentValue: 0,
				isDownPaymentValid: false,
				calculatorFormIsValid: false,
			}
		case 'SET_BANK_ID':
			return { ...state, selectedBankId: action.id }
		case 'SET_BANK':
			return { ...state, bankObj: action.bankObj }
		case 'USER_INPUT_INITIAL_LOAN':
			return {
				...state,
				initLoanValue: +action.value,
			}
		case 'IS_INPUT_INIT_LOAN_VALID':
			return {
				...state,
				isInitLoanValid:
					state.initLoanValue <= state.bankObj.maxLoan &&
					state.initLoanValue > 0,
			}
		case 'USER_INPUT_DOWN_PAYMENT':
			return {
				...state,
				downPaymentValue: +action.value,
			}
		case 'IS_INPUT_DOWN_PAYMENT_VALID':
			return {
				...state,
				isDownPaymentValid:
					state.downPaymentValue >=
						(state.initLoanValue * state.bankObj.minPayment) / 100 &&
					state.downPaymentValue <= state.initLoanValue,
			}
		case 'SET_IS_FORM_VALID':
			return {
				...state,
				calculatorFormIsValid:
					state.isDownPaymentValid && state.isInitLoanValid,
			}
	}
}

function ModalCalculator(props) {
	const bankList = useSelector(state => state.bankList)

	const [isCalculated, setIsCalculated] = useState(false)
	const [calculatedAnswer, setCalculatedAnswer] = useState(0)
	const [isInputsAvailable, setIsInputsAvailable] = useState(false)
	const [inputData, dispatchInputData] = useReducer(inputDataReducer, {
		selectedBankId: '0',
		bankObj: {},
		initLoanValue: 0,
		isInitLoanValid: false,
		downPaymentValue: 0,
		isDownPaymentValid: false,
		calculatorFormIsValid: false,
	})

	useEffect(() => {
		if (bankList.length > 0) {
			dispatchInputData({ type: 'SET_BANK_ID', id: bankList[0].id })
		}
	}, [bankList])

	useEffect(() => {
		if (bankList.length === 0) {
			dispatchInputData({ type: 'RESET_INPUT_DATA' })
			setIsInputsAvailable(false)
		} else {
			setIsInputsAvailable(true)
			dispatchInputData({
				type: 'SET_BANK',
				bankObj: bankList.find(e => e.id === inputData.selectedBankId),
			})
		}
	}, [bankList, inputData.selectedBankId])

	useEffect(() => {
		dispatchInputData({ type: 'IS_INPUT_INIT_LOAN_VALID' })
		dispatchInputData({ type: 'IS_INPUT_DOWN_PAYMENT_VALID' })
	}, [inputData.initLoanValue, inputData.downPaymentValue, inputData.bankObj])

	useEffect(() => {
		dispatchInputData({ type: 'SET_IS_FORM_VALID' })
	}, [
		inputData.isInitLoanValid,
		inputData.isDownPaymentValid,
		inputData.bankObj,
	])

	function changeSelectedBankHandler(id) {
		dispatchInputData({ type: 'SET_BANK_ID', id: id })
		setIsCalculated(false)
	}
	function changeInitLoanHandler(e) {
		dispatchInputData({
			type: 'USER_INPUT_INITIAL_LOAN',
			value: e.target.value,
		})
	}
	function changeDownPaymentHandler(e) {
		dispatchInputData({
			type: 'USER_INPUT_DOWN_PAYMENT',
			value: e.target.value,
		})
	}
	function clickHandler() {
		setIsCalculated(true)
		setCalculatedAnswer(
			calculator(
				inputData.initLoanValue,
				inputData.downPaymentValue,
				inputData.bankObj.loanTerm,
				inputData.bankObj.interestRate
			)
		)
	}
	function closeHandler() {
		setIsCalculated(false)
		props.onClose()
	}

	return (
		<ModalContent
			isOpen={props.isOpen}
			onClose={closeHandler}
			title={'Calculator'}
		>
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
					value={inputData.initLoanValue}
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
					value={inputData.downPaymentValue}
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
					disabled={!inputData.calculatorFormIsValid}
					className={styles['submit-btn']}
				>
					Calculate
				</Button>
			</div>
		</ModalContent>
	)
}

export default ModalCalculator
