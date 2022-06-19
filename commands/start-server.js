const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    Server,
    StartServer
} = require('../Server.js');

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
        StartServer();
    },
};