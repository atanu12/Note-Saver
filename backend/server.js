const express = require("express");
const notes = require('./data/notes')
const dotenv =require("dotenv");
const dbConnect = require("./config/db");
const userRoute = require('./routes/userRoute');
const noteRoute = require('./routes/noteRoute');
const { notFound, errorHandler } = require("./middlewares/errormiddleware");


dotenv.config()
const app = express();
dbConnect()
app.use(express.json())

// app.get('/api/notes',(req, res)=>{
//     res.json(notes)
// })

// import userRoutes from the router
app.use('/api/users', userRoute)
app.use('/api/notes', noteRoute)
app.use(notFound)
app.use(errorHandler)
    
const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Running on the ${PORT}`));

