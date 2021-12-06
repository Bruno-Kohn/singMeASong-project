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

async function randomRecommendationsService(random) {
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

    if (result.length) return result[0];
  } else {
    reqString = {
      minScore: 10,
      order,
    };

    const result = await recommendationsRepository.checkRecommendation(
      reqString,
    );

    if (result.length) return result[0];
  }

  const result = await recommendationsRepository.checkRecommendationRandom();
  return result.length ? result[0] : null;
}

export {
  doingRecommendation,
  upvoteRecommendationService,
  downvoteRecommendationService,
  randomRecommendationsService,
};
