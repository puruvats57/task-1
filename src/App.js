import React, { useState } from 'react';
import './App.css';

function App() {
  const initialRows = Array.from({ length: 4 }, () => Array(7).fill(''));

  const [rows, setRows] = useState(initialRows);

  const handleBlur = (i, j) => async (e) => {
    const newRows = [...rows];
    newRows[i][j] = e.target.innerText;
    setRows(newRows);

    
    const response = await fetch('YOUR_API_URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRows),
    });

    if (!response.ok) {
      console.error('API request failed');
    }
  };

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th colSpan="7">MONTH 1</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} contentEditable onBlur={handleBlur(i, j)}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
