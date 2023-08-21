import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Typography, List, ListItem, ListItemText, TextField, Button } from '@mui/material';

const RealTimeStocks = () => {
  const [realTimeData, setRealTimeData] = useState([]);
  const [symbol, setSymbol] = useState('MSFT'); // Default stock symbol is MSFT

  const handleSymbolChange = event => {
    setSymbol(event.target.value);
  };

  const fetchStockData = () => {
    // Replace 'YOUR_API_KEY' with your actual Alpha Vantage API key
    const apiKey = 'QQ0OM443G5VF3246';

    // Fetch real-time stock data from the Alpha Vantage API for the latest 30 minutes
    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${apiKey}`
      )
      .then(response => {
        const timeSeries = response.data['Time Series (1min)'];

        if (timeSeries) {
          // Convert the fetched data into an array of objects for the latest 10 minutes
          const timestamps = Object.keys(timeSeries).slice(0, 10); // Get the latest 10 timestamps
          const stockData = timestamps.map(timestamp => ({
            timestamp,
            price: timeSeries[timestamp]['1. open'],
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
    <Paper elevation={3} style={{ padding: '20px' }}>
      <Typography variant="h5">Real-Time Stock Prices</Typography>
      <TextField
        label="Enter Stock Symbol"
        value={symbol}
        onChange={handleSymbolChange}
        style={{ marginTop: '10px', marginBottom: '10px' }}
      />
      <Button variant="contained" onClick={fetchStockData}>
        Watch Stock
      </Button>
      <List>
        {realTimeData.map((stock, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${stock.timestamp}:`}
              secondary={`$${stock.price}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default RealTimeStocks;
