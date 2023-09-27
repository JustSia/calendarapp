const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://Jape:<8SqqGJIUEx2S7YSI>@cluster0.3wznhov.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const SectionSchema = new mongoose.Schema({
  name: String,
  subsections: [String]
});

const Section = mongoose.model('Section', SectionSchema);

app.get('/sections', async (req, res) => {
  const sections = await Section.find();
  res.json(sections);
});

app.post('/sections', async (req, res) => {
  const section = new Section(req.body);
  await section.save();
  res.json(section);
});

// More routes for other CRUD operations...

const port = 3000;
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));