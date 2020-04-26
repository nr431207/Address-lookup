DROP DATABASE IF EXISTS diary;
    CREATE DATABASE diary;
    USE diary;
       
    CREATE TABLE diary-content (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      title varchar(45)
      content varchar(1000)
      creation-date datetime
    );
