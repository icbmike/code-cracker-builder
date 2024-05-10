import React from "react"

import { AlphabetChar } from "./model";
import { range } from "./range";

import "./code.scss"

interface CodeProps {
  code: Record<number, AlphabetChar>;
  areLettersVisible: boolean;
}

export const Code = ({ code, areLettersVisible }: CodeProps) => {
  return (
    <div className="code">
      {range(13).map(i => (
        <div className="row" key={i}>
          <div className="numberMapping">
            <div className="number">{i + 1}</div>
            <span className={'mapping' + (areLettersVisible ? 'is-visible' : '')}>{code[i]}</span>
          </div>
          <div className="numberMapping">
            <div className="number">{i + 14}</div>
            <span className={'mapping' + (areLettersVisible ? 'is-visible' : '')}>{code[i + 13]}</span>
          </div>
        </div>
      ))}
    </div>)
}