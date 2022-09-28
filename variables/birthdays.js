export const birthdays = [
	{ name: "Margaux", date: new Date(2023, 0, 28) },
	{ name: "Chloé", date: new Date(2023, 2, 3) },
	{ name: "Constance", date: new Date(2023, 6, 21) },
	{ name: "Mamou", date: new Date(2023, 5, 12) },
	{ name: "Dadou-patou-badabou", date: new Date(2023, 2, 22) },
	{ name: "Mads", date: new Date(2022, 11, 27) }
]

export function sortBirthdays() {
    birthdays.sort(function (a, b) {
	    return a.date - b.date;
    });
}