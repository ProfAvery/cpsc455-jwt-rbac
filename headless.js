#!/usr/bin/env node

const fs = require('fs')
const os = require('os')

const express = require('express')
const bcrypt = require('bcrypt')

const Database = require('better-sqlite3')

const PORT = 8080
const DB_FILE = './news.db'
const DB_SQL = './news.sql'

const app = express()

app.use(express.static('static'))
app.use(express.json())

app.get('/', (req, res) => {
  res.redirect('/news.html')
})

const db = new Database(DB_FILE, {
  verbose: (sql) => console.log(sql.trim().replace(/\s+/g, ' '))
})
db.pragma('foreign_keys = ON')

app.get('/posts', (req, res) => {
  const stmt = db.prepare(`
    SELECT
      username, title, body, dateline
    FROM
      users, posts
    WHERE
      users.id = posts.user_id
    ORDER BY
      dateline DESC
  `)
  res.json(stmt.all())
})

app.post('/posts', (req, res) => {
  const stmt = db.prepare(`
    INSERT INTO posts(user_id, title, body)
    VALUES(:user_id, :title, :body)
  `)
  const info = stmt.run(req.body)
  res.json({
    id: info.lastInsertRowid,
    ...req.body
  })
})

app.put('/posts', (req, res) => {
  const stmt = db.prepare(`
    UPDATE posts
    SET title = :title, body = :body
    WHERE id = :id
  `)
  const info = stmt.run(req.body)
  res.status(info.changes? 200 : 404)
  res.json(req.body)
})

app.delete('/posts', (req, res) => {
  const stmt = db.prepare(`
    DELETE FROM posts
    WHERE id = :id
  `)
  const info = stmt.run(req.body)
  res.status(info.changes? 204 : 404)
  res.send(req.body)
})

app.listen(PORT, () => {
  const stmt = db.prepare(`
    SELECT 1
    FROM sqlite_master
    WHERE type = 'table'
      AND name = 'users'
  `)
  const exists = stmt.get()

  if (!exists) {
    const setup = fs.readFileSync(DB_SQL, { encoding: 'utf-8' })
    db.exec(setup)
  }

  console.log(`Server running at http://${os.hostname()}:${PORT}/`)
})
