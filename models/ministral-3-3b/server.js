# server.js
const path = require('path');
const app = require('./app');
const PORT = 3000;

app.get('/api/greet', (req, res) => {
    res.status(200).json({ message: "Hello Self-Hosted AI" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});