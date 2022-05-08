import { useState } from 'react'

const useBankForm = (
	name = '',
	rate = 20,
	loan = 10000,
	downPayment = 10,
	term = 3
) => {
	const [bankName, setBankName] = useState(name)
	const [interestRate, setInterestRate] = useState(rate)
	const [maxLoan, setMaxLoan] = useState(loan)
	const [minDownPayment, setMinDownPayment] = useState(downPayment)
	const [loanTerm, setLoanTerm] = useState(term)

	function changeHandler(type) {
		switch (type) {
			default:
				return () => console.log('onChange do nothing')
			case 'BANK_NAME':
				return e => setBankName(e.target.value)
			case 'INTEREST_RATE':
				return e => setInterestRate(+e.target.value)
			case 'MAX_LOAN':
				return e => setMaxLoan(+e.target.value)
			case 'MIN_DOWN_PAYMENT':
				return e => setMinDownPayment(+e.target.value)
			case 'LOAN_TERM':
				return e => setLoanTerm(+e.target.value)
		}
	}

	function setStates(name,rate, loan, downPayment, term) {
		setBankName(name)
		setInterestRate(rate)
		setMaxLoan(loan)
		setLoanTerm(downPayment)
		setMinDownPayment(term)
	}

	function resetStates() {
		setBankName('')
		setInterestRate(20)
		setMaxLoan(10000)
		setMinDownPayment(10)
		setLoanTerm(3)
	}

	return {
		changeHandler,
		bankName,
		interestRate,
		maxLoan,
		minDownPayment,
		loanTerm,
		resetStates,
		setStates
	}
}

export default useBankForm
