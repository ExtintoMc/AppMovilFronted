const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const minPasswordLength = 8

type ValidateInputParams = {
    value: string,
    name: string
}

type ValidateInput = {
    hasError: boolean,
    error: string
}

export const validateInput = ({ value, name }: ValidateInputParams): ValidateInput => {
    let hasError = false;
    let error = '';

    const formatValue = value.trim()

    switch (name) {
        case "email":
            if (formatValue == '') {
                hasError = true
                error = 'Email is required'
            } else if (!emailRegex.test(formatValue)) {
                hasError = true
                error = 'Email is not valid'
            } else {
                hasError = false
                error = ''
            }
            break
        case "password":
            if (formatValue == '') {
                hasError = true
                error = 'Password is required'
            } else if (formatValue.length < minPasswordLength) {
                hasError = true
                error = 'Password must be at least ' + minPasswordLength
            } else {
                hasError = false
                error = ''
            }
            break
        default:
            break
    }

    return { hasError, error }
}