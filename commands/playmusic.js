const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    getVoiceConnection,
    createAudioPlayer,
    NoSubscriberBehavior,
    createAudioResource,
    StreamType
} = require('@discordjs/voice');
const {
    createReadStream
} = require('node:fs');
const {
    join
} = require('node:path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play-music')
        .setDescription('Plays music')
        .addStringOption(option =>
            option.setName('path')
            .setDescription('Song Path')
            .setRequired(true)),
    async execute(interaction) {

        if (interaction.member.voice.channel != null) {

            const audioPlayer = createAudioPlayer({
                behaviors: {
                    noSubscriber: NoSubscriberBehavior.Pause,
                },
            });

            const term = interaction.options.getString('path');
            const path = new URLSearchParams({
                term
            });

            const connection = getVoiceConnection(interaction.guild.id);
            const resource = createAudioResource(join("D:/Music/", path.get("term")), {
                inlineVolume: true
            });

            audioPlayer.play(resource);

            connection.subscribe(audioPlayer);

            await interaction.reply("Playing music");
        } else {
            await interaction.reply("User is not connect to a voice channel!");
        }
    },
};