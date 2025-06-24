import React, { useState, useEffect } from 'react';
import './LastUpdatedTable.css';

const API_KEY = 'AIzaSyCZ9HIFNHsY15dnMAUz8EzBVrayywNR1BA';
const SPREADSHEET_ID = '1_RGzdYk-mOuoyXqWVbYlCK2Htg3ax7fsB0VZwv5PODI';
const LAST_UPDATED_RANGE = 'Adjusted%20Standings!H2';
const TABLE_RANGE = 'Adjusted%20Standings!I2:J15';

function LastUpdatedTable() {
  const [tableData, setTableData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        
        // Fetch table data
        const tableResponse = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${TABLE_RANGE}?key=${API_KEY}`
        );
        
        if (!tableResponse.ok) {
          throw new Error(`HTTP error! Status: ${tableResponse.status}`);
        }
        
        const tableResult = await tableResponse.json();
        if (tableResult.values && tableResult.values.length > 0) {
          setTableData(tableResult.values.filter(row => row.length > 0));
        } else {
          // Empty array if no data
          setTableData([]);
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

  if (loading) return <div className="loading">Loading data...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="last-updated-container">
      <div className="last-updated-header">
        <h2>Standings Adjustments</h2>
        <div className="last-updated-date">Last Updated: {lastUpdated}</div>
      </div>
      
      <div className="table-wrapper">
        <table className="data-table">
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell || ''}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {tableData.length === 0 && (
        <div className="no-data-message">
          No data available
        </div>
      )}
    </div>
  );
}

export default LastUpdatedTable;