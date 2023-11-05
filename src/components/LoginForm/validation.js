function validateEmail(email){
    var validator = require("email-validator");
    return validator.validate(email);
}

function validatePassword(password){
    if (password.length < 8) return "Minimum of 8 characters";
    if (!hasUpperLowerCase(password)) return "Should contains both uppercase and lowercase letter";
    if (!hasNumber(password)) return "Minimum of 1 numerical digit (0-9)";
    if (!hasSpecialChar(password)) return "Minimum of 1 special character";
    return ""
}

const hasUpperLowerCase = (str) => {
    return /[A-Z]/.test(str) && /[a-z]/.test(str);
}

const hasNumber = (str) => {
    return /\d/.test(str);
}

const hasSpecialChar= (str) => {
    return /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(str);
    //return /[!@#$%^&*]/.test(password);
}

export {
    validatePassword,
    validateEmail,
}