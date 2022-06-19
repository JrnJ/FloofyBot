const Net = require('node:net');

const port = 18600;
const ip = '127.0.0.1';
let isRunning = false;

// Create Server
let Server = new Net.Server();

function StartServer() {
    console.log("Hello there");

    if (!isRunning) {
        Server = new Net.createServer((client) => {
            // 'connection' listener.
            console.log('Client Connected');

            client.on('end', () => {
                console.log('Client Disconnected');
            });

            client.on('data', (data) => {
                const message = String.fromCharCode(...data);

                // Send to channel
                interaction.channel.send(message);
            });

            client.pipe(client);
        });
    }
}

// The server listens to a socket for a client to make a connection request.
// Think of a socket as an end point.
// Server.listen(port, ip, () => {
//     console.log(`Server listening on ${ip}:${port}`);
// });

// // Catch Data
// Server.on('data', (data) => {
//     console.log(data);
// });

// // Catch Errors
// Server.on('error', (err) => {
//     console.log(err);
// });

module.exports.Server = Server;
module.exports.StartServer = StartServer;