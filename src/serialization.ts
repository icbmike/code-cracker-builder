import { Cell } from "./model";

export const exportPuzzle = (cells: Cell[][]) => {
    const cellsJson = JSON.stringify(cells);

    const a = document.createElement('a');

    const dataUrl = `data:application/json;base64,${btoa(cellsJson)}`;

    a.href = dataUrl;
    a.download = 'codecracker.json'

    a.click();
};

export const importPuzzle = async (): Promise<Cell[][]> => new Promise((resolve, reject) => {
    const input = document.createElement('input');

    input.type = 'file';
    input.accept = 'application/json'
    input.click();

    input.onchange = async () => {
        const file = input.files[0];
        const fileContents = await file.text();

        const cells = JSON.parse(fileContents);
        
        resolve(cells);
    }
});
