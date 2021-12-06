import * as recommendationsService from '../../src/services/recommendationsService.js';
import * as recommendationsRepository from '../../src/repositories/recommendationsRepository.js';

describe('random recommendation', () => {
  const checkRecommendation = jest.spyOn(
    recommendationsRepository,
    'checkRecommendation',
  );

  const checkRecommendationRandom = jest
    .spyOn(recommendationsRepository, 'checkRecommendationRandom')
    .mockImplementation(() => [0]);

  it('Should return 0', async () => {
    checkRecommendation.mockImplementationOnce(async (reqString) =>
      reqString.maxScore === 10 ? [0] : [],
    );

    const result = await recommendationsService.randomRecommendationsService(
      0.8,
    );
    expect(result).toEqual(0);
  });

  it('Should return 0', async () => {
    checkRecommendation.mockImplementationOnce(async (reqString) =>
      !reqString.maxScore ? [0] : [],
    );

    const result = await recommendationsService.randomRecommendationsService(
      0.6,
    );
    expect(result).toEqual(0);
  });

  it('Should return 0', async () => {
    checkRecommendation.mockImplementationOnce(async (reqString) =>
      reqString.minScore === 10 ? [0] : [],
    );

    const result = await recommendationsService.randomRecommendationsService(
      0.7,
    );
    expect(result).toEqual(0);
  });

  it('Should return an empty array', async () => {
    checkRecommendation.mockImplementationOnce(async (reqString) =>
      reqString.minScore === 10 ? [] : null,
    );

    const result = await recommendationsService.randomRecommendationsService(
      0.7,
    );
    expect(result).toEqual(0);
  });

  it('Should return an empty array', async () => {
    checkRecommendation.mockImplementationOnce(async (reqString) =>
      reqString.maxScore === 10 ? [] : null,
    );

    const result = await recommendationsService.randomRecommendationsService(
      0.8,
    );
    expect(result).toEqual(0);
  });

  it('Should return an empty array', async () => {
    checkRecommendation.mockImplementationOnce(async (reqString) =>
      reqString.maxScore === 10 ? [] : null,
    );

    checkRecommendationRandom.mockImplementationOnce(() => []);

    const result = await recommendationsService.randomRecommendationsService(
      0.8,
    );
    expect(result).toEqual(null);
  });

  it('Should return an empty array', async () => {
    checkRecommendation.mockImplementationOnce(async (reqString) =>
      reqString.minScore === 10 ? [] : null,
    );

    checkRecommendationRandom.mockImplementationOnce(() => []);

    const result = await recommendationsService.randomRecommendationsService(
      0.6,
    );
    expect(result).toEqual(null);
  });
});
