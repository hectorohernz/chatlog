const express = require("express");
const app  = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const connectMongoDB = require('./config');

app.use(cors());
connectMongoDB();
app.use(express.json({extented: false, limit: '50mb'}));

// Setting Up Server
app.get('/', (req,res) => {
    res.send('Node Server Is Working !')
})

// Routes

app.use("/api/post", require("./routes/Post"));
app.use("/api/feed", require("./routes/Feed"));


// Creating a server with node
app.listen(PORT, () => {
    console.log(`Server Is Living ${PORT}`)
});