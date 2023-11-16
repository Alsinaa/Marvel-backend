const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/characters", async (req, res) => {
  try {
    const limit = req.query.limit || 100; // logical OR operator renverra true
    const skip = req.query.skip;
    // console.log(limit);
    // console.log(skip);

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?limit=${limit}&skip=${skip}&apiKey=${process.env.API_KEY}`
    );
    // console.log(response.data);
    res.json(response.data);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/character/:characterId", async (req, res) => {
  try {
    const characterId = req.params.characterId;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters/${characterId}?apiKey=${process.env.API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message);
  }
});
module.exports = router;
