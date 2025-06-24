import React, { useState, useEffect } from 'react';
import './StandingsTable.css';

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
const RANGE = 'Adjusted%20Standings!A1:e15';
const LAST_UPDATED_RANGE = 'Adjusted%20Standings!H2';

function StandingsTable() {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch last updated date
        const lastUpdatedResponse = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${LAST_UPDATED_RANGE}?key=${API_KEY}`
        );
        
        if (!lastUpdatedResponse.ok) {
          throw new Error(`HTTP error! Status: ${lastUpdatedResponse.status}`);
        }
        
        const lastUpdatedResult = await lastUpdatedResponse.json();
        if (lastUpdatedResult.values && lastUpdatedResult.values.length > 0) {
          setLastUpdated(lastUpdatedResult.values[0][0] || 'Unknown');
        }

        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.values && result.values.length > 0) {
          const headers = result.values[0];
          const rows = result.values.slice(1).filter(row => row.length > 0);
          
          setHeaders(headers);
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

  if (loading) return <div className="loading">Loading standings data...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="last-updated-container">
      <div className="last-updated-header">
        <h2>Standings</h2>
        <div className="last-updated-date">Last Updated: {lastUpdated}</div>
      </div>
      
      <div className="table-wrapper">
        <table className="standings-table">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
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

export default StandingsTable;