import React, { useState, useEffect } from 'react';
import './TradeTable.css';

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
const RANGE = 'Trades!A20:B100';

function TradesTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.values && result.values.length > 0) {
          // Use all rows as data, no headers
          const rows = result.values.filter(row => row.length > 0);
          setData(rows);
        } else {
          throw new Error('No data found in the spreadsheet');
        }
      } catch (error) {
        setError(error.message);
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading trades data...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="trades-table-container">
      <h2>Trades</h2>
      
      <div className="table-wrapper">
        <table className="data-table">
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell || ''}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {data.length === 0 && (
        <div className="no-data-message">
          No data available
        </div>
      )}
    </div>
  );
}

export default TradesTable;