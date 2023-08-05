const express = require("express");
const app = express();
const cors = require("cors");
const { connection } = require("./configs/db");
const { userRouter } = require("./routes/users.routes");
const { qouteRouter } = require("./routes/quote.routes");
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/quote", qouteRouter)


app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log("DB Connected");
        console.log("Succesfully running at", process.env.PORT);
    } catch (error) {
        console.log("Whil Connecting to DB", error.message)
    }
})