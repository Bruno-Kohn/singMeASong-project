import express from 'express';
import cors from 'cors';
import * as recommendationsController from './controllers/recommendationsController.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/recommendations', recommendationsController.postRecommendation);

app.post(
  '/recommendations/:id/upvote',
  recommendationsController.upvoteRecommendation,
);

app.post(
  '/recommendations/:id/downvote',
  recommendationsController.downvoteRecommendation,
);

app.get(
  '/recommendations/random',
  recommendationsController.randomRecommendations,
);

app.get('/recommendations/top/:amount', recommendationsController.topAmount);

export default app;
