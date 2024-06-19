import React from "react"

import './alphabetChecker.scss';
import { AlphabetChar, isAlphabetChar } from "./model";

interface AlphabetCheckerProps {
  code: Record<number, AlphabetChar>;
  areLettersVisible: boolean;
}

export const AlphabetChecker = ({ code, areLettersVisible }: AlphabetCheckerProps) => {
  const usedLetters = Object.values(code);
  const allAlphabetChars = 'abcdefghijklmnopqrstuvwxyz'.split('').filter(isAlphabetChar);

  return <div style={{ marginBottom: '50px' }}>
    {
      allAlphabetChars.map(l => {

        const isLetterUsed = usedLetters.includes(l);

        return <span key={l} className={`alphabetCheck ${isLetterUsed && areLettersVisible ? 'is-letterUsed' : ''}`}>{l}</span>
      })
    }
  </div>
}