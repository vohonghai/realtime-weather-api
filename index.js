// index.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

function generateData() {
  const now = new Date();
  const temperature = (20 + Math.random() * 10).toFixed(1); // 20-30°C
  const humidity = (50 + Math.random() * 30).toFixed(1);    // 50-80%
  
  return {
    timestamp: now.toISOString(),
    temperature: `${temperature} °C`,
    humidity: `${humidity} %`
  };
}

let cachedData = generateData();

setInterval(() => {
  cachedData = generateData();
}, 5000); // update every 5 seconds

app.get('/data', (req, res) => {
  res.json(cachedData);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
