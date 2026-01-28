import { Card, Divider, Typography } from 'antd';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';
import { useTodoList } from './hooks/useTodoList';

const { Title } = Typography;

export default function TodoListPage(): JSX.Element {
  const {
    todos,
    text,
    setText,
    add,
    toggle,
    remove,
    update,
  } = useTodoList();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
      <Card style={{ width: 600, borderRadius: 12 }}>
        <Title level={3}>📝 Todo List</Title>

        <TodoInput
          text={text}
          setText={setText}
          onAdd={add}
        />

        <Divider />

        {todos.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#999' }}>
            Chưa có công việc nào
          </div>
        ) : (
          todos.map((t) => (
            <TodoItem
              key={t.id}
              todo={t}
              onToggle={() => toggle(t.id)}
              onRemove={() => remove(t.id)}
              onUpdate={(newText) => update(t.id, newText)}
            />
          ))
        )}
      </Card>
    </div>
  );
}
