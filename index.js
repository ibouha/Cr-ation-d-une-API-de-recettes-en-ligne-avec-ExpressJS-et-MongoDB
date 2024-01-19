const express = require("express");
const recipesPath = require("./routes/recipes");
const authPath = require("./routes/users");
require("./config/connect");
const swaggerDocs = require("./swager");

const app = express();

// middleware
app.use(express.json());
app.use("/api/recipes", recipesPath);
app.use("/api/auth", authPath);
swaggerDocs(app);

const port = 3008;
app.listen(port, console.log("Server already listening on port"));
