const { SlashCommandBuilder } = require('@discordjs/builders');

const MochiGifUrls = [
    "https://tenor.com/view/rawr-roar-cute-rawr-kawaii-rawr-cute-gif-16986104", // Rawr
    "https://tenor.com/view/hewwo-gif-23831001", // Hello
    "https://tenor.com/view/puffybear-puffy-cute-lol-happy-gif-12628636", // Hahaha Chair Fall
    "https://tenor.com/view/peach-peach-and-goma-peach-cat-cute-cat-cry-gif-21391422", // Sad With Fish
    "https://tenor.com/view/i-win-you-lose-mochi-moc-mochi-peach-cat-gif-24896908", // I Win
    "https://tenor.com/view/excited-spin-yayy-cat-peachcat-gif-22146929", // Yay dance
    "https://tenor.com/view/rosy-cheeks-mochi-peach-mochi-cat-cute-kitty-peach-cat-gif-16992600", // Im baby
    "https://tenor.com/view/moshi-sleep-gif-23958691", // Sleep
    "https://tenor.com/view/mochi-mochi-peach-cat-heart-twitching-ears-cat-love-gif-17152637", // Love
    "https://tenor.com/view/kawaii-cute-peach-cat-gif-23743858", // Cute twinkle eyes
    "https://tenor.com/view/mudoh-gif-22823658", // Pan Chase
    "https://tenor.com/view/rosycheeks-approved-i-approve-well-done-good-job-gif-16996150", // Spinning thumbs
    "https://tenor.com/view/mochi-mochimochi-gif-25099262", // Eating fish
    "https://tenor.com/view/oh-yeah-mochi-peach-cat-corean-gif-24678746", // oh yeah
];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mochi')
		.setDescription('Sends a random Mochi gif!'),
	async execute(interaction) {
		await interaction.reply("" + MochiGifUrls[(Math.floor(Math.random() * MochiGifUrls.length))]); 
	},
};