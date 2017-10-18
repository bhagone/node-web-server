const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port = process.env.PORT || 3000;

app.set('view engine','hbs');
//partials
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentyear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})
// middleware
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){console.log('Unable to log to server');}
    });
    console.log(log);
    next(); 
});

app.use((req,res,next)=>{
    res.render('maintenance.hbs'); // no next() called so no further calling of handlers
});

app.use(express.static(__dirname+'/public'));

//app.get(route , function);
app.get('/',(req,res)=>{
    // res.send('<h1>Hello express.</h1>');
    // res.send({
    //     name:'Name',
    //     likes:['GOT','Silicon Valley']
    // });
    res.render('home.hbs',{
        pageTitle:'Home page',
        welcomeMsg:'Welcome to home page',
        currentYear: new Date().getFullYear()
    });
});
 
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About page',
        currentYear:new Date().getFullYear()
    });
});
//bad 
app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:'Unable to handle request'
    });
});
app.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});