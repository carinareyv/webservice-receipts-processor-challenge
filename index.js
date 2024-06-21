import express from "express";
import bodyParser from "body-parser";
import receiptsRoutes from "./routes/receipts.js";

const app = express();
const PORT = 8080;

app.use(bodyParser.json());

app.use("/receipts", receiptsRoutes);

app.get("/", (req, res) => {
  res.send("Hello from homepage");
});

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
