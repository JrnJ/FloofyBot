const Net = require('node:net');
const {
    Play,
    Resume,
    Pause
} = require("./MusicPlayer.js");

const port = 18600;
const ip = '127.0.0.1';
let isRunning = false;

// Create Server
let Server;

// Conversation Types
const TCPMessage = {
    Play: 0,
    Resume: 1,
    Pause: 2
}

function StartServer() {
    if (!isRunning) {
        Server = new Net.Server();

        Server = new Net.createServer((client) => {
            // 'connection' listener.
            console.log('Client Connected');

            client.on('end', () => {
                console.log('Client Disconnected');
            });

            client.on('data', (data) => {
                const message = String.fromCharCode(...data);
                const arr = message.split(">");

                console.log(message);
                console.log(arr);
                console.log(parseInt(arr[0]));

                switch(parseInt(arr[0]))
                {
                    case TCPMessage.Play:
                        Play(arr[1]);
                        break;
                    case TCPMessage.Resume:
                        Resume();
                        break;
                    case TCPMessage.Pause:
                        Pause();
                        break;
                    default:
                        console.log("Value not in ENUM");
                        break;
                }
            });

            client.pipe(client);
        });

        // The server listens to a socket for a client to make a connection request.
        // Think of a socket as an end point.
        Server.listen(port, ip, () => {
            console.log(`Server listening on ${ip}:${port}`);
        });

        // Catch Data
        Server.on('data', (data) => {
            console.log(data);
        });

        // Catch Errors
        Server.on('error', (err) => {
            console.log(err);
        });
    }
}






module.exports.Server = Server;
module.exports.StartServer = StartServer;