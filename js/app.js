function isValidStudentNumber(value) {
    const studentNumber = value.trim();
    return /^\d{2}-\d{4}-\d{3}$/.test(studentNumber);
}

function isValidPassword(value) {
    if (/\s/.test(value)) {
        return false;
    }
    if (value.length < 8) {
        return false;
    }
    if (!/[A-Z]/.test(value)) {
        return false;
    }
    if (!/\d/.test(value)) {
        return false;
    }
    if (!/[@$!]/.test(value)) {
        return false;
    }
    return true;
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        isValidStudentNumber,
        isValidPassword
    };
}

if (typeof document !== "undefined") {
    const registrationForm = document.getElementById("registrationForm");

    const fullName = document.getElementById("fullName");
    const studentNumber = document.getElementById("studentNumber");
    const email = document.getElementById("email");
    const mobileNumber = document.getElementById("mobileNumber");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const course = document.getElementById("course");
    const terms = document.getElementById("terms");

    const fullNameError = document.getElementById("fullNameError");
    const studentNumberError = document.getElementById("studentNumberError");
    const emailError = document.getElementById("emailError");
    const mobileNumberError = document.getElementById("mobileNumberError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    const courseError = document.getElementById("courseError");
    const termsError = document.getElementById("termsError");

    const passwordFeedback = document.getElementById("passwordFeedback");
    const successMessage = document.getElementById("successMessage");
    const registrationSummary = document.getElementById("registrationSummary");

    const summaryName = document.getElementById("summaryName");
    const summaryStudentNumber = document.getElementById("summaryStudentNumber");
    const summaryEmail = document.getElementById("summaryEmail");
    const summaryMobileNumber = document.getElementById("summaryMobileNumber");
    const summaryCourse = document.getElementById("summaryCourse");

    function setError(field, messageElement, message) {
        if (field && messageElement) {
            messageElement.textContent = message;
            field.setAttribute("aria-invalid", "true");
        }
    }

    function clearError(field, messageElement) {
        if (field && messageElement) {
            messageElement.textContent = "";
            field.setAttribute("aria-invalid", "false");
        }
    }

    function validateFullName() {
        const rawValue = fullName.value;
        const trimmedValue = rawValue.trim();

        if (rawValue.length > 0 && trimmedValue.length === 0) {
            setError(fullName, fullNameError, "Full name cannot contain only spaces.");
            return false;
        }

        if (trimmedValue.length < 2) {
            setError(fullName, fullNameError, "Full name must be at least 2 characters.");
            return false;
        }

        clearError(fullName, fullNameError);
        return true;
    }

    function validateStudentNumber() {
        const value = studentNumber.value.trim();

        if (value === "") {
            setError(studentNumber, studentNumberError, "Student number is required.");
            return false;
        }

        if (!isValidStudentNumber(value)) {
            setError(studentNumber, studentNumberError, "Enter a student number in the format 24-1234-123.");
            return false;
        }

        clearError(studentNumber, studentNumberError);
        return true;
    }

    function validateEmail() {
        const value = email.value.trim();

        if (value === "") {
            setError(email, emailError, "Email address is required.");
            return false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(value)) {
            setError(email, emailError, "Enter a valid email address.");
            return false;
        }

        clearError(email, emailError);
        return true;
    }

    function validateMobileNumber() {
        const value = mobileNumber.value.trim();

        if (value === "") {
            setError(mobileNumber, mobileNumberError, "Mobile number is required.");
            return false;
        }

        const mobilePattern = /^(09\d{9}|\+639\d{9})$/;

        if (!mobilePattern.test(value)) {
            setError(mobileNumber, mobileNumberError, "Enter a valid mobile number without spaces or hyphens.");
            return false;
        }

        clearError(mobileNumber, mobileNumberError);
        return true;
    }

    function validatePassword() {
        if (password.value === "") {
            setError(password, passwordError, "Password is required.");
            return false;
        }

        if (!isValidPassword(password.value)) {
            setError(password, passwordError, "Password needs 8 characters, one uppercase letter, one digit, and @, $, or ! with no spaces.");
            return false;
        }

        clearError(password, passwordError);
        return true;
    }

    function validateConfirmPassword() {
        if (confirmPassword.value === "") {
            setError(confirmPassword, confirmPasswordError, "Please confirm your password.");
            return false;
        }

        if (confirmPassword.value !== password.value) {
            setError(confirmPassword, confirmPasswordError, "Passwords do not match.");
            return false;
        }

        clearError(confirmPassword, confirmPasswordError);
        return true;
    }

    function validateCourse() {
        if (course.value !== "BSIT" && course.value !== "BSCS") {
            setError(course, courseError, "Please select your course.");
            return false;
        }

        clearError(course, courseError);
        return true;
    }

    function validateTerms() {
        if (!terms.checked) {
            setError(terms, termsError, "You must agree to the terms.");
            return false;
        }

        clearError(terms, termsError);
        return true;
    }

    function updatePasswordFeedback() {
        if (!passwordFeedback) return;

        if (password.value === "") {
            passwordFeedback.textContent = "";
            return;
        }

        if (isValidPassword(password.value)) {
            passwordFeedback.textContent = "Password meets all requirements.";
            passwordFeedback.style.color = "#216e39";
        } else {
            passwordFeedback.textContent = "Password must have 8 characters, an uppercase letter, a digit, @, $, or !, and no spaces.";
            passwordFeedback.style.color = "#555";
        }
    }

    function showRegistrationSummary() {
        summaryName.textContent = fullName.value.trim();
        summaryStudentNumber.textContent = studentNumber.value.trim();
        summaryEmail.textContent = email.value.trim();
        summaryMobileNumber.textContent = mobileNumber.value.trim();
        summaryCourse.textContent = course.value;

        registrationSummary.hidden = false;
        registrationSummary.style.display = "block";
    }

    function clearRegistrationSummary() {
        summaryName.textContent = "";
        summaryStudentNumber.textContent = "";
        summaryEmail.textContent = "";
        summaryMobileNumber.textContent = "";
        summaryCourse.textContent = "";

        registrationSummary.hidden = true;
        registrationSummary.style.display = "none";
    }

    function clearAllErrors() {
        clearError(fullName, fullNameError);
        clearError(studentNumber, studentNumberError);
        clearError(email, emailError);
        clearError(mobileNumber, mobileNumberError);
        clearError(password, passwordError);
        clearError(confirmPassword, confirmPasswordError);
        clearError(course, courseError);
        clearError(terms, termsError);

        passwordFeedback.textContent = "";
    }

    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nameValid = validateFullName();
        const studentNumberValid = validateStudentNumber();
        const emailValid = validateEmail();
        const mobileValid = validateMobileNumber();
        const passwordValid = validatePassword();
        const confirmPasswordValid = validateConfirmPassword();
        const courseValid = validateCourse();
        const termsValid = validateTerms();

        if (
            nameValid &&
            studentNumberValid &&
            emailValid &&
            mobileValid &&
            passwordValid &&
            confirmPasswordValid &&
            courseValid &&
            termsValid
        ) {
            successMessage.textContent = "Registration details validated successfully!";
            showRegistrationSummary();
        } else {
            successMessage.textContent = "";
            clearRegistrationSummary();
        }
    });

    password.addEventListener("input", function () {
        updatePasswordFeedback();
        if (passwordError.textContent !== "") {
            validatePassword();
        }
        if (confirmPassword.value !== "") {
            validateConfirmPassword();
        }
    });

    fullName.addEventListener("blur", validateFullName);
    studentNumber.addEventListener("blur", validateStudentNumber);
    email.addEventListener("blur", validateEmail);
    mobileNumber.addEventListener("blur", validateMobileNumber);
    confirmPassword.addEventListener("blur", validateConfirmPassword);
    course.addEventListener("change", validateCourse);
    terms.addEventListener("change", validateTerms);

    registrationForm.addEventListener("reset", function () {
        setTimeout(function () {
            clearAllErrors();
            successMessage.textContent = "";
            clearRegistrationSummary();

            fullName.setAttribute("aria-invalid", "false");
            studentNumber.setAttribute("aria-invalid", "false");
            email.setAttribute("aria-invalid", "false");
            mobileNumber.setAttribute("aria-invalid", "false");
            password.setAttribute("aria-invalid", "false");
            confirmPassword.setAttribute("aria-invalid", "false");
            course.setAttribute("aria-invalid", "false");
            terms.setAttribute("aria-invalid", "false");
        }, 0);
    });

    clearRegistrationSummary();
    successMessage.textContent = "";
}