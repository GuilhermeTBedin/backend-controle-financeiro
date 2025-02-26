const Joi = require("joi");

const transactionSchema = Joi.object({
  type: Joi.string().valid("income", "expense").required(),
  amount: Joi.number().positive().required(),
  category: Joi.string().required(),
  date: Joi.date().iso().required(),
});

module.exports = transactionSchema;