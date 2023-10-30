export function dateFormat(date: string) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    return `${day}/${month}/${year}`;
}

export function checkEmail(email: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

export function preventSqlInjection(str: any) {
    return str.replace(/'/g, "''");
}