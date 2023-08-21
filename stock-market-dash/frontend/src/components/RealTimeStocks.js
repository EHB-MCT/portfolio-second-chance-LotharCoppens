import React, { useState } from 'react';
import axios from 'axios';
import { Paper, Typography, TextField, Button } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const RealTimeStocks = () => {
  const [realTimeData, setRealTimeData] = useState([]);
  const [symbol, setSymbol] = useState('MSFT'); // Default stock symbol is MSFT

  const handleSymbolChange = event => {
    setSymbol(event.target.value);
  };

  const fetchStockData = () => {
    // Replace 'YOUR_API_KEY' with your actual Alpha Vantage API key
    const apiKey = 'Q0OM443G5VF3246';

    // Fetch real-time stock data from the Alpha Vantage API for the last 24 hours
    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=60min&apikey=${apiKey}`
      )
      .then(response => {
        const timeSeries = response.data['Time Series (60min)'];

        if (timeSeries) {
          const timestamps = Object.keys(timeSeries); // Get all timestamps in the last 24 hours
          const stockData = timestamps.map(timestamp => ({
            timestamp,
            price: parseFloat(timeSeries[timestamp]['1. open']), // Convert price to a number
          }));

          setRealTimeData(stockData);
        } else {
          setRealTimeData([]);
        }
      })
      .catch(error => {
        console.error(error);
        setRealTimeData([]);
      });
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Real-Time Stock Prices (Last 24 Hours)
      </Typography>
      <TextField
        label="Enter Stock Symbol"
        value={symbol}
        onChange={handleSymbolChange}
        fullWidth
        variant="outlined"
        sx={{ my: 2 }}
      />
      <Button variant="contained" onClick={fetchStockData}>
        Watch Stock
      </Button>
      {realTimeData.length > 0 && (
        <LineChart width={800} height={400} data={realTimeData}>
          <XAxis
            dataKey="timestamp"
            interval="preserveStartEnd" // Show first and last timestamp
            tickCount={6} // Show a maximum of 6 ticks on the X-axis
          />
          <YAxis
            domain={['dataMin', 'dataMax']} // Set a custom range for the Y-axis
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
        </LineChart>
      )}
    </Paper>
  );
};

export default RealTimeStocks;
