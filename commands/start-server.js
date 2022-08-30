const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    Server,
    StartServer
} = require('../Server.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start-server')
        .setDescription('Starts a server'),
    async execute(interaction) {
        StartServer();
    },
};