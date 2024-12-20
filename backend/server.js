const express = require("express");
const path = require("path");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");

const app = express();

app.use(express.json()); 

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

const frontendPath = path.join(__dirname, "./frontend/dist");
app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
