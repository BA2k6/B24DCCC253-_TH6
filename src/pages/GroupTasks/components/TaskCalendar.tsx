import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import type { Task } from '../types';

const localizer = momentLocalizer(moment);

interface TaskCalendarProps {
  tasks: Task[];
}

const TaskCalendar: React.FC<TaskCalendarProps> = ({ tasks }) => {
  const events = tasks.map((task) => ({
    id: task.id,
    title: `${task.title} (${task.assignee})`,
    start: new Date(task.deadline),
    end: new Date(task.deadline),
    allDay: true,
  }));

  return (
    <div style={{ minHeight: 520 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 520 }}
        views={['month', 'week', 'day']}
        defaultView='month'
      />
    </div>
  );
};

export default TaskCalendar;
