import { SlashCommandBuilder, Routes } from 'discord.js';
import { REST } from '@discordjs/rest';
import { discordConfig } from './config.js';

const commands = [
	new SlashCommandBuilder().setName('next-birthday').setDescription('Gives you the next server birthday!'),
	new SlashCommandBuilder().setName('upcoming-birthdays').setDescription('Gives you the upcoming 3 birthdays!'),
	new SlashCommandBuilder().setName('add-birthday').setDescription("Prompts you to add someone's birthday to the database!"),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(discordConfig.token);

rest.put(Routes.applicationGuildCommands(discordConfig.clientId, discordConfig.guildId), { body: commands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);