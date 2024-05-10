import React, { ChangeEvent } from "react"

import { AlphabetChar, Cell, isAlphabetChar } from "./model"

import "./crossword.scss"

type InverseCode = {
  [k: string]: number
}

interface CellInputProps {
  cell: Cell;
  position: [number, number];
  onSetLetter: (position: [number, number], letter: AlphabetChar | undefined) => void,
  inverseCode: InverseCode;
  areLettersVisible: boolean;
}

const CellInput = ({ cell, position, onSetLetter, inverseCode, areLettersVisible }: CellInputProps) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const char = e.target.value.toLowerCase()
    if (isAlphabetChar(char)) {
      onSetLetter(position, char);
      e.target.value = char;
    }
    else {
      e.target.value = ''
      onSetLetter(position, undefined);
    }
  }

  const classes = [
    'cell-input',
    (cell.letter ? 'is-filled' : ''),
    (areLettersVisible ? 'is-visible' : '')
  ].join(' ');

  return <div className="cell">
    <div className="cell-number">{cell.letter ? inverseCode[cell.letter] : ''}</div>
    <input type="text"
      value={cell.letter ?? ''}
      maxLength={1}
      onChange={onChange}
      className={classes} />
  </div>
}

interface CrosswordProps {
  cells: Cell[][];
  onSetLetter: (position: [number, number], letter: AlphabetChar) => void,
  code: Record<number, AlphabetChar | undefined>;
  areLettersVisible: boolean;
}

export const Crossword = ({ cells, onSetLetter, code, areLettersVisible }: CrosswordProps) => {
  const inverseCode: InverseCode = Object.entries(code)
    .filter(([number, char]) => !!char)
    .reduce((acc, [number, char]) => ({ ...acc, [char]: parseInt(number) + 1 }), {})

  return (
    <div className="crossword">
      {cells.map((row, i) => (
        <div key={i}>
          {row.map((cell, j) => <CellInput areLettersVisible={areLettersVisible} inverseCode={inverseCode} onSetLetter={onSetLetter} cell={cell} key={j} position={[i, j]} />)}
        </div>
      ))}
    </div>
  )
}