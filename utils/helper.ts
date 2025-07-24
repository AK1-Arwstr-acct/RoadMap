export const errorList = (error) => {
    if (error.response.data.errors) {
        const errors = error.response.data.errors;

        if (typeof errors === "string") {
            return errors
        } else if (Array.isArray(errors)) {
            return Object.values(errors[0])[0]
        } else if (typeof errors === "object" && errors !== null) {
            return Object.values(errors)[0]
        }
    } else {
        return error.response.data.message
    }
};

export const budgetWithComma = (x: number | string) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const filterEssay = (value: string) => {
    const regex = /^Title:\s*(.+)\nEssay:\s*(.+)$/s;
    const match = value.match(regex) || [];
    const title = match[1];
    const essay = match[2];

    return {
        title: title,
        essayText: essay,
    }
}

export const outOfTenGpa = (number: number | string) => {
    const parseValue = parseFloat(String(number));
    const value = (parseValue / 4) * 10;
    const decimal = value - Math.floor(value);
    return decimal > 0 ? value.toFixed(1) : value.toFixed(0);
};

export const outOfFourGpa = (number: number | string) => {
    return number
        ? ((Number(number) / 10) * 4).toFixed(2)
        : "";
};
