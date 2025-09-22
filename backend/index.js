const express = require("express");

const app = express();
const port = 3000;

// Testing
app.get("/", (req, res) => {
    res.send("Web BEM Fasilkom 2025!");
});

app.get("/profile", (req, res) => {
    res.send("respons from /profile");
});

app.listen(port, () => console.log(`server running on port ${port}`));

