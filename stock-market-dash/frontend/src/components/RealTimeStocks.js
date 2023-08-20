// frontend/src/components/RealTimeStocks.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const RealTimeStocks = () => {
  const [realTimeData, setRealTimeData] = useState([]);

  useEffect(() => {
    // Replace 'YOUR_API_KEY' with your actual Alpha Vantage API key
    const apiKey = 'QQ0OM443G5VF3246';

    // Fetch real-time stock data from the Alpha Vantage API
    axios
      .get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=5min&apikey=${apiKey}`
      )
      .then(response => {
        const timeSeries = response.data['Time Series (5min)'];

        // Convert the fetched data into an array of objects
        const stockData = Object.keys(timeSeries).map(timestamp => ({
          timestamp,
          price: timeSeries[timestamp]['1. open'],
        }));

        setRealTimeData(stockData);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <Paper elevation={3} style={{ padding: '20px' }}>
      <Typography variant="h5">Real-Time Stock Prices</Typography>
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


