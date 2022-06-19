const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    SetVolume
} = require('../MusicPlayer.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-volume')
        .setDescription('Set music volume')
        .addStringOption(option =>
            option.setName('volume')
            .setDescription('Volume')
            .setRequired(true)),
    async execute(interaction) {

        if (interaction.member.voice.channel != null) {

            const term = interaction.options.getString('volume');
            const path = new URLSearchParams({
                term
            });

            const volume = term > 1 ? 1 : term;
            SetVolume(volume);

            await interaction.reply("Volume Set");
        } else {
            await interaction.reply("User is not connect to a voice channel!");
        }
    },
};