import { Card, Button, Typography } from 'antd';
import GuessInput from './components/GuessInput';
import ResultBox from './components/ResultBox';
import { useDoanSo } from './hooks/useDoanSo';

const { Title, Text } = Typography;

export default function DoanSoPage(): JSX.Element {
  const { guess, setGuess, turn, result, submit, reset } = useDoanSo();

  return (
    <Card style={{ maxWidth: 400, margin: 'auto' }}>
      <Title level={3}>🎯 Game đoán số</Title>

      <Text>Số lượt còn lại: {turn}</Text>

      <div style={{ margin: '16px 0' }}>
        <GuessInput value={guess} onChange={setGuess} />
      </div>

      <Button type="primary" block onClick={submit} disabled={turn === 0}>
        Đoán
      </Button>

      <Button block style={{ marginTop: 8 }} onClick={reset}>
        Chơi lại
      </Button>

      <div style={{ marginTop: 16 }}>
        <ResultBox text={result} />
      </div>
    </Card>
  );
}
