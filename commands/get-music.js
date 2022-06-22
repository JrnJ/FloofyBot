const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    GetMusic
} = require('../MusicPlayer.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('get-music')
        .setDescription('Presents all music'),
    async execute(interaction) {

        GetMusic();
        await interaction.reply("Gatherd Music");
    },
};