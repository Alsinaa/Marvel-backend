const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/comics", async (req, res) => {
  try {
    const title = req.query.title || {};
    const limit = req.query.limit || 100; // logical OR operator renverra true
    const skip = req.query.skip;
    // console.log(limit);
    // console.log(skip);
    console.log(title);

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?title=${title}&limit=${limit}&skip=${skip}&apiKey=${process.env.API_KEY}`
    );
    // console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/comics/:characterId", async (req, res) => {
  try {
    const characterId = req.params.characterId;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${process.env.API_KEY}`
    );
    res.json(response.data);
    // console.log(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/comic/:comicId", async (req, res) => {
  try {
    const comicId = req.params.comicId;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${comicId}?apiKey=${process.env.API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
