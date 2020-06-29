//requiring models

const userModel=require('../models/userModel');
//requiring md5 for encryption
const md5=require('md5');

function printError(errValue,errPlace){
    console.log(`error ${err} occur at ${errPlace}`);
    return;
}
module.exports.home=function(req,res){
    res.render('user',{
        'title':'home page'
    });
};

module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        'title':'sign-up'
    });
};

module.exports.create=function(req,res){
    if(req.body.password==req.body.checkPassword){//checking for password match
        userModel.findOne({email:req.body.email},function(err,user){
            if(err){
                printError(err,"in accessing db");
                return;
            }
            if(user){
               console.log('there is user with this name');
               return; 
            }else{
                req.body.password=md5(req.body.password);
                userModel.create(req.body,function(err,user){
                    console.log('creating succesfully');
                   return  res.redirect('/user/signIn');
                });
            }
   });
    }else{
        console.log('pasword mismatch')
        return res.redirect('back');
    }
};

module.exports.signIn=function(req,res){
    res.render('user_sign_in',{
        'title':'sign in'
    });
};