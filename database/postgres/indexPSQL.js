const pg = require('pg');
const connectionString = 'postgres://localhost:5432/project_nomad_reviews';

const client = new pg.Client(connectionString);
client.connect((err) => {
  if (err) {
    console.log('you have error', err);
  } else {
    console.log('you have connected to postgresDB');
  }
});

/***************** CREATE (POST) *******************************/

var postReviews = (listingId, rating_accuracy, rating_communication, rating_cleanliness, rating_location, rating_checkin, rating_value, review_user_id, review_body, review_date, response_date, response_owner_id, response_body, callback) => {

  var values = [
    listingId, rating_accuracy, rating_communication, rating_cleanliness, rating_location, rating_checkin, rating_value, review_user_id, review_body, review_date, response_date, response_owner_id, response_body
  ]

  var query = `
    INSERT INTO reviews (listing_id, rating_accuracy, rating_communication, rating_cleanliness, rating_location, rating_checkin, rating_value, review_user_id, review_body, review_date, response_date, response_owner_id, response_body)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);
  `;
  
  client.query( query, values, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      console.log('inserted into db')
      callback(null, results.rows[0]);
    }
  });
};

/***************** READ (GET) *******************************/
var getOverview = (listingId, callback) => {
  var query = `
    SELECT 
      COUNT(listing_id) AS total_reviews,
      AVG(rating_accuracy) AS avg_accuracy,
      AVG(rating_communication) AS avg_communication,
      AVG(rating_cleanliness) AS avg_cleanliness,
      AVG(rating_location) AS avg_location,
      AVG(rating_checkin) AS avg_checkin,
      AVG(rating_value) AS avg_value
    FROM reviews
    WHERE listing_id = ${listingId}
  `;

  client.query(query, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};


var getReviews = (listingId, callback) => {
  var query = `
    SELECT (
      rating_accuracy + rating_communication + rating_cleanliness + rating_location + rating_checkin + rating_value) / 6 AS avg_rating, 
      review_date, 
      users.username,
      review_body,
      response_date AS response_date, 
      host.username AS host_username,
      CONCAT('https://s3.us-east-2.amazonaws.com/hrsf96reviewmodule/', host.profile_pic_id % 100, '.jpg') AS user_pic_url,
      CONCAT('https://s3.us-east-2.amazonaws.com/hrsf96reviewmodule/', host.profile_pic_id % 100, '.jpg') AS host_pic_url,
      response_body 
    FROM reviews 
    JOIN users ON reviews.review_user_id=users.id 
    JOIN users AS host ON reviews.response_owner_id=host.id 
    WHERE listing_id=${listingId};
  `;
  
  client.query( query, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

/***************** UPDATE (PUT) *******************************/

var updateReviews = (reviewId, reviewBody, callback) => {
  var query = `
    UPDATE "reviews" SET review_body='${reviewBody}' WHERE id=${reviewId};  
  `;
  
  console.log(query);
  client.query( query, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

/***************** DELETE (DELETE) *******************************/

var deleteReviews = (reviewId, callback) => {
  var query = `
    DELETE FROM "reviews" WHERE id=${reviewId};
  `;
  
  client.query( query, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.postReviews = postReviews;
module.exports.updateReviews = updateReviews;
module.exports.deleteReviews = deleteReviews;
module.exports.getOverview = getOverview;
module.exports.getReviews = getReviews;