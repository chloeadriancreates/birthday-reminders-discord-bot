import { Client } from 'discord.js';
import { discordConfig } from "./config.js";
import { clientOptions } from './variables/clientOptions.js';
import { birthdays, sortBirthdays } from './variables/birthdays.js';
import { nextBirthdays } from './commands/nextBirthdays.js';
import { addBirthday } from './commands/addBirthday.js';

// Add regex to check name and date format
// Create function to check if last letter is an s
// Finish building addBirthday with copy-paste
// Add birthday to birthday array
// Create functions for different steps of addBirthday
// Attempt to make it completely using async/await
// Attempt to make quick version of add-birthday with parameters?
// Make it so bots aren't allowed to use commands
// Add command to see birthdays per month
// Make bot send reminder a week, three days and the day before a birthday
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