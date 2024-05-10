import React, { useState } from "react"

import { range } from "./range";

import { Crossword } from "./Crossword";
import { Code } from "./Code";
import { AlphabetChar, Cell } from "./model";

const initialCells = range(13).map(x => range(13).map(y => ({}) as Cell))

const initialCode: Record<number, AlphabetChar | undefined> = {};

export const App = () => {
  const [cells, setCells] = useState(initialCells);
  const [code, setCode] = useState(initialCode);
  const [areLettersVisible, setAreLettersVisible] = useState(true);

  const onSetLetter = (position: [number, number], char: AlphabetChar | undefined) => {
    const [x, y] = position;
    cells[x][y].letter = char;
    setCells([...cells]);

    let letters: AlphabetChar[] = [];

    for (let i = 0; i < 13; i++) {
      for (let j = 0; j < 13; j++) {
        if (cells[i][j].letter && !letters.includes(cells[i][j].letter)) {
          letters.push(cells[i][j].letter);
        }
      }
    }

    setCode(range(26).reduce((acc, next) => ({ ...acc, [next]: letters[next] }), {}));
  }

  return (
    <div style={{ padding: '50px' }}>
      <div style={{ display: 'flex', marginBottom: '50px' }}>
        <Crossword cells={cells} code={code} onSetLetter={onSetLetter} areLettersVisible={areLettersVisible} />
        <Code code={code} areLettersVisible={areLettersVisible} />
      </div>
      <button onClick={() => setAreLettersVisible(!areLettersVisible)}>Toggle filled letters</button>
    </div>
  );
}