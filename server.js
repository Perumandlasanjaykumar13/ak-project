const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/feedbackDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const Feedback = require("./models/Feedback");

// POST API
app.post("/submit", async (req, res) => {
    try {
        const { name, email, rating, comments } = req.body;

        const feedback = new Feedback({
            name,
            email,
            rating,
            comments
        });

        await feedback.save();
        res.json({ message: "Feedback Submitted Successfully!" });

    } catch (error) {
        res.status(500).json({ error: "Error saving feedback" });
    }
});

// GET API
app.get("/feedbacks", async (req, res) => {
    const data = await Feedback.find();
    res.json(data);
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
