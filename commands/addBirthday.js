export async function addBirthday(interaction) {
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