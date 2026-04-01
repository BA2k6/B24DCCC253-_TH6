// src/pages/TravelPlanner/Admin.tsx
import { useEffect, useState } from 'react';
import { getDestinations, saveDestinations, getItineraries, getBudgetSettings } from '@/services/TravelPlannerService';
import {
  Card, Table, Button, Modal, Form, Input, InputNumber, Select, Rate,
  Popconfirm, Row, Col, Statistic, Space, Divider,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Chart from 'react-apexcharts';

const destinationTypeOptions = ['biển', 'núi', 'thành phố'] as const;

export default function AdminPage() {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form] = Form.useForm();

  const load = () => {
    setDestinations(getDestinations());
  };

  useEffect(load, []);

  const openModal = (item?: any) => {
    setEditing(item || null);
    setIsModalVisible(true);
    if (item) form.setFieldsValue(item);
    else form.resetFields();
  };

  const closeModal = () => setIsModalVisible(false);

  const save = async () => {
    const values = await form.validateFields();
    const updated = [...destinations];
    if (editing) {
      const idx = updated.findIndex((x) => x.id === editing.id);
      updated[idx] = { ...updated[idx], ...values };
    } else {
      updated.unshift({ ...values, id: `new-${Date.now()}` });
    }
    saveDestinations(updated);
    setDestinations(updated);
    setIsModalVisible(false);
  };

  const remove = (id: string) => {
    const next = destinations.filter((d) => d.id !== id);
    saveDestinations(next);
    setDestinations(next);
  };

  const itineraries = getItineraries();
  const statsByMonth = itineraries.reduce<Record<string, number>>((acc, it) => {
    const m = new Date(it.createdAt).toISOString().slice(0, 7);
    acc[m] = (acc[m] || 0) + 1;
    return acc;
  }, {});

  const popDest = [...destinations].sort((a, b) => (b.rating - a.rating)).slice(0, 5).map((d) => d.name);

  const budgetSet = getBudgetSettings();
  const totalTrips = itineraries.length;
  const totalRevenue = itineraries.reduce((t, it) => {
    const c = it.days.reduce((dd, day) => 
      dd + day.items.reduce((sum, item) => {
        const d = destinations.find((x) => x.id === item.destId);
        return sum + (d ? d.costFood + d.costStay + d.costTransport : 0);
      }, 0), 0);
    return t + c;
  }, 0);

  const chartOptions = {
    chart: { id: 'trip-month' },
    xaxis: { categories: Object.keys(statsByMonth) },
  };
  const chartSeries = [{ name: 'Số lịch trình', data: Object.values(statsByMonth) }];

  return (
    <div style={{ padding: 16 }}>
      <Card title='Quản lý điểm đến' extra={<Button icon={<PlusOutlined />} onClick={() => openModal()}>Thêm</Button>}>
        <Table dataSource={destinations} rowKey='id'>
          <Table.Column title='Tên' dataIndex='name' key='name' />
          <Table.Column title='Loại' dataIndex='type' key='type' />
          <Table.Column title='Rating' dataIndex='rating' key='rating' render={(v) => <Rate disabled value={v} />} />
          <Table.Column title='Chi phí ăn' dataIndex='costFood' key='costFood' render={(v) => v.toLocaleString()} />
          <Table.Column title='Chi phí lưu trú' dataIndex='costStay' key='costStay' render={(v) => v.toLocaleString()} />
          <Table.Column title='Chi phí di chuyển' dataIndex='costTransport' key='costTransport' render={(v) => v.toLocaleString()} />
          <Table.Column
            title='Actions'
            key='actions'
            render={(_, record: any) => (
              <Space>
                <Button icon={<EditOutlined />} onClick={() => openModal(record)}>Sửa</Button>
                <Popconfirm title='Xác nhận xóa?' onConfirm={() => remove(record.id)}>
                  <Button danger icon={<DeleteOutlined />}>Xóa</Button>
                </Popconfirm>
              </Space>
            )}
          />
        </Table>
      </Card>

      <Modal title={editing ? 'Sửa điểm đến' : 'Thêm điểm đến'} visible={isModalVisible} onCancel={closeModal} onOk={save}>
        <Form form={form} layout='vertical'>
          <Form.Item name='name' label='Tên' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name='type' label='Loại' rules={[{ required: true }]}>
            <Select>
              {destinationTypeOptions.map((x) => <Select.Option key={x} value={x}>{x}</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item name='image' label='URL ảnh' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name='rating' label='Rating' rules={[{ required: true }]}>
            <InputNumber min={0} max={5} step={0.1} />
          </Form.Item>
          <Form.Item name='priceMin' label='Giá min' rules={[{ required: true }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name='priceMax' label='Giá max' rules={[{ required: true }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name='costFood' label='Chi phí ăn' rules={[{ required: true }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name='costStay' label='Chi phí lưu trú' rules={[{ required: true }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name='costTransport' label='Chi phí di chuyển' rules={[{ required: true }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name='durationHrs' label='Thời gian tham quan (giờ)' rules={[{ required: true }]}>
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item name='description' label='Mô tả'>
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>

      <Card title='Thống kê' style={{ marginTop: 16 }}>
        <Row gutter={[16, 16]}>
          <Col span={6}><Statistic title='Số lịch trình' value={totalTrips} /></Col>
          <Col span={6}><Statistic title='Doanh thu ước tính' value={totalRevenue} prefix='đ ' /></Col>
          <Col span={6}><Statistic title='Ngân sách đặt' value={budgetSet.total} prefix='đ ' /></Col>
        </Row>
        <Divider />
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card title='Địa điểm phổ biến'>
              {popDest.map((d, idx) => <div key={d}>{idx + 1}. {d}</div>)}
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Chart options={chartOptions} series={chartSeries} type='line' height={260} />
          </Col>
        </Row>
      </Card>
    </div>
  );
}