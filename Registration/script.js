// Get form elements
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const form = document.getElementById('registrationForm');
const minCharRequirement = document.getElementById('minChar');
const alphaNumRequirement = document.getElementById('alphaNum');

// Password validation function
function validatePassword() {
    const password = passwordInput.value;
    
    // Check minimum 8 characters
    if (password.length >= 8) {
        minCharRequirement.classList.add('valid');
    } else {
        minCharRequirement.classList.remove('valid');
    }
    
    // Check alphabetic and numeric characters
    const hasAlpha = /[a-zA-Z]/.test(password);
    const hasNumeric = /[0-9]/.test(password);
    
    if (hasAlpha && hasNumeric) {
        alphaNumRequirement.classList.add('valid');
    } else {
        alphaNumRequirement.classList.remove('valid');
    }
}

// Add event listener for password input
passwordInput.addEventListener('input', validatePassword);

// Form submission handler
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const termsChecked = document.getElementById('terms').checked;
    
    // Validate email
    if (!email) {
        alert('Please enter your email address');
        return;
    }
    
    // Validate password requirements
    if (password.length < 8) {
        alert('Password must be at least 8 characters long');
        return;
    }
    
    const hasAlpha = /[a-zA-Z]/.test(password);
    const hasNumeric = /[0-9]/.test(password);
    
    if (!hasAlpha || !hasNumeric) {
        alert('Password must contain both alphabetic and numeric characters');
        return;
    }
    
    // Validate password match
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    // Validate terms checkbox
    if (!termsChecked) {
        alert('Please agree to the Terms and Conditions');
        return;
    }
    
    // If all validations pass
    alert('Account created successfully! Redirecting to login page...');
    
    // Here you would typically send the data to a server
    console.log('Form submitted with:', {
        email: email,
        password: password
    });
    
    // Redirect to login page after successful registration
    setTimeout(function() {
    window.location.href = '../login/login.html';
}, 1500);
});