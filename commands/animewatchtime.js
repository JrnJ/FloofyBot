const {
	SlashCommandBuilder
} = require('@discordjs/builders');
// const {
// 	MessageEmbed
// } = require('discord.js')
// const {
// 	request
// } = require('undici');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('animewatchtime')
		.setDescription('Get watchtime from MAL')
		.addStringOption(option =>
            option.setName('username')
                .setDescription('MAL account name')
                .setRequired(true)),

	async execute(interaction) {

		const term = interaction.options.getString('username');
		const query = new URLSearchParams({
			term
		});

		console.log(query);
		await interaction.deferReply();

        // interaction.editReply(interaction.option[0]); //
    },
};
/*
		const term = interaction.options.getString('term');
		const query = new URLSearchParams({
			term
		});

		const dictResult = await request(`https://api.urbandictionary.com/v0/define?${query}`);
		const {
			list
		} = await getJSONResponse(dictResult.body);

		if (!list.length) {
			return interaction.editReply(`No results found for **${term}**.`);
		}

		const [answer] = list;

		const embed = new MessageEmbed()
			.setColor('#EFFF00')
			.setTitle(answer.word)
			.setURL(answer.permalink)
			.addFields({
				name: 'Definition',
				value: trim(answer.definition, 1024)
			}, {
				name: 'Example',
				value: trim(answer.example, 1024)
			}, {
				name: 'Rating',
				value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.`,
			}, );
		interaction.editReply({
			embeds: [embed]
		});*/

/*
const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);


async function getJSONResponse(body) {
	let fullBody = '';

	for await (const data of body) {
		fullBody += data.toString();
	}

	return JSON.parse(fullBody);
}*/