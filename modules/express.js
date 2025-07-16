const express = require("express");
const cors = require("cors");
const postModels = require("../src/models/post.models");

const app = express();
app.use(cors());
app.use(express.json());

// Middleware de log
app.use((req, res, next) => {
  console.log(`Request Type: ${req.method}`);
  console.log(`Content Type: ${req.headers["content-type"]}`);
  console.log(`Date: ${new Date()}`);
  next();
});

// Criar post
app.post("/posts", async (req, res) => {
  try {
    const post = await postModels.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Deletar post por ID
app.delete("/posts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await postModels.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ message: "Post não encontrado." });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Buscar post por ID
app.get("/posts/id/:id", async (req, res) => {
  try {
    const post = await postModels.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post não encontrado." });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Buscar post por título
app.get("/posts/titulo/:titulo", async (req, res) => {
  try {
    const post = await postModels.findOne({ titulo: req.params.titulo });
    if (!post) {
      return res.status(404).json({ message: "Post não encontrado." });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
//editar post
app.patch("/posts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await postModels.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!post) {
      return res.status(404).json({ message: "Post não encontrado." });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Listar todos os posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await postModels.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const port = 8080;

app.listen(port, () => console.log(`API rodando na porta ${port}!`));
