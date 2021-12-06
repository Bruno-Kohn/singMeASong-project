import * as recommendationsService from '../../src/services/recommendationsService.js';
import * as recommendationsRepository from '../../src/repositories/recommendationsRepository.js';

describe('upvote recommendation', () => {
  const upScore = jest.spyOn(recommendationsRepository, 'upScore');

  it('returns null if score invalid', async () => {
    upScore.mockImplementationOnce(() => ({
      rowCount: 0,
    }));
    const result = await recommendationsService.upvoteRecommendationService(1);
    expect(result).toEqual(null);
  });

  it('returns true if score invalid', async () => {
    upScore.mockImplementationOnce(() => ({
      rowCount: 1,
    }));
    const result = await recommendationsService.upvoteRecommendationService(1);
    expect(result).toEqual({ rowCount: 1 });
  });
});
