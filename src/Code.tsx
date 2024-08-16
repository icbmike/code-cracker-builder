import React from "react"

import { AlphabetChar } from "./model";
import { range } from "./range";

import "./code.scss"

interface CodeProps {
  code: Record<number, AlphabetChar>;
  areLettersVisible: boolean;
  startingLetters: string[]
}

export const Code = ({ code, areLettersVisible, startingLetters }: CodeProps) => {
  return (
    <div className="code">
      {range(13).map(i => (
        <div className="row" key={i}>
          <div className="numberMapping">
            <div className="number">{i + 1}</div>
            <span className={'mapping' + (areLettersVisible || startingLetters.includes(code[i]) ? 'is-visible' : '')}>{code[i]}</span>
          </div>
          <div className="numberMapping">
            <div className="number">{i + 14}</div>
            <span className={'mapping' + (areLettersVisible || startingLetters.includes(code[i + 13]) ? 'is-visible' : '')}>{code[i + 13]}</span>
          </div>
        </div>
      ))}
    </div>)
}