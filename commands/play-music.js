const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    IsBotInChannel,
    JoinVoiceChannel,
    SearchAndPlay
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

            if (!IsBotInChannel(interaction.guild.id)) {
                JoinVoiceChannel(interaction.member.voice.channel.id, interaction.guild.id, interaction.guild.voiceAdapterCreator); 
            }

            const message = SearchAndPlay(path.get('term'));

            await interaction.reply(message);
        } else {
            await interaction.reply("User is not connect to a voice channel!");
        }
    },
};