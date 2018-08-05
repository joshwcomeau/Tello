const AWS = require('aws-sdk');
const request = require('request');
const slugify = require('slugify');


// Configure S3
const BUCKET_NAME = 'tellotv';
const AWS_CONFIG_PATH = process.env.NODE_ENV === 'production'
  ? '/home/deploy/config/tello/aws.json'
  : './server/config/aws.json';

AWS.config.loadFromPath(AWS_CONFIG_PATH);

const s3 = new AWS.S3();
const s3Bucket = new AWS.S3({params: {Bucket: BUCKET_NAME}});


module.exports.uploadImage = ({ key, url }) => (
  new Promise((resolve, reject) => {
    // Sometimes, shows don't have a URL. In those cases, skip this one.
    if (!url) {
      resolve();
      return;
    }

    request({ url, encoding: null }, (err, res, body) => {
      if (err) {
        reject(err);
      }

      s3.putObject({
        Key: key,
        Bucket: BUCKET_NAME,
        Body: body,
      }, (...args) => {
        resolve(`https://s3.amazonaws.com/tellotv/${key}`)
      });
    });
  })
);

module.exports.getImageFilenameForShow = show => (
  slugify(`${show.name}-${show.region || 'US'}.jpg`)
);
