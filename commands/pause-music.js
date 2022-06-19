const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    Pause
} = require('../MusicPlayer.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause-music')
        .setDescription('Pauses the Music'),
    async execute(interaction) {

        if (interaction.member.voice.channel != null)
        {
            Pause();
    
            await interaction.reply("Music Paused");
        }
        else {
            await interaction.reply("User is not connect to a voice channel!");
        }
    },
};