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
const fs = require('node:fs');
const {
    readdirSync
} = require('node:fs');
const {
    musicFolderPath
} = require('./config.json');

const AudioPlayer = createAudioPlayer({
    behaviors: {
        noSubscriber: NoSubscriberBehavior.Pause,
    }
});

class Song {
    constructor(path, name) {
        this.path = path; // Path uses config.json->
        this.name = name; // Name is without .mp3
    }
};

let Resource;
let Volume = 0.05;
let Songs = [];

function Play(path) {
    // Stop Player First
    Stop();

    // Set Resource
    Resource = createAudioResource(join(musicFolderPath, path), {
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

function GetMusic() {
    let contents = fs.readdirSync(musicFolderPath);

    Songs = [];

    // Could use a forEach, but I dont like those lol
    while (contents.length > 0) {
        if (contents[0].includes('.')) {
            contents.splice(0, 1);
        } else {
            // Get all folders and add them to folders

            const musicFiles = fs.readdirSync(join(musicFolderPath, contents[0]));

            for (let i = 0; i < musicFiles.length; i++) {
                if (musicFiles[i].includes('.')) {
                    // Its a file
                    if (musicFiles[i].includes('.mp3')) {
                        Songs.push(new Song(join(contents[0], musicFiles[i]), musicFiles[i].split('.mp3')[0]));
                    }
                    // else do nothing atm
                } else {
                    // Its a folder
                    contents.push(join(contents[0], musicFiles[i]));
                }
            }

            contents.splice(0, 1);
        }
    }
}

function SearchSong(value) {
    const words = value.toLowerCase().split(' ');
    // let participants = [];

    let occurences = Array(Songs.length).fill(0);

    // Loop through songs
    for (let i = 0; i < Songs.length; i++) {
        // Loop through words
        for (let j = 0; j < words.length; j++) {
            // Check if Song.name contains the word
            if (Songs[i].name.toLowerCase().includes(words[j])) {

                occurences[i] += 1;
                // let foundSong = false;
                // for (let k = 0; k < participants.length; k++) {
                //     console.log('uhhhh');

                //     if (participants[k].id == i) {
                //         foundSong = true;
                //         console.log('hello');
                //         participants[k].occurences += 1;
                //     }
                // }

                // if (foundSong == false) {
                //     const dict = {
                //         id: i,
                //         occurences: 1
                //     };
                //     participants.push(dict);
                // }

                // if (!participants.includes(i)) {
                //     participants.push(i);
                // }
            } else {
                // Maybe check if word is close but for now do nothing
            }
        }
    }

    let finalSongId = 0;
    for (let i = 0; i < occurences.length; i++) {
        if (occurences[i] > 0) {
            if (occurences[i] > occurences[finalSongId]) {
                finalSongId = i;
            }
        }
    }

    return finalSongId;
}

function SearchAndPlay(value) {
    const songId = SearchSong(value);

    if (songId != 0) {
        Play(Songs[songId].path);
        return 'Now Playing: ' + Songs[songId].name;
    } else {
        return "No songs found";
    }    
}

module.exports.AudioPlayer = AudioPlayer;
module.exports.Song = Song;

module.exports.Volume = Volume;
module.exports.Resource = Resource;

module.exports.Play = Play;
module.exports.SearchAndPlay = SearchAndPlay;
module.exports.Pause = Pause;
module.exports.Resume = Resume;
module.exports.Stop = Stop;

module.exports.SetVolume = SetVolume;

module.exports.JoinVoiceChannel = JoinVoiceChannel;
module.exports.DisconnectFromVoiceChannel = DisconnectFromVoiceChannel;
module.exports.IsBotInChannel = IsBotInChannel;

module.exports.GetMusic = GetMusic;
module.exports.SearchSong = SearchSong;