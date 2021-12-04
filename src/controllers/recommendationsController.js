import * as recommendationsService from '../services/recommendationsService.js';

async function postRecommendation(req, res) {
  try {
    const { name, youtubeLink } = req.body;

    if (!name || !youtubeLink) return res.sendStatus(400);

    const result = await recommendationsService.doingRecommendation(
      name,
      youtubeLink,
    );

    if (result === null) {
      return res.sendStatus(400);
    }
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

async function upvoteRecommendation(req, res) {
  try {
    const id = Number(req.params.id);

    const result = await recommendationsService.upvoteRecommendationService(id);

    if (result === null) {
      return res.sendStatus(404);
    }

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export { postRecommendation, upvoteRecommendation };
