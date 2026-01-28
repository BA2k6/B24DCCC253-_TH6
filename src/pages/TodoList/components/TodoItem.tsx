import { Tag, Input, Button } from 'antd';
import { useState } from 'react';
import type { Todo } from '../types';

interface Props {
  todo: Todo;
  onToggle: () => void;
  onRemove: () => void;
  onUpdate: (text: string) => void;
}

export default function TodoItem({
  todo,
  onToggle,
  onRemove,
  onUpdate,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(todo.text);

  const save = () => {
    if (!value.trim()) return;
    onUpdate(value);
    setEditing(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px 12px',
        borderRadius: 8,
        background: '#fafafa',
        marginBottom: 8,
        transition: '0.2s',
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = '#f0f5ff')
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.background = '#fafafa')
      }
    >
      <div style={{ flex: 1 }}>
        {editing ? (
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onPressEnter={save}
          />
        ) : (
          <span
            style={{
              textDecoration: todo.done ? 'line-through' : 'none',
              color: todo.done ? '#999' : '#000',
              fontSize: 15,
            }}
          >
            {todo.text}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', gap: 6 }}>
        <Button size="small" onClick={onToggle}>
          {todo.done ? 'Hoàn tác' : 'Xong'}
        </Button>

        {editing ? (
          <Button size="small" type="primary" onClick={save}>
            Lưu
          </Button>
        ) : (
          <Button size="small" onClick={() => setEditing(true)}>
            Sửa
          </Button>
        )}

        <Button size="small" danger onClick={onRemove}>
          Xóa
        </Button>
      </div>

      {todo.done && (
        <Tag color="green" style={{ marginLeft: 8 }}>
          Done
        </Tag>
      )}
    </div>
  );
}
