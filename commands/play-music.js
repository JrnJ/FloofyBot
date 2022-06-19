const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    Play
} = require('../MusicPlayer.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play-music')
        .setDescription('Plays music')
        .addStringOption(option =>
            option.setName('song')
            .setDescription('Song')
            .setRequired(true)),
    async execute(interaction) {

        if (interaction.member.voice.channel != null) {

            const term = interaction.options.getString('song');
            const path = new URLSearchParams({
                term
            });

            Play(path.get('term'));

            await interaction.reply("Playing music");
        } else {
            await interaction.reply("User is not connect to a voice channel!");
        }
    },
};