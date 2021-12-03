import doingRecommendation from '../services/recommendationsService.js';

async function postRecommendation(req, res) {
  try {
    const { name, youtubeLink } = req.body;

    if (!name || !youtubeLink) return res.sendStatus(400);

    const result = await doingRecommendation(name, youtubeLink);

    if (result === null) {
      return res.sendStatus(400);
    }
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export default postRecommendation;
