import { Card, Col, Row, Progress } from 'antd';
import type { Task } from '../types';

type Props = {
  tasks: Task[];
};

export default function Dashboard({ tasks }: Props) {
  const total = tasks.length;
  const done = tasks.filter(t => t.status === 'Đã xong').length;
  const doing = tasks.filter(t => t.status === 'Đang làm').length;
  const todo = tasks.filter(t => t.status === 'Chưa làm').length;

  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <Row gutter={16}>
      <Col span={6}>
        <Card title="Tổng">
          {total}
        </Card>
      </Col>

      <Col span={6}>
        <Card title="Hoàn thành">
          {done}
        </Card>
      </Col>

      <Col span={6}>
        <Card title="Đang làm">
          {doing}
        </Card>
      </Col>

      <Col span={6}>
        <Card title="Chưa làm">
          {todo}
        </Card>
      </Col>

      <Col span={24}>
        <Card title="Tiến độ">
          <Progress percent={percent} />
        </Card>
      </Col>
    </Row>
  );
}