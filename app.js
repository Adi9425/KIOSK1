const express= require('express');
const mongoose =require('mongoose');
const ejsMate =require('ejs-mate');

// const methodOverride = require('method-override');
const app = express();
app.use(express.static('public'))
const path =require('path');
app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}))
// app.use(methodOverride('_method'));
mongoose.connect('mongodb://localhost:27017/KIOSK');
const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected");
});
const Data =require('./models/data');
const { request } = require('http');


app.get('/',(req,res)=>{
    res.render('./data/home');
})
app.get('/new',(req,res)=>{
    res.render('./data/new');
})
app.get('/adhar',(req,res)=>{
    res.redirect('https://myaadhaar.uidai.gov.in/CheckAadhaarStatus');
});
app.post('/data',async(req,res)=>{
    
    console.log(req.body.data);
    const data =await Data(req.body.data);
    await data.save();

    res.redirect("/")
  })
app.listen(3000,()=>{
    console.log('server on port 3000');
})
