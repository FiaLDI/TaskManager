import express from "express";
import cors from "cors";
import http from "http";
import { taskRouter } from "./routes/taskRoutes";

const app = express();
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    }),
);

const server = http.createServer(app);

app.use(express.json());
app.use("/api", taskRouter);

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
