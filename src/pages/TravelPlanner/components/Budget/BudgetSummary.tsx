import React from 'react';
import { Alert, Card, Col, Progress, Row, Statistic } from 'antd';
import type { BudgetState } from '@/models/travelPlanner/types';

interface Props {
  budget: BudgetState;
}

const BudgetSummary: React.FC<Props> = ({ budget }) => {
  const exceeded = budget.remaining < 0;
  const nearLimit = !exceeded && budget.percentUsed >= 80;

  return (
    <Card className="travel-card soft-card">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={6}>
          <Statistic
            title="Ngân sách dự kiến"
            value={budget.budgetLimit}
            formatter={(value) => `${Number(value).toLocaleString('vi-VN')} đ`}
          />
        </Col>

        <Col xs={24} md={6}>
          <Statistic
            title="Đã chi"
            value={budget.totalSpent}
            formatter={(value) => `${Number(value).toLocaleString('vi-VN')} đ`}
          />
        </Col>

        <Col xs={24} md={6}>
          <Statistic
            title="Còn lại"
            value={budget.remaining}
            formatter={(value) => `${Number(value).toLocaleString('vi-VN')} đ`}
            valueStyle={{ color: budget.remaining < 0 ? '#ff4d4f' : '#1677ff' }}
          />
        </Col>

        <Col xs={24} md={6}>
          <Progress type="dashboard" percent={budget.percentUsed} />
        </Col>
      </Row>

      {exceeded && (
        <Alert
          style={{ marginTop: 16 }}
          type="error"
          message="Bạn đã vượt ngân sách dự kiến"
          showIcon
        />
      )}

      {nearLimit && (
        <Alert
          style={{ marginTop: 16 }}
          type="warning"
          message="Ngân sách đã dùng trên 80%, hãy cân nhắc điều chỉnh lịch trình"
          showIcon
        />
      )}
    </Card>
  );
};

export default BudgetSummary;