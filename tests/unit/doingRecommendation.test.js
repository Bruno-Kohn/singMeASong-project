import * as recommendationsService from '../../src/services/recommendationsService.js';
import * as recommendationsRepository from '../../src/repositories/recommendationsRepository.js';

describe('doing recommendation', () => {
  const createRecommendation = jest
    .spyOn(recommendationsRepository, 'createRecommendation')
    .mockImplementation(() => []);

  it('should return the recommendation object', async () => {
    const result = await recommendationsService.doingRecommendation(
      '',
      'https://www.youtube.com/watch?v=Mop-QwmO2Mw',
    );
    expect(result).toEqual(null);
  });

  it('should return the recommendation object', async () => {
    const result = await recommendationsService.doingRecommendation(
      'Casimiro Miguel',
      'Link Quebrado',
    );
    expect(result).toEqual(null);
  });

  it('should return the recommendation object', async () => {
    const result = await recommendationsService.doingRecommendation(
      'Caze',
      'https://www.youtube.com/watch?v=Mop-QwmO2Mw',
    );
    expect(result).toEqual(true);
  });
});
