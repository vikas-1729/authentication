//requre express
const express=require('express');

//setting port
const port=8000;

//making app
const app =express();

//connecting to db
const db=require('./config/index');
const cookieParser = require('cookie-parser');
//setting view engine
app.set('view engine','ejs');
app.set('views','./views');

//setting static folder
app.use(express.static('./assest'));

//encode post request
app.use(express.urlencoded());

//embediing cokkie in your req
app.use(cookieParser());

app.use('/',require('./router/index'));
app.listen(port,function(err){
    if(err){
        console.log(`error occur ${err}`);
        return;
    }
    console.log(`we coonect to port ${port}`);
});


