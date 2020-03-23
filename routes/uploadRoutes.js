const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const requireLogin = require('../middlewares/requireLogin');
const keys = require('../config/keys');

const s3 = new AWS.S3({
  signatureVersion: 'v4',
  region: 'eu-central-1',
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey
});

module.exports = app => {
  app.get('/api/upload', requireLogin, (req, res) => {
    const key = `${req.user.id}/${uuid()}.jpeg`;

    const url = s3.getSignedUrl('putObject', {
      Bucket: 'sample-blog-bucket-112233',
      ContentType: 'image/jpeg',
      Key: key
    });

    res.send({ key, url });
  });
};
