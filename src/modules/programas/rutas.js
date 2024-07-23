const express = require('express');

const response = require('../../red/responses');
const controller = require('./index');
const security = require('../../authentication/security');


const router = express.Router();

router.get('/', security(), async (req, res, next) => {
   try{
   const items = await controller.getAll();
   response.success(req, res, items, 200);
   }catch (error){
      //response.error(req, res, error, 500);
      next(error);
   }
});

router.get('/:id', security(), async (req, res, next) => {
   try {
      const item = await controller.getById(req.params.id);
   response.success(req, res, item, 200);
   } catch (error) {
     // response.error(req, res, error, 500);
      next(error);
   }
   
});

router.post('/', security(), async (req, res, next) => {
   try{
      const item = await controller.create(req.body);
      if(req.body.id == 0){
         message = 'Item Creado con éxito';
      }else{
         message = 'Item Actualizado con éxito';
      }
      response.success(req, res, message, 201);

   }catch (error){
      next(error);
   }
})

router.delete('/', security(), async (req, res, next) => {
   try {
      const item = await controller.delet(req.body);
      response.success(req, res, 'Item eliminado con exito!', 200);
      
   } catch (error) {
    //  response.error(req,res,error,500);
      next(error);
   }
});



module.exports = router;