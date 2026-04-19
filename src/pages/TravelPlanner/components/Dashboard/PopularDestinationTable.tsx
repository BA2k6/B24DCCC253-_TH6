import React from 'react';
import { Avatar, Card, Table } from 'antd';

interface Props {
  data: Array<{ name: string; count: number }>;
}

const PopularDestinationTable: React.FC<Props> = ({ data }) => {
  return (
    <Card className="travel-card soft-card" title="Top điểm đến phổ biến">
      <Table
        rowKey="name"
        pagination={false}
        columns={[
          {
            title: 'Điểm đến',
            dataIndex: 'name',
            render: (value: string) => (
              <span>
                <Avatar style={{ marginRight: 8 }}>{value?.charAt(0)}</Avatar>
                {value}
              </span>
            ),
          },
          {
            title: 'Số lượt chọn',
            dataIndex: 'count',
          },
        ]}
        dataSource={data}
      />
    </Card>
  );
};

export default PopularDestinationTable;