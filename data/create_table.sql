create table photos (
  id serial primary key,
  url varchar(1000),
  description varchar(4000),
  user_id int,
  country_code varchar(5),
  visit_date date
);

create table users (
  id serial primary key,
  username varchar(50),
  password varchar(4000),
  email varchar(50)
);

create index photos_user_id_idx on photos (
  user_id
);

create table sessions (
  id varchar(1000) primary key,
  user_id int
);