import { InputNumber } from 'antd';

interface Props {
  value: number | null;
  onChange: (v: number | null) => void;
}

export default function GuessInput({
  value,
  onChange,
}: Props): JSX.Element {
  return (
    <InputNumber
      min={1}
      max={100}
      value={value}
      onChange={onChange}
      style={{ width: '100%' }}
      placeholder="Nhập số từ 1–100"
    />
  );
}
