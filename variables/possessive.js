export function possessive(name) {
    if(name.charAt(name.length-1) === "s") {
        return `${name}'`;
    } else {
        return `${name}'s`;
    }
}