import express from "express";

import userRoutes from "./routes/user.js";

const app = express();

app.use(express.json());
app.use(userRoutes);

const port = 3000;
app.listen(port, function () {
  console.log("Express server listening on port " + port);
});
