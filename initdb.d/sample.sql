DROP DATABASE IF EXISTS sample_db;
CREATE DATABASE sample_db;
USE sample_db;

DROP TABLE IF EXISTS sample_data;

CREATE TABLE sample_data
(
  id           INT(10),
  sample_data  VARCHAR(40)
);

INSERT INTO sample_data (id, sample_data) VALUES (1, "sample data 1");
INSERT INTO sample_data (id, sample_data) VALUES (2, "sample data 2");
