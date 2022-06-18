const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    getVoiceConnection
} = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('disconnect-voice')
        .setDescription('Disconnects from the Voice Channel'),
    async execute(interaction) {

        if (interaction.member.voice.channel != null) {
            const connection = getVoiceConnection(interaction.guild.id);

            if (connection != null) {
                connection.destroy();
                await interaction.reply("Disconnected from voice channel!");
            } else {
                await interaction.reply("Not connected to a voice channel!");
            }
        }
        else {
            await interaction.reply("You have to be in a voice channel to use this command!");
        }
    },
};