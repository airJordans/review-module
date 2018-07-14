require('newrelic');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../database/postgres/indexPSQL');
const app = express();

// resolves a specific listing requested
app.use('/', express.static(path.join(__dirname, '/../public')));
app.use('/listings/:id', express.static(path.join(__dirname, '/../public')));
app.use(bodyParser.json());

/************************  CREATE (POST) *************************/

app.post('/listings/reviews/post', (req, res) => {
  const {listingId, rating_accuracy, rating_communication, rating_cleanliness, rating_location, rating_checkin, rating_value, review_user_id, review_body, review_date, response_date, response_owner_id, response_body} = req.body;

  db.postReviews(listingId, rating_accuracy, rating_communication, rating_cleanliness, rating_location, rating_checkin, rating_value, review_user_id, review_body, review_date, response_date, response_owner_id, response_body, (err, data) => {
    if (err) {
      res.status(500).end();
    } else {
      res.header('Access-Control-Allow-Origin', '*');
      res.status(200);
      res.end();
    }
  });
});

/************************ READ (GET) *************************/
app.get('/listings/:listingId/overviews', (req, res) => {
  db.getOverview( req.params.listingId, (err, data) => {
    if (err) {
      res.status(500).end();
    } else {
      res.header('Access-Control-Allow-Origin', '*');
      res.status(200);
      res.send(data);
    }
  });
});

app.get('/listings/:listingId/reviews', (req, res) => {
  db.getReviews( req.params.listingId, (err, data) => {
    if (err) {
      res.status(500).end();
    } else {
      res.header('Access-Control-Allow-Origin', '*');
      res.status(200);
      res.send(data);
    }
  });
});

/************************ UPDATE (put) *************************/
app.put('/listings/reviews/update', (req, res) => {
  const {reviewId, reviewBody} = req.body;
  console.log(req.body)
  db.updateReviews(reviewId, reviewBody, (err, data) => {
    if (err) {
      res.status(500).end();
    } else {
      res.header('Access-Control-Allow-Origin', '*');
      res.status(200);
      res.end();
    }
  });
});

/************************ DELETE (delete) *************************/
app.delete('/listings/reviews/delete', (req, res) => {
  const reviewId = req.body.reviewId;
  
  db.deleteReviews(reviewId, (err, data) => {
    if (err) {
      res.status(500).end();
    } else {
      res.header('Access-Control-Allow-Origin', '*');
      res.status(200);
      res.end();
    }
  });
})

module.exports = app;