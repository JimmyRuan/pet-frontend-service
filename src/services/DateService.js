import moment from "moment";

export function formatDateToString(date) {
    return moment(date).format('YYYY-MM-DD');
}

export function calculateDateOfBirth(age) {
    const currentDate = new Date();

    const birthYear = currentDate.getFullYear() - age;

    const birthDate = new Date(birthYear, currentDate.getMonth(), currentDate.getDate());

    if (birthDate > currentDate) {
        birthDate.setFullYear(birthDate.getFullYear() - 1);
    }

    return birthDate;
}

export function createDateFromYMD(year, month, day) {
    const date = moment({ year, month: month - 1, day });

    return date.toDate();
}