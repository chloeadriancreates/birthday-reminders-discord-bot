import { shortDateFormat, mediumDateFormat } from "../variables/dateFormats.js";
import { possessive } from "../variables/possessive.js";

export async function addBirthday(interaction) {
    await interaction.reply({ content: "Let's register a new birthday! What's the person's name? (You can use their username if you'd like, but please don't use @ so I don't tag them repeatedly)" })
    .then(() => {
        const filter = m => interaction.user.id == m.author.id;
        interaction.channel.awaitMessages({ filter, max: 1, time: 10000, errors: ['time'] })
        .then(collected => {
            const regexName = /^[a-zA-ZÀ-ú0-9\s\-_'|,.]*$/;
            const name = collected.first().content;
            const today = new Date();
            const possessiveName = possessive(name);

            if(name.match(regexName)) {
                interaction.followUp(`Awesome! When is ${possessiveName} birthday? (Please use the MM/DD format – for example, today is ${today.toLocaleDateString('en-US', shortDateFormat)})`)
                .then(() => {
                    interaction.channel.awaitMessages({ filter, max: 1, time: 10000, errors: ['time'] }).then(collected => {
                        const regexDate = /^[0-9]{2}\/[0-9]{2}$/;
                        const date = collected.first().content;
                        
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
                            interaction.followUp(`Perfect! So you want me to add ${name}'s birthday on ${birthday.toLocaleDateString('en-US', mediumDateFormat)}, is that correct? (Please reply with "yes" or "no")`);
                        } else {
                            interaction.followUp(`The date you entered isn't valid! Please try again, using format MM/DD (for example, ${today.toLocaleDateString('en-US', shortDateFormat)})`);
                            // Re-listen for date
                        }
                    })
                    .catch(collected => {
                        interaction.followUp("You took too long to enter a date. Please use /add-birthday if you'd like to try again!");
                    });
                });
            } else {
                interaction.followUp("The name you entered isn't valid! Please try again, using letters, numbers, spaces or these specific characters: -_'|,.");
                // Re-listen for name
            }
        })
        .catch(collected => {
            interaction.followUp("You took too long to enter a name. Please use /add-birthday if you'd like to try again!");
        });
    });
}