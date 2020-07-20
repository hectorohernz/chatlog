const express = require("express");
const app  = express();
const PORT = process.env.PORT || 5000;




// Creating a server with node
app.listen(PORT, () => {
    console.log(`Server Is Living ${PORT}`)
});