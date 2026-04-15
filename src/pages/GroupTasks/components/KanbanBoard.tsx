import { Avatar, Tag } from 'antd';
import { UserOutlined, CalendarOutlined } from '@ant-design/icons';
import type { Task } from '../types';

type Props = {
  tasks: Task[];
};

/* =========================
   COLOR SYSTEM (PASTEL)
========================= */
const priorityStyle = {
  Thấp: {
    bg: '#f6ffed',
    color: '#52c41a',
    border: '#b7eb8f',
  },
  'Trung bình': {
    bg: '#fff7e6',
    color: '#fa8c16',
    border: '#ffd591',
  },
  Cao: {
    bg: '#fff1f0',
    color: '#f5222d',
    border: '#ffa39e',
  },
};

export default function KanbanBoard({ tasks }: Props) {
  return (
    <div
      style={{
        background: '#f5f7fa',
        padding: 16,
        borderRadius: 12,
      }}
    >
      {/* GRID 4 CARD / ROW */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
        }}
      >
        {tasks.map((task) => {
          const p = priorityStyle[task.priority];

          return (
            <div
              key={task.id}
              style={{
                background: '#ffffff',
                padding: 14,
                borderRadius: 12,

                /* CARD STYLE */
                border: '1px solid #f0f0f0',
                boxShadow: '0 6px 16px rgba(0,0,0,0.04)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow =
                  '0 10px 24px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow =
                  '0 6px 16px rgba(0,0,0,0.04)';
              }}
            >
              {/* TITLE */}
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 15,
                  marginBottom: 8,
                  color: '#262626',
                }}
              >
                {task.title}
              </div>

              {/* ASSIGNEE */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  marginBottom: 6,
                  fontSize: 13,
                  color: '#595959',
                }}
              >
                <Avatar size={22} icon={<UserOutlined />} />
                {task.assignee}
              </div>

              {/* DEADLINE */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 12,
                  color: '#8c8c8c',
                }}
              >
                <CalendarOutlined />
                {task.deadline}
              </div>

              {/* PRIORITY */}
              <div style={{ marginTop: 10 }}>
                <Tag
                  style={{
                    background: p.bg,
                    color: p.color,
                    border: `1px solid ${p.border}`,
                    borderRadius: 6,
                    padding: '2px 8px',
                  }}
                >
                  {task.priority}
                </Tag>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}