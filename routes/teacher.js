const express = require('express')
const { isValidJWTToken } = require('../authentication/authMiddlewares')
const { deleteStat, deleteAllStats, updateQuestionSet, getExamStats, createQuestionSet } = require('../controllers/teacherController')
const router = express.Router()

// checking if jwt token is valid or not

router.use(isValidJWTToken);

/**
 * @swagger
 * /teacher/createquestionset:
 *   post:
 *      tags:
 *          - "teacher"
 *      security:
 *          - bearAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          duration:
 *                              type: integer
 *                              example: 15
 *                          questions:
 *                              type: array     
 *                              items: 
 *                                  $ref: "#/components/schemas/questionSchema"
 *      responses:
 *          "200":
 *              description: ok
 *          "404":
 *              description : error 
 * 
 */

router.post('/createquestionset', createQuestionSet)

/**
 * @swagger
 * /teacher/getexamstats/{uuid}:
 *   post:
 *      tags:
 *          - "teacher"
 *      security:
 *          - bearAuth: []
 *      parameters:
 *          - in: path
 *            name: uuid
 *            required: true
 *            schema:
 *                  type: string
 *                  example: 341fvdju
 *      responses:
 *          "200":
 *              description: ok
 *          "404":
 *              description : error 
 * 
 */

router.post('/getexamstats/:uuid', getExamStats)

/**
 * @swagger
 * /teacher/updatequestions/{examid}:
 *   patch:
 *      tags:
 *          - "teacher"
 *      security:
 *          - bearAuth: []
 *      parameters:
 *          - in: path
 *            name: examid
 *            required: true
 *            schema:
 *                  type: string
 *                  example: 341fvdju
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          questions:
 *                              type: array
 *                              items:
 *                                 $ref: "#/components/schemas/questionSchema"
 *      responses:
 *          "200":
 *              description: ok
 *          "404":
 *              description : error 
 * 
 */

router.patch('/updatequestions/:examid', updateQuestionSet)

/**
 * @swagger
 * /teacher/deleteallstats:
 *   delete:
 *      tags:
 *          - "teacher"
 *      security:
 *          - bearAuth: []
 *      responses:
 *          "200":
 *              description: ok
 *          "404":
 *              description : error 
 * 
 */

router.delete('/deleteallstats', deleteAllStats)

/**
 * @swagger
 * /teacher/deletestat/{id}:
 *   delete:
 *      tags:
 *          - "teacher"
 *      security:
 *          - bearAuth: []
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                  type: string
 *                  example: 341fvdju
 *      responses:
 *          "200":
 *              description: ok
 *          "404":
 *              description : error 
 * 
 */


router.delete('/deletestat/:id', deleteStat)

module.exports = router