import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Task, TaskStatus } from '../../types/task'
import { TaskCard } from '../TaskCard/TaskCard'
import { useLanguage } from '../../contexts/LanguageContext'

interface TaskColumnProps {
	status: TaskStatus
	tasks: Task[]
	onEdit: (task: Task) => void
	onDelete: (id: string) => void
	onToggleDone: (id: string) => void
}

const statusEmojis: Record<TaskStatus, string> = {
	todo: '📋',
	'in-progress': '⚙️',
	done: '✅',
}

export const TaskColumn = ({
	status,
	tasks,
	onEdit,
	onDelete,
	onToggleDone,
}: TaskColumnProps) => {
	const { t } = useLanguage()
	const { setNodeRef } = useDroppable({
		id: status,
	})

	const statusTitle = t(status === 'in-progress' ? 'inProgress' : status)
	const taskIds = tasks.map(task => task.id)

	return (
		<div className='flex-1 w-full lg:min-w-[300px] flex flex-col'>
			<div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4'>
				<h2 className='text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2'>
					<span>{statusEmojis[status]}</span>
					<span>{statusTitle}</span>
					<span className='ml-auto bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm font-semibold w-8 h-8 flex items-center justify-center'>
						{tasks.length}
					</span>
				</h2>
			</div>
			<div
				ref={setNodeRef}
				className={`px-2 pt-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg flex-1 min-h-[20px] ${
					tasks.length === 0
						? 'lg:min-h-[153px]'
						: 'lg:min-h-[153px] overflow-y-auto scrollbar-hide'
				}`}
			>
				<SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
					{tasks.length === 0 ? (
						<div className='text-center py-8 text-gray-400 dark:text-gray-500 text-sm'>
							{t('noTasks')}
						</div>
					) : (
						tasks.map(task => (
							<TaskCard
								key={task.id}
								task={task}
								onEdit={onEdit}
								onDelete={onDelete}
								onToggleDone={onToggleDone}
							/>
						))
					)}
				</SortableContext>
			</div>
		</div>
	)
}
