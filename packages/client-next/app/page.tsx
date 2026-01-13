// app/page.tsx
"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { increment, decrement, incrementByAmount } from "@/store/counterSlice";
import { Button } from 'antd';

export default function Home() {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.value);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Counter: {count}</h1>

      <div className="space-x-2">
        <Button onClick={() => dispatch(increment())}>Increment</Button>

        <Button onClick={() => dispatch(decrement())}>Decrement</Button>

        <Button onClick={() => dispatch(incrementByAmount(5))}>
          Increment by 5
        </Button>
      </div>

    </main>

  );
}