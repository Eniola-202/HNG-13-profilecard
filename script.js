const form = document.getElementById('contactForm');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const message = document.getElementById('message');
const successMessage = document.getElementById('successMessage');
const charCount = document.getElementById('charCount');
const submitButton = document.querySelector('button[type="submit"]');

// Update character count for message field 
message.addEventListener('input', () => {
    const currentLength = message.value.length;
    charCount.textContent = `${currentLength}/10 characters`;
}); 
form.addEventListener('submit', function(event) {
    event.preventDefault();
    successMessage.style.display = 'block';
});

//Validation functions 
const validators={
    fullName: function(value) {
        return value.trim().length >= 4;
    },
    email: function (value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(value.trim());
    },
    subject: function (value) {
        return value.trim().length >= 2;
    },
    message: function (value) {
        return value.trim().length >=10;
    }

};

// Show error for a specific field
        function showError(inputElement, errorId) {
            const errorElement = document.getElementById(errorId);
            errorElement.classList.add('show');
            inputElement.classList.add('invalid');
            inputElement.setAttribute('aria-invalid', 'true');
        }

        // Hide error for a specific field
        function hideError(inputElement, errorId) {
            const errorElement = document.getElementById(errorId);
            errorElement.classList.remove('show');
            inputElement.classList.remove('invalid');
            inputElement.setAttribute('aria-invalid', 'false');
        }
        // Validate a single field
        function validateField(inputElement, validatorKey, errorId) {
            const isValid = validators[validatorKey](inputElement.value);
            if (isValid) {
                hideError(inputElement, errorId);
            }
            return isValid;
        }
//character counter for message field
message.addEventListener('input', function (){
    const length = message.value.trim().length;
    charCount.textContent = `${length}/10 characters`;

    if(length >= 10){
        charCount.classList.remove('invalid');
        hideError(message, 'messageError');
    }
    else if (length > 0) {
        charCount.classList.add('invalid');
        showError(message, 'messageError');
    }
});
//Real-time validation for fields
fullName.addEventListener('input', function() {
    if(fullName.value.trim().length >= 4){
        validateField(fullName, 'fullName', 'fullNameError');
    }
    
});

email.addEventListener('input', function() {
    if(email.value.trim().length >= 2){
        validateField(email, 'email', 'emailError');
    }
   
});

subject.addEventListener('input', function() {
    if(subject.value.trim().length >= 2){
      validateField(subject, 'subject', 'subjectError');
    }
   
});
message.addEventListener('input', function() {
    if(message.value.trim().length >= 10){
        validateField(message, 'message', 'messageError');
    }
});

// Real-time validation for fields(to clear errors as user types)
fullName.addEventListener('input', function() {
    if(fullName.value.trim().length < 3){
        showError(fullName, 'fullNameError');
    } else {
        hideError(fullName, 'fullNameError');
    }
});

email.addEventListener('input', function() {
    if(email.value.trim().length < 2){
        showError(email, 'emailError');
    } else {
        hideError(email, 'emailError');
    }
});

subject.addEventListener('input', function() {
    if(subject.value.trim().length < 2){
        showError(subject, 'subjectError');
    } else {
        hideError(subject, 'subjectError');
    }
});


message.addEventListener('input', function() {
    if(message.value.trim().length < 10){
        showError(message, 'messageError');
    } else {
        hideError(message, 'messageError');
    }
});

//Form Submission
form.addEventListener('submit' , (e) =>{
    e.preventDefault();


successMessage.classList.remove('show');

let isValid = true;
let firstInvalidField = null;

//Validate all Fields
const fields=[
    {input: fullName, validator: 'fullName', error: 'fullNameError'},
    {input: email, validator: 'email', error: 'emailError'},
    {input: subject, validator: 'subject', error: 'subjectError'},
    {input: message, validator: 'message', error: 'messageError'}
];

fields.forEach(({ input, validator, error }) => {
                if (!validators[validator](input.value)) {
                    showError(input, error);
                    isValid = false;
                    if (!firstInvalidField) {
                        firstInvalidField = input;
                    }
                } else {
                    hideError(input, error);
                }
            });

            // Focus on first invalid field for accessibility
            if (!isValid && firstInvalidField) {
                firstInvalidField.focus();
                return;
            }

            // If all validations pass
            if (isValid) {
                // Disable submit button temporarily
                submitButton.disabled = true;
                
                // Show success message
                successMessage.classList.add('show');
                successMessage.focus();
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
                //Reset form

                form.reset();
                charCount.textContent= '0/10 characters minimum';
                charCount.classList.remove('error');

                //Re-enable submit button
                setTimeout(() =>{
                    submitButton.disabled =false;
                }, 1000);

                //Hide success message after 5 sec
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 5000);

                console.log('Form submitted successfully: ', {
                    fullName: fullName.value,
                    email: email.value,
                    subject: subject.value,
                    message: message.value
                });
            }
});

