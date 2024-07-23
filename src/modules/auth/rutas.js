const express = require('express');

const response = require('../../red/responses');
const controller = require('./index');

const router = express.Router();

router.get('/login', async (req, res, next) => {
         try {
            const token = await controller.login(req.body.usuario, req.body.password);
         response.success(req,res, token, 200)
         } catch (error) {
            next(error);
         }
});
module.exports = router;