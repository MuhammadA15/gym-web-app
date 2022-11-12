export const sortAlphabetical = ({a, b} : {a: string, b: string}) => {
    return a.localeCompare(b);
}