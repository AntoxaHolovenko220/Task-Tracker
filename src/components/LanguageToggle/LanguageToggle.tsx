import { useLanguage } from '../../contexts/LanguageContext'

export const LanguageToggle = () => {
	const { language, setLanguage } = useLanguage()

	const toggleLanguage = () => {
		setLanguage(language === 'ru' ? 'en' : 'ru')
	}

	return (
		<button
			onClick={toggleLanguage}
			className=' rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium text-sm w-10 h-10'
			title={language === 'ru' ? 'Switch to English' : 'Переключить на русский'}
		>
			{language === 'ru' ? 'EN' : 'RU'}
		</button>
	)
}


