const express = require('express');
const { getAccessToken } = require('../authentication/authControllers');
const { login } = require('../authentication/authMiddlewares');
const router = express.Router()

/**  
* @swagger
* /auth/token:
*  post:
*    responses:
*      "200":
*        description: ok
*      "400":
*        description: error
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
*              password:
*                type: string
*                example: abc123
*    tags:
*      - "auth"
 */

router.post('/token', login, getAccessToken);

module.exports = router;