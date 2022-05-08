import styles from './Main.module.scss'
import MainItem from './MainItem'
import { useSelector } from 'react-redux'

function Main() {
	const bankList = useSelector(state => state.bankList)

	let content
	switch (bankList.length) {
		default:
			content = bankList.map(e => (
				<MainItem
					itemId={e.id}
					key={e.id}
					bankName={e.bankName}
					interestRate={e.interestRate}
					maxLoan={e.maxLoan}
					minPayment={e.minPayment}
					loanTerm={e.loanTerm}
				/>
			))
			break
		case 0:
			content = (
				<p className={styles['main-message']}>
					You haven`t added any banks yet. Press the '+' button to add the first
					one!
				</p>
			)
			break
	}

	return (
		<main>
			<p className={styles['main-title']}>Here is Your added Banks!</p>
			<div className={styles['main-item-list']}>{content}</div>
		</main>
	)
}

export default Main
