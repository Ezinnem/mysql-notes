const express = require('express');
const app = express();
const routes = require('./routes/note-route');
const cors = require('cors');

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(routes);


// PORT
const PORT = process.env.PORT || 1995;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});