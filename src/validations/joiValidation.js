import Joi from 'joi';

const validation = Joi.object({
  name: Joi.string().required(),
  youtubeLink: Joi.string().required().uri(),
});

export default validation;
