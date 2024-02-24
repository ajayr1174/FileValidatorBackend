const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

const mongoose = require("mongoose");
const connection_url =
  "mongodb+srv://validatordb:sXwnG4XBcfJWKnjR@cluster0.2tlaitw.mongodb.net/validatordb?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`successfully connected`);
  })
  .catch((e) => {
    console.log(`not connected`);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(cors);
app.use("/", require("./routes/"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
