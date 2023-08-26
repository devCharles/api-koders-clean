const express = require("express");
const kodersRouter = require("./routes/koders.router");
const practicesRouter = require("./routes/practices.router");
const authRouter = require("./routes/auth.router");

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/koders", kodersRouter);
app.use("/practices", practicesRouter);

app.get("/", (request, response) => {
  response.json({
    message: "Koders APIv1",
  });
});

module.exports = app;
