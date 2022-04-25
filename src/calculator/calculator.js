function calculator(initLoan, downPayment, loanTerm, interestRate) {
    const ratePerYear = interestRate / 100 / 12
    const expression = Math.pow(1 + ratePerYear, loanTerm)
    const answer = ((initLoan - downPayment) * ratePerYear * expression) / (expression - 1)
    return answer.toFixed(2)
}

export default calculator