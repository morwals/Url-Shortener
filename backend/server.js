const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const app = express();
const cors = require('cors');
app.use(cors())


app.use(express.json());

mongoose.connect('mongodb://localhost/urlShortener', {
  useNewUrlParser: true, useUnifiedTopology: true
}).then((req,res)=>{
    console.log("db connect");
}).catch((err)=>{ console.log("error in db")});

app.get('/', async (req, res) => {
  const shortUrls = await ShortUrl.find()
  res.send(shortUrls);
})

app.post('/shortUrls', async (req, res) => {
  await ShortUrl.create({ full: req.body.full })
  res.send(req.body);
})

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
  if (shortUrl == null) return res.sendStatus(404)

  shortUrl.clicks++;
  shortUrl.save(); 

  res.redirect(shortUrl.full);
})

app.listen(process.env.PORT || 3001);