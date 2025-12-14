import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ru' | 'en';

interface Translations {
	[key: string]: {
		ru: string;
		en: string;
	};
}

const translations: Translations = {
	appTitle: {
		ru: 'Task Tracker',
		en: 'Task Tracker',
	},
	appSubtitle: {
		ru: 'Управляйте своими задачами эффективно',
		en: 'Manage your tasks efficiently',
	},
	addTask: {
		ru: 'Добавить задачу',
		en: 'Add Task',
	},
	todo: {
		ru: 'К выполнению',
		en: 'To Do',
	},
	inProgress: {
		ru: 'В работе',
		en: 'In Progress',
	},
	done: {
		ru: 'Выполнено',
		en: 'Done',
	},
	noTasks: {
		ru: 'Нет задач',
		en: 'No tasks',
	},
	edit: {
		ru: 'Редактировать',
		en: 'Edit',
	},
	delete: {
		ru: 'Удалить',
		en: 'Delete',
	},
	newTask: {
		ru: 'Новая задача',
		en: 'New Task',
	},
	editTask: {
		ru: 'Редактировать задачу',
		en: 'Edit Task',
	},
	taskTitle: {
		ru: 'Название задачи *',
		en: 'Task Title *',
	},
	taskTitlePlaceholder: {
		ru: 'Введите название задачи',
		en: 'Enter task title',
	},
	taskDescription: {
		ru: 'Описание',
		en: 'Description',
	},
	taskDescriptionPlaceholder: {
		ru: 'Введите описание задачи (необязательно)',
		en: 'Enter task description (optional)',
	},
	taskStatus: {
		ru: 'Статус',
		en: 'Status',
	},
	cancel: {
		ru: 'Отмена',
		en: 'Cancel',
	},
	create: {
		ru: 'Создать',
		en: 'Create',
	},
	save: {
		ru: 'Сохранить',
		en: 'Save',
	},
	markAsDone: {
		ru: 'Отметить как выполненное',
		en: 'Mark as done',
	},
	deleteConfirm: {
		ru: 'Вы уверены, что хотите удалить эту задачу?',
		en: 'Are you sure you want to delete this task?',
	},
	noDescription: {
		ru: 'Нет описания',
		en: 'No description',
	},
};

interface LanguageContextType {
	language: Language;
	setLanguage: (lang: Language) => void;
	t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
	const [language, setLanguageState] = useState<Language>('ru');

	useEffect(() => {
		const savedLanguage = localStorage.getItem('language') as Language;
		if (savedLanguage && (savedLanguage === 'ru' || savedLanguage === 'en')) {
			setLanguageState(savedLanguage);
		}
	}, []);

	const setLanguage = (lang: Language) => {
		setLanguageState(lang);
		localStorage.setItem('language', lang);
	};

	const t = (key: string): string => {
		return translations[key]?.[language] || key;
	};

	return (
		<LanguageContext.Provider value={{ language, setLanguage, t }}>
			{children}
		</LanguageContext.Provider>
	);
};

export const useLanguage = () => {
	const context = useContext(LanguageContext);
	if (!context) {
		throw new Error('useLanguage must be used within LanguageProvider');
	}
	return context;
};



