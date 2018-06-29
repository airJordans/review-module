/************************************** CREATE TABLE CASSANDRA ************************************/
-- How to run (in directory where cql table schema is contained): source 'db_schema.cql';

DROP KEYSPACE IF EXISTS project_nomad_reviews;

CREATE KEYSPACE project_nomad_reviews WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };

USE project_nomad_reviews;

CREATE TABLE reviews (
  reviews_id INT,
  listing_id INT,
   
  username TEXT,
  host_username TEXT,
  profile_pic_id INT,
  rating_accuracy INT,
  rating_communication INT,
  rating_cleanliness INT,
  rating_location INT,
  rating_checkin INT,
  rating_value INT,
  avg_rating INT,

  review_user_id INT,
  review_body TEXT,
  review_date TEXT,

  response_date TEXT,
  response_owner_id INT,
  response_body TEXT,

  PRIMARY KEY (listing_id, reviews_id) 
);
-- single write speeds

/************************************** INSERT CSV TO CASSANDRA ************************************/
/* COPY reviews (reviews_id,
    listing_id,
    username,
    host_username,
    profile_pic_id,
    rating_accuracy,
    rating_communication,
    rating_cleanliness,
    rating_location,
    rating_checkin,
    rating_value,
    avg_rating,
    review_user_id,
    review_body,
    review_date,
    response_date,
    response_owner_id,
    response_body)
FROM
    '/Users/Kianna/Desktop/review-module/database/cassandra/sample_data_cql/reviews_sample.csv' WITH HEADER = TRUE;
*/