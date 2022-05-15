const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Performs a test command, can be anything :D'),
	async execute(interaction) {
		await interaction.reply('Boop!');
	},
};