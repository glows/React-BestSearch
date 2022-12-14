



export function dateToEN(time) {
    return new Date(time).toLocaleDateString(
        'en-gb',
        {
            year: 'numeric',
            month: 'short',
            // day: 'numeric'
        }
    );
}