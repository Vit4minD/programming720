const express = require("express");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 5000;

app.use(express.json());

// Endpoint to execute Java code
app.post("/execute", (req, res) => {
    const code = req.body.code;

    // Create a directory for the code
    const codeDir = path.join(__dirname, "code");
    if (!fs.existsSync(codeDir)){
        fs.mkdirSync(codeDir);
    }

    // Write the code to a file
    const filePath = path.join(codeDir, "Main.java");
    fs.writeFileSync(filePath, code);

    // Execute the Docker command to run the code
    exec(`docker run --rm -v ${codeDir}:/app openjdk:11-jdk bash -c "cd /app && javac Main.java && java Main"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send(stderr);
        }
        res.send(stdout);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
