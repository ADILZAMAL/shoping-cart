const monk = require("monk");
MONGO_URI = "localhost:27017/react-shopping-cart-db";
const db = monk(MONGO_URI);
db.then(() => {
  console.log("database is connected");
});

module.exports = db;
