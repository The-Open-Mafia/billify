import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { generator } from './generator';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});
app.post('/generator', async function (req, res) {
  return res.end(await generator());
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
