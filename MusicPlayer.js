const {
    joinVoiceChannel,
    getVoiceConnection,
    createAudioPlayer,
    NoSubscriberBehavior,
    createAudioResource
} = require('@discordjs/voice');
const {
    join
} = require('node:path');

const AudioPlayer = createAudioPlayer({
    behaviors: {
        noSubscriber: NoSubscriberBehavior.Pause,
    }
});

let Resource;
let Volume = 0.05;

function Play(path) {
    // Set Resource
    Resource = createAudioResource(join('D:/Music/Anime/Railgun/', path), {
        inlineVolume: true
    });

    // Play Music
    AudioPlayer.play(Resource);
    SetVolume(Volume);
}

function Pause() {
    AudioPlayer.pause();
}

function Resume() {
    AudioPlayer.unpause();
}

function Stop() {
    AudioPlayer.stop();
}

function SetVolume(volume) {
    Volume = volume;
    Resource.volume.setVolume(Volume);
}

function JoinVoiceChannel(channelId, guild, adapter) {
    const connection = joinVoiceChannel({
        channelId: channelId,
        guildId: guild,
        adapterCreator: adapter,
    });

    connection.subscribe(AudioPlayer);
}

function DisconnectFromVoiceChannel(guildId) {
    const connection = getVoiceConnection(guildId);

    connection.destroy();
}

function IsBotInChannel(guildId) {
    const connection = getVoiceConnection(guildId);

    if (connection != null) {
        return true;
    }

    return false;
}

module.exports.AudioPlayer = AudioPlayer;

module.exports.Volume = Volume;
module.exports.Resource = Resource;

module.exports.Play = Play;
module.exports.Pause = Pause;
module.exports.Resume = Resume;
module.exports.Stop = Stop;

module.exports.SetVolume = SetVolume;

module.exports.JoinVoiceChannel = JoinVoiceChannel;
module.exports.DisconnectFromVoiceChannel = DisconnectFromVoiceChannel;
module.exports.IsBotInChannel = IsBotInChannel;