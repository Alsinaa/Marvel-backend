const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: {
    type: String,
    required: true,
  },
  email: {
    unique: true,
    type: String,
  },
  salt: String,
  token: String,
  hash: String,
});

module.exports = router;
