import getYoutubeID from 'get-youtube-id';
import * as recommendationsRepository from '../repositories/recommendationsRepository.js';

async function doingRecommendation(name, youtubeLink) {
  const ID = getYoutubeID(youtubeLink);

  if (ID === null) return null;

  const score = 0;

  return recommendationsRepository.createRecommendation(
    name,
    youtubeLink,
    score,
  );
}

async function upvoteScore(id, number) {
  const result = await recommendationsRepository.upScore(id, number);
  return result.rowCount === 0 ? null : result;
}

async function upvoteRecommendationService(id) {
  return upvoteScore(id, 1);
}

export { doingRecommendation, upvoteRecommendationService };
