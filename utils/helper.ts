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