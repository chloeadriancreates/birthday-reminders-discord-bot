import { Client } from 'discord.js';
import { discordConfig } from "./config.js";
import { clientOptions } from './variables/clientOptions.js';
import { birthdays, sortBirthdays } from './variables/birthdays.js';
import { nextBirthdays } from './commands/nextBirthdays.js';
import { addBirthday } from './commands/addBirthday.js';

// Add options to modify either field at last step in addBirthday (maybe)
// Add an option if there are less than three birthdays or no birthdays at all in nextBirthdays
// Make nextBirthdays less verbose
// I do think using a database would be smarter (maybe look into MongoDB)
// Attempt to make quick version of addBirthday with parameters?
// Make it so bots aren't allowed to use commands
// Add command to see birthdays per month
// Make bot send reminder a week, three days and the day before a birthday
// At some point, should check filter in addBirthday() is working even if someone else sends a message in the meantime
// Check permissions and partials

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