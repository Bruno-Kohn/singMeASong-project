import * as recommendationsRepository from '../repositories/recommendationsRepository.js';
import validation from '../validations/joiValidation.js';

async function doingRecommendation(name, youtubeLink) {
  const checkValidation = validation.validate({ name, youtubeLink });

  if (checkValidation.error) return null;

  if (!youtubeLink.includes('youtube.com/watch?')) return null;

  const score = 0;

  await recommendationsRepository.createRecommendation(
    name,
    youtubeLink,
    score,
  );

  return true;
}

async function upvoteRecommendationService(id) {
  const result = await recommendationsRepository.upScore(id, 1);
  return result.rowCount === 0 ? null : result;
}

async function downvoteRecommendationService(id) {
  const checkRecommendation = await recommendationsRepository.checkID(id);

  if (checkRecommendation.score === -5) {
    return recommendationsRepository.deleteRecommendation(id);
  }
  const result = await recommendationsRepository.upScore(id, -1);
  return result.rowCount === 0 ? null : result;
}

async function randomRecommendationsService() {
  const random = Math.random();

  let reqString = '';
  const order = 'RANDOM()';

  if (random > 0.7) {
    reqString = {
      minScore: -5,
      maxScore: 10,
      order,
    };

    const result = await recommendationsRepository.checkRecommendation(
      reqString,
    );

    if (result.length !== 0) return result;
  } else {
    reqString = {
      minScore: -5,
      order,
    };

    const result = await recommendationsRepository.checkRecommendation(
      reqString,
    );

    if (result.length !== 0) return result;
  }

  const result = await recommendationsRepository.checkRecommendationRandom();
  return result;
}

export {
  doingRecommendation,
  upvoteRecommendationService,
  downvoteRecommendationService,
  randomRecommendationsService,
};
