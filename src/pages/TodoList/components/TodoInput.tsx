import { Input, Button } from 'antd';

interface Props {
  text: string;
  setText: (v: string) => void;
  onAdd: () => void;
}

export default function TodoInput({ text, setText, onAdd }: Props) {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Input
        placeholder="Nhập công việc..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onPressEnter={onAdd}
      />
      <Button type="primary" onClick={onAdd}>
        Thêm
      </Button>
    </div>
  );
}