const express = require('express');
const server = express();

const port = process.env.PORT || 9000;

server.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});

module.exports = server
