// frontend/src/components/HistoricalData.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const HistoricalData = () => {
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    // Replace 'YOUR_API_KEY' with your actual Alpha Vantage API key
    const apiKey = 'QQ0OM443G5VF3246';

    // Replace 'AAPL' with the desired stock symbol
    const stockSymbol = 'AAPL';

    // Fetch historical stock data from the Alpha Vantage API
    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockSymbol}&apikey=${apiKey}`
      )
      .then(response => {
        const timeSeries = response.data['Time Series (Daily)'];

        // Convert the fetched data into an array of objects
        const stockData = Object.keys(timeSeries).map(date => ({
          date,
          open: timeSeries[date]['1. open'],
          high: timeSeries[date]['2. high'],
          low: timeSeries[date]['3. low'],
          close: timeSeries[date]['4. close'],
          volume: timeSeries[date]['5. volume'],
        }));

        setHistoricalData(stockData);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <Paper elevation={3} style={{ padding: '20px' }}>
      <h2>Historical Stock Data</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Open</TableCell>
              <TableCell>High</TableCell>
              <TableCell>Low</TableCell>
              <TableCell>Close</TableCell>
              <TableCell>Volume</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historicalData.map((data, index) => (
              <TableRow key={index}>
                <TableCell>{data.date}</TableCell>
                <TableCell>{data.open}</TableCell>
                <TableCell>{data.high}</TableCell>
                <TableCell>{data.low}</TableCell>
                <TableCell>{data.close}</TableCell>
                <TableCell>{data.volume}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default HistoricalData;
