const validationRules = {
    name: {
        required: true,
        minLength: 3,
        maxLength: 40
    },
    email: {
        required: true,
        maxLength: 50
    },
    password: {
        required: true,
    }
};

function validateFields(fields) {
    const errors = [];

    for (const field in fields) {
        if (validationRules[field].required && !fields[field]) {
            errors.push(`The ${field} is required!`);
        }
        if (fields[field] && validationRules[field].minLength && fields[field].length < validationRules[field].minLength) {
            errors.push(`The ${field} must be at least ${validationRules[field].minLength} characters long!`);
        }
        if (fields[field] && validationRules[field].maxLength && fields[field].length > validationRules[field].maxLength) {
            errors.push(`The ${field} must not exceed ${validationRules[field].maxLength} characters!`);
        }
    }

    return errors;
}

module.exports = { validateFields, validationRules };