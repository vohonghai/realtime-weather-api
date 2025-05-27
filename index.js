const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

function generateData() {
  const now = new Date();

  const temperature = (30 + Math.random() * 5).toFixed(1);   // 30–35 °C
  const humidity = (40 + Math.random() * 20).toFixed(2);     // 40–60%
  const counts = Math.floor(20 + Math.random() * 20);        // 20–40 counts
  const cps = (counts / 47).toFixed(2);                      // giả lập cps
  const uSv = (counts * 0.0098).toFixed(3);                  // hệ số giả định
  const timestamp = Math.floor(now.getTime() / 1000);        // UNIX timestamp
  const localTime = now.toLocaleString('en-GB', {
    hour12: false,
    timeZone: 'Asia/Ho_Chi_Minh'
  }).replace(',', '');

  return {
    counts: counts,
    cps: parseFloat(cps),
    humidity: parseFloat(humidity),
    localTime: localTime,
    stationName: "ReWes-I89",
    temperature: parseFloat(temperature),
    timestamp: timestamp,
    uSv: parseFloat(uSv)
  };
}

let cachedData = generateData();

setInterval(() => {
  cachedData = generateData();
}, 5000);

app.get('/data', (req, res) => {
  res.json(cachedData);
});

app.get('/', (req, res) => {
  res.send('This is the Real-time Weather API. Use /data to get live JSON data.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
