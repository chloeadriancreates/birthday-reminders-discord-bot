import { Client } from 'discord.js';
import { discordConfig } from "./config.js";
import { clientOptions } from './variables/clientOptions.js';
import { birthdays, sortBirthdays } from './variables/birthdays.js';
import { nextBirthdays } from './commands/nextBirthdays.js';
import { addBirthday } from './commands/addBirthday.js';

// Create functions for different steps of addBirthday
// Add regex to check name and date format
// Put birthdays in separate file
// Add birthday to birthday array
// Make it so bots aren't allowed to use commands

const client = new Client(clientOptions);

client.once('ready', () => {
	sortBirthdays();
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) {
		return;
	}
	const { commandName } = interaction;

	switch(commandName) {
		case 'next-birthdays':
			nextBirthdays(interaction, birthdays);
			break;
		case 'add-birthday':
			addBirthday(interaction);
			break;
	}
});

client.login(discordConfig.token);