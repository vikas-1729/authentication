const express=require('express');

const userRouter=express.Router();

const controller=require('../controller/userController');
userRouter.get('/',controller.home);

userRouter.get('/signUp',controller.signUp);

userRouter.post('/create',controller.create);

//handling rputer for sign-in
userRouter.get('/signIn',controller.signIn);


module.exports=userRouter;