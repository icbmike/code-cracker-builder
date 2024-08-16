import React, { useState } from "react"

import { range } from "./range";

import { Crossword } from "./Crossword";
import { Code } from "./Code";
import { AlphabetChar, Cell, isAlphabetChar } from "./model";
import { AlphabetChecker } from "./AlphabetChecker";
import { exportPuzzle, importPuzzle } from './serialization';

import "./app.scss";
import icon from './icon.png';

const initialCells = range(13).map(x => range(13).map(y => ({}) as Cell))

export const App = () => {
  const [cells, setCells] = useState(initialCells);
  
  const [areLettersVisible, setAreLettersVisible] = useState(true);
  const [startingLetters, setStartingLetters] = useState<string[]>([]);

  const onSetLetter = (position: [number, number], char: AlphabetChar | undefined) => {
    const [x, y] = position;
    cells[x][y].letter = char;
    setCells([...cells]);
  }

  const onImport = async () => {
    const cells = await importPuzzle();

    setCells(cells);
  }

  const onStartingLettersChange = (newStartingLetters: string) => {
    const newChars = newStartingLetters.split('');
    if(newChars.every(l => isAlphabetChar(l)))
    {
      setStartingLetters(newChars);
    }
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
    <div className="app">
  
      <header className="header">
        <img className="icon" src={icon} alt="Code Cracker Builder Icon"/>
        <h1 className="title">Mike's Code Cracker Builder</h1>
      </header>
      
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <Crossword cells={cells} code={code} onSetLetter={onSetLetter} areLettersVisible={areLettersVisible} startingLetters={startingLetters}/>
        <Code code={code} areLettersVisible={areLettersVisible} startingLetters={startingLetters} />
      </div>

      <AlphabetChecker code={code} areLettersVisible={areLettersVisible} />
      
      <div className="controls">
        <button onClick={() => setAreLettersVisible(!areLettersVisible)}>Toggle filled letters</button>
        <button onClick={() => exportPuzzle(cells)}>Export</button>
        <button onClick={onImport}>Import</button>
        <label className="startingLetters-label">Starting letters:</label>
        <input className="startingLetters-input" type="text" pattern="[a-zA-Z]*" onChange={(e) => onStartingLettersChange(e.target.value)} value={startingLetters.join('')}/>
      </div>
    </div>
  );
}