import { useState } from 'react';
import { useModel } from 'umi';
import { Button, Card, Col, Divider, Input, Row, Select, Statistic, Tabs, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskCalendar from './components/TaskCalendar';
import { useGroupTasks } from './hooks/useGroupTasks';
import type { Task } from './types';

const { Title, Text } = Typography;

const statusOptions = ['all', 'Chưa làm', 'Đang làm', 'Đã xong'];

const GroupTasksPage: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const currentUserName =
    initialState?.currentUser?.family_name ||
    initialState?.currentUser?.name ||
    initialState?.currentUser?.preferred_username ||
    'Người dùng';

  const {
    filteredTasks,
    assignedToMeTasks,
    addTask,
    updateTask,
    deleteTask,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    assigneeFilter,
    setAssigneeFilter,
    assignees,
    totalCount,
    completedCount,
  } = useGroupTasks(currentUserName);

  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setModalVisible(true);
  };

  const handleDelete = (task: Task) => {
    deleteTask(task.id);
  };

  const handleSave = (taskData: Omit<Task, 'id' | 'createdAt' | 'createdBy'>) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask(taskData);
    }
    setModalVisible(false);
    setEditingTask(undefined);
  };

  const selectAssignees = ['all', ...assignees];

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Row justify='space-between' align='middle'>
              <Col>
                <Title level={4}>Quản lý công việc nhóm</Title>
                <Text>Xin chào, {currentUserName}</Text>
              </Col>
              <Col>
                <Button type='primary' icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>
                  Thêm công việc
                </Button>
              </Col>
            </Row>
            <Divider />
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8} md={6}>
                <Statistic title='Tổng công việc' value={totalCount} />
              </Col>
              <Col xs={24} sm={8} md={6}>
                <Statistic title='Đã hoàn thành' value={completedCount} />
              </Col>
              <Col xs={24} sm={8} md={6}>
                <Statistic title='Giao cho tôi' value={assignedToMeTasks.length} />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={24}>
          <Card>
            <Row gutter={[16, 16]} align='middle'>
              <Col xs={24} md={10}>
                <Input.Search
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder='Tìm kiếm tên công việc'
                  allowClear
                />
              </Col>
              <Col xs={24} md={7}>
                <Select
                  value={statusFilter}
                  onChange={(value) => setStatusFilter(value)}
                  style={{ width: '100%' }}
                >
                  {statusOptions.map((item) => (
                    <Select.Option key={item} value={item}>
                      {item === 'all' ? 'Tất cả trạng thái' : item}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
              <Col xs={24} md={7}>
                <Select
                  value={assigneeFilter}
                  onChange={(value) => setAssigneeFilter(value)}
                  style={{ width: '100%' }}
                >
                  {selectAssignees.map((name) => (
                    <Select.Option key={name} value={name}>
                      {name === 'all' ? 'Tất cả người được giao' : name}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
            </Row>

            <Divider />

            <Tabs activeKey={view} onChange={(key) => setView(key as 'list' | 'calendar')}>
              <Tabs.TabPane tab='Danh sách công việc' key='list'>
                <TaskList tasks={filteredTasks} onEdit={handleEdit} onDelete={handleDelete} />
              </Tabs.TabPane>
              <Tabs.TabPane tab='Lịch deadline' key='calendar'>
                <TaskCalendar tasks={filteredTasks} />
              </Tabs.TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>

      <TaskForm
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingTask(undefined);
        }}
        onSave={handleSave}
        initialValues={editingTask}
        assignees={assignees.length ? assignees : [currentUserName]}
      />
    </div>
  );
};

export default GroupTasksPage;
