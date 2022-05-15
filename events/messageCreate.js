const {
    clientId,
    bannedChannels,
    ownerId
} = require('../config.json');

// Container of user id's the bot is having a conversation with
let isChattingWith = [];

module.exports = {
    name: 'messageCreate',
    execute(message) {
        // Check if message is not from bot themself
        if (message.author.id == clientId) {
            return;
        }

        for (let i = 0; i < bannedChannels.length; i++) {
            if (message.channel == bannedChannels[i]) {
                return;
            }
        }

        const parsedMessage = message.content.toLowerCase();
        let newMessage = '';
        let hasConversation = false;

        if (isChattingWith.length > 0) {

            for (let i = 0; i < isChattingWith.length; i++) {
                if (isChattingWith[i] === message.author.id) {
                    hasConversation = true;

                    if (parsedMessage.includes('how are you')) {
                        message.channel.send("I am fluffy as always! How about you ^-^");
                    }

                    // Get Users Mood on reply ^
                    if (parsedMessage.includes('good') || parsedMessage.includes('great') || parsedMessage.includes('amazing') || parsedMessage.includes('fenominal')) {
                        message.channel.send("I love to hear that!");
                    }

                    if (parsedMessage.includes('fine') || parsedMessage.includes('okay')) {
                        message.channel.send("Good to hear!");
                    }

                    if (parsedMessage.includes('bad')) {
                        message.channel.send("Aw, anything I can help with?");
                    }
                }
            }
        }

        if (parsedMessage.includes('floofy')) {

            // Stop Conversation
            if (parsedMessage.includes('bye')) {
                StopConversation(message);
            }

            // Start a conversation with floofy
            if (parsedMessage.includes('hewwo') || parsedMessage.includes('hello') || parsedMessage.includes('hi') || parsedMessage.includes('hey')) {
                newMessage += "Hewwo fwiend :D\n";

                AddConversation(message);
            }

            if (parsedMessage.includes('who is floofy')) {
                message.channel.send('I\'m a fluffy bot made by **Jeroen** for the purpose of bringing happiness and good vibes!'); // #7522
            }

            if (parsedMessage.includes('how are you') && !hasConversation) {
                newMessage += "I am fluffy as always! How about you ^-^";

                AddConversation(message.author.id);
            }

            if (parsedMessage.includes('come here')) {
                newMessage += "Where O.O";
            }

            if (parsedMessage.includes('come here')) {
                newMessage += "Where O.O";
            }

            if (parsedMessage.includes('i wouwd love for you to encouwage me for my test tomowwow')) {
                newMessage += "Vaitzy waitzy you got this in the bag!\nYou can dowo this and will get a vewwy good gwade tomowwow. Twust mwe :D";
            }

            // Also check if right is before or after floofy
            if (parsedMessage.includes('right')) {
                newMessage += "Yes :D";
            }
        }

        if (parsedMessage == "<@969258604844711976>") {
            message.channel.send("Floofy is here for you!");
        }

        // Send Final Message
        if (newMessage != '') {
            message.channel.send(newMessage);
        } else {
            // Add to file
            const fs = require('fs');

            fs.writeFile('../data/floofymentions.txt', (message.author.id + ': ' + parsedMessage), error => {
                if (error) {
                    console.error(error);
                }
            });
        }
    },
};

function AddConversation(message) {

    let isAlreadyPresent = false;

    if (isChattingWith.length > 0) {

        for (let i = 0; i < isChattingWith.length; i++) {
            if (isChattingWith[i] === message.author.id) {
                isChattingWith = true;
                break;
            }
        }
    }

    // Add User
    if (!isAlreadyPresent) {
        isChattingWith.push(message.author.id);
        message.channel.send("You can end our conversation with, bye floofy\n");
    }
}

function StopConversation(message) {
    if (isChattingWith.length > 0) {
        for (let i = 0; i < isChattingWith.length; i++) {
            if (isChattingWith[i] === message.author.id) {
                isChattingWith.splice(i, 1);
                message.channel.send("Good bye!");
                break;
            }
        }
    }
}