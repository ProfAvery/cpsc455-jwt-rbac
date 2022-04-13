CREATE TABLE roles(
    id INTEGER PRIMARY KEY,
    name VARCHAR
);

CREATE TABLE users(
    id INTEGER PRIMARY KEY,
    role_id INTEGER NOT NULL REFERENCES roles(id),
    username VARCHAR UNIQUE,
    password VARCHAR
);

CREATE TABLE posts(
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    title VARCHAR,
    body VARCHAR,
    dateline DATE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO roles(id, name) VALUES(1, 'author');
INSERT INTO roles(id, name) VALUES(2, 'moderator');
INSERT INTO roles(id, name) VALUES(3, 'editor');

INSERT INTO users(id, role_id, username, password) -- 'aaa'
VALUES(1, 1, 'alice', '$2b$10$U30rL2laWgtP4dzWHogJnejGwPwtFky4WpWSwd4yqJIYl1V/6AUTq');
INSERT INTO users(id, role_id, username, password) -- 'bbb'
VALUES(2, 1, 'bob', '$2b$10$UKpNo3AlAqCK9LFgdg5D3urQPSYb96s4rTFWpk/Ramq5JM6OyWIOq');
INSERT INTO users(id, role_id, username, password) -- 'ccc'
VALUES(3, 2, 'carol', '$2b$10$ixXHk1vt8wihqeISvCcnVOjnry2XjSH0tJeC8Bo7QTL/cbUIMG6BK');
INSERT INTO users(id, role_id, username, password) -- 'ddd'
VALUES(4, 3, 'dave', '$2b$10$RiZtVw9Zochal3TCNiidcOmMzNykjWbKaPvkPn2cppIa7KnfklUdC');

INSERT INTO posts(user_id, title, body)
VALUES(2, 'Annoy owner until he gives you food', 'Eat owner''s food i love cuddles, ooh, are those your $250 dollar sandals? lemme use that as my litter box for catch small lizards, bring them into house, then unable to find them on carpet.');

INSERT INTO posts(user_id, title, body)
VALUES(1, 'No, you can''t close the door, i haven''t decided whether or not i wanna go out', 'i can haz prance along on top of the garden fence, annoy the neighbor''s dog and make it bark.');
