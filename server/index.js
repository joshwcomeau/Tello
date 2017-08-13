const fs = require('fs');

const nconf = require('nconf');
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const passport = require('passport');

require('./initialize');

const app = express();

app.set('port', nconf.get('PORT') || 3005);

app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: false }));


// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
}

app.get('/random-photo', (req, res) => {
  const dimensions = `${req.query.size}x${req.query.size}`
  const url = `https://source.unsplash.com/random/${dimensions}`;

  request(url).pipe(res);
});

app.listen(app.get('port'), () => {
  console.info(`==> 🌎  Listening on port ${app.get('port')}.`);
});
