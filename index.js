// Require the necessary discord.js classes
import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { discordConfig } from "./config.js";

// Replace next-birthday and upcoming-birthdays with next-birthdays
// Create switch command handler and different files
// Create functions for different steps of next-birthday
// Add regex to check name and date format

const birthdays = [
	{ name: "Margaux", date: new Date(2023, 0, 28) },
	{ name: "Chloé", date: new Date(2023, 2, 3) },
	{ name: "Constance", date: new Date(2023, 6, 21) },
	{ name: "Mamou", date: new Date(2023, 5, 12) },
	{ name: "Dadou-patou-badabou", date: new Date(2023, 2, 22) },
	{ name: "Mads", date: new Date(2022, 11, 27) }
]

birthdays.sort(function (a, b) {
	return a.date - b.date;
});

const dateFormat = {
	weekday: 'long',
	day: 'numeric',
	month: 'long'
}

const client = new Client({
	partials: [
	  Partials.Message, // for message
	  Partials.Channel, // for text channel
	  Partials.GuildMember, // for guild member
	  Partials.Reaction, // for message reaction
	  Partials.GuildScheduledEvent, // for guild events
	  Partials.User, // for discord user
	  Partials.ThreadMember, // for thread member
	],
	intents: [
	  GatewayIntentBits.Guilds, // for guild related things
	  GatewayIntentBits.GuildMembers, // for guild members related things
	  GatewayIntentBits.GuildBans, // for manage guild bans
	  GatewayIntentBits.GuildEmojisAndStickers, // for manage emojis and stickers
	  GatewayIntentBits.GuildIntegrations, // for discord Integrations
	  GatewayIntentBits.GuildWebhooks, // for discord webhooks
	  GatewayIntentBits.GuildInvites, // for guild invite managing
	  GatewayIntentBits.GuildVoiceStates, // for voice related things
	  GatewayIntentBits.GuildPresences, // for user presence things
	  GatewayIntentBits.GuildMessages, // for guild messages things
	  GatewayIntentBits.GuildMessageReactions, // for message reactions things
	  GatewayIntentBits.GuildMessageTyping, // for message typing things
	  GatewayIntentBits.DirectMessages, // for dm messages
	  GatewayIntentBits.DirectMessageReactions, // for dm message reaction
	  GatewayIntentBits.DirectMessageTyping, // for dm message typinh
	  GatewayIntentBits.MessageContent, // enable if you need message content things
	],
});

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'next-birthday') {
		await interaction.reply(`${birthdays[0].name}'s birthday is coming up on ${birthdays[0].date.toLocaleDateString('en-us', dateFormat)}!`);
	} else if (commandName === 'upcoming-birthdays') {
		await interaction.reply(`Here are the next three server birthdays! \n- ${birthdays[0].name}'s birthday on ${birthdays[0].date.toLocaleDateString('en-us', dateFormat)} \n- ${birthdays[1].name}'s birthday on ${birthdays[1].date.toLocaleDateString('en-us', dateFormat)} \n- ${birthdays[2].name}'s birthday on ${birthdays[2].date.toLocaleDateString('en-us', dateFormat)}`);
	} else if (commandName === 'add-birthday') {
		await interaction.reply({ content: "Let's register a new birthday! What's the person's name? (You can use their username if you'd like)" })
		.then(() => {
			const filter = m => interaction.user.id == m.author.id;
			interaction.channel.awaitMessages({ filter, max: 1, time: 10000, errors: ['time'] })
			.then(collected => {
				const name = collected.first().content;
				const today = new Date();
				interaction.followUp(`Awesome! When is ${name}'s birthday? (Please use format DD/MM – for example, April 2nd is 02/04)`)
				.then(() => {
					interaction.channel.awaitMessages({ filter, max: 1, time: 10000, errors: ['time'] }).then(collected => {
						const dateInput = collected.first().content;
						const dateArray = dateInput.split("/");
						const birthdayDay = Number(dateArray[0]);
						const birthdayMonth = Number(dateArray[1] - 1);
						const currentMonth = today.getMonth();
						let year = today.getFullYear();
						if(birthdayMonth < currentMonth || birthdayMonth == currentMonth && birthdayDay <= today.getDate()) {
							year++;
						}
						console.log(dateArray);
						console.log(birthdayDay);
						console.log(birthdayMonth);
						console.log(year);
						interaction.followUp(`Perfect! So you want me to add ${name}'s birthday on ${dateInput}, is that correct? (Please reply with "yes" or "no")`);
					})
					.catch(collected => {
						interaction.followUp("The date you entered isn't valid! Please use format DD/MM!");
					});
				});
			})
			.catch(collected => {
				interaction.followUp("The name you entered isn't valid! Please only use letters and numbers!");
			});
		});
    }
});

client.login(discordConfig.token);