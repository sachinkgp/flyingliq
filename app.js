const express = require('express');
const mongoose= require('mongoose');
const PORT = process.env.PORT ||5000;
const app = express();
const {MONGOURI,JWT_SECRET} = require('./middleware&keys/keys');
// const cors = require('cors');

// app.use(cors())
app.get('/',(req,res)=>{
    res.send("Hello there this is final draft");
})

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true

})
mongoose.connection.on('connected',()=>{
    console.log("conneted to mongo yeahh")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})

require('./dataschemas/user')
require('./dataschemas/activeorders')
require('./dataschemas/deadorders')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/orders'))

app.listen(PORT,()=>{
    console.log(`App running on PORT ${PORT}`);
})