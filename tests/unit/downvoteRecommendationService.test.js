import * as recommendationsService from '../../src/services/recommendationsService.js';
import * as recommendationsRepository from '../../src/repositories/recommendationsRepository.js';

describe('upvote recommendation', () => {
  const upScore = jest.spyOn(recommendationsRepository, 'upScore');

  const checkID = jest.spyOn(recommendationsRepository, 'checkID');

  const deleteRecommendation = jest
    .spyOn(recommendationsRepository, 'deleteRecommendation')
    .mockImplementation(() => 'deleted');

  it('returns null if score invalid', async () => {
    upScore.mockImplementationOnce(() => ({
      rowCount: 0,
    }));
    const result = await recommendationsService.downvoteRecommendationService(
      1,
    );
    expect(result).toEqual(null);
  });

  it('returns rowCount: 1 if score invalid', async () => {
    upScore.mockImplementationOnce(() => ({
      rowCount: 1,
    }));
    const result = await recommendationsService.downvoteRecommendationService(
      1,
    );
    expect(result).toEqual({ rowCount: 1 });
  });

  it('returns true if score invalid', async () => {
    checkID.mockImplementationOnce(() => ({
      score: 1,
    }));
    upScore.mockImplementationOnce(() => ({
      rowCount: 1,
    }));
    const result = await recommendationsService.downvoteRecommendationService(
      1,
    );
    expect(result).toEqual({ rowCount: 1 });
  });

  it('returns true if score invalid', async () => {
    checkID.mockImplementationOnce(() => ({
      score: -5,
    }));
    upScore.mockImplementationOnce(() => ({
      rowCount: 1,
    }));
    const result = await recommendationsService.downvoteRecommendationService(
      1,
    );
    expect(result).toEqual('deleted');
  });
});
