const {
    SlashCommandBuilder
} = require('@discordjs/builders');

// const {
//     Net
// } = require('node:net')

const Net = require('node:net');

const port = 18600;
const ip = '127.0.0.1';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start-server')
        .setDescription('Starts a server'),
    async execute(interaction) {

        // Create Server
        const server = new Net.createServer((client) => {
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

        // The server listens to a socket for a client to make a connection request.
        // Think of a socket as an end point.
        server.listen(port, ip, () => {
            console.log(`Server listening on ${ip}:${port}`);
        });

        // Catch Data
        server.on('data', (data) => {
            console.log(data);
        });

        // Catch Errors
        server.on('error', (err) => {
            console.log(err);
        });
    },
};