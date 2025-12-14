import { useState, useEffect } from 'react';
import { Task, TaskStatus } from '../../types/task';
import { useLanguage } from '../../contexts/LanguageContext';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface AddTaskModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (task: Omit<Task, 'id' | 'createdAt'>) => void;
	editingTask?: Task | null;
}

export const AddTaskModal = ({
	isOpen,
	onClose,
	onSave,
	editingTask,
}: AddTaskModalProps) => {
	const { t } = useLanguage();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [status, setStatus] = useState<TaskStatus>('todo');

	useEffect(() => {
		if (editingTask) {
			setTitle(editingTask.title);
			setDescription(editingTask.description);
			setStatus(editingTask.status);
		} else {
			setTitle('');
			setDescription('');
			setStatus('todo');
		}
	}, [editingTask, isOpen]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (title.trim()) {
			onSave({ title: title.trim(), description: description.trim(), status });
			onClose();
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
			<div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
						{editingTask ? t('editTask') : t('newTask')}
					</h2>
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
					>
						<XMarkIcon className="w-6 h-6" />
					</button>
				</div>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							{t('taskTitle')}
						</label>
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
							placeholder={t('taskTitlePlaceholder')}
							required
							autoFocus
						/>
					</div>
					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							{t('taskDescription')}
						</label>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							rows={4}
							className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-none"
							placeholder={t('taskDescriptionPlaceholder')}
						/>
					</div>
					<div className="mb-6">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
							{t('taskStatus')}
						</label>
						<select
							value={status}
							onChange={(e) => setStatus(e.target.value as TaskStatus)}
							className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
						>
							<option value="todo">📋 {t('todo')}</option>
							<option value="in-progress">⚙️ {t('inProgress')}</option>
							<option value="done">✅ {t('done')}</option>
						</select>
					</div>
					<div className="flex gap-3">
						<button
							type="button"
							onClick={onClose}
							className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
						>
							{t('cancel')}
						</button>
						<button
							type="submit"
							className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors font-medium"
						>
							{editingTask ? t('save') : t('create')}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

