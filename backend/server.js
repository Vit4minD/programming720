// server.js
const express = require("express");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(express.json());

app.post("/execute", (req, res) => {
  const { code } = req.body;

  // Write the Java code to a temporary file
  const filePath = path.join(__dirname, "Main.java");
  fs.writeFileSync(filePath, code);

  // Compile and run the Java code
  exec(`javac Main.java && java Main`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).send(`Error: ${stderr || error.message}`);
    }
    res.send(stdout);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
