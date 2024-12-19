const express = require("express");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");

const app = express();

app.use(express.json()); 

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
