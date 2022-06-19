const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    Resume
} = require('../MusicPlayer.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume-music')
        .setDescription('Resumes the Music'),
    async execute(interaction) {

        if (interaction.member.voice.channel != null)
        {
            // Resume Music
            Resume();
    
            await interaction.reply("Music Resumed");
        }
        else {
            await interaction.reply("User is not connect to a voice channel!");
        }
    },
};