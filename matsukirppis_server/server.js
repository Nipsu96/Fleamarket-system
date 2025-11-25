const express = require("express")
const productsRouter = require('./routes/products.js');
const userRouter = require('./routes/user.js');
const databaseconnection = require('./db/connection.js')
const cors = require("cors")

const app = express()

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/products', productsRouter);
app.use('/api/user', userRouter);

const PORT = process.env.PORT || 5000;

databaseconnection.connectToDatabase().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on port ", PORT);
    })
}).catch(e => {
    console.log("error occured with connection", e)
    process.exit()
})


