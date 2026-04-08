import { Button, Card, Space, Table, Tag, Typography } from 'antd';
import moment from 'moment';
import type { Task } from '../types';

const { Text } = Typography;

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const priorityColor = (priority: string) => {
  switch (priority) {
    case 'Cao':
      return 'red';
    case 'Trung bình':
      return 'orange';
    default:
      return 'green';
  }
};

const statusColor = (status: string) => {
  switch (status) {
    case 'Đang làm':
      return 'blue';
    case 'Đã xong':
      return 'green';
    default:
      return 'default';
  }
};

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
  const columns = [
    {
      title: 'Tên công việc',
      dataIndex: 'title',
      key: 'title',
      render: (value: string) => <Text strong>{value}</Text>,
    },
    {
      title: 'Người được giao',
      dataIndex: 'assignee',
      key: 'assignee',
    },
    {
      title: 'Ưu tiên',
      dataIndex: 'priority',
      key: 'priority',
      render: (value: string) => <Tag color={priorityColor(value)}>{value}</Tag>,
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      render: (value: string) => moment(value).format('DD/MM/YYYY'),
      sorter: (a: Task, b: Task) => moment(a.deadline).unix() - moment(b.deadline).unix(),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (value: string) => <Tag color={statusColor(value)}>{value}</Tag>,
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_: any, record: Task) => (
        <Space>
          <Button type='link' onClick={() => onEdit(record)}>
            Sửa
          </Button>
          <Button type='link' danger onClick={() => onDelete(record)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card bodyStyle={{ padding: 0 }}>
      <Table<Task>
        dataSource={tasks}
        rowKey='id'
        columns={columns}
        pagination={{ pageSize: 6 }}
        locale={{ emptyText: 'Chưa có công việc nào' }}
      />
    </Card>
  );
};

export default TaskList;
