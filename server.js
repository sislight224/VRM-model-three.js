const https = require('https');
const fs = require('fs');
const axios = require('axios');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
const express = require('express');
const path = require('path');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;


app.use(cors());
app.use(express.static('public')); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
app.get('/company-horse', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.get('/data/:id', async (req, res, next) => {

  console.log("hi respose")
  const response = await axios.get(`https://eu-central-1.linodeobjects.com/games-encoded-storage/games-videos/vhr-cue-ns/${req.params.id}.webvtt`);
  
  const objects = response.data.match(/{.*?}/g).map(JSON.parse);
  let a = [...objects];
  res.json(a)

  next()

})

app.get('/api/win', async (req, res, next) => {
  console.log("api win-------")
  const response = await axios.get(`http://54.183.245.65/api/win.php`);
  console.log(response.data)
  res.json(response.data)
  next()
})

app.post('/getVideoId', (req, res, next) => {
  console.log( req.body)

  const { tickets } = req.body
  console.log(tickets)
  axios.post(`http://54.183.245.65/api/bet.php`, req.body);
  // let videoID = videoIds[Math.round(Math.random() * videoIds.length)];
  // res.json(videoID);
  res.json("success");
  next()
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

