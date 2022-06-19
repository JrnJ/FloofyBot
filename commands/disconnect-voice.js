const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    getVoiceConnection
} = require('@discordjs/voice');
const {
    DisconnectFromVoiceChannel
} = require('../MusicPlayer.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('disconnect-voice')
        .setDescription('Disconnects from the Voice Channel'),
    async execute(interaction) {

        if (interaction.member.voice.channel != null) {

            DisconnectFromVoiceChannel(interaction.guild.id);
            await interaction.reply("Disconnected from voice channel!");

            //const connection = getVoiceConnection(interaction.guild.id);
            

            // if (connection != null) {
            //     connection.destroy();
                
            // } else {
            //     await interaction.reply("Not connected to a voice channel!");
            // }
        }
        else {
            await interaction.reply("You have to be in a voice channel to use this command!");
        }
    },
};