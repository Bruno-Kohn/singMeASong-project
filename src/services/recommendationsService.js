import getYoutubeID from 'get-youtube-id';
import createRecommendation from '../repositories/recommendationsRepository.js';

async function doingRecommendation(name, youtubeLink) {
  const ID = getYoutubeID(youtubeLink);

  if (ID === null) return null;

  const score = 0;

  return createRecommendation(name, youtubeLink, score);
}

export default doingRecommendation;
