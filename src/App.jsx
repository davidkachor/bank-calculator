import ReactDOM from 'react-dom'
import { Fragment } from 'react'
import './App.scss'
import Main from './components/Main/Main'
import FixedButtons from './components/FixedButtons/FixedButtons'

function App() {
	return (
		<Fragment>
			<Main />
			{ReactDOM.createPortal(
				<FixedButtons />,
				document.getElementById('btn-root')
			)}
		</Fragment>
	)
}

export default App
