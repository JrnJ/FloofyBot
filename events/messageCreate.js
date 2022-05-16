class Conversation {
    constructor(userId, type) {
        this.userId = userId;
        this.type = type;
    }
};

// Conversation Types
const ConversationType = {
    None: 0,
    AskedMood: 1,
    AskedForHelp: 2
}

const {
    clientId,
    bannedChannels,
    bannedUsers,
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

        // Check banned channels
        for (let i = 0; i < bannedChannels.length; i++) {
            if (message.channel == bannedChannels[i]) {
                return;
            }
        }

        // Check banned users
        for (let i = 0; i < bannedUsers.length; i++) {
            if (message.author.id == bannedUsers[i]) {
                return;
            }
        }

        const parsedMessage = message.content.toLowerCase();
        let newMessage = '';
        let hasConversation = false;

        if (isChattingWith.length > 0) {

            for (let i = 0; i < isChattingWith.length; i++) {
                if (isChattingWith[i].userId === message.author.id) {
                    hasConversation = true;

                    // Order on enum order
                    switch (isChattingWith[i].type) {
                        case ConversationType.None:
                            break;
                        case ConversationType.AskedMood:
                            // Get Users Mood on reply ^
                            if (parsedMessage.includes('good') || parsedMessage.includes('great') || parsedMessage.includes('amazing') || parsedMessage.includes('fenominal')) {
                                message.channel.send("I love to hear that!");
                                isChattingWith[i].type = ConversationType.None;
                            }

                            if (parsedMessage.includes('fine') || parsedMessage.includes('okay')) {
                                message.channel.send("Good to hear!");
                                isChattingWith[i].type = ConversationType.None;
                            }

                            if (parsedMessage.includes('bad')) {
                                message.channel.send("Aw, anything I can help with?");
                                isChattingWith[i].type = ConversationType.AskedForHelp;
                            }

                            break;
                        case ConversationType.AskedForHelp:
                            if (YesNoQuestion(parsedMessage)) {
                                message.channel.send("Maybe the /mochi command can cheer you up!");
                            } else {
                                message.channel.send("Okie, I'm here if you need a big hug!");
                            }

                            isChattingWith[i].type = ConversationType.None;
                            break;
                        case ConversationType.AskedForHelpConfirmed:
                            break;
                    }

                    // Stop Conversation
                    if (parsedMessage.includes('bye floofy')) {
                        StopConversation(message);
                    }

                    // Other
                    if (parsedMessage.includes('how are you')) {
                        message.channel.send(GetFloofyMood());
                        isChattingWith[i].type = ConversationType.AskedMood;
                    }

                    // Asked for activity

                    // Ask for game
                    if (parsedMessage.includes('play') && parsedMessage.includes('game')) {
                        message.channel.send('Yes! Choose a game and I will destr... play with you! ^^\n[INFO] There are sadly no games atm :(');
                    }

                    // Ask for a hug
                    if (parsedMessage.includes('hug')) {
                        message.reply('https://tenor.com/view/hugs-sending-virtual-hugs-loading-gif-8158818');
                    }

                    // User thanks
                    if (parsedMessage.includes('thank')) {
                        if (parsedMessage.includes('thanks') || parsedMessage.includes('you')) {
                            message.channel.send('No problem ^^');
                        }
                    }
                }
            }
        }

        if (parsedMessage.includes('floofy')) {

            // <Mood> //
            if (parsedMessage.includes('bad floofy')) {
                newMessage += "I'm sowwy :(";
            }

            if (parsedMessage.includes('good floofy')) {
                newMessage += "Yay! Thank you ^^";
            }

            if (parsedMessage.includes('i love you')) {
                switch (Math.floor(Math.random() * (2 - 0))) {
                    case 0:
                        newMessage += "Aww, I love you too <3";
                        break;
                    case 1:
                        newMessage += "I love you even more ^^";
                        break;
                }
            }
            // </Mood> //


            // <Vibes> //
            if (parsedMessage.includes('do you love me')) {
                newMessage += "I weawwy love you!";
            }

            if (parsedMessage.includes('goodnight ')) {
                newMessage += "Sleep happy!";
            }
            // </Vibes> //

            // <Questions> //
            if (parsedMessage.includes('bedtime')) {
                newMessage += "I sleep from <t:1652650200:t> till <t:1652603400:t>";
            }
            // </Questions> //

            // <Other> //
            if (parsedMessage.includes('thanks ')) {
                newMessage += "No problem ^^";
            }
            // </Other> //


            // Start a conversation with floofy
            if (parsedMessage.includes('hewwo ') || parsedMessage.includes('hello ') || parsedMessage.includes('hi ') || parsedMessage.includes('hey ')) {
                newMessage += "Hewwo fwiend :D\n";

                AddConversation(message);
            }

            if (parsedMessage.includes('who is floofy')) {
                message.channel.send('I\'m a fluffy bot made by **Jeroen** for the purpose of bringing happiness and good vibes!'); // #7522
            }

            if (parsedMessage.includes('how are you') && !hasConversation) {
                newMessage += "I am fluffy as always! How about you ^-^";

                AddConversation(message);

                // Add conversationtype
                for (let i = 0; i < isChattingWith.length; i++) {
                    if (isChattingWith[i].userId == message.author.id) {
                        isChattingWith[i].type = ConversationType.AskedMood;
                    }
                }
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
        } else {
            if (parsedMessage == "<@969258604844711976>") {
                message.channel.send("Floofy is here for you!");
            }
        }

        // Send Final Message
        if (newMessage != '') {
            message.channel.send(newMessage);
        }
        /*else {
                   // Add to file
                   const fs = require('fs');

                   fs.appendFile('./data/floofymentions.txt', (message.author.id + ': ' + parsedMessage + '\n'), error => {
                       if (error) {
                           console.error(error);
                       }
                   });
               }*/
    },
};

function AddConversation(message) {

    let isAlreadyPresent = false;

    if (isChattingWith.length > 0) {

        for (let i = 0; i < isChattingWith.length; i++) {
            if (isChattingWith[i].userId === message.author.id) {
                isAlreadyPresent = true;
                break;
            }
        }
    }

    // Add User
    if (!isAlreadyPresent) {
        isChattingWith.push(new Conversation(message.author.id, ""));
        message.channel.send("You can end our conversation with, `bye floofy`\n");
    }
}

function StopConversation(message) {
    if (isChattingWith.length > 0) {
        for (let i = 0; i < isChattingWith.length; i++) {
            if (isChattingWith[i].userId === message.author.id) {
                isChattingWith.splice(i, 1);
                switch (Math.floor(Math.random() * (3 - 0))) {
                    case 0:
                        message.channel.send("Good bye fwiend!");
                        break;
                    case 1:
                        message.channel.send("It was lovely chatting with you! Byee <3");
                        break;
                    case 2:
                        message.channel.send("Goodbye, we should talk again some time ^^");
                        break;
                }

                break;
            }
        }
    }
}

function YesNoQuestion(message) {
    if (message.includes('yes') || message.includes('sure') || message.includes('okay')) {
        return true;
    } else {
        return false;
    }
}

function GetFloofyMood() {
    return 'I am fluffy as always! How about you ^-^';
}