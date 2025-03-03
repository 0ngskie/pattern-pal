//Local Server with Port 4000
const express = require('express');

const app = express();

const port_number = 4000;

//Middleware Setup
app.use(express.json());

//Routes
const userRoute = require('./routes/userRoute');

//Address
app.use('/users', userRoute);

//Running
app.listen(port_number, () => {
    console.log(`Server: http://localhost:${port_number}`)
})

//npm install dotenv
//npm install mysql
//node index.js
