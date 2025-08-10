const express = require('express')
const app = express()
const db = require('./db')
require('dotenv').config();
const schoolRoutes = require('./routes/schoolRoutes');

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('hello from railway testing purpose only')
})

app.use('/api', schoolRoutes);

app.listen(3000, () => {
    console.log('server running on port 3000')
})
