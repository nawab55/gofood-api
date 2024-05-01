const express = require('express');
const app = express();
const mongoDB = require('./util/db');

require('dotenv').config();

const cors = require('cors');

app.use(cors());

const userRoutes = require('./routes/user');
const displayDataRoutes = require('./routes/displayData');
const orderDataRoutes = require('./routes/OrderData');

app.use(express.json());

app.get('/', (req, res)=>{
    res.send("Hello World----");
});

app.use('/api', userRoutes);
app.use('/api', displayDataRoutes);
app.use('/api', orderDataRoutes);

// app.listen(port, ()=>{
//     console.log(`server is running on port ${port}`);
// })

const PORT = process.env.PORT || 5000;;
app.listen(PORT,async ()=>{
    await mongoDB()
    console.log(`server is running on port ${PORT}`);
})