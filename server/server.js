import express from 'express'

// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express()
const port = 3000

app.use(express.static('index'));
app.use('/game', express.static('game'));
app.use('/utils', express.static('utils'));
app.use('/assets', express.static('assets'));

app.listen(port, () => {
  console.log(`Game server running at http://localhost:${port}`)
})

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../index/index.html'))
// })

app.get('/test', (req, res) => {
  res.send('Hello World!')
})