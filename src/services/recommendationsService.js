import getYoutubeID from 'get-youtube-id';
import * as recommendationsRepository from '../repositories/recommendationsRepository.js';
import validation from '../validations/joiValidation.js';

async function doingRecommendation(name, youtubeLink) {
  const checkValidation = validation.validate({ name, youtubeLink });

  if (checkValidation.error) return null;

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

async function downvoteRecommendationService(id) {
  const checkRecommendation = await recommendationsRepository.checkID(id);

  if (checkRecommendation.score === -5) {
    return recommendationsRepository.deleteRecommendation(id);
  }
  return upvoteScore(id, -1);
}

export {
  doingRecommendation,
  upvoteRecommendationService,
  downvoteRecommendationService,
};
