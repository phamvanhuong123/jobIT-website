const convertDMYToISO = (dateStr: string): string | null => {
    const parts = dateStr.split("/");
    if (parts.length !== 3) return null;
    const [day, month, year] = parts;
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

export default convertDMYToISO