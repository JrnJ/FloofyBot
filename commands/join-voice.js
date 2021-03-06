const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    JoinVoiceChannel
} = require('../MusicPlayer.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join-voice')
        .setDescription('Joins the Voice Channel'),
    async execute(interaction) {

        if (interaction.member.voice.channel != null)
        {
            JoinVoiceChannel(interaction.member.voice.channel.id, interaction.guild.id, interaction.guild.voiceAdapterCreator); 
    
            await interaction.reply("Connected to voice channel!");
        }
        else {
            await interaction.reply("User is not connect to a voice channel!");
        }
    },
};