const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "O campo 'name' não pode estar vazio.",
    "string.min": "O campo 'name' deve ter pelo menos {#limit} caracteres.",
    "string.max": "O campo 'name' deve ter no máximo {#limit} caracteres.",
    "any.required": "O campo 'name' é obrigatório.",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "O campo 'email' não pode estar vazio.",
    "string.email": "Formato de email inválido.",
    "any.required": "O campo 'email' é obrigatório.",
  }),
  password: Joi.string().min(6).max(30).required().messages({
    "string.empty": "O campo 'password' não pode estar vazio.",
    "string.min": "A senha deve ter pelo menos {#limit} caracteres.",
    "string.max": "A senha deve ter no máximo {#limit} caracteres.",
    "any.required": "O campo 'password' é obrigatório.",
  }),
});

module.exports = userSchema;