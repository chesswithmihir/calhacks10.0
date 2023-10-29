import React from 'react';

function Board({ board, makeMove, disabled }) {
  const handleClick = (row, col) => {
    makeMove(row, col);

    // Disable all buttons
    disabled = true;

    // Update the style of the clicked button after it has been rendered
    setTimeout(() => {
      const button = document.querySelector(`button[row="${row}"][col="${col}"]`);
      if (button) {
        button.style.width = '100px';
        button.style.height = '100px';
      }
    }, 0);
  };

  const renderCell = (row, col) => {
    const style = {
      width: '50px',
      height: '50px',
    };

    if (board[row * 3 + col] !== '') {
      style.width = '100px';
      style.height = '100px';
    }

    return (
      <button
        key={row * 3 + col}
        disabled={disabled}
        onClick={() => handleClick(row, col)}
        style={style}
      >
        {board[row * 3 + col]}
      </button>
    );
  };

  return (
    <table>
      <tbody>
        {Array.from({ length: 3 }).map((_, row) => (
          <tr key={row}>
            {Array.from({ length: 3 }).map((_, col) => renderCell(row, col))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Board;

