import React, { useState, useEffect } from 'react';

const GRID_ROWS = 15;
const GRID_COLS = 20;

const LETTER_PATTERNS = {
  H: [
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
  ],
  E: [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
  ],
  L: [
    [1, 0, 0],
    [1, 0, 0],
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 1],
  ],
  O: [
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const LEDMatrix = ({ text = "HELLO" }) => {
  const [grid, setGrid] = useState([]);
  const [color, setColor] = useState(getRandomColor());
  const [position, setPosition] = useState(0);

  useEffect(() => {
    setGrid(Array(GRID_ROWS).fill().map(() => Array(GRID_COLS).fill(0)));
  }, []);

  useEffect(() => {
    const colorInterval = setInterval(() => {
      setColor(getRandomColor());
    }, 3000);

    return () => clearInterval(colorInterval);
  }, []);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      const newGrid = Array(GRID_ROWS).fill().map(() => Array(GRID_COLS).fill(0));
      let col = position;
      for (let letter of text) {
        const pattern = LETTER_PATTERNS[letter];
        if (!pattern) continue;
        for (let row = 0; row < pattern.length; row++) {
          for (let pCol = 0; pCol < pattern[row].length; pCol++) {
            const gridCol = (col + pCol) % GRID_COLS;
            if (pattern[row][pCol] && row < GRID_ROWS && gridCol < GRID_COLS) {
              newGrid[row][gridCol] = 1;
            }
          }
        }
        col += 4;
      }
      setGrid(newGrid);
      setPosition((position + 1) % GRID_COLS);
    }, 200);

    return () => clearInterval(scrollInterval);
  }, [position, text]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${GRID_COLS}, 20px)`, gap: '2px', backgroundColor: '#000' }}>
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            style={{
              width: '20px',
              height: '20px',
              backgroundColor: cell ? color : '#111',
              borderRadius: '3px',
            }}
          ></div>
        ))
      )}
    </div>
  );
};

export default LEDMatrix;