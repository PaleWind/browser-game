const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('./game')); // Serve static files from the current directory

app.listen(port, () => {
  console.log(`Game server running at http://localhost:${port}`);
});

app.get('/test', (req, res) => {
  res.send('Hello World!');
});
