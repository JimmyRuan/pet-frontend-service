import {capitalizeFirstLetter, getAllMonths} from "@/services/util";

export const required = (name, value) => (!value ? `"${capitalizeFirstLetter(name)}" field is required.` : null);

export const validateYearMonthDay = (day, month, year) => {

    const allErrors = [];
    const requireDayError = required('Day', day);
    if(requireDayError){
        allErrors.push(requireDayError);
    }

    const requireMonthError = required('Month', month);
    if(requireMonthError){
        allErrors.push(requireMonthError);
    }

    const yearError = validateYear(year);
    if(yearError){
        allErrors.push(yearError);
    }

    const maxDays = new Date(year, month, 0).getDate();
    const monthStr = getAllMonths()[month];

    const valueError = day < 1 || day > maxDays ? `Day must be between 1 and ${maxDays} for ${monthStr}.` : null;
    if(valueError){
        allErrors.push(valueError)
    }

    return allErrors;
}


export const validateYear = (year, currentYear = new Date().getFullYear()) => {
    const yearError = required('Year', year);
    if(yearError){
        return yearError;
    }
    return year < currentYear - 100 || year > currentYear
        ? `Year must be between ${currentYear - 100} and ${currentYear}.`
        : null;
}


export const validateSelection = (value, options) =>
    !options.some((option) => option.value === value) ? "Invalid selection." : null;
