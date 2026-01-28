import { useEffect, useState } from 'react';

export interface UseDoanSo {
  guess: number | null;
  setGuess: (v: number | null) => void;
  turn: number;
  result: string;
  submit: () => void;
  reset: () => void;
}

export function useDoanSo(): UseDoanSo {
  const [random, setRandom] = useState<number>(0);
  const [guess, setGuess] = useState<number | null>(null);
  const [turn, setTurn] = useState<number>(10);
  const [result, setResult] = useState<string>('');

  const reset = (): void => {
    setRandom(Math.floor(Math.random() * 100) + 1);
    setTurn(10);
    setGuess(null);
    setResult('');
  };

  useEffect(() => {
    reset();
  }, []);

  const submit = (): void => {
    if (guess === null || turn === 0) return;

    if (guess < random) setResult('❌ Bạn đoán quá thấp!');
    else if (guess > random) setResult('❌ Bạn đoán quá cao!');
    else {
      setResult('🎉 Chúc mừng! Bạn đã đoán đúng!');
      return;
    }

    const newTurn = turn - 1;
    setTurn(newTurn);

    if (newTurn === 0) {
      setResult(`💥 Hết lượt! Số đúng là ${random}`);
    }
  };

  return { guess, setGuess, turn, result, submit, reset };
}
