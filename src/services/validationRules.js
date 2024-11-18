export const required = (value) => (!value ? "This field is required." : null);

export const validateDay = (day, maxDays) =>
    day < 1 || day > maxDays ? `Day must be between 1 and ${maxDays}.` : null;

export const validateYear = (year, currentYear = new Date().getFullYear()) =>
    year < currentYear - 100 || year > currentYear
        ? `Year must be between ${currentYear - 100} and ${currentYear}.`
        : null;

export const validateSelection = (value, options) =>
    !options.some((option) => option.value === value) ? "Invalid selection." : null;
