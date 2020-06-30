//requiring models

const userModel=require('../models/userModel');
//requiring md5 for encryption
const md5=require('md5');

//making a global print error function
function printError(errValue,errPlace){
    console.log(`error ${err} occur at ${errPlace}`);
    return;
}
//home page only biew when you are login
module.exports.home=function(req,res){
    //don't let go you home if you are not authenticate
    if(req.isAuthenticated()){// if autheniticate then only allow to visit
      return res.render('user',{
        'title':'home page'
    });
}
    return res.redirect('/user/signIn');

};
//signup
module.exports.signUp=function(req,res){
  if(!req.isAuthenticated()){//if auhenticate don't allow to sign up
    //console.log('req.flash',req.flash(),req.flash('error2'));
    return res.render('user_sign_up',{
        'title':'sign-up',
    });
} 
  return  res.redirect('/user');
    
};
//create user through local
module.exports.create=function(req,res){
    if(req.body.password==req.body.checkPassword){//checking for password match
        userModel.findOne({email:req.body.email},function(err,user){
            if(err){
                printError(err,"in accessing db");
                return;
            }
            if(user){
                req.flash('error','there is user with this email');
               return res.redirect('/user/signUp'); 
            }else{
                req.body.password=md5(req.body.password);
                userModel.create(req.body,function(err,user){
                    console.log('creating succesfully');
                   return  res.redirect('/user/signIn');
                });
            }
   });
    }else{
        req.flash('error','pasword mismatch');
        
        return res.redirect('back');
    }
      //  return res.redirect('back');
};
// sign in
module.exports.signIn=function(req,res){
     if(!req.isAuthenticated()){//if not authetucate then sign in
     return res.render('user_sign_in',{
        'title':'sign in'
        
    });
}
    
    return res.redirect('/user');
};
//creating for usrr sign in

module.exports['create-session']=function(req,res){
      return res.redirect('/user');
};
module.exports.profile=function(req,res){
    res.render('profile');
};
module.exports.signOut=function(req,res){
   if(req.isAuthenticated()){
      
    req.logout();
   }
     return res.redirect('/user/signIn');
};

// forchanging password
module.exports.changePassword=function(req,res){
     return res.render('change_password.ejs',{
        'title':'change password'
    });
}
//update password
module.exports.updatePassword=function(req,res){
    let currentPassword=res.locals.user.password;//stroring current password
    if(currentPassword==(req.body.currentPassword)){//comparing both if unequal return
        if(req.body.password==req.body.checkPassword){
            userModel.updateOne(
                {email:res.locals.user.email},
                {$set:{password:md5(req.body.password)}},
                    function(err,user){
                        if(err){
                            console.log('error',err);
                            return;
                        }
                        return res.redirect('/user');

                });
        }else{
            req.flash('error','password mismatch');
            return res.redirect('back');
        }
    }else{
        req.flash('error','current password is not coreect use forgot password');
        return res.redirect('back');
    }
  
      
};