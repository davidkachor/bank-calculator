import { configureStore } from '@reduxjs/toolkit'
import loanCalculatorSlice from './bank-slice'

const store = configureStore({
	reducer: loanCalculatorSlice.reducer,
})

export default store
