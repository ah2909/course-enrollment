import Joi from "joi";

export const enrollmentSchema = Joi.object({
  courseId: Joi.number().integer().required(),
  studentEmail: Joi.string().email().required(),
});

export const emailParamSchema = Joi.object({
  email: Joi.string().email().required(),
});
