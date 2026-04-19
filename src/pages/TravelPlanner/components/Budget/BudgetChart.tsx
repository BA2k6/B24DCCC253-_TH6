import { Column, Line, Pie } from '@ant-design/plots';
import {
  Card,
  Col,
  Row,
  Progress,
  Space,
  Typography,
} from 'antd';
import {
  CoffeeOutlined,
  HomeOutlined,
  CarOutlined,
  TagsOutlined, 
} from '@ant-design/icons';

const { Text } = Typography;

const BudgetCharts = ({ budget, weeklyData }: any) => {
  const pieData = [
    { type: 'Ăn uống', value: budget.categories.meal },
    { type: 'Khách sạn', value: budget.categories.hotel },
    { type: 'Di chuyển', value: budget.categories.transport },
    { type: 'Vé', value: budget.categories.ticket },
  ];

  const categoryList = [
    {
      label: 'Ăn uống',
      value: budget.categories.meal,
      icon: <CoffeeOutlined style={{ color: '#faad14' }} />,
    },
    {
      label: 'Khách sạn',
      value: budget.categories.hotel,
      icon: <HomeOutlined style={{ color: '#52c41a' }} />,
    },
    {
      label: 'Di chuyển',
      value: budget.categories.transport,
      icon: <CarOutlined style={{ color: '#1677ff' }} />,
    },
    {
      label: 'Vé',
      value: budget.categories.ticket,
      icon: <TagsOutlined style={{ color: '#eb2f96' }} />, 
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      {/* LEFT SIDE */}
      <Col xs={24} lg={16}>
        <Row gutter={[16, 16]}>
          {/* PIE */}
          <Col xs={24} md={12}>
            <Card
              title="Phân bổ ngân sách"
              className="travel-card soft-card"
            >
              <Pie
                data={pieData}
                angleField="value"
                colorField="type"
                height={260}
              />
            </Card>
          </Col>

          {/* LINE */}
          <Col xs={24} md={12}>
            <Card
              title="Chi tiêu theo ngày"
              className="travel-card soft-card"
            >
              <Line
                data={weeklyData}
                xField="day"
                yField="value"
                height={260}
              />
            </Card>
          </Col>

          {/* COLUMN */}
          <Col span={24}>
            <Card
              title="So sánh ngân sách"
              className="travel-card soft-card"
            >
              <Column
                data={pieData}
                xField="type"
                yField="value"
                height={300}
              />
            </Card>
          </Col>
        </Row>
      </Col>

      {/* RIGHT PANEL */}
      <Col xs={24} lg={8}>
        <Card
          className="travel-card soft-card"
          title="Phân tích chi tiêu"
        >
          <Space direction="vertical" size={16} style={{ width: '100%' }}>
            {categoryList.map((item) => (
              <Row key={item.label} justify="space-between" align="middle">
                <Space>
                  {item.icon}
                  <Text>{item.label}</Text>
                </Space>
                <Text strong>
                  {item.value.toLocaleString('vi-VN')} đ
                </Text>
              </Row>
            ))}

            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <Progress
                type="circle"
                percent={budget.percentUsed}
              />
            </div>
          </Space>
        </Card>
      </Col>
    </Row>
  );
};

export default BudgetCharts;