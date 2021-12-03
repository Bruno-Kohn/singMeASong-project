import express from 'express';
import cors from 'cors';
import postRecommendation from './controllers/recommendationsController.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/recommendation', postRecommendation);

export default app;
