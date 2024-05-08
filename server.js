const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Placeholder data (replace with database access)
const adminsData = [
  { username: "admin1", password: "waseadmin" },
  { username: "admin2", password: "waseadmin2" },
  { username: "admin3", password: "waseadmin3" },
];

// API endpoint to handle admin login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  let foundAdmin = null;
  for (const admin of adminsData) {
    if (admin.username === username) {
      foundAdmin = admin;
      break;
    }
  }

  if (!foundAdmin || foundAdmin.password !== password) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Generate JWT token
  const token = jwt.sign({ username: foundAdmin.username }, "JHYTI23RTUI", {
    expiresIn: "1h",
  });

  res.json({ token });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
