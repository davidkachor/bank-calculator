import { createSlice } from '@reduxjs/toolkit'

const loanCalculatorSlice = createSlice({
	name: 'loan calculator',
	initialState: {
		bankList: JSON.parse(localStorage.getItem('BANK_LIST')) || [],
	},
	reducers: {
		addBank(state, action) {
			state.bankList.push(action.payload.body)
			localStorage.setItem('BANK_LIST', JSON.stringify(state.bankList))
		},
		removeBank(state, action) {
			state.bankList = state.bankList.filter(e => e.id !== action.payload.id)
			localStorage.setItem('BANK_LIST', JSON.stringify(state.bankList))
		},
		editBank(state, action) {
			const { id, body } = action.payload
			const foundObj = state.bankList.find(e => e.id === id)
			foundObj.bankName = body.bankName
			foundObj.interestRate = body.interestRate
			foundObj.maxLoan = body.maxLoan
			foundObj.minPayment = body.minPayment
			foundObj.loanTerm = body.loanTerm
			localStorage.setItem('BANK_LIST', JSON.stringify(state.bankList))
		},
	},
})

export const { addBank, removeBank, editBank } = loanCalculatorSlice.actions

export default loanCalculatorSlice
