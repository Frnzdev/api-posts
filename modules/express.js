const express = require("express");
const cors = require("cors");
const postModels = require("../src/models/post.models");
const app = express();
app.use(cors());
app.use(express.json());

// Middleware de log (opcional)
app.use((req, res, next) => {
  console.log(`Request Type: ${req.method}`);
  console.log(`Content Type: ${req.headers["content-type"]}`);
  console.log(`Date: ${new Date()}`);
  next();
});

app.post("/posts", async (req, res) => {
  try {
    const posts = await postModels.create(req.body);
    res.status(201).json(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const posts = await postModels.findByIdAndDelete(id);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/posts/:titulo", async (req, res) => {
  try {
    const titulo = req.params.titulo;
    const posts = await postModels.findOne({ titulo });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await postModels.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const port = 8080;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
