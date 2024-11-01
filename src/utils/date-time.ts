export const formatTimeForInput = (isoString: string): string => {
    const date = new Date(isoString);
    if (isNaN(date.getDate())) {
        return isoString
    }
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
};
