import { mediumDateFormat } from '../variables/dateFormats.js'

export function nextBirthdays(interaction, birthdays) {
	let reply;

	switch(birthdays.length) {
		case 0:
			reply = "No birthdays have been configured for this server. You can use /add-birthday to add some!";
			break;
		case 1:
			reply = `Here is the next server birthday! \n- ${birthdays[0].name}: ${birthdays[0].date.toLocaleDateString('en-us', mediumDateFormat)}`;
			break;
		case 2:
			reply = `Here are the next server birthdays! \n- ${birthdays[0].name}: ${birthdays[0].date.toLocaleDateString('en-us', mediumDateFormat)} \n- ${birthdays[1].name}: ${birthdays[1].date.toLocaleDateString('en-us', mediumDateFormat)}`;
			break;
		default:
			reply = `Here are the next server birthdays! \n- ${birthdays[0].name}: ${birthdays[0].date.toLocaleDateString('en-us', mediumDateFormat)} \n- ${birthdays[1].name}: ${birthdays[1].date.toLocaleDateString('en-us', mediumDateFormat)} \n- ${birthdays[2].name}: ${birthdays[2].date.toLocaleDateString('en-us', mediumDateFormat)}`
			break;
	}

	interaction.reply(reply);
};