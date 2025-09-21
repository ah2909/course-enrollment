import Joi from "joi";

export const createCourseSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  difficulty: Joi.string()
    .valid("Beginner", "Intermediate", "Advanced")
    .required(),
});
