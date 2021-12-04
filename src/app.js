import express from 'express';
import cors from 'cors';
import * as recommendationsController from './controllers/recommendationsController.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/recommendation', recommendationsController.postRecommendation);

app.post(
  '/recommendation/:id/upvote',
  recommendationsController.upvoteRecommendation,
);

app.post(
  '/recommendation/:id/downvote',
  recommendationsController.downvoteRecommendation,
);

export default app;
