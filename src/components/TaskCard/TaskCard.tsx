import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Task } from '../../types/task'
import { useLanguage } from '../../contexts/LanguageContext'
import { PencilIcon, TrashIcon, CheckIcon } from '@heroicons/react/24/outline'

interface TaskCardProps {
	task: Task
	onEdit: (task: Task) => void
	onDelete: (id: string) => void
	onToggleDone: (id: string) => void
}

export const TaskCard = ({
	task,
	onEdit,
	onDelete,
	onToggleDone,
}: TaskCardProps) => {
	const { t } = useLanguage()
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: task.id })

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	}

	const isDone = task.status === 'done'

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-2 cursor-pointer hover:shadow-lg transition-shadow border-l-4 ${
				task.status === 'todo'
					? 'border-orange-400'
					: task.status === 'in-progress'
					? 'border-orange-500'
					: 'border-orange-600'
			}`}
		>
			<div className='flex items-start justify-between'>
				<div className='flex-1 min-w-0'>
					<div className='flex items-start gap-2 mb-2'>
						{task.status !== 'done' && (
							<button
								onClick={e => {
									e.stopPropagation()
									onToggleDone(task.id)
								}}
								onMouseDown={e => e.stopPropagation()}
								className='p-1 hover:bg-orange-100 dark:hover:bg-orange-900 rounded transition-colors cursor-pointer flex-shrink-0'
								title={t('markAsDone')}
							>
								<CheckIcon className='w-5 h-5 text-gray-400 hover:text-orange-500' />
							</button>
						)}
						<h3
							className={`font-semibold text-lg break-words flex-1 min-w-0 ${
								isDone
									? 'line-through text-gray-400 dark:text-gray-500'
									: 'text-gray-800 dark:text-gray-200'
							}`}
						>
							{task.title}
						</h3>
					</div>
					<p
						className={`text-sm break-words ${
							isDone
								? 'text-gray-400 dark:text-gray-500'
								: 'text-gray-600 dark:text-gray-300'
						}`}
					>
						{task.description || t('noDescription')}
					</p>
				</div>
			</div>
			<div className='flex gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700'>
				<button
					onClick={e => {
						e.stopPropagation()
						onEdit(task)
					}}
					onMouseDown={e => e.stopPropagation()}
					className='flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-sm text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/30 rounded transition-colors cursor-pointer'
				>
					<PencilIcon className='w-4 h-4' />
					{t('edit')}
				</button>
				<button
					onClick={e => {
						e.stopPropagation()
						onDelete(task.id)
					}}
					onMouseDown={e => e.stopPropagation()}
					className='flex-1 flex items-center justify-center gap-1 px-3 py-1.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors cursor-pointer'
				>
					<TrashIcon className='w-4 h-4' />
					{t('delete')}
				</button>
			</div>
		</div>
	)
}
