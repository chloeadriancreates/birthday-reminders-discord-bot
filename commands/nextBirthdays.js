import { verboseDateFormat } from '../variables/dateFormats.js'

export async function nextBirthdays(interaction, birthdays) {
	const birthday1Name = birthdays[0].name;
	const birthday1Date = birthdays[0].date.toLocaleDateString('en-us', verboseDateFormat);
	const birthday2Name = birthdays[1].name;
	const birthday2Date = birthdays[1].date.toLocaleDateString('en-us', verboseDateFormat);
	const birthday3Name = birthdays[2].name;
	const birthday3Date = birthdays[2].date.toLocaleDateString('en-us', verboseDateFormat);

	await interaction.reply(`Here are the next three server birthdays! \n- ${birthday1Name}'s birthday on ${birthday1Date} \n- ${birthday2Name}'s birthday on ${birthday2Date} \n- ${birthday3Name}'s birthday on ${birthday3Date}`);
};