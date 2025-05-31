import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnection = (app, port) => {
    mongoose.connect(process.env.CONNECTION_STR)
    .then(() => {
        console.log("DB is live.");

        app.listen(port, () => {
            console.log(`Server is live on port: ${port}.`);
        });
    })
    .catch((error) => {
        console.log("DB connection error: ", error);
    });
}

export default dbConnection;