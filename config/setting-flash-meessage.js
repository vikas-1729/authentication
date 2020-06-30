module.exports=function(req,res,next){
    console.log("beta hu me",req.flash());
    res.locals.errorMessage=req.flash('error');
    next();

}