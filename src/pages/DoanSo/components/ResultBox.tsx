import { Typography } from 'antd';

const { Text } = Typography;

interface Props {
  text: string;
}

export default function ResultBox({ text }: Props): JSX.Element {
  return <Text strong>{text}</Text>;
}
