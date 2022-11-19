export const sortAlphabetical = ({a, b} : {a: string, b: string}) => {
    return a.localeCompare(b);
}

export const yesNoOptions = [
    {label: 'Yes', value: 'Yes'},
    {label: 'No', value: 'No'}
]