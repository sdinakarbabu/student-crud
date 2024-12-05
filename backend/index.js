const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create a new student
app.post('/students', (req, res) => {
    const { name, roll_number, course } = req.body;
    const query = 'INSERT INTO students (name, roll_number, course) VALUES (?, ?, ?)';
    db.query(query, [name, roll_number, course], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Student added!');
    });
});

// To get all students
app.get('/students', (req, res) => {
    const query = 'SELECT * FROM students';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Update student
app.put('/students/:id', (req, res) => {
    const { id } = req.params;
    const { name, roll_number, course } = req.body;
    const query = 'UPDATE students SET name = ?, roll_number = ?, course = ? WHERE id = ?';
    db.query(query, [name, roll_number, course, id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Student updated!');
    });
});

// Delete student
app.delete('/students/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM students WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Student deleted!');
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
