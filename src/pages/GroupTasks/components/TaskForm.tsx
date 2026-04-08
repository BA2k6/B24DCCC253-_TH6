import { DatePicker, Form, Input, Modal, Select } from 'antd';
import moment from 'moment';
import type { Task, TaskPriority, TaskStatus } from '../types';

const { Option } = Select;

interface TaskFormProps {
  visible: boolean;
  onCancel: () => void;
  onSave: (task: Omit<Task, 'id' | 'createdAt' | 'createdBy'>) => void;
  initialValues?: Partial<Task>;
  assignees: string[];
}

const priorities: TaskPriority[] = ['Thấp', 'Trung bình', 'Cao'];
const statuses: TaskStatus[] = ['Chưa làm', 'Đang làm', 'Đã xong'];

const TaskForm: React.FC<TaskFormProps> = ({ visible, onCancel, onSave, initialValues, assignees }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    const values = await form.validateFields();
    onSave({
      title: values.title,
      assignee: values.assignee,
      priority: values.priority,
      deadline: values.deadline.format('YYYY-MM-DD'),
      status: values.status,
    });
    form.resetFields();
  };

  return (
    <Modal
      title={initialValues?.id ? 'Chỉnh sửa công việc' : 'Thêm công việc mới'}
      visible={visible}
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
      onOk={handleOk}
      okText='Lưu'
      cancelText='Hủy'
      destroyOnClose
    >
      <Form
        form={form}
        layout='vertical'
        initialValues={{
          title: initialValues?.title,
          assignee: initialValues?.assignee,
          priority: initialValues?.priority || 'Trung bình',
          deadline: initialValues?.deadline ? moment(initialValues.deadline) : undefined,
          status: initialValues?.status || 'Chưa làm',
        }}
      >
        <Form.Item name='title' label='Tên công việc' rules={[{ required: true, message: 'Nhập tên công việc' }]}> 
          <Input placeholder='Nhập tên công việc' />
        </Form.Item>
        <Form.Item name='assignee' label='Người được giao' rules={[{ required: true, message: 'Nhập người được giao' }]}> 
          <Select mode='tags' placeholder='Chọn hoặc nhập người được giao'>
            {assignees.map((name) => (
              <Option key={name} value={name}>
                {name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name='priority' label='Mức độ ưu tiên' rules={[{ required: true, message: 'Chọn mức độ ưu tiên' }]}> 
          <Select>
            {priorities.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name='deadline' label='Deadline' rules={[{ required: true, message: 'Chọn ngày hoàn thành' }]}> 
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name='status' label='Trạng thái' rules={[{ required: true, message: 'Chọn trạng thái' }]}> 
          <Select>
            {statuses.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskForm;
