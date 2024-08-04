const express = require('express');
const app = express();
const indexRouter = require('./routes/index')



app.set("view engine", "ejs" )
app.use(express.urlencoded({ extended: true }))
app.use("/", indexRouter);

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`We watch you on Port ${PORT}`))

