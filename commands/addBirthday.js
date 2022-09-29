import { shortDateFormat, mediumDateFormat } from "../variables/dateFormats.js";
import { possessive } from "../variables/possessive.js";
import { birthdays, sortBirthdays } from "../variables/birthdays.js";

const timeLimit = 600_000;
const today = new Date();

async function requestValidation(interaction, name, possessiveName, birthday, filter) {
    const responseMessages = await interaction.channel.awaitMessages({ filter, max: 1, time: timeLimit, errors: ['time'] })
    try {
        const response = responseMessages.first().content;
        
        if(response.toLowerCase().includes("yes")) {
            birthdays.push({
                name: name,
                date: birthday
            });
            sortBirthdays();
            interaction.followUp(`${possessiveName} birthday was added to the calendar. Have a good day!`);
        } else if(response.toLowerCase().includes("no")) {
            interaction.followUp(`${possessiveName} birthday wasn't added to the calendar. Please use /add-birthday if you'd like to try again!`);
        } else {
            interaction.followUp(`Your answer isn't valid! Please try again, using either "yes" or "no"`);
            requestValidation(interaction, name, possessiveName, birthday, filter);
        }
    } catch {
        interaction.followUp("You took too long to reply. Please use /add-birthday if you'd like to try again!");
    }
}

async function requestDate(interaction, name, possessiveName, filter) {
    const dateMessages = await interaction.channel.awaitMessages({ filter, max: 1, time: timeLimit, errors: ['time'] })
    try {
        const date = dateMessages.first().content;
        const regexDate = /^[0-9]{2}\/[0-9]{2}$/;
        
        if(date.match(regexDate)) {
            const dateArray = date.split("/");
            const birthdayDay = Number(dateArray[1]);
            const birthdayMonth = Number(dateArray[0] - 1);
            const currentMonth = today.getMonth();
            let year = today.getFullYear();
            if(birthdayMonth < currentMonth || birthdayMonth == currentMonth && birthdayDay <= today.getDate()) {
                year++;
            }
            const birthday = new Date(year, birthdayMonth, birthdayDay);
            try {
                interaction.followUp(`Perfect! So you want me to add ${possessiveName} birthday on ${birthday.toLocaleDateString('en-US', mediumDateFormat)}, is that correct? (Please reply with "yes" or "no")`)
                requestValidation(interaction, name, possessiveName, birthday, filter);
            } catch {
                interaction.followUp("You took too long to enter a date. Please use /add-birthday if you'd like to try again!");
            }
        } else {
            interaction.followUp(`The date you entered isn't valid! Please try again, using format MM/DD (for example, today is ${today.toLocaleDateString('en-US', shortDateFormat)})`);
            requestDate(interaction, name, possessiveName, filter);
        }
    } catch {
        interaction.followUp("You took too long to enter a date. Please use /add-birthday if you'd like to try again!");
    }
}

async function requestName(interaction) {
    const filter = m => interaction.user.id == m.author.id;
    const nameMessages = await interaction.channel.awaitMessages({ filter, max: 1, time: timeLimit, errors: ['time'] })
    try {
        const regexName = /^[a-zA-ZÀ-ú0-9\s\-_'|,.]*$/;
        const name = nameMessages.first().content;
        const possessiveName = possessive(name);

        if(name.match(regexName)) {
            interaction.followUp(`Awesome! When is ${possessiveName} birthday? (Please use the MM/DD format – for example, today is ${today.toLocaleDateString('en-US', shortDateFormat)})`)
            requestDate(interaction, name, possessiveName, filter);
        } else {
            interaction.followUp("The name you entered isn't valid! Please try again, using letters, numbers, spaces or these specific characters: -_'|,.");
            requestName(interaction);
        }
    } catch {
        interaction.followUp("You took too long to enter a name. Please use /add-birthday if you'd like to try again!");
    }
}

export async function addBirthday(interaction) {
    interaction.reply({ content: "Let's register a new birthday! What's the person's name? (You can use their username if you'd like, but please don't use @ so I don't tag them repeatedly)" })
    requestName(interaction);
}