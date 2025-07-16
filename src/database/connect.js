const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@posttohelp.wscrjj5.mongodb.net/?retryWrites=true&w=majority&appName=postToHelp`
    );
    console.log("Conexão ao banco de dados realizada com sucesso!");
  } catch (error) {
    console.log("something went wrong" + error);
  }
};

module.exports = connectToDatabase;
