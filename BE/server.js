require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Use environment variables to keep sensitive information secure
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

// Correct the connection string by specifying the database name
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.3wznhov.mongodb.net/myapp?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true});

const SectionSchema = new mongoose.Schema({
  name: String,
  subsections: [String]
});

const Section = mongoose.model('Section', SectionSchema);

app.get('/sections', async (req, res) => {
  try {
    const sections = await Section.find();
    res.json(sections);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/sections', async (req, res) => {
  try {
    const section = new Section(req.body);
    await section.save();
    res.json(section);
  } catch (error) {
    console.error(error);
    res.status(400).send('Bad Request');
  }
});

const port = 3000;
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
