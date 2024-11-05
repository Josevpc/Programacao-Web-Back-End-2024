const Joi = require("joi")

const TaskSchema = Joi.object({
    id: Joi.number()
        .integer()
        .greater(0),
    nome: Joi.string()
        .min(3)
        .max(30)
        .required(),
    priority: Joi.string()
        .valid("Baixa", "Média", "Alta")
        .default("Média")
}).with("id", "nome", "priority")

module.exports = TaskSchema