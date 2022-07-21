const Server = require('./server/Server');
const router = require('./src/routes/user_router');

require('dotenv').config();


const PORT = process.env.PORT || 5000;

const server = new Server();

server.addRouter(router);
server.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
});