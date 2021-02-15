const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    question: String,
    options: {
        type: [String],
        validate: {
            validator: (options) => {
                return options.length == 4;
            },
            message: 'The number of options should 4'
        }
    },
    answer: Number
});
module.exports.QuestionModel = schema

/**
 * @swagger
 * components:
 *      schemas:
 *          questionSchema:
 *              properties:
 *                  question:
 *                      type: string
 *                      example: "How you doin"
 *                  answer:
 *                      type: integer
 *                      example: 3
 *                  options:
 *                      type: array
 *                      items:
 *                          type: string
 *                      example: ["option one", "option two", "option three","option four"]
 */