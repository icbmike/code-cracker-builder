export type AlphabetChar = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z';

export const isAlphabetChar = (input: string): input is AlphabetChar => {
  return /[A-Za-z]{1}/.test(input);
}

export interface Cell {
  letter?: AlphabetChar
}