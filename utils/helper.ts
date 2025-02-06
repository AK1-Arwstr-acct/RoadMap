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