const express = require('express')
const { isValidJWTToken } = require('../authentication/authMiddlewares');
const { userReg, getQuestions, submitAnswers } = require('../controllers/userController');
const router = express.Router()

/**
* @swagger
* /user/registration:
*  post:
*    requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*            type: object
*            properties:
*              username:
*                type: string
*                example: cooper
*              email:
*                type: string
*                example: abc@gmail.com
*              password:
*                type: string
*                example: abc123
*    tags:
*      - "user"
*    responses:
*      "200":
*        description: ok
*      "404":
*        description: error
*/


router.post('/registration', userReg);

// checking if given token is valid or not

router.use(isValidJWTToken);

/**
 * @swagger
 * /user/getquestionset/{examId}:
 *   post:
 *      tags:
 *          - "user"
 *      security:
 *          - bearAuth: []
 *      responses:
 *          "200":
 *            description: ok
 *          "404":
 *            description: error
 *      parameters:
 *         - in: path
 *           name: examId
 *           required: true
 *           schema: 
 *              type: string
 *           example: 13evwe34
 * 
 */
router.post('/getquestionset/:examId', getQuestions);

/**
 * @swagger
 * /user/submit/{examId}:
 *   post:
 *      tags:
 *          - "user"
 *      security:
 *          - bearAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          type: integer
 *                      example: [1,2,1,4,2,3,1,2]
 *      responses:
 *          "200":
 *            description: ok
 *          "404":
 *            description: error
 *      parameters:
 *         - in: path
 *           name: examId
 *           required: true
 *           schema: 
 *              type: string
 *           example: 13evwe34
 *          
 */

router.post('/submit/:examId', submitAnswers)

module.exports = router