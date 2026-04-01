// src/pages/TravelPlanner/Budget.tsx
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import {
  Card, Form, InputNumber, Button, Row, Col, Alert, Typography,
} from 'antd';
import { getBudgetSettings, saveBudgetSettings, getItineraries, getDestinations } from '@/services/TravelPlannerService';

const { Title } = Typography;

export default function BudgetPage() {
  const [form] = Form.useForm();
  const [settings, setSettings] = useState(getBudgetSettings());
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    setSettings(getBudgetSettings());
  }, []);

  useEffect(() => {
    const itineraries = getItineraries();
    const destinations = getDestinations();
    let spent = 0;
    itineraries.forEach((it) => {
      it.days.forEach((day) => {
        day.items.forEach((item) => {
          const d = destinations.find((x) => x.id === item.destId);
          if (d) spent += d.costFood + d.costStay + d.costTransport;
        });
      });
    });
    setTotalSpent(spent);
  }, []);

  const onFinish = (values: any) => {
    const newSettings = { total: values.total, food: values.food, stay: values.stay, transport: values.transport, other: values.other };
    setSettings(newSettings);
    saveBudgetSettings(newSettings);
  };

  const remaining = settings.total - totalSpent;
  const isOver = remaining < 0;

  const chartSeries = [settings.food, settings.stay, settings.transport, settings.other];
  const chartOptions: any = {
    chart: { type: 'pie' },
    labels: ['Ăn uống', 'Lưu trú', 'Di chuyển', 'Khác'],
    responsive: [{ breakpoint: 768, options: { chart: { width: 320 } } }],
  };

  const summary = [
    { title: 'Tổng kế hoạch', value: settings.total },
    { title: 'Chi tiêu hiện tại', value: totalSpent },
    { title: 'Còn lại', value: remaining },
  ];

  return (
    <div style={{ padding: 16 }}>
      <Title level={3}>Quản lý ngân sách</Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title='Cài đặt ngân sách'>
            <Form form={form} initialValues={settings} onFinish={onFinish} layout='vertical'>
              <Form.Item label='Ngân sách tổng' name='total' rules={[{ required: true }]}>
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item label='Ăn uống' name='food' rules={[{ required: true }]}>
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item label='Lưu trú' name='stay' rules={[{ required: true }]}>
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item label='Di chuyển' name='transport' rules={[{ required: true }]}>
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item label='Khác' name='other' rules={[{ required: true }]}>
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
              <Button type='primary' htmlType='submit' block>Lưu</Button>
            </Form>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title='Phân bổ ngân sách'>
            <Chart options={chartOptions} series={chartSeries} type='pie' width='100%' />
          </Card>
        </Col>
      </Row>

      <Card title='Tình hình chi tiêu' style={{ marginTop: 16 }}>
        <Row gutter={[12, 12]}>
          {summary.map((item) => (
            <Col key={item.title} span={8}>
              <div><strong>{item.title}</strong></div>
              <div>{item.value.toLocaleString()} đ</div>
            </Col>
          ))}
        </Row>
      </Card>

      {isOver && (
        <Alert type='error' showIcon message='Bạn đã vượt ngân sách!' description={`Vượt ${Math.abs(remaining).toLocaleString()} đ`} style={{ marginTop: 16 }} />
      )}
    </div>
  );
}