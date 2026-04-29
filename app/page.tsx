"use client";

import { useState } from "react";

const pipPositions: Record<number, number[]> = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

function Die({ value }: { value: number }) {
  const pips = new Set(pipPositions[value]);
  return (
    <div
      role="img"
      aria-label={`Die showing ${value}`}
      className="grid grid-cols-3 grid-rows-3 gap-2 size-28 sm:size-32 rounded-2xl bg-white dark:bg-zinc-100 p-4 shadow-lg ring-1 ring-zinc-200 dark:ring-zinc-300"
    >
      {Array.from({ length: 9 }).map((_, i) => (
        <span
          key={i}
          className={`rounded-full ${
            pips.has(i) ? "bg-zinc-900" : "bg-transparent"
          }`}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const [dice, setDice] = useState<[number, number]>([1, 1]);
  const [rolls, setRolls] = useState(0);

  const roll = () => {
    setDice([rollDie(), rollDie()]);
    setRolls((n) => n + 1);
  };

  const total = dice[0] + dice[1];

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 dark:bg-black font-sans px-6 py-16">
      <main className="flex flex-col items-center gap-10 w-full max-w-md">
        <header className="flex flex-col items-center gap-2 text-center">
          <span className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            Dice roller
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Roll two dice
          </h1>
        </header>

        <div className="flex gap-6">
          <Die value={dice[0]} />
          <Die value={dice[1]} />
        </div>

        <div className="flex flex-col items-center gap-1">
          <p className="text-5xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
            {total}
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {dice[0]} + {dice[1]}
            {dice[0] === dice[1] && rolls > 0 ? " · doubles!" : ""}
          </p>
        </div>

        <button
          onClick={roll}
          className="rounded-full bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 px-8 py-3 text-base font-medium hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
        >
          {rolls === 0 ? "Roll" : "Roll again"}
        </button>

        <p className="text-xs text-zinc-500 dark:text-zinc-400 tabular-nums">
          Rolls: {rolls}
        </p>
      </main>
    </div>
  );
}
