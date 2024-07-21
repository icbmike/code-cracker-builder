import React, { useState } from "react"

import { range } from "./range";

import { Crossword } from "./Crossword";
import { Code } from "./Code";
import { AlphabetChar, Cell } from "./model";
import { AlphabetChecker } from "./AlphabetChecker";
import { exportPuzzle, importPuzzle } from './serialization';

import "./app.scss";

const initialCells = range(13).map(x => range(13).map(y => ({}) as Cell))

export const App = () => {
  const [cells, setCells] = useState(initialCells);
  
  const [areLettersVisible, setAreLettersVisible] = useState(true);

  const onSetLetter = (position: [number, number], char: AlphabetChar | undefined) => {
    const [x, y] = position;
    cells[x][y].letter = char;
    setCells([...cells]);
  }

  const onImport = async () => {
    const cells = await importPuzzle();

    setCells(cells);
  }

  let letters: AlphabetChar[] = [];

  for (let i = 0; i < 13; i++) {
    for (let j = 0; j < 13; j++) {
      if (cells[i][j].letter && !letters.includes(cells[i][j].letter)) {
        letters.push(cells[i][j].letter);
      }
    }
  }

  const code = range(26).reduce((acc, next) => ({ ...acc, [next]: letters[next] }), {})

  return (
    <div style={{ padding: '50px' }}>
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <Crossword cells={cells} code={code} onSetLetter={onSetLetter} areLettersVisible={areLettersVisible} />
        <Code code={code} areLettersVisible={areLettersVisible} />
      </div>

      <AlphabetChecker code={code} areLettersVisible={areLettersVisible} />
      
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => setAreLettersVisible(!areLettersVisible)}>Toggle filled letters</button>
        <button onClick={() => exportPuzzle(cells)}>Export</button>
        <button onClick={onImport}>Import</button>
      </div>
    </div>
  );
}