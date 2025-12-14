import './App.css'
import { LanguageProvider } from './contexts/LanguageContext'
import MainPage from './pages/MainPage/MainPage'

function App() {
	return (
		<LanguageProvider>
			<MainPage />
		</LanguageProvider>
	)
}

export default App
