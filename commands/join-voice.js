const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    joinVoiceChannel
} = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('join-voice')
        .setDescription('Joins the Voice Channel'),
    async execute(interaction) {

        if (interaction.member.voice.channel != null)
        {
            const connection = joinVoiceChannel({
                channelId: interaction.member.voice.channel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });
    
            await interaction.reply("Connected to voice channel!");
        }
        else {
            await interaction.reply("User is not connect to a voice channel!");
        }
    },
};