const server = require('./server');

const port = 5000;
server.listen(port, () => console.log(`\n** The API is listening on port ${port} **\n`));