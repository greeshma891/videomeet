import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";


import {connectToSocket} from "./controllers/socketManager.js";  
import cors from "cors";
import userRoutes from "./routers/users.routers.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.use(cors());
app.use(express.json());

app.set("port", process.env.PORT || 8080);
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended: true}));


app.use("/api/v1/users", userRoutes);

app.get("/home", (req, res) => {
    return res.json({ "hello": "world" });
});

const start = async () => {
    try {
        const connectionDb = await mongoose.connect(
            "mongodb+srv://greeshmaaitha120_db_user:PrpcEMvt0rNiD20J@cluster0.aqrssvd.mongodb.net"
        );

        console.log(`MONGO connected DB Host: ${connectionDb.connection.host}`);

        connectToSocket(server);

        server.listen(app.get("port"), () => {
            console.log("listen on port 8080");
        });

    } catch (error) {
        console.log("MongoDB Error:", error.message);
    }
};

start();

